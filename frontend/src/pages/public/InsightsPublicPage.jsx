import React, { useState, useEffect, useMemo } from 'react';
import PublicLayout from '../../components/PublicLayout';
import {
  Search,
  BookOpen,
  FileText,
  BarChart3,
  Lightbulb,
  Newspaper,
  X,
  Loader2,
  AlertCircle,
  Mail,
  Calendar,
  User,
  Tag,
} from 'lucide-react';

const CATEGORIES = [
  { value: 'article', label: 'Article', icon: Newspaper },
  { value: 'whitepaper', label: 'Whitepaper', icon: FileText },
  { value: 'research', label: 'Research', icon: BarChart3 },
  { value: 'perspective', label: 'Perspective', icon: Lightbulb },
  { value: 'market-brief', label: 'Market Brief', icon: BookOpen },
];

const INDUSTRIES = [
  'Financial Services',
  'Technology',
  'Healthcare',
  'Manufacturing',
  'Energy',
  'Real Estate',
];

const REGIONS = [
  'North America',
  'Europe',
  'Middle East & Africa',
  'Asia Pacific',
  'Latin America',
];

const CATEGORY_COLORS = {
  article: 'bg-blue-100 text-blue-700',
  whitepaper: 'bg-purple-100 text-purple-700',
  research: 'bg-amber-100 text-amber-700',
  perspective: 'bg-emerald-100 text-emerald-700',
  'market-brief': 'bg-rose-100 text-rose-700',
};

export default function InsightsPublicPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [selectedInsight, setSelectedInsight] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/insights');
      if (!res.ok) throw new Error('Failed to load insights');
      const data = await res.json();
      setInsights(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return insights.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (item.title || '').toLowerCase().includes(q) ||
        (item.summary || '').toLowerCase().includes(q) ||
        (item.author || '').toLowerCase().includes(q);
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      const matchesIndustry = !industryFilter || item.industry === industryFilter;
      const matchesRegion = !regionFilter || item.region === regionFilter;
      return matchesSearch && matchesCategory && matchesIndustry && matchesRegion;
    });
  }, [insights, searchQuery, categoryFilter, industryFilter, regionFilter]);

  const activeFilters = [categoryFilter, industryFilter, regionFilter].filter(Boolean).length;

  const clearFilters = () => {
    setCategoryFilter('');
    setIndustryFilter('');
    setRegionFilter('');
    setSearchQuery('');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Thought Leadership</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Expert analysis, research, and perspectives on the trends shaping global business.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search insights..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
              >
                <option value="">All Industries</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
              >
                <option value="">All Regions</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 transition px-2"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gray-50 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-4" />
              <p className="text-gray-500">Loading insights...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
              <p className="text-gray-700 font-medium mb-2">Unable to load insights</p>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <button
                onClick={fetchInsights}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm underline"
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="w-10 h-10 text-gray-300 mb-4" />
              <p className="text-gray-700 font-medium mb-1">No insights found</p>
              <p className="text-gray-500 text-sm">
                {activeFilters > 0 || searchQuery
                  ? 'Try adjusting your filters or search query.'
                  : 'Check back soon for new content.'}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Showing {filtered.length} insight{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((insight) => (
                  <article
                    key={insight.id || insight.title}
                    onClick={() => setSelectedInsight(insight)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-teal-200 transition cursor-pointer group flex flex-col"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {insight.category && (
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              CATEGORY_COLORS[insight.category] || 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {CATEGORIES.find((c) => c.value === insight.category)?.label || insight.category}
                          </span>
                        )}
                        {insight.industry && (
                          <span className="text-xs text-gray-400">{insight.industry}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition line-clamp-2">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                        {insight.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {insight.author || 'Multiverse Team'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(insight.published_date)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-10 h-10 text-teal-200 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Subscribe to Our Insights</h2>
          <p className="text-teal-100 mb-8 max-w-lg mx-auto">
            Get the latest research, perspectives, and market analysis delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-teal-300 outline-none"
            />
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-teal-200/70 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedInsight && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedInsight(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between rounded-t-2xl">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  {selectedInsight.category && (
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        CATEGORY_COLORS[selectedInsight.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {CATEGORIES.find((c) => c.value === selectedInsight.category)?.label || selectedInsight.category}
                    </span>
                  )}
                  {selectedInsight.region && (
                    <span className="text-xs text-gray-400">{selectedInsight.region}</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{selectedInsight.title}</h2>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedInsight.author || 'Multiverse Team'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedInsight.published_date)}
                </span>
                {selectedInsight.industry && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {selectedInsight.industry}
                  </span>
                )}
              </div>
              {selectedInsight.summary && (
                <p className="text-gray-600 italic border-l-4 border-teal-500 pl-4 mb-6">
                  {selectedInsight.summary}
                </p>
              )}
              <div className="prose prose-gray max-w-none text-gray-700 whitespace-pre-line">
                {selectedInsight.content || selectedInsight.body || 'Full content coming soon.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
