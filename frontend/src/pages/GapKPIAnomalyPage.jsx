// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapKPIAnomalyPage() {
  return (
    <GapFeaturePage
      title="AI KPI Anomaly Explainer"
      description="KPI anomaly explainer over kpis.js data."
      slug="kpi-anomaly-explainer"
      aiResultKey="explanation"
      fields={[
        { name: 'kpiName', label: 'KPI Name', required: true, placeholder: 'Revenue Q3' },
        { name: 'current', label: 'Current Value', type: 'number', placeholder: '950000' },
        { name: 'baseline', label: 'Baseline Value', type: 'number', placeholder: '1200000' },
        { name: 'history', label: 'History (JSON array)', type: 'json', placeholder: '[1100000, 1150000, 1180000]' },
      ]}
    />
  )
}
