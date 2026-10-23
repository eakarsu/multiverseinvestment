'use strict';
// Pure helpers for feature-pack: list filtering, export, readable rendering, deterministic AI fallback.
function escCsv(v) {
  if (v === null || v === undefined) return '';
  const s = v instanceof Date ? v.toISOString() : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function recordsToCsv(rows, fields) {
  const keys = fields.map((f) => (typeof f === 'string' ? f : f.key));
  const labels = fields.map((f) => (typeof f === 'string' ? f : f.label || f.key));
  return [labels.join(','), ...rows.map((r) => keys.map((k) => escCsv(r[k])).join(','))].join('\n') + '\n';
}
function recordsToJson(rows) { return JSON.stringify({ exportedAt: new Date().toISOString(), records: rows }, null, 2); }
function readableLabel(k) { return String(k).replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/^./, (c) => c.toUpperCase()); }
function scalar(v) { if (v === null || v === undefined) return '(not supplied)'; if (v === '') return '(empty)'; if (typeof v === 'boolean') return v ? 'true' : 'false'; return String(v); }
function readableSections(value, depth = 0) {
  if (Array.isArray(value)) return value.length ? value.map((v, i) => readableSections(v, depth + 1)).join('\n') : '(empty list)';
  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    if (!entries.length) return '(no fields)';
    return entries.map(([k, v]) => (v && typeof v === 'object' ? `${readableLabel(k)}:\n${readableSections(v, depth + 1)}` : `${readableLabel(k)}: ${scalar(v)}`)).join('\n');
  }
  return scalar(value);
}
function buildClientFilter(query = {}) {
  const clauses = []; const params = [];
  const q = typeof query.q === 'string' ? query.q.trim() : '';
  if (q) { params.push(`%${q}%`); clauses.push(`(name ILIKE $${params.length} OR industry ILIKE $${params.length} OR contact_email ILIKE $${params.length})`); }
  if (query.status) { params.push(String(query.status)); clauses.push(`status = $${params.length}`); }
  if (query.industry) { params.push(String(query.industry)); clauses.push(`industry = $${params.length}`); }
  return { where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', params };
}
function hasProvider(env = process.env) { return Boolean((env.OPENROUTER_API_KEY || env.OPENAI_API_KEY || '').trim()); }
function countBy(rows, key) { const out = {}; for (const r of rows || []) { const k = r[key] ?? '(empty)'; out[k] = (out[k] || 0) + 1; } return out; }
function fallbackClientHealth(clients = []) {
  const byStatus = countBy(clients, 'status'); const byIndustry = countBy(clients, 'industry');
  return { aiGenerated: false, source: 'deterministic-fallback', providerConfigured: false, feature: 'client-health',
    summary: `${clients.length} client record(s) reviewed.`, sections: { totalClients: clients.length, byStatus, byIndustry, activeClients: byStatus.active || 0, emptyIndustryCount: clients.filter((c) => !c.industry).length },
    readable: readableSections({ totalClients: clients.length, byStatus, byIndustry }) };
}
function fallbackPipelineHealth(deals = []) {
  const byStage = countBy(deals, 'stage'); const totalValue = deals.reduce((s, d) => s + (Number(d.value) || 0), 0);
  return { aiGenerated: false, source: 'deterministic-fallback', providerConfigured: false, feature: 'pipeline-health',
    summary: `${deals.length} pipeline record(s) totalling ${totalValue}.`, sections: { totalDeals: deals.length, totalValue, byStage, stalledCount: deals.filter((d) => /stalled|blocked/i.test(String(d.stage || ''))).length },
    readable: readableSections({ totalDeals: deals.length, totalValue, byStage }) };
}
function fallbackTaskFocus(tasks = []) {
  const byStatus = countBy(tasks, 'status'); const byPriority = countBy(tasks, 'priority');
  const overdue = tasks.filter((t) => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'done' && t.status !== 'completed').length;
  return { aiGenerated: false, source: 'deterministic-fallback', providerConfigured: false, feature: 'task-focus',
    summary: `${tasks.length} task(s); ${overdue} overdue.`, sections: { totalTasks: tasks.length, byStatus, byPriority, overdueCount: overdue, unassignedCount: tasks.filter((t) => !t.assigned_to).length },
    readable: readableSections({ totalTasks: tasks.length, byStatus, byPriority, overdueCount: overdue }) };
}
async function callProvider({ feature, prompt, env = process.env, fetchImpl = fetch }) {
  const key = (env.OPENROUTER_API_KEY || env.OPENAI_API_KEY || '').trim();
  if (!key) return null;
  const isOpenRouter = Boolean((env.OPENROUTER_API_KEY || '').trim());
  const base = isOpenRouter ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1';
  const model = env.OPENROUTER_MODEL || env.OPENAI_MODEL || (isOpenRouter ? 'openrouter/free' : 'gpt-4o-mini');
  const res = await fetchImpl(`${base}/chat/completions`, { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages: [{ role: 'system', content: 'Return a JSON object with summary and sections. Ground claims only in supplied records.' }, { role: 'user', content: prompt }], temperature: 0.2 }) });
  if (!res.ok) { const e = new Error(`AI provider failed with HTTP ${res.status}`); e.status = 502; throw e; }
  const data = await res.json(); const content = data?.choices?.[0]?.message?.content || '';
  if (!content || !data?.id) { const e = new Error('AI provider returned incomplete response'); e.status = 502; throw e; }
  let parsed; try { parsed = JSON.parse(content); } catch { parsed = { summary: content, sections: {} }; }
  return { aiGenerated: true, source: isOpenRouter ? 'openrouter' : 'openai', providerConfigured: true, feature, model: data.model || model, providerReceiptId: data.id, ...parsed, readable: readableSections(parsed.sections || parsed) };
}
module.exports = { recordsToCsv, recordsToJson, readableSections, readableLabel, buildClientFilter, hasProvider, fallbackClientHealth, fallbackPipelineHealth, fallbackTaskFocus, callProvider };
