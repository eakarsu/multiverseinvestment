// AI Extras — Custom Feature Suggestions (batch 11)
// Implements: Investment Thesis Agent, Pipeline Tracker, Workflow Automation,
// RAG Q&A, Voice Strategy Sessions, Multi-tenant SaaS Mode.

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

async function callLLM(systemPrompt, userQuery, maxTokens = 1500) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    const e = new Error('OPENROUTER_API_KEY not configured');
    e.status = 503;
    throw e;
  }
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4.5';
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Multiverse Consulting AI Extras',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuery },
      ],
      max_tokens: maxTokens,
    }),
  });
  const data = await r.json();
  if (data?.error) throw new Error(data.error.message || 'LLM error');
  return data.choices?.[0]?.message?.content || '';
}

function safe(res, err) {
  const code = err?.status || 500;
  return res.status(code).json({ error: err?.message || 'AI request failed' });
}

// 1) Agentic Investment Thesis Agent
router.post('/thesis-agent', async (req, res) => {
  try {
    const { fundName, marketSector, holdings = [], horizon = '24 months' } = req.body || {};
    if (!fundName) return res.status(400).json({ error: 'fundName required' });
    const sys = 'You are an institutional investment analyst. Run a multi-step thesis: (a) market opportunity sizing, (b) fund composition analysis, (c) risk assessment, (d) bull/bear scenarios, (e) recommended action. Return clear markdown sections.';
    const user = `Fund: ${fundName}\nSector: ${marketSector || 'unspecified'}\nHoldings: ${JSON.stringify(holdings).slice(0, 4000)}\nHorizon: ${horizon}`;
    const content = await callLLM(sys, user, 2200);
    res.json({ thesis: content, generatedAt: new Date().toISOString() });
  } catch (e) { safe(res, e); }
});

// 2) Real-time Deal Pipeline Tracker (webhook-driven alerts + opportunity scoring)
router.post('/pipeline-score', async (req, res) => {
  try {
    const { dealName, stage, value, momentumSignals = [] } = req.body || {};
    if (!dealName) return res.status(400).json({ error: 'dealName required' });
    const sys = 'You are a pipeline-velocity AI. Score the deal 0-100 on closeability, flag movement signals, recommend the next-best-action. Return JSON: { score, momentum, nextAction, riskFlags[] }.';
    const user = `Deal: ${dealName}\nStage: ${stage}\nValue: ${value}\nSignals: ${JSON.stringify(momentumSignals).slice(0, 2000)}`;
    const content = await callLLM(sys, user, 800);
    res.json({ raw: content });
  } catch (e) { safe(res, e); }
});

router.post('/pipeline-webhook', async (req, res) => {
  // TODO: configure credentials — set PIPELINE_WEBHOOK_SECRET to validate inbound
  const secret = process.env.PIPELINE_WEBHOOK_SECRET;
  if (secret && req.headers['x-webhook-secret'] !== secret) {
    return res.status(401).json({ error: 'invalid webhook signature' });
  }
  res.json({ received: true, payload: req.body, at: new Date().toISOString() });
});

// 3) Proposal-to-Deal Workflow Automation
router.post('/proposal-workflow', async (req, res) => {
  try {
    const { clientName, scope, milestones = [], price } = req.body || {};
    if (!clientName || !scope) return res.status(400).json({ error: 'clientName, scope required' });
    const sys = 'You are a deal-ops automation agent. Generate (1) a concise term sheet, (2) acceptance milestone tracker, (3) follow-up cadence (day-1, day-3, day-7, day-14). Return markdown with the three sections.';
    const user = `Client: ${clientName}\nScope: ${scope}\nMilestones: ${JSON.stringify(milestones)}\nPrice: ${price ?? 'TBD'}`;
    const content = await callLLM(sys, user, 1800);
    res.json({ workflow: content });
  } catch (e) { safe(res, e); }
});

// 4) RAG over Investment Literature (lean v0 — no vector DB; in-prompt retrieval)
router.post('/rag-literature', async (req, res) => {
  try {
    const { question, documents = [] } = req.body || {};
    if (!question) return res.status(400).json({ error: 'question required' });
    if (!documents.length) return res.status(400).json({ error: 'documents[] required (passages to ground the answer)' });
    const sys = 'You are a literature-grounded Q&A engine. Answer ONLY from the provided passages. Cite each claim with [doc#].';
    const ctx = documents.slice(0, 8).map((d, i) => `[doc${i + 1}] ${(d || '').slice(0, 1500)}`).join('\n\n');
    const content = await callLLM(sys, `Question: ${question}\n\nPassages:\n${ctx}`, 1500);
    res.json({ answer: content, citations: documents.length });
  } catch (e) { safe(res, e); }
});

// 5) Voice-enabled Strategy Sessions (transcript -> minutes + action items)
router.post('/strategy-minutes', async (req, res) => {
  try {
    const { transcript, attendees = [] } = req.body || {};
    if (!transcript || transcript.length < 50) return res.status(400).json({ error: 'transcript (>=50 chars) required' });
    const sys = 'You are a meeting-notes AI. Produce: (a) 3-line summary, (b) decisions, (c) action items with owner and due date, (d) open questions. Return markdown.';
    const content = await callLLM(sys, `Attendees: ${attendees.join(', ')}\n\nTRANSCRIPT:\n${transcript.slice(0, 10000)}`, 1800);
    res.json({ minutes: content, generatedAt: new Date().toISOString() });
  } catch (e) { safe(res, e); }
});

// 6) Multi-tenant SaaS Mode — white-label registration scaffold
const tenants = new Map();
router.post('/tenants', (req, res) => {
  const { tenantId, displayName, primaryColor, contactEmail } = req.body || {};
  if (!tenantId || !displayName) return res.status(400).json({ error: 'tenantId, displayName required' });
  tenants.set(tenantId, { tenantId, displayName, primaryColor: primaryColor || '#0f172a', contactEmail, createdAt: new Date().toISOString() });
  res.json({ tenant: tenants.get(tenantId) });
});

router.get('/tenants/:id', (req, res) => {
  const t = tenants.get(req.params.id);
  if (!t) return res.status(404).json({ error: 'tenant not found' });
  res.json({ tenant: t });
});

module.exports = router;
