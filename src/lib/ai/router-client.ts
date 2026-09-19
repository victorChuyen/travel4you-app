import { getServerEnv } from '../config/env';

export async function generateProjectWith9router(
  input: Record<string, unknown>,
  values: Record<string, string | undefined>,
) {
  const env = getServerEnv(values);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.AI_ROUTER_TIMEOUT_MS);

  try {
    const response = await fetch(`${env.AI_ROUTER_BASE_URL.replace(/\/$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(env.AI_ROUTER_API_KEY ? { authorization: `Bearer ${env.AI_ROUTER_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: env.AI_ROUTER_DEFAULT_MODEL || 'default',
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'Generate a premium travel project. Return only valid JSON matching the requested structure.',
          },
          {
            role: 'user',
            content: JSON.stringify({
              task: 'Create an editable luxury travel project',
              output_schema: {
                project: {},
                summary: {},
                days: [],
                experiences: [],
                practical_notes: [],
                cta: {},
              },
              input,
            }),
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`9router returned HTTP ${response.status}.`);
    }

    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) {
      throw new Error('9router returned no message content.');
    }

    return {
      content: content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim(),
      usage: payload.usage || {},
      model: payload.model || env.AI_ROUTER_DEFAULT_MODEL || 'default',
    };
  } finally {
    clearTimeout(timeout);
  }
}
