const fs = require('node:fs');
const path = require('node:path');
const envPath = path.resolve(__dirname, '..', '.env');

function prompt(question) {
  return new Promise((resolve) => {
    const input = process.stdin;
    process.stdout.write(question);
    if (!input.isTTY) {
      input.once('data', (data) => {
        process.stdout.write('\n');
        resolve(String(data).trim());
      });
      return;
    }
    input.setRawMode(true);
    input.resume();
    let value = '';
    const onData = (chunk) => {
      const key = String(chunk);
      if (key === '\u0003') process.exit(130);
      if (key === '\r' || key === '\n') {
        input.setRawMode(false);
        input.pause();
        input.off('data', onData);
        process.stdout.write('\n');
        resolve(value);
      } else if (key === '\u007f') {
        value = value.slice(0, -1);
      } else {
        value += key;
      }
    };
    input.on('data', onData);
  });
}

function upsert(lines, name, value) {
  const prefix = `${name}=`;
  const index = lines.findIndex((line) => line.startsWith(prefix));
  const line = `${prefix}${value}`;
  if (index >= 0) lines[index] = line;
  else lines.push(line);
}

async function main() {
  if (!fs.existsSync(envPath)) throw new Error(`Missing ${envPath}.`);
  const secret = await prompt('SePay HMAC secret (paste locally; value is not echoed by this script): ');
  if (!secret) throw new Error('SEPAY_WEBHOOK_SECRET is required.');
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).filter(Boolean);
  upsert(lines, 'SEPAY_WEBHOOK_SECRET', secret);
  upsert(lines, 'SEPAY_BANK_CODE', 'BIDV');
  upsert(lines, 'SEPAY_ACCOUNT_NUMBER', '96247688688');
  fs.writeFileSync(envPath, `${lines.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 });
  console.log('SePay HMAC secret saved to local .env. Value was not printed.');
}

main().catch((error) => {
  console.error(`SePay configuration failed: ${error.message}`);
  process.exitCode = 1;
});
