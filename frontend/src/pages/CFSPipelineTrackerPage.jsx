// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function CFSPipelineTrackerPage() {
  return (
    <GapFeaturePage
      title="Real-time Deal Pipeline Tracker"
      description="Webhook-driven alerts + opportunity scoring."
      endpoint="/api/ai-extras/pipeline-score"
      aiResultKey="raw"
      fields={[
        { name: 'dealName', label: 'Deal Name', required: true },
        { name: 'stage', label: 'Stage', placeholder: 'proposal / negotiation / closed' },
        { name: 'value', label: 'Value', type: 'number', placeholder: '250000' },
        { name: 'momentumSignals', label: 'Momentum Signals (comma-separated)', type: 'array', placeholder: 'demo-completed, budget-confirmed' },
      ]}
    />
  )
}
