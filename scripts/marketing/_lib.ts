// scripts/marketing/_lib.ts
// Shared helpers — OpenRouter client, Postiz client, env loader, UTM, file IO.

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// ---------------------- ENV ----------------------
function loadEnvFromFile(path: string) {
  if (!existsSync(path)) return;
  const txt = readFileSync(path, 'utf8');
  for (const line of txt.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, k, v] = m;
    if (process.env[k]) continue;
    process.env[k] = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  }
}
loadEnvFromFile(resolve(process.cwd(), 'marketing/.env'));
loadEnvFromFile(resolve(process.cwd(), '.env'));

export function env(key: string, fallback?: string): string {
  const v = process.env[key] ?? fallback;
  if (v === undefined) {
    throw new Error(`Missing env: ${key} (set in marketing/.env or .env)`);
  }
  return v;
}

// ---------------------- OpenRouter ----------------------
export type ORModel =
  | 'fast'        // deepseek/deepseek-chat
  | 'quality'     // anthropic/claude-3.5-sonnet
  | 'research';   // openai/gpt-4o-mini

const MODEL_MAP: Record<ORModel, string> = {
  fast: 'deepseek/deepseek-chat',
  quality: 'anthropic/claude-3.5-sonnet',
  research: 'openai/gpt-4o-mini',
};

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function openrouterChat(opts: {
  model?: ORModel;
  messages: OpenRouterMessage[];
  jsonMode?: boolean;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const apiKey = env('OPENROUTER_API_KEY');
  const model = MODEL_MAP[opts.model || 'fast'];

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://stronyodzaraz.pl',
      'X-Title': 'stronyodzaraz-marketing',
    },
    body: JSON.stringify({
      model,
      messages: opts.messages,
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.maxTokens ?? 4000,
      ...(opts.jsonMode ? { response_format: { type: 'json_object' } } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${text}`);
  }
  const data = await res.json() as { choices: { message: { content: string } }[] };
  return data.choices[0].message.content;
}

// ---------------------- Postiz ----------------------
export async function postizApi<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = env('POSTIZ_URL');
  const key = env('POSTIZ_API_KEY');
  const res = await fetch(`${url.replace(/\/$/, '')}${path}`, {
    ...init,
    headers: {
      'Authorization': key,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Postiz ${res.status} ${path}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export interface PostizIntegration {
  id: string;
  name: string;
  identifier: string;        // 'instagram' | 'facebook' | 'linkedin' | 'x' | 'tiktok' | 'youtube' | 'pinterest' | ...
  picture?: string;
  disabled?: boolean;
}

export async function postizIntegrations(): Promise<PostizIntegration[]> {
  return postizApi<PostizIntegration[]>('/api/public/v1/integrations');
}

export interface PostizSchedulePost {
  channel: string;        // alias 'instagram' | 'facebook' | ...
  content: string;
  scheduledAt: string;    // ISO
  mediaUrls?: string[];
}

export async function postizSchedule(post: PostizSchedulePost) {
  const integrations = await postizIntegrations();
  const integration = integrations.find(i => i.identifier === post.channel);
  if (!integration) {
    throw new Error(`No Postiz integration for channel "${post.channel}". Connect it in Postiz UI first.`);
  }
  return postizApi('/api/public/v1/posts', {
    method: 'POST',
    body: JSON.stringify({
      type: 'schedule',
      date: post.scheduledAt,
      shortLink: false,
      posts: [
        {
          integration: { id: integration.id },
          value: [
            {
              content: post.content,
              ...(post.mediaUrls?.length
                ? { image: post.mediaUrls.map(url => ({ path: url })) }
                : {}),
            },
          ],
          settings: {},
        },
      ],
    }),
  });
}

// ---------------------- UTM ----------------------
export interface UtmParams {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export function withUtm(url: string, utm: UtmParams): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', utm.source);
  u.searchParams.set('utm_medium', utm.medium);
  u.searchParams.set('utm_campaign', utm.campaign);
  if (utm.content) u.searchParams.set('utm_content', utm.content);
  if (utm.term) u.searchParams.set('utm_term', utm.term);
  return u.toString();
}

// ---------------------- CLI args ----------------------
export function parseArgs(argv = process.argv.slice(2)): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

export function logSection(title: string) {
  console.log(`\n\x1b[36m━━━ ${title} ━━━\x1b[0m`);
}
export function logOk(msg: string)  { console.log(`\x1b[32m✓\x1b[0m ${msg}`); }
export function logWarn(msg: string){ console.log(`\x1b[33m⚠\x1b[0m ${msg}`); }
export function logErr(msg: string) { console.error(`\x1b[31m✗\x1b[0m ${msg}`); }
