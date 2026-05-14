# Audit Note - multiverseinvestment

Source: `_AUDIT/reports/batch_11.md` (lines 15-52).

## Original Audit Recommendations

### Missing AI Counterparts
- `/proposal-assistant` for proposal generation (proposals.js exists non-AI).
- `/investment-thesis-analyzer` pairing with investments.js.
- `/talent-brief-generator` for recruitment workflows.

### Missing Non-AI Features
- CRM/workflow automation (no sales-stage, deal-status tracking).
- Document management or contract routing.
- Billing/subscription workflows despite invoices.js presence.

### Custom Feature Suggestions
1. Agentic Investment Thesis Agent (multi-step research loop).
2. Real-time Deal Pipeline Tracker with webhook-driven alerts.
3. Proposal-to-Deal Workflow Automation.
4. RAG over investment literature.
5. Voice-enabled strategy sessions.
6. Multi-tenant SaaS / white-label.

## Implementations Applied

Added 3 AI endpoints to `backend/routes/ai.js` following the existing OpenRouter pattern:
- `POST /api/ai/proposal-assistant`
- `POST /api/ai/investment-thesis-analyzer`
- `POST /api/ai/talent-brief-generator`

Each uses the same `callOpenRouter` helper and a domain-specific system prompt. No new dependencies.

## Backlog (Prioritized)

### High
- CRM/workflow automation: deal-stage tracking on `pipeline.js`, status fields on opportunities.
- Document management module (storage + contract routing).
- Billing/subscription workflows tied to `invoices.js`.

### Medium
- Webhook-driven deal alerts.
- RAG over uploaded investment literature (requires vector DB choice).
- Multi-step investment thesis agent (requires orchestration framework).

### Low / Product Decisions
- Multi-tenant SaaS mode (white-label).
- Voice-enabled strategy sessions (needs ASR provider).

## Apply pass 3 (frontend)

LEFT-AS-IS. `frontend/src/pages/AIProposalPage.jsx`,
`AIInvestmentThesisPage.jsx`, `AITalentBriefPage.jsx` (and the original four
AI pages) all delegate to `frontend/src/components/AIPage.jsx`, which fetches
`/api/ai/${endpoint}` with `Authorization: Bearer ${localStorage.getItem('token')}`
and renders `data.error` (covers 503 no-key). Routes are registered in
`App.jsx` and the sidebar in `components/Layout.jsx`. No FE changes needed.

## Apply pass 4 (mechanical backlog)

LEFT-AS-IS. The backlog has no MECHANICAL items per the apply-pass-4
classification. The High-priority items (CRM/workflow automation,
document management module, billing/subscription workflows) are
NEEDS-PRODUCT-DECISION (require schema and UX design beyond the stateless
BE-endpoint + FE-page recipe). Medium items (webhook deal alerts, RAG over
docs, multi-step thesis agent) are TOO-RISKY (vector DB / orchestration
choice). Low items (white-label SaaS, voice ASR) are NEEDS-CREDS or
NEEDS-PRODUCT-DECISION. Pass 2 already covered the three `/proposal-assistant`,
`/investment-thesis-analyzer`, `/talent-brief-generator` endpoints. No code
changes this pass.
