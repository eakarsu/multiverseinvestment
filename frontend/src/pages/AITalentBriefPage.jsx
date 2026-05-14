import { ClipboardList } from 'lucide-react'
import AIPage from '../components/AIPage'

export default function AITalentBriefPage() {
  return (
    <AIPage
      title="Talent Brief Generator"
      description="Create thorough recruitment briefs covering scope, ideal-candidate profile, and search strategy"
      icon={ClipboardList}
      endpoint="talent-brief-generator"
      accentColor="bg-amber-500"
      suggestedPrompts={[
        "Build a talent brief for a Chief Technology Officer at an early-stage healthtech",
        "Generate a brief for a VP of Operations at a national franchise chain",
        "Draft a talent brief for an interim CFO during a turnaround engagement",
      ]}
    />
  )
}
