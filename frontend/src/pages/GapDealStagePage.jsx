// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapDealStagePage() {
  return (
    <GapFeaturePage
      title="Deal-Stage Automation"
      description="Workflow routing for pipeline progression."
      slug="deal-stage-automation"
      aiResultKey="rule"
      fields={[
        { name: 'dealId', label: 'Deal ID', required: true },
        { name: 'currentStage', label: 'Current Stage', placeholder: 'qualification' },
        { name: 'targetStage', label: 'Target Stage', required: true, placeholder: 'proposal' },
        { name: 'conditions', label: 'Conditions (comma-separated)', type: 'array', placeholder: 'meeting-held, budget-confirmed' },
      ]}
    />
  )
}
