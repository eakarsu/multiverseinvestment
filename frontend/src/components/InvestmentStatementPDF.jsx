import { useState } from 'react'
import { FileText, Download, ExternalLink } from 'lucide-react'

export default function InvestmentStatementPDF() {
  const [account, setAccount] = useState('MV-000123')
  const [period, setPeriod] = useState('2026-Q1')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const url = `/api/custom-views/statement-pdf?account=${encodeURIComponent(account)}&period=${encodeURIComponent(period)}`

  const handleDownload = async () => {
    setBusy(true)
    setStatus('')
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const objUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objUrl
      a.download = `statement-${account}-${period}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objUrl)
      setStatus('PDF downloaded.')
    } catch (e) {
      setStatus('Download failed: ' + e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={18} className="text-primary-600" />
        <h3 className="text-sm font-semibold text-dark-800">Investment Statement (PDF)</h3>
      </div>
      <p className="text-xs text-dark-500 mb-4">
        Generate a printable account statement on demand.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-dark-700 mb-1">Account</label>
          <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            placeholder="MV-000123"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-dark-700 mb-1">Period</label>
          <input
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            placeholder="2026-Q1"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleDownload}
          disabled={busy}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
        >
          <Download size={14} />
          {busy ? 'Generating...' : 'Download PDF'}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 text-dark-700 hover:bg-gray-50"
        >
          <ExternalLink size={14} />
          Open in new tab
        </a>
        {status && <span className="text-xs text-dark-500 ml-2">{status}</span>}
      </div>
    </div>
  )
}
