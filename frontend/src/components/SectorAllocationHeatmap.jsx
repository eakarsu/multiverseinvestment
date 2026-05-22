import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

function colorFor(pct, max) {
  // simple blue scale 0..max
  const t = Math.min(1, pct / Math.max(0.001, max))
  // light to dark blue
  const r = Math.round(239 - 199 * t)
  const g = Math.round(246 - 178 * t)
  const b = Math.round(255 - 70 * t)
  return `rgb(${r}, ${g}, ${b})`
}

export default function SectorAllocationHeatmap() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/custom-views/sector-allocation')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setData(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <div className="p-4 text-sm text-dark-500">Loading sector allocation...</div>
  if (error) return <div className="p-4 text-sm text-red-600">Failed to load: {error}</div>
  if (!data) return null

  const { sectors = [], regions = [], cells = [], sectorTotals = [] } = data
  const max = Math.max(...cells.map(c => c.allocationPct))

  const cellFor = (sector, region) =>
    cells.find(c => c.sector === sector && c.region === region)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-dark-800">Sector Allocation Heatmap</h3>
          <p className="text-xs text-dark-500 mt-0.5">Allocation % by sector and region</p>
        </div>
        <button
          onClick={load}
          className="p-1.5 rounded-md text-dark-500 hover:text-primary-600 hover:bg-gray-50"
          title="Refresh"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="text-xs w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-dark-500 font-medium">Sector</th>
              {regions.map(r => (
                <th key={r} className="p-2 text-center text-dark-500 font-medium">{r}</th>
              ))}
              <th className="p-2 text-right text-dark-500 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {sectors.map(sector => {
              const total = sectorTotals.find(t => t.sector === sector)?.totalPct || 0
              return (
                <tr key={sector}>
                  <td className="p-2 text-dark-700 font-medium whitespace-nowrap">{sector}</td>
                  {regions.map(region => {
                    const c = cellFor(sector, region)
                    const pct = c ? c.allocationPct : 0
                    return (
                      <td key={region} className="p-1">
                        <div
                          className="rounded-md py-2 px-1 text-center text-[11px] font-medium"
                          style={{
                            backgroundColor: colorFor(pct, max),
                            color: pct > max * 0.55 ? '#fff' : '#1e3a8a',
                          }}
                          title={`${sector} / ${region}: ${pct}%`}
                        >
                          {pct}%
                        </div>
                      </td>
                    )
                  })}
                  <td className="p-2 text-right font-semibold text-dark-800">{total}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-3 text-[10px] text-dark-500">
        <span>Low</span>
        <div
          className="flex-1 h-2 rounded"
          style={{ background: `linear-gradient(to right, ${colorFor(0, max)}, ${colorFor(max, max)})` }}
        />
        <span>High</span>
      </div>
    </div>
  )
}
