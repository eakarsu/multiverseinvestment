import { Link } from 'react-router-dom'
import {
  ArrowRight, Search, PenTool, Hammer, Rocket, BarChart3,
  Cpu, CheckCircle2, Briefcase, Clock, Users, Zap,
  FileText, Target, Lightbulb, Settings, TrendingUp, Award
} from 'lucide-react'
import PublicLayout from '../../components/PublicLayout'

const phases = [
  {
    number: '01',
    name: 'Discovery',
    tagline: 'Understand the landscape',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    description: 'We begin every engagement with a deep diagnostic of your current state. Through stakeholder interviews, data analysis, and market assessment, we build a comprehensive picture of challenges, opportunities, and untapped potential.',
    deliverables: [
      'Stakeholder interview synthesis',
      'Current state assessment report',
      'Market and competitive landscape analysis',
      'Opportunity identification matrix',
      'Risk and constraint mapping',
    ],
  },
  {
    number: '02',
    name: 'Design',
    tagline: 'Architect the solution',
    icon: PenTool,
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
    description: 'With deep understanding established, we architect a tailored solution framework. This phase translates insights into a clear strategy with defined milestones, success metrics, and a phased roadmap that aligns with your business objectives.',
    deliverables: [
      'Strategic framework and recommendations',
      'Solution architecture document',
      'Implementation roadmap with milestones',
      'KPI and success metric definitions',
      'Investment and resource requirements',
    ],
  },
  {
    number: '03',
    name: 'Build',
    tagline: 'Assemble the engine',
    icon: Hammer,
    color: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
    description: 'We assemble the right team, tools, and capabilities needed for successful execution. This includes talent sourcing, technology selection, process design, and capability development to ensure readiness for deployment.',
    deliverables: [
      'Team assembly and role assignments',
      'Resource and budget allocation plan',
      'Process and workflow design',
      'Technology and tooling setup',
      'Capability development programs',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    tagline: 'Execute with precision',
    icon: Rocket,
    color: 'from-red-500 to-red-600',
    bgLight: 'bg-red-50',
    textColor: 'text-red-600',
    description: 'The execution phase is where strategy becomes reality. We manage implementation with disciplined project governance, proactive risk management, and structured change management to ensure adoption and minimize disruption.',
    deliverables: [
      'Phased implementation execution',
      'Change management and communication plans',
      'Stakeholder alignment workshops',
      'Progress tracking and reporting',
      'Risk mitigation and issue resolution',
    ],
  },
  {
    number: '05',
    name: 'Deliver Value',
    tagline: 'Measure and sustain',
    icon: BarChart3,
    color: 'from-[#0d9488] to-[#0f766e]',
    bgLight: 'bg-teal-50',
    textColor: 'text-[#0d9488]',
    description: 'The final phase focuses on measurement, optimization, and knowledge transfer. We quantify the value delivered against defined KPIs, optimize for sustained performance, and ensure your team is equipped to maintain and build on results.',
    deliverables: [
      'Value delivered quantification report',
      'Performance optimization recommendations',
      'Knowledge transfer and documentation',
      'Sustainability playbook',
      'Ongoing advisory transition plan',
    ],
  },
]

const aiEnhancements = [
  {
    icon: Search,
    phase: 'Discovery',
    capability: 'AI-powered data analysis processes thousands of data points to surface patterns and insights that manual analysis would miss.',
  },
  {
    icon: Lightbulb,
    phase: 'Design',
    capability: 'Machine learning models simulate scenarios and predict outcomes, enabling evidence-based strategy design with higher confidence.',
  },
  {
    icon: Settings,
    phase: 'Build',
    capability: 'Intelligent talent matching and resource optimization algorithms ensure the right capabilities are assembled efficiently.',
  },
  {
    icon: TrendingUp,
    phase: 'Deploy',
    capability: 'Real-time monitoring dashboards and predictive risk alerts enable proactive course corrections during implementation.',
  },
  {
    icon: Target,
    phase: 'Deliver Value',
    capability: 'Automated performance tracking and benchmarking provide continuous measurement against KPIs and industry standards.',
  },
]

const engagementModels = [
  {
    icon: Briefcase,
    name: 'Project-Based',
    description: 'Defined scope engagements with clear deliverables, timelines, and budgets. Ideal for specific strategic initiatives, market entries, or transformation projects.',
    features: ['Fixed scope and timeline', 'Defined deliverables', 'Milestone-based billing', 'Full VDS methodology'],
  },
  {
    icon: Clock,
    name: 'Retainer',
    description: 'Ongoing strategic advisory with dedicated senior consultant access. Perfect for companies needing continuous guidance through growth phases or complex transitions.',
    features: ['Dedicated advisor access', 'Monthly strategic sessions', 'Priority response times', 'Flexible scope adjustment'],
  },
  {
    icon: Users,
    name: 'Advisory Board',
    description: 'Structured board-level engagement providing governance, oversight, and strategic counsel. Suited for organizations seeking experienced external perspectives.',
    features: ['Quarterly board sessions', 'Strategic oversight', 'Network access', 'Governance framework'],
  },
]

export default function ValueDeliverySystemPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#0d9488] blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
              Proprietary Methodology
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              The Value Delivery System&trade;
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Our proprietary methodology for delivering measurable results. A systematic 5-phase approach that transforms strategic intent into quantifiable business outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#0d9488] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0f766e] transition-colors"
              >
                Experience Our Methodology
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
              How It Works
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
              A Systematic Approach to Value Creation
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The Value Delivery System is a proven, repeatable framework that guides every engagement from initial discovery through sustained value delivery. Each phase builds on the previous, creating a compounding effect that maximizes return on advisory investment.
            </p>
          </div>

          {/* Phase flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            {phases.map((phase, index) => (
              <div key={phase.name} className="flex items-center">
                <div className={`${phase.bgLight} rounded-xl px-5 py-3 text-center`}>
                  <p className={`text-xs font-bold ${phase.textColor} uppercase`}>Phase {phase.number}</p>
                  <p className="text-sm font-semibold text-[#1e293b]">{phase.name}</p>
                </div>
                {index < phases.length - 1 && (
                  <ArrowRight size={18} className="text-gray-300 mx-1 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Phases Detail */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={phase.name}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:direction-rtl'
                  }`}
                >
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}>
                        <Icon size={26} className="text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${phase.textColor} uppercase tracking-wider`}>
                          Phase {phase.number}
                        </p>
                        <h3 className="text-2xl lg:text-3xl font-bold text-[#1e293b]">
                          {phase.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-[#0d9488] font-semibold uppercase tracking-wider mb-4">
                      {phase.tagline}
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-sm font-bold text-[#1e293b] uppercase tracking-wider mb-6 flex items-center gap-2">
                        <FileText size={16} className="text-[#0d9488]" />
                        Key Deliverables
                      </h4>
                      <ul className="space-y-4">
                        {phase.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className={`${phase.textColor} mt-0.5 flex-shrink-0`} />
                            <span className="text-gray-600">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Integration */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0d9488]/10 rounded-full px-4 py-2 mb-6">
              <Cpu size={16} className="text-[#0d9488]" />
              <span className="text-[#0d9488] font-semibold text-sm">AI-Enhanced</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
              AI Integration Across Every Phase
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We embed artificial intelligence tools and capabilities into each phase of the Value Delivery System, accelerating insights, improving accuracy, and amplifying the value we deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {aiEnhancements.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.phase}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-[#0d9488]/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0d9488]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#0d9488]" />
                  </div>
                  <h4 className="font-bold text-[#1e293b] mb-2">{item.phase}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.capability}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
              Engagement Models
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
              Flexible Ways to Work Together
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We offer three engagement models, each tailored to different needs and designed to deliver maximum value within the Value Delivery System framework.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {engagementModels.map((model) => {
              const Icon = model.icon
              return (
                <div
                  key={model.name}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-[#0d9488]/30 transition-all flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0d9488]/10 flex items-center justify-center mb-6">
                    <Icon size={28} className="text-[#0d9488]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3">{model.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">{model.description}</p>
                  <ul className="space-y-3 border-t border-gray-100 pt-6">
                    {model.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-[#0d9488] flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award size={48} className="text-white/30 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Experience Our Methodology
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            See how the Value Delivery System can transform your strategic challenges into measurable business results. Schedule a consultation to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0d9488] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Consultation
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              About Our Firm
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
