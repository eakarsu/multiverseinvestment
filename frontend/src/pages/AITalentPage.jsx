import { Sparkles } from 'lucide-react'
import AIPage from '../components/AIPage'

export default function AITalentPage() {
  return (
    <AIPage
      title="AI Talent Matcher"
      description="AI-driven talent matching, team building, and skill gap analysis"
      icon={Sparkles}
      endpoint="talent-matcher"
      accentColor="bg-rose-500"
      suggestedPrompts={[
        "Find ideal candidates for a Chief Digital Officer role",
        "Build a team for a data analytics transformation project",
        "Assess skill gaps for a cloud migration initiative",
      ]}
    />
  )
}
