import { useState, useEffect } from 'react'
import { Plus, Search, X, Edit3, Trash2, Eye, ChevronDown } from 'lucide-react'

const statusColors = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-green-100 text-green-700',
  received: 'bg-green-100 text-green-700',
  available: 'bg-green-100 text-green-700',
  approved: 'bg-green-100 text-green-700',
  won: 'bg-green-100 text-green-700',
  up: 'bg-green-100 text-green-700',
  'in-progress': 'bg-yellow-100 text-yellow-700',
  pending: 'bg-yellow-100 text-yellow-700',
  'in-review': 'bg-purple-100 text-purple-700',
  evaluating: 'bg-blue-100 text-blue-700',
  planning: 'bg-blue-100 text-blue-700',
  draft: 'bg-blue-100 text-blue-700',
  invoiced: 'bg-blue-100 text-blue-700',
  stable: 'bg-blue-100 text-blue-700',
  inactive: 'bg-red-100 text-red-700',
  blocked: 'bg-red-100 text-red-700',
  unavailable: 'bg-red-100 text-red-700',
  lost: 'bg-red-100 text-red-700',
  passed: 'bg-red-100 text-red-700',
  down: 'bg-red-100 text-red-700',
  prospect: 'bg-gray-100 text-gray-700',
  'on-hold': 'bg-orange-100 text-orange-700',
  assigned: 'bg-indigo-100 text-indigo-700',
  exited: 'bg-gray-100 text-gray-700',
  submitted: 'bg-indigo-100 text-indigo-700',
  partner: 'bg-purple-100 text-purple-700',
  vendor: 'bg-orange-100 text-orange-700',
  client: 'bg-green-100 text-green-700',
}

function StatusBadge({ value }) {
  if (!value) return null
  const color = statusColors[value.toLowerCase()] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${color}`}>
      {value}
    </span>
  )
}

function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl ${wide ? 'max-w-3xl' : 'max-w-lg'} w-full max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-dark-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-dark-400">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function FormField({ field, value, onChange }) {
  const baseClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"

  if (field.type === 'select') {
    return (
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1">{field.label}</label>
        <div className="relative">
          <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={baseClass + ' appearance-none'}>
            <option value="">Select {field.label}</option>
            {field.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
        </div>
      </div>
    )
  }
  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1">{field.label}</label>
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3} className={baseClass} />
      </div>
    )
  }
  return (
    <div>
      <label className="block text-sm font-medium text-dark-700 mb-1">{field.label}</label>
      <input
        type={field.type || 'text'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
        step={field.type === 'number' ? 'any' : undefined}
      />
    </div>
  )
}

export default function CrudPage({ title, endpoint, fields, columns }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [formData, setFormData] = useState({})

  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/${endpoint}`, { headers })
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const filtered = items.filter(item =>
    search === '' || Object.values(item).some(v =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  )

  const openCreate = () => {
    setEditItem(null)
    setFormData({})
    setShowForm(true)
  }

  const openEdit = (item) => {
    setEditItem(item)
    const data = {}
    fields.forEach(f => { data[f.key] = item[f.key] || '' })
    setFormData(data)
    setShowDetail(false)
    setShowForm(true)
  }

  const openDetail = (item) => {
    setSelectedItem(item)
    setShowDetail(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editItem ? `/api/${endpoint}/${editItem.id}` : `/api/${endpoint}`
      const method = editItem ? 'PUT' : 'POST'
      await fetch(url, { method, headers, body: JSON.stringify(formData) })
      setShowForm(false)
      fetchItems()
    } catch (err) {
      alert('Error saving: ' + err.message)
    }
  }

  const handleDelete = async (item) => {
    if (!confirm(`Delete this ${title.slice(0, -1).toLowerCase()}?`)) return
    try {
      await fetch(`/api/${endpoint}/${item.id}`, { method: 'DELETE', headers })
      setShowDetail(false)
      fetchItems()
    } catch (err) {
      alert('Error deleting: ' + err.message)
    }
  }

  const isStatusField = (key) => ['status', 'priority', 'risk_level', 'relationship', 'trend'].includes(key)

  const renderCellValue = (item, col) => {
    const val = item[col.key]
    if (val === null || val === undefined) return '-'
    if (isStatusField(col.key)) return <StatusBadge value={val} />
    if (col.key === 'amount' || col.key === 'budget' || col.key === 'value' || col.key === 'revenue' || col.key === 'hourly_rate' || col.key === 'target_return') {
      const num = Number(val)
      return isNaN(num) ? val : `$${num.toLocaleString()}`
    }
    return String(val).length > 40 ? String(val).substring(0, 40) + '...' : String(val)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-800">{title}</h1>
          <p className="text-sm text-dark-500 mt-1">{filtered.length} total records</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm"
        >
          <Plus size={18} />
          New {title.replace(/s$/, '').replace(/ies$/, 'y')}
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {columns.map(col => (
                  <th key={col.key} className="text-left px-6 py-3.5 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-dark-400 text-sm">
                    No records found
                  </td>
                </tr>
              ) : filtered.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={() => openDetail(item)}
                  className={`border-b border-gray-50 cursor-pointer hover:bg-primary-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-3.5 text-sm text-dark-700">
                      {renderCellValue(item, col)}
                    </td>
                  ))}
                  <td className="px-3 py-3.5">
                    <Eye size={16} className="text-dark-300" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={showDetail} onClose={() => setShowDetail(false)} title="Details" wide>
        {selectedItem && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {fields.map(f => (
                <div key={f.key} className={f.type === 'textarea' ? 'col-span-2' : ''}>
                  <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-1">{f.label}</p>
                  {isStatusField(f.key) ? (
                    <StatusBadge value={selectedItem[f.key]} />
                  ) : (
                    <p className="text-sm text-dark-800 font-medium">
                      {selectedItem[f.key] !== null && selectedItem[f.key] !== undefined ? String(selectedItem[f.key]) : '-'}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => openEdit(selectedItem)}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(selectedItem)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create/Edit Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title={editItem ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map(f => (
              <div key={f.key} className={f.type === 'textarea' ? 'col-span-2' : ''}>
                <FormField
                  field={f}
                  value={formData[f.key]}
                  onChange={(val) => setFormData(prev => ({ ...prev, [f.key]: val }))}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              {editItem ? 'Save Changes' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-100 hover:bg-gray-200 text-dark-700 px-6 py-2 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
