const fs = require('fs');
const path = require('path');

const ROOT_APP = path.resolve(__dirname, '..');
const envPath = path.join(ROOT_APP, '.env');
const catalogPath = path.join(ROOT_APP, 'public/data/destinations_search_index.json');
const outputPath = path.join(ROOT_APP, 'src/data/article_pilot_batch_12.json');

function loadEnv() {
  const values = {};
  if (!fs.existsSync(envPath)) return values;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) values[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
  return values;
}

function buildPrompt(item) {
  return `Create one original English luxury travel SEO article draft for Travel4You.app.
Property or destination: ${item.t} (${item.l}).
Category: ${item.c}. Search intent: commercial investigation for high-intent luxury travelers.
Use the supplied affiliate product link exactly where a booking CTA is needed: ${item.u}
Do not invent live availability, exact current prices, review counts, awards, or guaranteed inclusions. Tell readers to verify live details.
Return ONLY valid JSON with exactly these top-level keys: meta, content, seo, affiliate, media_plan.
meta must include title, slug, focus_keyword, location, locale, intent_tier, quality_score_target.
content must include excerpt, html, faq (array of question/answer objects). Write 900-1200 words of useful HTML with H2/H3 headings, who it suits, a practical planning section, what to verify before booking, transparent affiliate disclosure, and a CTA using the supplied link.
seo must include meta_title, meta_description, canonical_path, schema_type.
affiliate must include partner_name, partner_id, commission_rate, disclosure, link_strategy, direct_link.
media_plan must include hero_prompt, body_prompts (array of 4 strings), alt_texts (array of 5 strings).
Use partner ID D5OEC57 and commission rate 8%. Avoid copied wording, unsupported claims, markdown fences, and fabricated prices.`;
}

function parseJsonObject(content) {
  const cleaned = content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Model did not return a JSON object.');
  return JSON.parse(cleaned.slice(start, end + 1));
}

async function generate(item, env) {
  const baseUrl = (env.AI_ROUTER_BASE_URL || 'http://127.0.0.1:20128/v1').replace(/\/$/, '');
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.AI_ROUTER_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'travel',
      stream: false,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a meticulous luxury travel editor. Return only valid JSON.' },
        { role: 'user', content: buildPrompt(item) },
      ],
    }),
    signal: AbortSignal.timeout(300000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) throw new Error('No model content returned.');
  const article = parseJsonObject(content);
  if (!article.meta?.slug || !article.content?.html || !article.seo || !article.affiliate) {
    throw new Error('Required article schema fields are missing.');
  }
  return {
    source_catalog_id: item.i,
    source_product_code: item.p,
    source_title: item.t,
    source_location: item.l,
    source_affiliate_link: item.u,
    generated_model: payload.model || 'travel',
    generated_at: new Date().toISOString(),
    status: 'draft',
    ...article,
  };
}

async function main() {
  const env = loadEnv();
  if (!env.AI_ROUTER_API_KEY) throw new Error('AI_ROUTER_API_KEY is missing from local environment.');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const selected = catalog.filter((item) => item.d === false).slice(0, 12);
  if (selected.length !== 12) throw new Error(`Expected 12 catalog candidates, found ${selected.length}.`);

  const previous = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf8')) : {};
  const results = Array.isArray(previous.articles) ? previous.articles : [];
  const completedIds = new Set(results.map((article) => article.source_catalog_id));
  const failures = [];
  const pending = selected.filter((item) => !completedIds.has(item.i));
  for (let offset = 0; offset < pending.length; offset += 2) {
    const group = pending.slice(offset, offset + 2);
    const settled = await Promise.allSettled(group.map((item) => generate(item, env)));
    settled.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
        console.log(`PASS ${results.length}/12: ${result.value.meta.title}`);
      } else {
        failures.push({ catalog_id: group[index].i, error: result.reason?.message || String(result.reason) });
        console.error(`FAIL ${group[index].i}: ${failures.at(-1).error}`);
      }
    });
  }

  fs.writeFileSync(outputPath, `${JSON.stringify({
    batch: 'pilot-12',
    generated_at: new Date().toISOString(),
    status: results.length === 12 ? 'draft' : 'needs_review',
    requested: 12,
    generated: results.length,
    failures,
    articles: results,
  }, null, 2)}\n`);
  console.log(`Saved ${results.length} draft articles to ${outputPath}`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`Pilot batch failed: ${error.message}`);
  process.exit(1);
});
