/**
 * scripts/marketing/keywords.ts
 * Parsuje pliki "Keyword Stats *.csv" (eksport z Google Keyword Planner / Ads),
 * wyciąga top keywordy per intent, generuje plan blog postów.
 *
 * npm run mkt:keywords -- --csv "./Keyword Stats 2026-04-21 at 20_22_35.csv" --top 50
 * npm run mkt:keywords -- --csv-glob "Keyword Stats*.csv" --output marketing/queue/seo/keyword-plan.json
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parseArgs, logSection, logOk, logWarn } from './_lib';

interface Row {
  keyword: string;
  avgMonthlySearches: number;
  competition: string;
  topOfPageBidLow?: number;
  topOfPageBidHigh?: number;
}

function parseCsv(path: string): Row[] {
  const txt = readFileSync(path, 'utf8');
  // Google Keyword Planner CSV has BOM + 2 metadata rows then headers
  const cleaned = txt.replace(/^\uFEFF/, '');
  const lines = cleaned.split('\n').filter(l => l.trim());
  // header detection: row that contains "Keyword"
  const headerIdx = lines.findIndex(l => /(^|,|"\s*)Keyword(\s*"|,)/i.test(l));
  if (headerIdx === -1) return [];
  const headers = parseCsvLine(lines[headerIdx]);
  const rows: Row[] = [];

  const idxKw  = headers.findIndex(h => /^keyword$/i.test(h));
  const idxAvg = headers.findIndex(h => /avg.*month.*search/i.test(h));
  const idxCmp = headers.findIndex(h => /^competition/i.test(h));
  const idxLow = headers.findIndex(h => /top.*page.*bid.*low/i.test(h));
  const idxHi  = headers.findIndex(h => /top.*page.*bid.*high/i.test(h));

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    if (cells.length < 2) continue;
    const kw = cells[idxKw]?.trim();
    if (!kw) continue;
    const rawAvg = cells[idxAvg]?.replace(/[^\d]/g, '') || '0';
    rows.push({
      keyword: kw,
      avgMonthlySearches: parseInt(rawAvg, 10) || 0,
      competition: cells[idxCmp] || '',
      topOfPageBidLow:  parseFloat(cells[idxLow] || '0') || undefined,
      topOfPageBidHigh: parseFloat(cells[idxHi] || '0') || undefined,
    });
  }
  return rows;
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; continue; }
    if (c === '"') { inQ = !inQ; continue; }
    if (c === ',' && !inQ) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

function classifyIntent(kw: string): { segment: number; intent: 'transactional' | 'informational' | 'commercial' } {
  const k = kw.toLowerCase();
  if (/(pup|urz[ęe]d.*pracy|wniosek pup)/.test(k)) return { segment: 1, intent: 'transactional' };
  if (/(arimr|lgd|wieś|premia.*młod)/.test(k)) return { segment: 2, intent: 'transactional' };
  if (/(parp|kredyt|biznesplan.*bank)/.test(k)) return { segment: 3, intent: 'commercial' };
  if (/(logo|sklep internetowy|allegro|olx|branding)/.test(k)) return { segment: 4, intent: 'commercial' };
  if (/(obcokrajowiec|foreigner|cudzoziem)/.test(k)) return { segment: 5, intent: 'transactional' };
  if (/(jak |poradnik|2026|wzór|wzor)/.test(k)) return { segment: 0, intent: 'informational' };
  return { segment: 0, intent: 'commercial' };
}

async function main() {
  const args = parseArgs();
  const top = Number(args.top || 100);
  const csvPaths: string[] = [];
  if (args.csv) csvPaths.push(String(args.csv));
  if (args['csv-glob']) {
    const pattern = String(args['csv-glob']);
    const files = readdirSync(process.cwd()).filter(f => {
      const re = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$', 'i');
      return re.test(f);
    });
    csvPaths.push(...files.map(f => resolve(process.cwd(), f)));
  }
  if (!csvPaths.length) {
    // domyślnie wszystkie "Keyword Stats*.csv" w root
    const files = readdirSync(process.cwd()).filter(f => /^Keyword Stats.*\.csv$/i.test(f));
    csvPaths.push(...files.map(f => resolve(process.cwd(), f)));
  }
  if (!csvPaths.length) throw new Error('No CSV files found. Use --csv <path>');

  logSection(`Parsing ${csvPaths.length} CSV files`);
  const all: Row[] = [];
  for (const p of csvPaths) {
    const rows = parseCsv(p);
    logOk(`${p.split('/').pop()} — ${rows.length} rows`);
    all.push(...rows);
  }

  // dedupe by keyword (sum searches if duplicates)
  const map = new Map<string, Row>();
  for (const r of all) {
    const ex = map.get(r.keyword);
    if (ex) ex.avgMonthlySearches = Math.max(ex.avgMonthlySearches, r.avgMonthlySearches);
    else map.set(r.keyword, { ...r });
  }
  const deduped = [...map.values()].sort((a, b) => b.avgMonthlySearches - a.avgMonthlySearches);

  const enriched = deduped.map(r => ({ ...r, ...classifyIntent(r.keyword) }));
  const topRows = enriched.slice(0, top);

  // group by segment
  const bySegment: Record<string, typeof topRows> = {};
  for (const r of topRows) {
    const k = `seg${r.segment}-${r.intent}`;
    (bySegment[k] ||= []).push(r);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    sources: csvPaths,
    totalKeywords: all.length,
    uniqueKeywords: deduped.length,
    top,
    bySegment,
    topRows,
  };

  const outPath = String(args.output || 'marketing/queue/seo/keyword-plan.json');
  const fullOut = resolve(process.cwd(), outPath);
  mkdirSync(dirname(fullOut), { recursive: true });
  writeFileSync(fullOut, JSON.stringify(output, null, 2));

  logSection('Top 20 keywords (volume)');
  for (const r of topRows.slice(0, 20)) {
    console.log(`  ${String(r.avgMonthlySearches).padStart(7)} | seg${r.segment} ${r.intent.padEnd(13)} | ${r.keyword}`);
  }

  logSection('Output');
  logOk(fullOut);
  console.log(`\nNext:`);
  console.log(`  • Pisz blog posty: \x1b[36mnpm run mkt:blog -- --keyword "<keyword>"\x1b[0m`);
  console.log(`  • Buduj Google Ads: \x1b[36mnpm run mkt:gads -- --plan ${outPath}\x1b[0m`);
}

main().catch(e => { logWarn(e.message); process.exit(1); });
