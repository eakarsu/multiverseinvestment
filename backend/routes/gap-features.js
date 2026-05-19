// === Batch 11 Gaps & Frontend Mounts ===
// Gap features (AI counterparts + Non-AI features) for multiverseinvestment.
// Lazy gap_features table (in-memory), OpenRouter via native fetch.

const express = require('express');
const router = express.Router();

const gapFeatures = new Map(); // lazy "gap_features" table

async function llm(systemPrompt, userMsg, maxTokens = 1400) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { const e = new Error('OPENROUTER_API_KEY not configured'); e.status = 503; throw e; }
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4.5';
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'HTTP-Referer': 'http://localhost:3000', 'X-Title': 'Multiverse Gap Features' },
    body: JSON.stringify({ model, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMsg }], max_tokens: maxTokens }),
  });
  const data = await r.json();
  if (data?.error) throw new Error(data.error.message || 'LLM error');
  return data.choices?.[0]?.message?.content || '';
}

function track(slug, payload) {
  const list = gapFeatures.get(slug) || [];
  list.push({ at: new Date().toISOString(), payload });
  gapFeatures.set(slug, list);
}

function safe(res, e) { return res.status(e?.status || 500).json({ error: e?.message || 'request failed' }); }

// ---- AI Gap Counterparts ----

router.post('/gap-proposal-writing-assistant', async (req, res) => {
  try {
    const { clientName, scope, budget, tone = 'professional' } = req.body || {};
    if (!clientName || !scope) return res.status(400).json({ error: 'clientName, scope required' });
    const sys = 'You are a proposal-writing assistant. Produce a complete proposal: executive summary, scope, deliverables, timeline, pricing, terms.';
    const out = await llm(sys, `Client: ${clientName}\nScope: ${scope}\nBudget: ${budget || 'TBD'}\nTone: ${tone}`);
    track('proposal-writing-assistant', { clientName });
    res.json({ proposal: out });
  } catch (e) { safe(res, e); }
});

router.post('/gap-due-diligence-analyzer', async (req, res) => {
  try {
    const { target, sector, financials } = req.body || {};
    if (!target) return res.status(400).json({ error: 'target required' });
    const sys = 'You are an investment due-diligence analyst. Produce: market, financial, operational, legal, and risk sections with clear recommendations.';
    const out = await llm(sys, `Target: ${target}\nSector: ${sector || 'n/a'}\nFinancials: ${JSON.stringify(financials || {}).slice(0, 3000)}`);
    track('due-diligence-analyzer', { target });
    res.json({ report: out });
  } catch (e) { safe(res, e); }
});

router.post('/gap-role-spec-generator', async (req, res) => {
  try {
    const { role, seniority, mustHaves = [] } = req.body || {};
    if (!role) return res.status(400).json({ error: 'role required' });
    const sys = 'You generate executive-search role specs: title, responsibilities, must-have skills, nice-to-haves, compensation band, KPIs.';
    const out = await llm(sys, `Role: ${role}\nSeniority: ${seniority || 'n/a'}\nMust-haves: ${mustHaves.join(', ')}`);
    track('role-spec-generator', { role });
    res.json({ spec: out });
  } catch (e) { safe(res, e); }
});

router.post('/gap-meeting-summarizer', async (req, res) => {
  try {
    const { transcript, attendees = [] } = req.body || {};
    if (!transcript || transcript.length < 30) return res.status(400).json({ error: 'transcript (30+ chars) required' });
    const sys = 'You summarize meetings: 3-bullet summary, decisions, action items (owner, due), open questions.';
    const out = await llm(sys, `Attendees: ${attendees.join(', ')}\n\n${transcript.slice(0, 8000)}`);
    track('meeting-summarizer', { len: transcript.length });
    res.json({ minutes: out });
  } catch (e) { safe(res, e); }
});

router.post('/gap-kpi-anomaly-explainer', async (req, res) => {
  try {
    const { kpiName, current, baseline, history = [] } = req.body || {};
    if (!kpiName) return res.status(400).json({ error: 'kpiName required' });
    const sys = 'You explain KPI anomalies. Identify if current is anomalous vs baseline/history, possible causes, and recommended drill-downs.';
    const out = await llm(sys, `KPI: ${kpiName}\nCurrent: ${current}\nBaseline: ${baseline}\nHistory: ${JSON.stringify(history).slice(0, 1500)}`);
    track('kpi-anomaly-explainer', { kpiName });
    res.json({ explanation: out });
  } catch (e) { safe(res, e); }
});

// ---- Non-AI Gap Features ----

router.post('/gap-deal-stage-automation', (req, res) => {
  const { dealId, currentStage, targetStage, conditions = [] } = req.body || {};
  if (!dealId || !targetStage) return res.status(400).json({ error: 'dealId, targetStage required' });
  const rule = { dealId, from: currentStage, to: targetStage, conditions, createdAt: new Date().toISOString() };
  track('deal-stage-automation', rule);
  res.json({ rule, status: 'queued' });
});

router.post('/gap-document-management', (req, res) => {
  const { name, type, size, owner } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name required' });
  const doc = { id: `doc_${Date.now()}`, name, type: type || 'unknown', size: size || 0, owner, uploadedAt: new Date().toISOString() };
  track('document-management', doc);
  res.json({ document: doc });
});

router.post('/gap-subscription-billing', (req, res) => {
  const { clientId, plan, amount, interval = 'monthly' } = req.body || {};
  if (!clientId || !plan) return res.status(400).json({ error: 'clientId, plan required' });
  const sub = { id: `sub_${Date.now()}`, clientId, plan, amount, interval, status: 'active', createdAt: new Date().toISOString() };
  track('subscription-billing', sub);
  res.json({ subscription: sub });
});

router.post('/gap-crm-sync', (req, res) => {
  const { provider, action = 'import', payload = {} } = req.body || {};
  if (!provider) return res.status(400).json({ error: 'provider (salesforce/hubspot/linkedin) required' });
  const job = { id: `sync_${Date.now()}`, provider, action, payloadKeys: Object.keys(payload), status: 'queued' };
  track('crm-sync', job);
  res.json({ job });
});

router.post('/gap-calendar-integration', (req, res) => {
  const { provider = 'google', accessToken, eventTitle, startsAt, durationMinutes = 30 } = req.body || {};
  if (!accessToken || !eventTitle) return res.status(400).json({ error: 'accessToken, eventTitle required' });
  // TODO: configure credentials — wire provider OAuth + create event via API
  const event = { id: `ev_${Date.now()}`, provider, title: eventTitle, startsAt: startsAt || new Date().toISOString(), durationMinutes };
  track('calendar-integration', event);
  res.json({ event, status: 'created (stub)' });
});

router.get('/gap-features/_audit', (req, res) => {
  const rows = [];
  for (const [k, v] of gapFeatures.entries()) rows.push({ feature: k, events: v.length });
  res.json({ rows });
});

module.exports = router;
