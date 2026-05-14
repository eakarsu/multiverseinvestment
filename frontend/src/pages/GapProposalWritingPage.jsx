// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapProposalWritingPage() {
  return (
    <GapFeaturePage
      title="AI Proposal Writing Assistant"
      description="Draft complete proposals tied to proposals.js records."
      slug="proposal-writing-assistant"
      aiResultKey="proposal"
      fields={[
        { name: 'clientName', label: 'Client Name', required: true, placeholder: 'Acme Corp' },
        { name: 'scope', label: 'Scope', type: 'textarea', required: true, placeholder: 'Describe the work to be performed' },
        { name: 'budget', label: 'Budget', placeholder: '$50,000' },
        { name: 'tone', label: 'Tone', placeholder: 'professional / persuasive / formal', defaultValue: 'professional' },
      ]}
    />
  )
}
