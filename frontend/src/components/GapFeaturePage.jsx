// === Batch 11 Gaps & Frontend Mounts ===
// Generic Gap-feature page: takes a slug and fields, calls /api/gap-<slug>.
import { useState } from 'react'
import { Send, Loader2, Sparkles, Copy, Check } from 'lucide-react'
import NativeAIReport from './NativeAIReport'

const examples = [
  { target: 'Northstar Logistics', sector: 'Regional freight', financials: '{"revenue":12000000,"ebitda":2400000}', kpiName: 'Quarterly revenue', current: '950000', baseline: '1200000', history: '[1100000,1150000,1180000]', clientName: 'Harbor Retail', scope: 'Assess inventory planning and deliver a prioritized implementation plan.', budget: '$50,000', tone: 'professional', role: 'VP Engineering', seniority: 'VP', mustHaves: 'Platform architecture, team leadership, security', attendees: 'Alex Rivera, Morgan Chen', transcript: 'Alex: Review the launch timeline. Morgan: Confirm the budget and owners. Alex: Send a draft plan on Friday.', question: 'What risks and assumptions appear in the supplied passages?', documents: 'Illustrative passage: The annual report describes higher operating costs and a slower renewal cycle. Verify against the actual source.', dealName: 'Harbor Retail expansion', stage: 'proposal', value: '250000', momentumSignals: 'demo-completed, budget-confirmed', milestones: 'kickoff, draft review, delivery', price: '$25,000', fundName: 'Northstar Growth Fund', marketSector: 'Enterprise software', holdings: '[]', horizon: '24 months', provider: 'hubspot', action: 'import', payload: '{"records":[]}', eventTitle: 'Planning review', startsAt: '2026-11-05T15:00:00Z', durationMinutes: '30', currentStage: 'qualification', targetStage: 'proposal', conditions: 'meeting-held, budget-confirmed', name: 'Example statement of work', type: 'SOW', size: '2048', owner: 'owner@example.com', plan: 'pro', amount: '500', interval: 'monthly', tenantId: 'northstar-demo', displayName: 'Northstar Demo', primaryColor: '#0f172a', contactEmail: 'admin@example.com' },
  { target: 'Cedar Health Services', sector: 'Healthcare services', financials: '{"revenue":8500000,"ebitda":900000}', kpiName: 'Customer retention', current: '81', baseline: '88', history: '[91,89,87]', clientName: 'Cedar Health', scope: 'Map onboarding delays and propose a staged service improvement plan.', budget: '$75,000', tone: 'collaborative', role: 'Director of Operations', seniority: 'Director', mustHaves: 'Process improvement, analytics, stakeholder management', attendees: 'Sam Lee, Priya Shah', transcript: 'Sam: Onboarding is taking longer. Priya: We need a baseline and owner for each step. Sam: Review findings next week.', question: 'Which claims in these passages need independent verification?', documents: 'Illustrative passage: Management reports a longer onboarding cycle and planned process changes. Verify against the actual source.', dealName: 'Cedar Health renewal', stage: 'negotiation', value: '175000', momentumSignals: 'stakeholder-review, legal-review', milestones: 'discovery, pilot, handoff', price: '$75,000' },
  { target: 'Summit Components', sector: 'Industrial manufacturing', financials: '{"revenue":21000000,"ebitda":3100000}', kpiName: 'Gross margin', current: '24', baseline: '29', history: '[30,29,27]', clientName: 'Summit Components', scope: 'Evaluate supplier concentration and prepare risk options for leadership.', budget: '$120,000', tone: 'formal', role: 'Head of Supply Chain', seniority: 'Executive', mustHaves: 'Supplier risk, procurement, executive communication', attendees: 'Jamie Patel, Riley Brooks', transcript: 'Jamie: We have a supplier concentration concern. Riley: Compare alternatives and document assumptions. Jamie: Bring options to the next review.', question: 'Summarize the evidence gaps and possible alternatives in these passages.', documents: 'Illustrative passage: The company relies on a small number of suppliers and is considering alternatives. Verify against the actual source.', dealName: 'Summit supplier review', stage: 'qualification', value: '400000', momentumSignals: 'risk-review, executive-sponsor', milestones: 'assessment, options review, final recommendation', price: '$120,000' },
]

export const protectedField = (name) => /(?:Id$|^accessToken$|password|secret|^token$)/i.test(name) && name !== 'tenantId'

export function exampleValue(field, index) {
  const sample = examples[index]
  if (sample[field.name] !== undefined) return sample[field.name]
  const first = examples[0][field.name]
  if (first !== undefined) return first
  if (field.type === 'json') return field.placeholder?.trim().startsWith('[') ? '[]' : '{}'
  if (field.type === 'array') return 'review, follow-up'
  if (field.type === 'number') return String([10, 25, 50][index])
  return `${['Initial', 'Planning', 'Detailed'][index]} ${field.label.toLowerCase()} review for an illustrative business scenario.`
}

export default function GapFeaturePage({ title, description, slug, endpoint, fields = [], aiResultKey }) {
  const apiPath = endpoint || `/api/gap-${slug}`
  const [form, setForm] = useState(() => Object.fromEntries(fields.map(f => [f.name, f.defaultValue || ''])))
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const update = (name, value) => setForm(p => ({ ...p, [name]: value }))
  const [presetNotice, setPresetNotice] = useState('')
  const fillExample = (index) => {
    const missing = fields.filter(f => protectedField(f.name) && !form[f.name]).map(f => f.label)
    setForm(previous => Object.fromEntries(fields.map(field => [field.name, protectedField(field.name) ? previous[field.name] : exampleValue(field, index)])))
    setPresetNotice(missing.length ? `Example fields filled. Supply a real ${missing.join(', ')} before running this workflow.` : 'Example fields filled. Review them, then use Run separately.')
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    try {
      const token = localStorage.getItem('token')
      const body = {}
      for (const f of fields) {
        let v = form[f.name]
        if (f.type === 'array' && typeof v === 'string') v = v.split(',').map(s => s.trim()).filter(Boolean)
        if (f.type === 'json' && typeof v === 'string' && v.trim()) {
          try { v = JSON.parse(v) } catch { /* leave as string */ }
        }
        body[f.name] = v
      }
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setResult(data)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  const responseText = result ? (result[aiResultKey] ?? result.proposal ?? result.report ?? result.spec ?? result.minutes ?? result.explanation ?? result) : ''

  const copy = () => {
    if (!responseText) return
    navigator.clipboard.writeText(typeof responseText === 'string' ? responseText : JSON.stringify(responseText))
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary-500" size={22} />
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div aria-label="Complete examples" className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">Fill example inputs</p>
          <div className="flex flex-wrap gap-2">{['Quick review', 'Planning scenario', 'Detailed review'].map((label, index) => <button key={label} type="button" disabled={loading} onClick={() => fillExample(index)} className="rounded border border-gray-300 bg-white px-3 py-2 text-xs hover:bg-gray-100">{label}</button>)}</div>
          {presetNotice && <p role="status" className="mt-2 text-xs text-gray-600">{presetNotice}</p>}
        </div>
        {fields.map(f => (
          <div key={f.name}>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{f.label}{f.required ? ' *' : ''}</label>
            {f.type === 'textarea' ? (
              <textarea
                name={f.name}
                required={f.required}
                value={form[f.name]}
                onChange={e => update(f.name, e.target.value)}
                placeholder={f.placeholder || ''}
                rows={f.rows || 4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            ) : (
              <input
                name={f.name}
                required={f.required}
                type={f.type === 'number' ? 'number' : 'text'}
                value={form[f.name]}
                onChange={e => update(f.name, e.target.value)}
                placeholder={f.placeholder || ''}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            )}
            {f.hint && <p className="text-[10px] text-gray-400 mt-1">{f.hint}</p>}
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" />Processing...</> : <><Send size={16} />Run</>}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">{error}</div>
      )}

      {result && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Result</span>
            <button onClick={copy} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <NativeAIReport response={result} title={`${title} result`} />
        </div>
      )}
    </div>
  )
}
