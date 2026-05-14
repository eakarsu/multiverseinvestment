import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, FolderKanban, ListTodo, FileText,
  UserCheck, Contact, TrendingUp, DollarSign, Target,
  Compass, Brain, BarChart3, Sparkles, FileBarChart,
  LogOut, ChevronRight, Briefcase, GitBranch, Receipt,
  Search, Award, BookOpen, Building2, ShoppingCart, UserPlus,
  Handshake, CalendarClock, CreditCard, ClipboardList
} from 'lucide-react'

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    label: 'CRM',
    items: [
      { name: 'Clients', path: '/clients', icon: Users },
      { name: 'Companies', path: '/companies', icon: Building2 },
      { name: 'Contacts', path: '/contacts', icon: Contact },
      { name: 'Partners', path: '/partners', icon: Handshake },
      { name: 'Meetings', path: '/meetings', icon: CalendarClock },
    ]
  },
  {
    label: 'MANAGEMENT',
    items: [
      { name: 'Projects', path: '/projects', icon: FolderKanban },
      { name: 'Tasks', path: '/tasks', icon: ListTodo },
      { name: 'Proposals', path: '/proposals', icon: FileText },
      { name: 'Orders', path: '/orders', icon: ShoppingCart },
      { name: 'Pipeline', path: '/pipeline', icon: GitBranch },
    ]
  },
  {
    label: 'TALENT & SEARCH',
    items: [
      { name: 'Talent Pool', path: '/talent', icon: UserCheck },
      { name: 'Candidates', path: '/candidates', icon: UserPlus },
      { name: 'Executive Search', path: '/executive-search', icon: Search },
    ]
  },
  {
    label: 'SERVICES & BILLING',
    items: [
      { name: 'Services', path: '/services', icon: Briefcase },
      { name: 'Invoices', path: '/invoices', icon: Receipt },
      { name: 'Payments', path: '/payments', icon: CreditCard },
    ]
  },
  {
    label: 'FINANCIAL',
    items: [
      { name: 'Investments', path: '/investments', icon: TrendingUp },
      { name: 'Revenue', path: '/revenue', icon: DollarSign },
      { name: 'KPIs', path: '/kpis', icon: Target },
    ]
  },
  {
    label: 'STRATEGY',
    items: [
      { name: 'Strategy Plans', path: '/strategies', icon: Compass },
    ]
  },
  {
    label: 'KNOWLEDGE',
    items: [
      { name: 'Case Studies', path: '/case-studies', icon: Award },
      { name: 'Insights', path: '/insights', icon: BookOpen },
    ]
  },
  {
    label: 'AI TOOLS',
    items: [
      { name: 'Strategy Advisor', path: '/ai/strategy-advisor', icon: Brain },
      { name: 'Market Analysis', path: '/ai/market-analysis', icon: BarChart3 },
      { name: 'Talent Matcher', path: '/ai/talent-matcher', icon: Sparkles },
      { name: 'Report Generator', path: '/ai/report-generator', icon: FileBarChart },
      { name: 'Proposal Assistant', path: '/ai/proposal-assistant', icon: FileText },
      { name: 'Investment Thesis', path: '/ai/investment-thesis-analyzer', icon: TrendingUp },
      { name: 'Talent Brief', path: '/ai/talent-brief-generator', icon: ClipboardList },
    ]
  },
  // === Batch 11 Gaps & Frontend Mounts ===
  {
    label: 'BATCH 11 GAPS',
    items: [
      { name: 'Proposal Writing', path: '/gap/proposal-writing', icon: FileText },
      { name: 'Due Diligence', path: '/gap/due-diligence', icon: TrendingUp },
      { name: 'Role Spec', path: '/gap/role-spec', icon: ClipboardList },
      { name: 'Meeting Summarizer', path: '/gap/meeting-summarizer', icon: CalendarClock },
      { name: 'KPI Anomaly', path: '/gap/kpi-anomaly', icon: BarChart3 },
      { name: 'Deal-Stage Auto', path: '/gap/deal-stage', icon: GitBranch },
      { name: 'Doc Management', path: '/gap/document-management', icon: FileText },
      { name: 'Subscriptions', path: '/gap/subscription-billing', icon: CreditCard },
      { name: 'CRM Sync', path: '/gap/crm-sync', icon: Users },
      { name: 'Calendar Sync', path: '/gap/calendar-integration', icon: CalendarClock },
    ]
  },
  {
    label: 'CFS EXTRAS',
    items: [
      { name: 'Pipeline Tracker', path: '/cfs/pipeline-tracker', icon: GitBranch },
      { name: 'Proposal Workflow', path: '/cfs/proposal-workflow', icon: FileText },
      { name: 'RAG Literature', path: '/cfs/rag-literature', icon: BookOpen },
      { name: 'Voice Strategy', path: '/cfs/voice-strategy', icon: Sparkles },
      { name: 'Multi-Tenant', path: '/cfs/multi-tenant', icon: Building2 },
    ]
  }
]

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/clients': 'Client Management',
  '/projects': 'Project Management',
  '/tasks': 'Task Management',
  '/proposals': 'Proposals',
  '/talent': 'Talent Pool',
  '/contacts': 'Contacts',
  '/investments': 'Investments',
  '/revenue': 'Revenue Tracking',
  '/kpis': 'KPI Dashboard',
  '/strategies': 'Strategy Plans',
  '/services': 'Services',
  '/pipeline': 'Sales Pipeline',
  '/invoices': 'Invoices',
  '/executive-search': 'Executive Search',
  '/case-studies': 'Case Studies',
  '/insights': 'Insights',
  '/companies': 'Companies',
  '/orders': 'Orders',
  '/candidates': 'Candidates',
  '/partners': 'Partners',
  '/meetings': 'Meetings',
  '/payments': 'Payments',
  '/ai/strategy-advisor': 'AI Strategy Advisor',
  '/ai/market-analysis': 'AI Market Analysis',
  '/ai/talent-matcher': 'AI Talent Matcher',
  '/ai/report-generator': 'AI Report Generator',
  '/ai/proposal-assistant': 'AI Proposal Assistant',
  '/ai/investment-thesis-analyzer': 'AI Investment Thesis Analyzer',
  '/ai/talent-brief-generator': 'AI Talent Brief Generator',
}

export default function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-dark-700">
          <div
            className="cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <h1 className="text-xl font-bold tracking-wider text-white">MULTIVERSE</h1>
            <p className="text-xs text-dark-400 mt-1 tracking-wide">Consulting Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="text-[10px] font-semibold text-dark-500 tracking-widest px-3 mb-2">
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 transition-all ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                        : 'text-dark-400 hover:text-white hover:bg-dark-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="flex-1 text-left">{item.name}</span>
                    {isActive && <ChevronRight size={14} />}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs text-dark-500 truncate">admin@multiverse.com</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-dark-500 hover:text-red-400 hover:bg-dark-800"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 flex-shrink-0">
          <h2 className="text-lg font-semibold text-dark-800">
            {pageTitles[location.pathname] || 'Multiverse'}
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
