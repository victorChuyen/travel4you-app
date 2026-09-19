const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const envPath = path.resolve(__dirname, '..', '.env');

function prompt(question, hidden = false) {
  return new Promise((resolve) => {
    const input = process.stdin;
    const output = process.stdout;
    output.write(question);
    if (!hidden || !input.isTTY) {
      input.once('data', (data) => {
        output.write('\n');
        resolve(String(data).trim());
      });
      return;
    }

    const wasRaw = input.isRaw;
    input.setRawMode(true);
    let value = '';
    const onData = (chunk) => {
      const key = String(chunk);
      if (key === '\u0003') process.exit(130);
      if (key === '\r' || key === '\n') {
        input.setRawMode(wasRaw);
        input.off('data', onData);
        output.write('\n');
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
  if (!fs.existsSync(envPath)) {
    throw new Error(`Missing ${envPath}. Copy .env.example to .env first.`);
  }

  const clientId = await prompt('PayPal sandbox Client ID: ');
  const clientSecret = await prompt('PayPal sandbox Secret key (hidden): ', true);
  if (!clientId || !clientSecret) throw new Error('Both PayPal credentials are required.');

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).filter((line, index, all) => index < all.length - 1 || line);
  upsert(lines, 'PAYPAL_CLIENT_ID', clientId);
  upsert(lines, 'PAYPAL_CLIENT_SECRET', clientSecret);
  upsert(lines, 'PAYPAL_ENVIRONMENT', 'sandbox');
  upsert(lines, 'PAYPAL_WEBHOOK_ID', '69223274BU6623337');
  fs.writeFileSync(envPath, `${lines.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 });
  console.log('PayPal sandbox credentials saved to local .env. Secret value was not printed.');
}

main().catch((error) => {
  console.error(`PayPal configuration failed: ${error.message}`);
  process.exitCode = 1;
});
