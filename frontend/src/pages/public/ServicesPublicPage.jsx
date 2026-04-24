import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';
import {
  TrendingUp,
  Globe,
  Users,
  BarChart3,
  Brain,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

const serviceDomains = [
  {
    icon: TrendingUp,
    title: 'Strategy & Growth',
    description:
      'Unlock sustainable growth with data-driven strategies tailored to your competitive landscape, market dynamics, and organizational ambitions.',
    offerings: [
      'Strategic Diagnostic Assessment',
      'Revenue Growth Strategy',
      'Market Entry Strategy',
      'Digital Transformation Roadmap',
      'Brand Strategy & Positioning',
    ],
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  {
    icon: Globe,
    title: 'Global Expansion',
    description:
      'Navigate the complexities of international markets with our proven cross-border advisory framework and in-region expertise.',
    offerings: [
      'Market Entry Strategy',
      'Cross-border Operations',
      'Global Corridor Advisory',
      'Regulatory Navigation',
    ],
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
  },
  {
    icon: Users,
    title: 'Talent & Executive Search',
    description:
      'Identify, attract, and retain transformative leaders who drive results. Our network spans C-suite, board, and senior specialist roles worldwide.',
    offerings: [
      'Executive Search',
      'Leadership Hiring',
      'Talent Assessment',
      'Recruitment Strategy',
      'Board Advisory Placements',
    ],
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
  {
    icon: BarChart3,
    title: 'Investment Advisory',
    description:
      'From deal origination to portfolio optimization, we provide institutional-grade advisory for investors and enterprises alike.',
    offerings: [
      'Deal Advisory',
      'Capital Raising',
      'Due Diligence Support',
      'Portfolio Strategy',
      'Co-investment Opportunities',
    ],
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    icon: Brain,
    title: 'AI Transformation',
    description:
      'Harness the power of artificial intelligence to reimagine operations, accelerate decision-making, and create lasting competitive advantage.',
    offerings: [
      'AI Readiness Assessment',
      'AI Strategy Development',
      'Implementation Roadmap',
      'Change Management for AI',
      'AI-Enhanced Operations',
    ],
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
];

export default function ServicesPublicPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-400 font-semibold tracking-widest uppercase text-sm mb-4">
            What We Do
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Advisory Services Built for
            <br />
            <span className="text-teal-400">Global Ambition</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Five integrated service domains designed to help organizations grow,
            expand, and transform — across borders and industries.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Domains
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each domain is led by senior practitioners with deep sector
              expertise and a track record of measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.title}
                  className={`group rounded-2xl border ${domain.borderColor} bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${domain.bgColor} flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-7 h-7 ${domain.color}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {domain.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {domain.description}
                  </p>

                  {/* Offerings List */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {domain.offerings.map((offering) => (
                      <li
                        key={offering}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${domain.color}`}
                        />
                        <span>{offering}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <Link
                    to="/contact"
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${domain.color} group-hover:gap-3 transition-all duration-200`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CalendarCheck className="w-12 h-12 text-teal-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find the right service for your organization
          </h2>
          <p className="text-lg text-teal-100 mb-10 max-w-2xl mx-auto">
            Every engagement begins with a conversation. Tell us about your
            challenges and goals, and we will recommend the right approach.
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
