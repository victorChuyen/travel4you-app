const required = [
  'PUBLIC_SUPABASE_URL',
  'PUBLIC_SUPABASE_PUBLISHABLE_KEY',
];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and load it before running this command.');
  process.exit(1);
}

try {
  new URL(process.env.PUBLIC_SUPABASE_URL);
} catch {
  console.error('PUBLIC_SUPABASE_URL must be a valid URL.');
  process.exit(1);
}

console.log('Environment configuration contains the required public Supabase values.');
