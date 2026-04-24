import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import ClientsPage from './pages/ClientsPage'
import ProjectsPage from './pages/ProjectsPage'
import TalentPage from './pages/TalentPage'
import InvestmentsPage from './pages/InvestmentsPage'
import StrategiesPage from './pages/StrategiesPage'
import TasksPage from './pages/TasksPage'
import ProposalsPage from './pages/ProposalsPage'
import ContactsPage from './pages/ContactsPage'
import RevenuePage from './pages/RevenuePage'
import KPIsPage from './pages/KPIsPage'
import AIStrategyPage from './pages/AIStrategyPage'
import AIMarketPage from './pages/AIMarketPage'
import AITalentPage from './pages/AITalentPage'
import AIReportPage from './pages/AIReportPage'
import ServicesPage from './pages/ServicesPage'
import PipelinePage from './pages/PipelinePage'
import InvoicesPage from './pages/InvoicesPage'
import ExecutiveSearchPage from './pages/ExecutiveSearchPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import InsightsPage from './pages/InsightsPage'
import CompaniesPage from './pages/CompaniesPage'
import OrdersPage from './pages/OrdersPage'
import CandidatesPage from './pages/CandidatesPage'
import PartnersPage from './pages/PartnersPage'
import MeetingsPage from './pages/MeetingsPage'
import PaymentsPage from './pages/PaymentsPage'

// Public pages
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import ValueDeliverySystemPage from './pages/public/ValueDeliverySystemPage'
import ServicesPublicPage from './pages/public/ServicesPublicPage'
import IndustriesPage from './pages/public/IndustriesPage'
import MarketsPage from './pages/public/MarketsPage'
import ContactPage from './pages/public/ContactPage'
import PartnershipsPublicPage from './pages/public/PartnershipsPublicPage'
import JoinTalentPage from './pages/public/JoinTalentPage'
import InsightsPublicPage from './pages/public/InsightsPublicPage'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public website pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/value-delivery-system" element={<ValueDeliverySystemPage />} />
      <Route path="/public/services" element={<ServicesPublicPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/markets" element={<MarketsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/public/partnerships" element={<PartnershipsPublicPage />} />
      <Route path="/join-talent-network" element={<JoinTalentPage />} />
      <Route path="/public/insights" element={<InsightsPublicPage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected dashboard pages */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/clients" element={<ProtectedRoute><Layout><ClientsPage /></Layout></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Layout><ProjectsPage /></Layout></ProtectedRoute>} />
      <Route path="/talent" element={<ProtectedRoute><Layout><TalentPage /></Layout></ProtectedRoute>} />
      <Route path="/investments" element={<ProtectedRoute><Layout><InvestmentsPage /></Layout></ProtectedRoute>} />
      <Route path="/strategies" element={<ProtectedRoute><Layout><StrategiesPage /></Layout></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Layout><TasksPage /></Layout></ProtectedRoute>} />
      <Route path="/proposals" element={<ProtectedRoute><Layout><ProposalsPage /></Layout></ProtectedRoute>} />
      <Route path="/contacts" element={<ProtectedRoute><Layout><ContactsPage /></Layout></ProtectedRoute>} />
      <Route path="/revenue" element={<ProtectedRoute><Layout><RevenuePage /></Layout></ProtectedRoute>} />
      <Route path="/kpis" element={<ProtectedRoute><Layout><KPIsPage /></Layout></ProtectedRoute>} />
      <Route path="/ai/strategy-advisor" element={<ProtectedRoute><Layout><AIStrategyPage /></Layout></ProtectedRoute>} />
      <Route path="/ai/market-analysis" element={<ProtectedRoute><Layout><AIMarketPage /></Layout></ProtectedRoute>} />
      <Route path="/ai/talent-matcher" element={<ProtectedRoute><Layout><AITalentPage /></Layout></ProtectedRoute>} />
      <Route path="/ai/report-generator" element={<ProtectedRoute><Layout><AIReportPage /></Layout></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><Layout><ServicesPage /></Layout></ProtectedRoute>} />
      <Route path="/pipeline" element={<ProtectedRoute><Layout><PipelinePage /></Layout></ProtectedRoute>} />
      <Route path="/invoices" element={<ProtectedRoute><Layout><InvoicesPage /></Layout></ProtectedRoute>} />
      <Route path="/executive-search" element={<ProtectedRoute><Layout><ExecutiveSearchPage /></Layout></ProtectedRoute>} />
      <Route path="/case-studies" element={<ProtectedRoute><Layout><CaseStudiesPage /></Layout></ProtectedRoute>} />
      <Route path="/insights" element={<ProtectedRoute><Layout><InsightsPage /></Layout></ProtectedRoute>} />
      <Route path="/companies" element={<ProtectedRoute><Layout><CompaniesPage /></Layout></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Layout><OrdersPage /></Layout></ProtectedRoute>} />
      <Route path="/candidates" element={<ProtectedRoute><Layout><CandidatesPage /></Layout></ProtectedRoute>} />
      <Route path="/partners" element={<ProtectedRoute><Layout><PartnersPage /></Layout></ProtectedRoute>} />
      <Route path="/meetings" element={<ProtectedRoute><Layout><MeetingsPage /></Layout></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><Layout><PaymentsPage /></Layout></ProtectedRoute>} />
    </Routes>
  )
}
