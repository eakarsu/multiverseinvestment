// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapDueDiligencePage() {
  return (
    <GapFeaturePage
      title="AI Due-Diligence Analyzer"
      description="Investment thesis / DD analyzer paired with investments.js."
      slug="due-diligence-analyzer"
      aiResultKey="report"
      fields={[
        { name: 'target', label: 'Target Company', required: true },
        { name: 'sector', label: 'Sector' },
        { name: 'financials', label: 'Financials (JSON)', type: 'json', placeholder: '{"revenue": 12000000, "ebitda": 2400000}' },
      ]}
    />
  )
}
