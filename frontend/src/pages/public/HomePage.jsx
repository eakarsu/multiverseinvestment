import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  Search,
  PenTool,
  Hammer,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Globe2,
  UserCheck,
  Zap,
  Users,
  BarChart3,
  Briefcase,
  Building2,
  Landmark,
  Heart,
  Factory,
  Flame,
  Home,
  FlaskConical,
  Plane,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  ChevronRight,
  DollarSign,
  BrainCircuit,
  Target,
  Clock,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Value Delivery System", to: "/value-delivery-system" },
  { label: "Services", to: "/public/services" },
  { label: "Industries", to: "/industries" },
  { label: "Markets", to: "/markets" },
  { label: "Insights", to: "/public/insights" },
  { label: "Partnerships", to: "/public/partnerships" },
  { label: "Contact", to: "/contact" },
];

const DIFFERENTIATORS = [
  {
    icon: Target,
    title: "Value Delivery System\u2122",
    description:
      "Our proprietary methodology ensures every engagement moves from insight to measurable impact with disciplined execution.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Enabled Delivery",
    description:
      "We embed artificial intelligence into strategy, operations, and talent workflows to accelerate outcomes and reduce cost.",
  },
  {
    icon: Globe2,
    title: "Global Corridor Positioning",
    description:
      "Deep expertise across US\u2013Europe\u2013MENA\u2013Asia corridors enables cross-border expansion with local market fluency.",
  },
  {
    icon: UserCheck,
    title: "Senior-Led Engagements",
    description:
      "Every project is led by experienced principals\u2014no hand-offs to junior staff. You get the team you were promised.",
  },
  {
    icon: Zap,
    title: "Speed vs. Large Firms",
    description:
      "Boutique agility means faster decisions, shorter timelines, and none of the bureaucracy that slows down large consultancies.",
  },
  {
    icon: Users,
    title: "Integrated Talent & Investment",
    description:
      "Uniquely connecting executive search and investment advisory alongside strategy for truly holistic growth solutions.",
  },
];

const VDS_PHASES = [
  {
    icon: Search,
    phase: "01",
    title: "Discovery",
    description: "Assess landscape, identify gaps, define opportunity",
  },
  {
    icon: PenTool,
    phase: "02",
    title: "Design",
    description: "Architect strategy, model scenarios, align stakeholders",
  },
  {
    icon: Hammer,
    phase: "03",
    title: "Build",
    description: "Develop capabilities, assemble teams, create assets",
  },
  {
    icon: Rocket,
    phase: "04",
    title: "Deploy",
    description: "Launch initiatives, execute plans, manage change",
  },
  {
    icon: TrendingUp,
    phase: "05",
    title: "Deliver Value",
    description: "Measure outcomes, optimize results, sustain growth",
  },
];

const SERVICES = [
  {
    icon: BarChart3,
    title: "Strategy & Growth",
    description:
      "Market entry, competitive positioning, growth roadmaps, and strategic planning for organizations ready to scale.",
  },
  {
    icon: Globe2,
    title: "Global Expansion",
    description:
      "Cross-border market entry, corridor strategy, regulatory navigation, and localization for international growth.",
  },
  {
    icon: Briefcase,
    title: "Talent & Executive Search",
    description:
      "C-suite placement, leadership assessment, organizational design, and talent strategy aligned with business goals.",
  },
  {
    icon: DollarSign,
    title: "Investment Advisory",
    description:
      "Deal sourcing, due diligence, portfolio strategy, and capital allocation advisory for growth-stage ventures.",
  },
  {
    icon: Cpu,
    title: "AI Transformation",
    description:
      "AI readiness assessment, use-case identification, implementation roadmaps, and change management for AI adoption.",
  },
];

const INDUSTRIES = [
  { icon: Landmark, name: "Financial Services" },
  { icon: Cpu, name: "Technology" },
  { icon: Heart, name: "Healthcare" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Flame, name: "Energy" },
  { icon: Home, name: "Real Estate" },
  { icon: FlaskConical, name: "Pharmaceuticals" },
  { icon: Plane, name: "Aerospace & Defense" },
];

const MARKETS = [
  { region: "North America", countries: "United States, Canada, Mexico" },
  { region: "Europe", countries: "UK, Germany, France, Switzerland, Nordics" },
  { region: "MENA", countries: "UAE, Saudi Arabia, Qatar, Turkey, Egypt" },
  { region: "Asia Pacific", countries: "Singapore, Japan, Australia, India" },
  { region: "Central Asia", countries: "Kazakhstan, Uzbekistan, Georgia" },
  { region: "Africa", countries: "South Africa, Nigeria, Kenya, Morocco" },
];

const INSIGHTS = [
  {
    category: "Strategy",
    title: "Navigating Uncertainty: Building Resilient Growth Strategies in 2026",
    date: "March 18, 2026",
    excerpt:
      "How forward-thinking organizations are turning geopolitical headwinds into competitive advantages through adaptive strategy frameworks.",
  },
  {
    category: "AI",
    title: "Beyond the Hype: Practical AI Implementation for Mid-Market Firms",
    date: "March 10, 2026",
    excerpt:
      "A pragmatic guide to identifying high-ROI AI use cases, avoiding common pitfalls, and building sustainable AI capabilities.",
  },
  {
    category: "Global Expansion",
    title: "The MENA Opportunity: Cross-Border Corridors Reshaping Global Trade",
    date: "February 28, 2026",
    excerpt:
      "Exploring how new trade corridors between MENA, Central Asia, and Europe are creating unprecedented expansion opportunities.",
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ───────── NAVIGATION ───────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:inline">
                Multiverse Consulting Group
              </span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">
                Multiverse
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden xl:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden xl:flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
              >
                Client Portal
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="xl:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2.5 text-sm text-gray-700 hover:text-teal-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Client Portal
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ───────── HERO ───────── */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-teal-50/30" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-teal-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-4">
              Boutique Strategy &amp; Execution Advisory
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Deliver Measurable Growth Through{" "}
              <span className="text-teal-600">Strategy, Talent, Investment, and AI</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Boutique Strategy &amp; Execution Advisory connecting all four value
              drivers for organizations ready to scale globally.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/public/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg border border-gray-200 hover:border-teal-300 hover:text-teal-700 transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DIFFERENTIATION ───────── */}
      <section className="py-20 lg:py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal-400 font-semibold text-sm tracking-wide uppercase mb-3">
              Our Edge
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Boutique?
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Six competitive advantages that set Multiverse apart from traditional
              consulting firms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-teal-600/40 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-teal-600/10 flex items-center justify-center mb-4 group-hover:bg-teal-600/20 transition-colors">
                  <item.icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── VALUE DELIVERY SYSTEM ───────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Our Methodology
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Value Delivery System&trade;
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              A disciplined, five-phase methodology that transforms insight into
              measurable impact.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {VDS_PHASES.map((phase, idx) => (
                <div key={phase.title} className="relative text-center group">
                  {/* Phase circle */}
                  <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform duration-300">
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                  {/* Arrow between circles (mobile / tablet) */}
                  {idx < VDS_PHASES.length - 1 && (
                    <div className="lg:hidden flex justify-center my-2">
                      <ChevronRight className="w-5 h-5 text-teal-300 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                  <p className="mt-4 text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Phase {phase.phase}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Service Domains
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Five integrated practice areas designed to drive end-to-end growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
                  <svc.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {svc.description}
                </p>
                <Link
                  to="/public/services"
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── INDUSTRIES ───────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Sectors
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Industries We Serve
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Deep domain knowledge across eight high-growth sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-50 border border-gray-100 hover:bg-teal-50 hover:border-teal-200 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-teal-300 transition-colors">
                  <ind.icon className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-teal-700 transition-colors">
                  {ind.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── MARKETS ───────── */}
      <section className="py-20 lg:py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal-400 font-semibold text-sm tracking-wide uppercase mb-3">
              Global Reach
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Markets We Serve
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Operating across six continents with deep corridor expertise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKETS.map((mkt) => (
              <div
                key={mkt.region}
                className="flex items-start gap-4 p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-teal-600/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-600/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{mkt.region}</h3>
                  <p className="mt-1 text-sm text-gray-400">{mkt.countries}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── INSIGHTS ───────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">
                Thought Leadership
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Latest Insights
              </h2>
            </div>
            <Link
              to="/public/insights"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
            >
              View all insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSIGHTS.map((article) => (
              <article
                key={article.title}
                className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all duration-300"
              >
                {/* Placeholder image area */}
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to accelerate your growth?
          </h2>
          <p className="mt-4 text-teal-100 text-lg max-w-xl mx-auto">
            Let&rsquo;s discuss how Multiverse Consulting Group can help your
            organization deliver measurable, sustainable results.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-10 px-10 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition-colors shadow-lg"
          >
            Book Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="bg-gray-950 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
            {/* Company info */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-lg font-bold text-white">Multiverse</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed">
                Boutique Strategy &amp; Execution Advisory helping organizations
                deliver measurable growth through Strategy, Talent, Investment,
                and AI.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "About", path: "/about" },
                  { name: "Services", path: "/public/services" },
                  { name: "Industries", path: "/industries" },
                  { name: "Insights", path: "/public/insights" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-gray-500" />
                  info@multiversecg.com
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-gray-500" />
                  +1 (555) 000-0000
                </li>
                <li className="flex items-start gap-2.5 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  New York &middot; London &middot; Dubai
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-600/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-600/40 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Multiverse Consulting Group. All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/public/privacy"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/public/terms"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
