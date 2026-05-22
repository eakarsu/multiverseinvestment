import { useEffect, useState } from 'react'
import { Plus, Edit3, Trash2, Check, X, RefreshCw } from 'lucide-react'

const BLANK = {
  name: '',
  metric: 'position_weight',
  operator: '<=',
  threshold: 10,
  action: 'flag',
  enabled: true,
  notes: '',
}

const METRICS = ['position_weight', 'sector_weight', 'cash_weight', 'drawdown_pct', 'volatility', 'pe_ratio']
const OPERATORS = ['<=', '>=', '<', '>', '=']
const ACTIONS = ['flag', 'alert', 'rebalance', 'review', 'block']

export default function InvestmentRulesEditor() {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/custom-views/rules')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setRules(json.rules || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const startCreate = () => {
    setForm(BLANK)
    setCreating(true)
    setEditingId(null)
  }
  const startEdit = (rule) => {
    setForm({ ...rule })
    setEditingId(rule.id)
    setCreating(false)
  }
  const cancel = () => {
    setEditingId(null)
    setCreating(false)
    setForm(BLANK)
  }

  const save = async () => {
    try {
      const payload = {
        ...form,
        threshold: Number(form.threshold),
        enabled: !!form.enabled,
      }
      let res
      if (creating) {
        res = await fetch('/api/custom-views/rules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch(`/api/custom-views/rules/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await load()
      cancel()
    } catch (e) {
      setError(e.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this rule?')) return
    try {
      const res = await fetch(`/api/custom-views/rules/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-dark-800">Investment Rules</h3>
          <p className="text-xs text-dark-500 mt-0.5">CRUD rules that govern portfolio constraints</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-1.5 rounded-md text-dark-500 hover:text-primary-600 hover:bg-gray-50"
            title="Refresh"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-primary-600 text-white hover:bg-primary-700"
          >
            <Plus size={14} /> New Rule
          </button>
        </div>
      </div>

      {error && <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">{error}</div>}

      {(creating || editingId !== null) && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-dark-700 mb-2">{creating ? 'New Rule' : `Edit Rule #${editingId}`}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="col-span-2 md:col-span-3 px-2 py-1.5 text-xs border border-gray-300 rounded"
            />
            <select
              value={form.metric}
              onChange={(e) => setForm({ ...form, metric: e.target.value })}
              className="px-2 py-1.5 text-xs border border-gray-300 rounded"
            >
              {METRICS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              value={form.operator}
              onChange={(e) => setForm({ ...form, operator: e.target.value })}
              className="px-2 py-1.5 text-xs border border-gray-300 rounded"
            >
              {OPERATORS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <input
              type="number"
              placeholder="Threshold"
              value={form.threshold}
              onChange={(e) => setForm({ ...form, threshold: e.target.value })}
              className="px-2 py-1.5 text-xs border border-gray-300 rounded"
            />
            <select
              value={form.action}
              onChange={(e) => setForm({ ...form, action: e.target.value })}
              className="px-2 py-1.5 text-xs border border-gray-300 rounded"
            >
              {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <label className="flex items-center gap-1.5 text-xs text-dark-700">
              <input
                type="checkbox"
                checked={!!form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              />
              Enabled
            </label>
            <input
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="col-span-2 md:col-span-1 px-2 py-1.5 text-xs border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={save}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              <Check size={12} /> Save
            </button>
            <button
              onClick={cancel}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-md border border-gray-300 text-dark-700 hover:bg-gray-100"
            >
              <X size={12} /> Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-dark-500">Loading rules...</p>
      ) : rules.length === 0 ? (
        <p className="text-sm text-dark-500">No rules yet. Create one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-dark-500 border-b border-gray-200">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Metric</th>
                <th className="py-2 pr-3">Rule</th>
                <th className="py-2 pr-3">Action</th>
                <th className="py-2 pr-3">Enabled</th>
                <th className="py-2 pr-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map(r => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="py-2 pr-3 font-medium text-dark-800">{r.name}</td>
                  <td className="py-2 pr-3 text-dark-600">{r.metric}</td>
                  <td className="py-2 pr-3 text-dark-600">{r.operator} {r.threshold}</td>
                  <td className="py-2 pr-3">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium uppercase">
                      {r.action}
                    </span>
                  </td>
                  <td className="py-2 pr-3">
                    {r.enabled
                      ? <span className="text-green-600 font-medium">Yes</span>
                      : <span className="text-gray-400">No</span>}
                  </td>
                  <td className="py-2 pr-3 text-right">
                    <button
                      onClick={() => startEdit(r)}
                      className="p-1 text-dark-500 hover:text-primary-600"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => remove(r.id)}
                      className="p-1 text-dark-500 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
