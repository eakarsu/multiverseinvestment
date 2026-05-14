// === Batch 11 Gaps & Frontend Mounts ===
// Generic Gap-feature page: takes a slug and fields, calls /api/gap-<slug>.
import { useState } from 'react'
import { Send, Loader2, Sparkles, Copy, Check } from 'lucide-react'

export default function GapFeaturePage({ title, description, slug, endpoint, fields = [], aiResultKey }) {
  const apiPath = endpoint || `/api/gap-${slug}`
  const [form, setForm] = useState(() => Object.fromEntries(fields.map(f => [f.name, f.defaultValue || ''])))
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const update = (name, value) => setForm(p => ({ ...p, [name]: value }))

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

  const responseText = result ? (result[aiResultKey] || result.proposal || result.report || result.spec || result.minutes || result.explanation || JSON.stringify(result, null, 2)) : ''

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
        {fields.map(f => (
          <div key={f.name}>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{f.label}{f.required ? ' *' : ''}</label>
            {f.type === 'textarea' ? (
              <textarea
                value={form[f.name]}
                onChange={e => update(f.name, e.target.value)}
                placeholder={f.placeholder || ''}
                rows={f.rows || 4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            ) : (
              <input
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
          <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-100 overflow-x-auto">{typeof responseText === 'string' ? responseText : JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
