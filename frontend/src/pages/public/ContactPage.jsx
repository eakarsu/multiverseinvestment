import React, { useState } from 'react';
import PublicLayout from '../../components/PublicLayout';
import { Send, MapPin, Mail, Phone, Building2, CheckCircle, Loader2 } from 'lucide-react';

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
  'Other',
];

const SERVICES = [
  'Strategy & Growth',
  'Global Expansion',
  'Talent & Executive Search',
  'Investment Advisory',
  'AI Transformation',
];

const OFFICES = [
  { city: 'New York', address: '350 Fifth Avenue, Suite 4500, New York, NY 10118', phone: '+1 (212) 555-0180' },
  { city: 'Dubai', address: 'DIFC Gate Village, Building 3, Level 5, Dubai, UAE', phone: '+971 4 555 0230' },
  { city: 'London', address: '30 St Mary Axe, Level 28, London EC3A 8BF, UK', phone: '+44 20 7555 0340' },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  industry: '',
  service_interest: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contacts', {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Discuss Your Growth Strategy</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Partner with our team of seasoned consultants to unlock new avenues for sustainable growth and global impact.
          </p>
        </div>
      </section>

      {/* Form + Side Panel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Free Consultation</h2>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle className="w-16 h-16 text-teal-600 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 max-w-md">
                      Your consultation request has been received. A member of our team will be in touch within 24 hours.
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
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
                          placeholder="you@company.com"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                          placeholder="Your company"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                        <select
                          name="service_interest"
                          value={form.service_interest}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                        >
                          <option value="">Select a service</option>
                          {SERVICES.map((svc) => (
                            <option key={svc} value={svc}>{svc}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                        placeholder="Tell us about your objectives and how we can help..."
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
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Book Your Free Consultation
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-600" />
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-600" />
                        {office.city}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{office.address}</p>
                      <p className="text-sm text-gray-500 mt-1">{office.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:consulting@multiversegroup.com"
                    className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition text-sm"
                  >
                    <Mail className="w-5 h-5 text-teal-600" />
                    consulting@multiversegroup.com
                  </a>
                  <a
                    href="tel:+12125550180"
                    className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition text-sm"
                  >
                    <Phone className="w-5 h-5 text-teal-600" />
                    +1 (212) 555-0180
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
