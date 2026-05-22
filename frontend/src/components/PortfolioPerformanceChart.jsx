import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'

export default function PortfolioPerformanceChart() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/custom-views/portfolio-performance')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <div className="p-4 text-sm text-dark-500">Loading portfolio performance...</div>
  if (error) return <div className="p-4 text-sm text-red-600">Failed to load: {error}</div>
  if (!data) return null

  const series = data.series || []
  const all = series.flatMap(d => [d.portfolio, d.benchmark])
  const min = Math.min(...all)
  const max = Math.max(...all)
  const range = Math.max(1, max - min)
  const W = 640
  const H = 200
  const padX = 32
  const padY = 16
  const innerW = W - padX * 2
  const innerH = H - padY * 2
  const x = (i) => padX + (innerW * i) / Math.max(1, series.length - 1)
  const y = (v) => padY + innerH - ((v - min) / range) * innerH

  const linePath = (key) =>
    series.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(d[key]).toFixed(1)}`).join(' ')

  const s = data.summary || {}
  const positive = (s.totalReturnPct || 0) >= 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-dark-800">Portfolio Performance (12 mo)</h3>
          <p className="text-xs text-dark-500 mt-0.5">Portfolio vs. benchmark, indexed to 100</p>
        </div>
        <button
          onClick={load}
          className="p-1.5 rounded-md text-dark-500 hover:text-primary-600 hover:bg-gray-50"
          title="Refresh"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] uppercase tracking-wider text-dark-500">Total Return</p>
          <p className={`text-lg font-semibold flex items-center gap-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {s.totalReturnPct}%
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] uppercase tracking-wider text-dark-500">Benchmark</p>
          <p className="text-lg font-semibold text-dark-800">{s.benchmarkReturnPct}%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] uppercase tracking-wider text-dark-500">Alpha</p>
          <p className={`text-lg font-semibold ${(s.alphaPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {s.alphaPct}%
          </p>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48">
        <rect x="0" y="0" width={W} height={H} fill="#fafafa" rx="6" />
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line
            key={i}
            x1={padX}
            x2={W - padX}
            y1={padY + innerH * p}
            y2={padY + innerH * p}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        <path d={linePath('benchmark')} fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 3" />
        <path d={linePath('portfolio')} fill="none" stroke="#2563eb" strokeWidth="2.5" />
        {series.map((d, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.portfolio)} r="3" fill="#2563eb" />
            <text x={x(i)} y={H - 2} textAnchor="middle" fontSize="9" fill="#6b7280">{d.month}</text>
          </g>
        ))}
      </svg>

      <div className="flex items-center gap-4 mt-3 text-xs text-dark-600">
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-600 inline-block" /> Portfolio</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-gray-400 inline-block" /> Benchmark</span>
        {s.bestMonth && <span className="ml-auto text-dark-500">Best: {s.bestMonth.month} ({s.bestMonth.portfolioReturn}%)</span>}
      </div>
    </div>
  )
}
