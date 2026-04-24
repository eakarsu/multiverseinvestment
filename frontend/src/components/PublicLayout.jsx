import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Linkedin, Twitter } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Value Delivery System', path: '/value-delivery-system' },
  { name: 'Services', path: '/public/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Markets', path: '/markets' },
  { name: 'Insights', path: '/public/insights' },
  { name: 'Partnerships', path: '/public/partnerships' },
  { name: 'Contact', path: '/contact' },
]

const footerQuickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Value Delivery System', path: '/value-delivery-system' },
  { name: 'Services', path: '/public/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Markets', path: '/markets' },
]

const footerResourceLinks = [
  { name: 'Insights', path: '/public/insights' },
  { name: 'Partnerships', path: '/public/partnerships' },
  { name: 'Join Talent Network', path: '/join-talent-network' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Client Portal', path: '/login' },
  { name: 'Contact Us', path: '/contact' },
]

export default function PublicLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#1e293b] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Mail size={12} />
              info@multiverseconsulting.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} />
              +1 (555) 000-0000
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-[#0d9488] transition-colors">
              Client Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div>
                <span className="text-xl font-bold tracking-wide text-[#1e293b]">
                  MULTIVERSE
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-[#0d9488] font-medium uppercase">
                  Consulting Group
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#0d9488]'
                      : 'text-[#1e293b] hover:text-[#0d9488]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-2 bg-[#0d9488] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0f766e] transition-colors shadow-sm"
              >
                Book Consultation
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#1e293b] hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#0d9488] bg-teal-50'
                      : 'text-[#1e293b] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 mt-3 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[#1e293b] hover:bg-gray-50"
                >
                  Client Portal
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-white bg-[#0d9488] text-center"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e293b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <span className="text-xl font-bold tracking-wide">MULTIVERSE</span>
                <span className="block text-[10px] tracking-[0.2em] text-[#0d9488] font-medium uppercase">
                  Consulting Group
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Boutique strategy and execution advisory bridging the gap between vision and measurable value delivery.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors">
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {footerQuickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 text-sm hover:text-[#0d9488] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Resources</h4>
              <ul className="space-y-3">
                {footerResourceLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 text-sm hover:text-[#0d9488] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">New York, NY, United States</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">info@multiverseconsulting.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-[#0d9488] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">+1 (555) 000-0000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Multiverse Consulting Group. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
