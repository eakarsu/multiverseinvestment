import { FileBarChart } from 'lucide-react'
import AIPage from '../components/AIPage'

export default function AIReportPage() {
  return (
    <AIPage
      title="AI Report Generator"
      description="Generate professional reports, executive summaries, and documentation"
      icon={FileBarChart}
      endpoint="report-generator"
      accentColor="bg-amber-500"
      suggestedPrompts={[
        "Generate a quarterly performance report for consulting division",
        "Create an investment thesis for a SaaS portfolio company",
        "Write an executive summary for a due diligence report",
      ]}
    />
  )
}
