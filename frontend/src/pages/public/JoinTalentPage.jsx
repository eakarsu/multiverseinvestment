import React, { useState } from 'react';
import PublicLayout from '../../components/PublicLayout';
import {
  UserPlus,
  CheckCircle,
  Loader2,
  Send,
  Briefcase,
  Globe2,
  Award,
  Users,
} from 'lucide-react';

const INDUSTRIES = [
  'Financial Services',
  'Technology',
  'Healthcare',
  'Manufacturing',
  'Energy',
  'Real Estate',
  'Retail & Consumer',
  'Telecommunications',
  'Transportation & Logistics',
  'Government & Public Sector',
  'Other',
];

const REGIONS = [
  'North America',
  'Europe',
  'Middle East & Africa',
  'Asia Pacific',
  'Latin America',
];

const ROLE_LEVELS = ['C-Suite', 'VP', 'Director', 'Manager', 'Senior', 'Mid-Level'];

const AVAILABILITY = [
  { value: 'immediate', label: 'Immediate' },
  { value: '2-weeks', label: '2 Weeks' },
  { value: '1-month', label: '1 Month' },
  { value: '3-months', label: '3 Months' },
];

const HIGHLIGHTS = [
  { icon: Briefcase, title: 'Premier Opportunities', desc: 'Access exclusive leadership roles at top-tier global organizations.' },
  { icon: Globe2, title: 'Global Reach', desc: 'Opportunities across 30+ countries in every major industry.' },
  { icon: Award, title: 'Career Advisory', desc: 'Personalized guidance from experienced executive recruiters.' },
  { icon: Users, title: 'Confidential Process', desc: 'Your profile is shared only with your explicit consent.' },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  industry: '',
  experience_years: '',
  region: '',
  role_level: '',
  skills: '',
  linkedin_url: '',
  current_company: '',
  expected_salary: '',
  availability: '',
  notes: '',
};

export default function JoinTalentPage() {
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
      const payload = {
        ...form,
        experience_years: form.experience_years ? Number(form.experience_years) : null,
        expected_salary: form.expected_salary ? Number(form.expected_salary) : null,
      };
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-teal-700/50 rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-teal-200" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Executive Talent Network</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Connect with premier leadership opportunities across industries and regions. Your next career move starts here.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="text-center">
                  <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{h.title}</h3>
                  <p className="text-sm text-gray-600">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
            <p className="text-gray-600 mb-8">
              Complete the form below to join our talent network. Our executive search team will reach out when a matching opportunity arises.
            </p>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-16 h-16 text-teal-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to the Network!</h3>
                <p className="text-gray-600 max-w-md">
                  Your profile has been created successfully. Our talent team will review your information and reach out with relevant opportunities.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  Submit another profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-4">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        placeholder="Your full name"
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
                        placeholder="you@email.com"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin_url"
                        value={form.linkedin_url}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div>
                  <h3 className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-4">Professional Details</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                      <input
                        type="text"
                        name="current_company"
                        value={form.current_company}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        placeholder="Your current employer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                      >
                        <option value="">Select industry</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role Level</label>
                      <select
                        name="role_level"
                        value={form.role_level}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                      >
                        <option value="">Select level</option>
                        {ROLE_LEVELS.map((rl) => (
                          <option key={rl} value={rl}>{rl}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                      <input
                        type="number"
                        name="experience_years"
                        min="0"
                        max="60"
                        value={form.experience_years}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        placeholder="e.g. 15"
                      />
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                      <select
                        name="availability"
                        value={form.availability}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                      >
                        <option value="">Select availability</option>
                        {AVAILABILITY.map((a) => (
                          <option key={a.value} value={a.value}>{a.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary (USD)</label>
                      <input
                        type="number"
                        name="expected_salary"
                        min="0"
                        value={form.expected_salary}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        placeholder="e.g. 250000"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills & Notes */}
                <div>
                  <h3 className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-4">Skills & Additional Info</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills & Competencies</label>
                      <textarea
                        name="skills"
                        rows={3}
                        value={form.skills}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                        placeholder="e.g. Strategic Planning, M&A, Digital Transformation, P&L Management..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                        placeholder="Anything else you'd like us to know about your career goals..."
                      />
                    </div>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Join the Talent Network
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
