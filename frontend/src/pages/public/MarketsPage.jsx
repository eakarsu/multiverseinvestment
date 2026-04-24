import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';
import {
  MapPin,
  ArrowRight,
  ArrowRightLeft,
  Globe2,
  CalendarCheck,
} from 'lucide-react';

const regions = [
  {
    name: 'North America',
    hub: 'New York',
    description:
      'Headquartered in New York, serving US and Canada markets with deep expertise in financial services, technology, and healthcare sectors.',
    markets: ['United States', 'Canada'],
    specializations: [
      'Financial Services Advisory',
      'Tech & SaaS Strategy',
      'M&A and Capital Markets',
      'Executive Search',
    ],
    accent: 'border-teal-500',
    dotColor: 'bg-teal-500',
  },
  {
    name: 'Europe',
    hub: 'London, Frankfurt, Paris',
    description:
      'Comprehensive coverage across major European financial centers with specialized EU regulatory and cross-border expertise.',
    markets: ['United Kingdom', 'Germany', 'France', 'Nordics', 'Benelux'],
    specializations: [
      'EU Regulatory Navigation',
      'Cross-border M&A',
      'ESG & Sustainability Strategy',
      'Digital Transformation',
    ],
    accent: 'border-sky-500',
    dotColor: 'bg-sky-500',
  },
  {
    name: 'MENA',
    hub: 'Dubai',
    description:
      'Dubai-based hub serving the Gulf Cooperation Council with deep expertise in Saudi Vision 2030, sovereign wealth, and emerging market dynamics.',
    markets: ['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Oman', 'Kuwait'],
    specializations: [
      'Saudi Vision 2030 Advisory',
      'Sovereign Wealth Strategy',
      'GCC Market Entry',
      'Islamic Finance',
    ],
    accent: 'border-amber-500',
    dotColor: 'bg-amber-500',
  },
  {
    name: 'Asia Pacific',
    hub: 'Tokyo, Singapore, Sydney',
    description:
      'Tri-city presence across the Asia Pacific region, powering fintech corridors and manufacturing excellence initiatives.',
    markets: ['Japan', 'Singapore', 'Australia', 'South Korea', 'India'],
    specializations: [
      'Fintech Corridors',
      'Manufacturing Excellence',
      'APAC Market Entry',
      'Technology Partnerships',
    ],
    accent: 'border-violet-500',
    dotColor: 'bg-violet-500',
  },
  {
    name: 'Central Asia',
    hub: 'Astana, Tashkent, Tbilisi',
    description:
      'Pioneering advisory in Central Asia\'s rapidly growing economies, with a focus on emerging tech ecosystems and infrastructure investment.',
    markets: ['Kazakhstan', 'Uzbekistan', 'Georgia', 'Kyrgyzstan'],
    specializations: [
      'Emerging Tech Ecosystems',
      'Infrastructure Investment',
      'Government Advisory',
      'Market Development',
    ],
    accent: 'border-emerald-500',
    dotColor: 'bg-emerald-500',
  },
  {
    name: 'Africa',
    hub: 'Lagos, Nairobi',
    description:
      'West Africa focus with expanding East African presence, providing market entry advisory for one of the world\'s fastest-growing regions.',
    markets: ['Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Rwanda'],
    specializations: [
      'Emerging Market Entry',
      'Fintech & Mobile-first Strategy',
      'Infrastructure & Energy',
      'Impact Investing',
    ],
    accent: 'border-rose-500',
    dotColor: 'bg-rose-500',
  },
];

const corridors = [
  {
    from: 'US',
    to: 'MENA',
    label: 'US \u2192 MENA',
    description:
      'Capital flows and technology partnerships between North America and the Gulf states, particularly aligned with Vision 2030 initiatives.',
  },
  {
    from: 'Europe',
    to: 'Asia',
    label: 'Europe \u2192 Asia',
    description:
      'Cross-border trade, manufacturing partnerships, and fintech corridor development connecting European and Asian markets.',
  },
  {
    from: 'MENA',
    to: 'Africa',
    label: 'MENA \u2192 Africa',
    description:
      'Sovereign wealth investment, infrastructure development, and market entry advisory connecting the Gulf to Africa\'s growth markets.',
  },
];

export default function MarketsPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-400 font-semibold tracking-widest uppercase text-sm mb-4">
            Global Presence
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Advisory Without
            <br />
            <span className="text-teal-400">Borders</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Six regions. 30+ markets. One integrated advisory platform designed
            to help you grow wherever opportunity leads.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-teal-400" />
              <span>6 Regions</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-400" />
              <span>12+ Offices</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-teal-400" />
              <span>3 Key Corridors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Regions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              In-region teams with local expertise and global connectivity,
              ensuring you receive advice that is both culturally attuned and
              strategically rigorous.
            </p>
          </div>

          <div className="space-y-8">
            {regions.map((region, index) => (
              <div
                key={region.name}
                className={`flex flex-col ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
              >
                {/* Info Side */}
                <div className="flex-1 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center`}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {region.name}
                      </h3>
                      <p className="text-sm text-teal-600 font-medium">
                        {region.hub}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {region.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {region.markets.map((market) => (
                      <span
                        key={market}
                        className="px-3 py-1 text-xs font-medium bg-white text-gray-700 rounded-full border border-gray-200"
                      >
                        {market}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specializations Side */}
                <div
                  className={`flex-1 p-8 lg:p-10 border-l-0 lg:border-l-4 ${region.accent} bg-white`}
                >
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    Regional Specializations
                  </p>
                  <ul className="space-y-3">
                    {region.specializations.map((spec) => (
                      <li key={spec} className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${region.dotColor} flex-shrink-0`}
                        />
                        <span className="text-gray-700 font-medium text-sm">
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Corridors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ArrowRightLeft className="w-10 h-10 text-teal-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Corridors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in cross-border trade corridors — the strategic
              pathways where capital, talent, and opportunity flow between
              regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corridors.map((corridor) => (
              <div
                key={corridor.label}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1.5 bg-teal-50 text-teal-700 font-bold text-sm rounded-lg">
                    {corridor.from}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <span className="px-3 py-1.5 bg-teal-50 text-teal-700 font-bold text-sm rounded-lg">
                    {corridor.to}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {corridor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CalendarCheck className="w-12 h-12 text-teal-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Expanding into a new market?
          </h2>
          <p className="text-lg text-teal-100 mb-10 max-w-2xl mx-auto">
            Our in-region teams are ready to help you navigate new geographies
            with confidence. Let us chart the path together.
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
