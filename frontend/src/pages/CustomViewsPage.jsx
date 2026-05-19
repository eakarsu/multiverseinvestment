import PortfolioPerformanceChart from '../components/PortfolioPerformanceChart'
import SectorAllocationHeatmap from '../components/SectorAllocationHeatmap'
import InvestmentStatementPDF from '../components/InvestmentStatementPDF'
import InvestmentRulesEditor from '../components/InvestmentRulesEditor'

export default function CustomViewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-dark-800">Invest Views</h1>
        <p className="text-sm text-dark-500 mt-1">
          Custom investment views: performance, allocation, statements, and rule management.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PortfolioPerformanceChart />
        <SectorAllocationHeatmap />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <InvestmentStatementPDF />
        <InvestmentRulesEditor />
      </div>
    </div>
  )
}
