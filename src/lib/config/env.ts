import { z } from 'zod';

const publicEnvSchema = z.object({
  PUBLIC_SUPABASE_URL: z.string().url(),
  PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
});

const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  SUPABASE_JWKS_URL: z.string().url().optional(),
  SUPABASE_DB_URL: z.string().url().optional(),
  AI_ROUTER_BASE_URL: z.string().url().default('http://127.0.0.1:8787'),
  AI_ROUTER_API_KEY: z.string().min(1).optional(),
  AI_ROUTER_DEFAULT_MODEL: z.string().min(1).optional(),
  AI_ROUTER_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  PAYPAL_CLIENT_ID: z.string().min(1).optional(),
  PAYPAL_CLIENT_SECRET: z.string().min(1).optional(),
  PAYPAL_ENVIRONMENT: z.enum(['sandbox', 'live']).default('sandbox'),
  PAYPAL_WEBHOOK_ID: z.string().min(1).optional(),
  SEPAY_API_KEY: z.string().min(1).optional(),
  SEPAY_WEBHOOK_SECRET: z.string().min(1).optional(),
  SEPAY_ACCOUNT_NUMBER: z.string().min(1).optional(),
  SEPAY_BANK_CODE: z.string().min(1).default('BIDV'),
});

type ImportMetaEnv = Record<string, string | undefined>;

function parseOrThrow<T extends z.ZodTypeAny>(schema: T, values: unknown): z.output<T> {
  const result = schema.safeParse(values);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment configuration: ${issues}`);
  }
  return result.data;
}

export function getPublicEnv(values: ImportMetaEnv = import.meta.env) {
  return parseOrThrow(publicEnvSchema, {
    PUBLIC_SUPABASE_URL: values.PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_PUBLISHABLE_KEY: values.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });
}

export function getServerEnv(values: Record<string, string | undefined>) {
  return parseOrThrow(serverEnvSchema, values);
}
