import { TrendingUp } from 'lucide-react'
import AIPage from '../components/AIPage'

export default function AIInvestmentThesisPage() {
  return (
    <AIPage
      title="Investment Thesis Analyzer"
      description="Stress-test investment theses with structured analysis of risks, drivers, and exit scenarios"
      icon={TrendingUp}
      endpoint="investment-thesis-analyzer"
      accentColor="bg-emerald-500"
      suggestedPrompts={[
        "Analyze a thesis for investing in regional logistics infrastructure in Southeast Asia",
        "Stress-test a B2B SaaS roll-up thesis in vertical workflow software",
        "Evaluate a contrarian thesis on European industrial automation",
      ]}
    />
  )
}
