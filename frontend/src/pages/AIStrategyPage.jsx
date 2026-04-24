import { Brain } from 'lucide-react'
import AIPage from '../components/AIPage'

export default function AIStrategyPage() {
  return (
    <AIPage
      title="AI Strategy Advisor"
      description="Leverage AI to develop comprehensive business strategies and frameworks"
      icon={Brain}
      endpoint="strategy-advisor"
      accentColor="bg-violet-500"
      suggestedPrompts={[
        "Develop a digital transformation strategy for a mid-size retailer",
        "Create a market entry plan for Southeast Asian fintech",
        "Design a cost optimization framework for a manufacturing company",
      ]}
    />
  )
}
