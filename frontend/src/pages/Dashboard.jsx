import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, FolderKanban, ListTodo, FileText, UserCheck, Contact,
  TrendingUp, DollarSign, Target, Compass, Brain, BarChart3,
  Sparkles, FileBarChart, ArrowUpRight, Briefcase, Filter,
  Receipt, Search, Award, BookOpen, Building2, ShoppingCart,
  UserPlus, Handshake, CalendarClock, CreditCard
} from 'lucide-react'

const cards = [
  { title: 'Clients', desc: 'Manage client relationships', path: '/clients', endpoint: 'clients', icon: Users, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600' },
  { title: 'Projects', desc: 'Track consulting engagements', path: '/projects', endpoint: 'projects', icon: FolderKanban, color: 'bg-green-500', lightColor: 'bg-green-50', textColor: 'text-green-600' },
  { title: 'Tasks', desc: 'Manage execution tasks', path: '/tasks', endpoint: 'tasks', icon: ListTodo, color: 'bg-orange-500', lightColor: 'bg-orange-50', textColor: 'text-orange-600' },
  { title: 'Proposals', desc: 'Business proposals', path: '/proposals', endpoint: 'proposals', icon: FileText, color: 'bg-purple-500', lightColor: 'bg-purple-50', textColor: 'text-purple-600' },
  { title: 'Talent Pool', desc: 'Consultant management', path: '/talent', endpoint: 'talent', icon: UserCheck, color: 'bg-teal-500', lightColor: 'bg-teal-50', textColor: 'text-teal-600' },
  { title: 'Contacts', desc: 'Relationship network', path: '/contacts', endpoint: 'contacts', icon: Contact, color: 'bg-pink-500', lightColor: 'bg-pink-50', textColor: 'text-pink-600' },
  { title: 'Investments', desc: 'Investment opportunities', path: '/investments', endpoint: 'investments', icon: TrendingUp, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
  { title: 'Revenue', desc: 'Financial tracking', path: '/revenue', endpoint: 'revenue', icon: DollarSign, color: 'bg-yellow-500', lightColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
  { title: 'KPIs', desc: 'Performance metrics', path: '/kpis', endpoint: 'kpis', icon: Target, color: 'bg-red-500', lightColor: 'bg-red-50', textColor: 'text-red-600' },
  { title: 'Strategy Plans', desc: 'Strategic advisory', path: '/strategies', endpoint: 'strategies', icon: Compass, color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
  { title: 'Services', desc: 'Service catalog & pricing', path: '/services', endpoint: 'services', icon: Briefcase, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600' },
  { title: 'Pipeline', desc: 'Sales pipeline & deals', path: '/pipeline', endpoint: 'pipeline', icon: Filter, color: 'bg-lime-500', lightColor: 'bg-lime-50', textColor: 'text-lime-600' },
  { title: 'Invoices', desc: 'Billing & payments', path: '/invoices', endpoint: 'invoices', icon: Receipt, color: 'bg-slate-500', lightColor: 'bg-slate-50', textColor: 'text-slate-600' },
  { title: 'Executive Search', desc: 'Leadership recruitment', path: '/executive-search', endpoint: 'executive-search', icon: Search, color: 'bg-sky-500', lightColor: 'bg-sky-50', textColor: 'text-sky-600' },
  { title: 'Case Studies', desc: 'Client success stories', path: '/case-studies', endpoint: 'case-studies', icon: Award, color: 'bg-fuchsia-500', lightColor: 'bg-fuchsia-50', textColor: 'text-fuchsia-600' },
  { title: 'Insights', desc: 'Thought leadership', path: '/insights', endpoint: 'insights', icon: BookOpen, color: 'bg-stone-500', lightColor: 'bg-stone-50', textColor: 'text-stone-600' },
  { title: 'Companies', desc: 'Organization directory', path: '/companies', endpoint: 'companies', icon: Building2, color: 'bg-cyan-500', lightColor: 'bg-cyan-50', textColor: 'text-cyan-600' },
  { title: 'Orders', desc: 'Service orders tracking', path: '/orders', endpoint: 'orders', icon: ShoppingCart, color: 'bg-violet-500', lightColor: 'bg-violet-50', textColor: 'text-violet-600' },
  { title: 'Candidates', desc: 'Recruitment pipeline', path: '/candidates', endpoint: 'candidates', icon: UserPlus, color: 'bg-rose-500', lightColor: 'bg-rose-50', textColor: 'text-rose-600' },
  { title: 'Partners', desc: 'Strategic partnerships', path: '/partners', endpoint: 'partners', icon: Handshake, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
  { title: 'Meetings', desc: 'Schedule & agenda', path: '/meetings', endpoint: 'meetings', icon: CalendarClock, color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
  { title: 'Payments', desc: 'Payment tracking', path: '/payments', endpoint: 'payments', icon: CreditCard, color: 'bg-teal-500', lightColor: 'bg-teal-50', textColor: 'text-teal-600' },
]

const aiCards = [
  { title: 'AI Strategy Advisor', desc: 'AI-powered strategy', path: '/ai/strategy-advisor', icon: Brain, color: 'bg-violet-500', lightColor: 'bg-violet-50', textColor: 'text-violet-600' },
  { title: 'AI Market Analysis', desc: 'AI market research', path: '/ai/market-analysis', icon: BarChart3, color: 'bg-cyan-500', lightColor: 'bg-cyan-50', textColor: 'text-cyan-600' },
  { title: 'AI Talent Matcher', desc: 'AI talent matching', path: '/ai/talent-matcher', icon: Sparkles, color: 'bg-rose-500', lightColor: 'bg-rose-50', textColor: 'text-rose-600' },
  { title: 'AI Report Generator', desc: 'AI report writing', path: '/ai/report-generator', icon: FileBarChart, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({})
  const [stats, setStats] = useState({ clients: 0, projects: 0, revenue: 0, tasks: 0 })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    cards.forEach(card => {
      fetch(`/api/${card.endpoint}`, { headers })
        .then(r => r.json())
        .then(data => {
          const count = Array.isArray(data) ? data.length : 0
          setCounts(prev => ({ ...prev, [card.endpoint]: count }))
          if (card.endpoint === 'clients') setStats(prev => ({ ...prev, clients: count }))
          if (card.endpoint === 'projects') setStats(prev => ({ ...prev, projects: count }))
          if (card.endpoint === 'tasks') setStats(prev => ({ ...prev, tasks: count }))
          if (card.endpoint === 'revenue' && Array.isArray(data)) {
            const total = data.reduce((s, r) => s + (Number(r.amount) || 0), 0)
            setStats(prev => ({ ...prev, revenue: total }))
          }
        })
        .catch(() => {})
    })
  }, [])

  const formatCurrency = (n) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
    return `$${n}`
  }

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Clients', value: stats.clients, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Projects', value: stats.projects, icon: FolderKanban, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Revenue', value: formatCurrency(stats.revenue), icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Open Tasks', value: stats.tasks, icon: ListTodo, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-500">{stat.label}</p>
                <p className="text-2xl font-bold text-dark-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon size={22} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Management & Financial Cards */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-500 uppercase tracking-wider mb-4">Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <button
                key={card.title}
                onClick={() => navigate(card.path)}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${card.lightColor} rounded-lg flex items-center justify-center`}>
                    <Icon size={20} className={card.textColor} />
                  </div>
                  <ArrowUpRight size={16} className="text-dark-300 group-hover:text-dark-500 mt-1" />
                </div>
                <h4 className="font-semibold text-dark-800 text-sm">{card.title}</h4>
                <p className="text-xs text-dark-400 mt-1">{card.desc}</p>
                {counts[card.endpoint] !== undefined && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${card.color}`} />
                    <span className="text-xs font-medium text-dark-600">{counts[card.endpoint]} items</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <h3 className="text-sm font-semibold text-dark-500 uppercase tracking-wider mb-4">AI-Powered Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiCards.map((card) => {
            const Icon = card.icon
            return (
              <button
                key={card.title}
                onClick={() => navigate(card.path)}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 text-left group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 ${card.lightColor} rounded-lg flex items-center justify-center`}>
                      <Icon size={20} className={card.textColor} />
                    </div>
                    <Sparkles size={14} className="text-primary-400 mt-1" />
                  </div>
                  <h4 className="font-semibold text-dark-800 text-sm">{card.title}</h4>
                  <p className="text-xs text-dark-400 mt-1">{card.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
