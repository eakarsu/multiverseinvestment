import { FileText } from 'lucide-react'
import AIPage from '../components/AIPage'

export default function AIProposalPage() {
  return (
    <AIPage
      title="AI Proposal Assistant"
      description="Generate compelling client proposals tailored to engagement scope and stakeholder needs"
      icon={FileText}
      endpoint="proposal-assistant"
      accentColor="bg-indigo-500"
      suggestedPrompts={[
        "Draft a proposal for a digital transformation engagement at a mid-cap retailer",
        "Generate a proposal outline for an executive search retainer in fintech",
        "Build a proposal for a 12-week post-merger integration project",
      ]}
    />
  )
}
