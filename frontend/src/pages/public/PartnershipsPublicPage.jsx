import React, { useState } from 'react';
import PublicLayout from '../../components/PublicLayout';
import {
  Handshake,
  Globe2,
  Cpu,
  Users,
  TrendingUp,
  CheckCircle,
  Loader2,
  Send,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
} from 'lucide-react';

const PARTNERSHIP_TYPES = [
  { name: 'Strategic Alliance', icon: Handshake, desc: 'Joint ventures and co-investment opportunities across industries and geographies.' },
  { name: 'Regional Partner', icon: Globe2, desc: 'Local market expertise partnerships to expand our global reach and service delivery.' },
  { name: 'Technology Partner', icon: Cpu, desc: 'Collaborate on AI-driven solutions and digital transformation initiatives.' },
  { name: 'Referral Partner', icon: Users, desc: 'Mutual client referral programs with shared value and transparent engagement.' },
  { name: 'Investment Partner', icon: TrendingUp, desc: 'Co-invest alongside Multiverse in high-growth opportunities worldwide.' },
];

const REGIONS = [
  'North America',
  'Europe',
  'Middle East & Africa',
  'Asia Pacific',
  'Latin America',
  'Global / Multi-Region',
];

const BENEFITS = [
  { icon: Globe2, title: 'Global Network Access', desc: 'Tap into our presence across 30+ countries and three major hubs.' },
  { icon: Shield, title: 'Trusted Brand', desc: 'Leverage the Multiverse Consulting Group reputation built on decades of excellence.' },
  { icon: Zap, title: 'AI & Innovation', desc: 'Access cutting-edge tools and methodologies powering modern consulting.' },
  { icon: BarChart3, title: 'Shared Growth', desc: 'Transparent revenue-sharing models aligned with mutual success.' },
];

const initialForm = {
  organization_name: '',
  contact_person: '',
  email: '',
  phone: '',
  partnership_type: '',
  region: '',
  description: '',
};

export default function PartnershipsPublicPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Strategic Partnerships</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Collaborate with Multiverse Consulting Group to create shared value, expand your reach, and accelerate mutual growth.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Partnership Models</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We offer flexible engagement models tailored to your organization's strengths and objectives.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERSHIP_TYPES.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.name}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-300 transition group"
                >
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-100 transition">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pt.name}</h3>
                  <p className="text-sm text-gray-600">{pt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Partner With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="text-center">
                  <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Partnership Inquiry</h2>
            <p className="text-gray-600 mb-8">
              Tell us about your organization and how you envision a partnership. Our team will respond within two business days.
            </p>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-teal-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Inquiry Received</h3>
                <p className="text-gray-600 max-w-md">
                  Thank you for your interest in partnering with Multiverse Consulting Group. We will review your submission and get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                    <input
                      type="text"
                      name="organization_name"
                      required
                      value={form.organization_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="Your organization"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      name="contact_person"
                      required
                      value={form.contact_person}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="you@organization.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partnership Type *</label>
                    <select
                      name="partnership_type"
                      required
                      value={form.partnership_type}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                    >
                      <option value="">Select type</option>
                      {PARTNERSHIP_TYPES.map((pt) => (
                        <option key={pt.name} value={pt.name}>{pt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <select
                      name="region"
                      value={form.region}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                    >
                      <option value="">Select region</option>
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                    placeholder="Describe your organization, partnership goals, and how you see us collaborating..."
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Partnership Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
