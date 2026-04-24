import { BarChart3 } from 'lucide-react'
import AIPage from '../components/AIPage'

export default function AIMarketPage() {
  return (
    <AIPage
      title="AI Market Analysis"
      description="AI-powered market research, competitive analysis, and opportunity assessment"
      icon={BarChart3}
      endpoint="market-analysis"
      accentColor="bg-cyan-500"
      suggestedPrompts={[
        "Analyze the current state of the AI/ML consulting market",
        "Evaluate competitive landscape in healthcare technology",
        "Assess market opportunities in sustainable energy consulting",
      ]}
    />
  )
}
