import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';
import {
  Landmark,
  Cpu,
  HeartPulse,
  Factory,
  Zap,
  Building2,
  FlaskConical,
  Plane,
  ShoppingBag,
  GraduationCap,
  Film,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

const industries = [
  {
    icon: Landmark,
    name: 'Financial Services',
    description: 'Banking, insurance, fintech, wealth management',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'hover:border-teal-300',
  },
  {
    icon: Cpu,
    name: 'Technology',
    description: 'SaaS, platforms, digital infrastructure, cybersecurity',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'hover:border-sky-300',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    description: 'Hospitals, pharma, medtech, digital health',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'hover:border-rose-300',
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    description: 'Industry 4.0, supply chain, operational excellence',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'hover:border-amber-300',
  },
  {
    icon: Zap,
    name: 'Energy',
    description: 'Oil & gas, renewables, energy transition',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'hover:border-yellow-300',
  },
  {
    icon: Building2,
    name: 'Real Estate',
    description: 'Commercial, residential, REIT, mixed-use',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'hover:border-violet-300',
  },
  {
    icon: FlaskConical,
    name: 'Pharmaceuticals',
    description: 'Drug development, market access, regulatory',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'hover:border-emerald-300',
  },
  {
    icon: Plane,
    name: 'Aerospace & Defense',
    description: 'Defense contracts, aviation, space tech',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'hover:border-slate-300',
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    description: 'Omnichannel, e-commerce, brand strategy',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'hover:border-pink-300',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'EdTech, institutional transformation',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'hover:border-indigo-300',
  },
  {
    icon: Film,
    name: 'Media & Entertainment',
    description: 'Content, digital media, streaming',
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-50',
    borderColor: 'hover:border-fuchsia-300',
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    description: 'Consulting, legal, accounting firms',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'hover:border-cyan-300',
  },
];

export default function IndustriesPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-400 font-semibold tracking-widest uppercase text-sm mb-4">
            Industries
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Deep Expertise Across
            <br />
            <span className="text-teal-400">12 Industries</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We bring sector-specific insight to every engagement — because great
            strategy demands an understanding of the forces shaping your
            industry.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className={`group bg-white rounded-2xl border border-gray-200 ${industry.borderColor} p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${industry.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${industry.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Industry Expertise Matters
            </h2>
            <p className="text-lg text-gray-600">
              Generic advice produces generic results. Our consultants have
              operated within the sectors they advise — bringing insider
              knowledge that accelerates outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: '200+',
                label: 'Engagements Delivered',
                detail:
                  'Across all 12 industries, with measurable impact on growth and efficiency.',
              },
              {
                stat: '15+',
                label: 'Years Average Experience',
                detail:
                  'Our sector leads bring deep operational and strategic tenure to every project.',
              },
              {
                stat: '6',
                label: 'Continents Covered',
                detail:
                  'Industry expertise paired with regional knowledge for truly global advisory.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <p className="text-4xl font-bold text-teal-600 mb-2">
                  {item.stat}
                </p>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {item.label}
                </p>
                <p className="text-sm text-gray-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to work with industry specialists?
          </h2>
          <p className="text-lg text-teal-100 mb-10 max-w-2xl mx-auto">
            Tell us about your sector and challenges. We will connect you with
            the right team.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
