import { Link } from 'react-router-dom'
import {
  ArrowRight, Target, Cpu, Globe, Users, Zap, TrendingUp,
  Quote, CheckCircle2, Compass, Lightbulb, Handshake, Award
} from 'lucide-react'
import PublicLayout from '../../components/PublicLayout'

const differentiators = [
  {
    icon: Target,
    title: 'Value Delivery System\u2122',
    description: 'Our proprietary 5-phase methodology ensures every engagement produces measurable, quantifiable business outcomes.',
  },
  {
    icon: Cpu,
    title: 'AI-Enabled Advisory',
    description: 'We integrate advanced AI tools across every phase of engagement, accelerating insights and amplifying decision quality.',
  },
  {
    icon: Globe,
    title: 'Global Corridors',
    description: 'Deep expertise in cross-border strategy across US, Europe, Middle East, and emerging markets with local knowledge.',
  },
  {
    icon: Users,
    title: 'Senior-Led Engagements',
    description: 'Every project is led by experienced principals\u2014not delegated to junior consultants. You get seasoned expertise from day one.',
  },
  {
    icon: Zap,
    title: 'Speed Advantage',
    description: 'Lean team structure and decisive frameworks mean faster time-to-value compared to large traditional consultancies.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Connectivity',
    description: 'Unique access to capital networks and investor relationships that complement strategic advisory with funding pathways.',
  },
]

const approachSteps = [
  { label: 'Strategy', description: 'Define the vision and strategic roadmap' },
  { label: 'Talent', description: 'Assemble the right people and capabilities' },
  { label: 'Capital', description: 'Align resources and investment' },
  { label: 'Execution', description: 'Implement with precision and agility' },
  { label: 'Measurable Value', description: 'Deliver quantified business outcomes' },
]

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
              About Us
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              About Multiverse Consulting Group
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              A boutique strategy and execution advisory firm built to deliver measurable results in an increasingly complex business landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Firm Overview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
                Our Firm
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
                Boutique Strategy &amp; Execution Advisory
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Multiverse Consulting Group was founded to bridge the gap between strategy and execution. Too often, brilliant strategies fail in implementation, and operational improvements lack strategic direction. We exist to solve that disconnect.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                As a boutique firm, we combine the intellectual rigor of top-tier strategy consulting with the hands-on execution capability of operational advisors. Our clients receive senior-level attention, customized solutions, and a relentless focus on delivering measurable value.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-10 lg:p-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#0d9488]">50+</p>
                  <p className="text-sm text-gray-500 mt-2">Engagements Delivered</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#0d9488]">12+</p>
                  <p className="text-sm text-gray-500 mt-2">Industries Served</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#0d9488]">8+</p>
                  <p className="text-sm text-gray-500 mt-2">Global Markets</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#0d9488]">95%</p>
                  <p className="text-sm text-gray-500 mt-2">Client Retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Quote size={48} className="text-[#0d9488]/30 mx-auto mb-8" />
            <blockquote className="text-2xl lg:text-3xl font-medium text-[#1e293b] leading-relaxed mb-8">
              "We founded Multiverse Consulting Group on a simple conviction: every business deserves advisory that doesn't just recommend change, but partners in delivering it. Our commitment is to measurable outcomes, not voluminous slide decks."
            </blockquote>
            <div>
              <p className="text-lg font-semibold text-[#1e293b]">Founding Principal</p>
              <p className="text-[#0d9488] text-sm font-medium">Multiverse Consulting Group</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
              Our Approach
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
              From Strategy to Measurable Value
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our philosophy connects five critical elements into a seamless value chain. Each element builds on the previous, creating a compounding effect that drives sustainable business transformation.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {approachSteps.map((step, index) => (
              <div key={step.label} className="flex-1 flex items-center">
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-[#0d9488]/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#1e293b] mb-2">{step.label}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
                {index < approachSteps.length - 1 && (
                  <ArrowRight size={20} className="text-[#0d9488] mx-2 hidden lg:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
              Why Multiverse
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
              Our Competitive Advantages
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Six key differentiators set us apart from traditional consulting firms and enable us to deliver superior value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg hover:border-[#0d9488]/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0d9488]/10 flex items-center justify-center mb-6 group-hover:bg-[#0d9488] transition-colors">
                    <Icon size={24} className="text-[#0d9488] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Advisory Network */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#0d9488] font-semibold text-sm uppercase tracking-widest mb-4">
                Advisory Network
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
                A Network of Exceptional Minds
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our advisory board and extended network comprise seasoned executives, industry pioneers, and domain specialists who bring decades of real-world experience to every engagement.
              </p>
              <ul className="space-y-4">
                {[
                  'Former C-suite executives from Fortune 500 companies',
                  'Sector specialists across technology, finance, and healthcare',
                  'Regional experts spanning US, Europe, and Middle East markets',
                  'Academic thought leaders and innovation practitioners',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Compass, label: 'Strategic Advisors', count: '15+' },
                { icon: Lightbulb, label: 'Industry Experts', count: '25+' },
                { icon: Handshake, label: 'Partner Firms', count: '10+' },
                { icon: Award, label: 'Years Combined Experience', count: '200+' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-6 text-center">
                    <Icon size={28} className="text-[#0d9488] mx-auto mb-3" />
                    <p className="text-3xl font-bold text-[#1e293b]">{item.count}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Partner With Us
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Ready to transform strategy into measurable results? Let's discuss how Multiverse Consulting Group can accelerate your business objectives.
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
              to="/public/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
