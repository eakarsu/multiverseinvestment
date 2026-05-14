// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function CFSProposalWorkflowPage() {
  return (
    <GapFeaturePage
      title="Proposal-to-Deal Workflow Automation"
      description="Term sheet, milestone tracker, follow-up cadence."
      endpoint="/api/ai-extras/proposal-workflow"
      aiResultKey="workflow"
      fields={[
        { name: 'clientName', label: 'Client Name', required: true },
        { name: 'scope', label: 'Scope', type: 'textarea', required: true, rows: 3 },
        { name: 'milestones', label: 'Milestones (comma-separated)', type: 'array', placeholder: 'kickoff, review, delivery' },
        { name: 'price', label: 'Price', placeholder: '$25,000' },
      ]}
    />
  )
}
