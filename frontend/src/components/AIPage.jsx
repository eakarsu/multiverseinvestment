import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Send, Loader2, Copy, Check, Clock, Sparkles, X } from 'lucide-react'

export default function AIPage({ title, description, icon: Icon, endpoint, suggestedPrompts, accentColor }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])

  const token = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(`/api/ai/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ query: query.trim() })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setResult(data)
      setHistory(prev => [{ query: query.trim(), timestamp: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!result) return
    const text = result.response || result.result || JSON.stringify(result, null, 2)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePromptClick = (prompt) => {
    setQuery(prompt)
  }

  const getResponseText = () => {
    if (!result) return ''
    return result.response || result.result || result.analysis || result.strategy || result.report || result.recommendations || ''
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-12 h-12 rounded-xl ${accentColor} flex items-center justify-center`}>
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark-800">{title}</h1>
            <p className="text-sm text-dark-500">{description}</p>
          </div>
          <Sparkles size={18} className="text-primary-400 ml-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query or describe what you need..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-dark-400">{query.length} characters</p>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Suggested Prompts */}
          <div>
            <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3">Suggested Prompts</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs bg-white border border-gray-200 text-dark-600 px-3 py-2 rounded-lg hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Loading Animation */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary-100 rounded-full" />
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-sm text-dark-500 mt-4">AI is processing your request...</p>
              <p className="text-xs text-dark-400 mt-1">This may take a moment</p>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Gradient top border */}
              <div className="h-1 bg-gradient-to-r from-primary-400 via-violet-400 to-cyan-400" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-primary-500" />
                    <span className="text-sm font-semibold text-dark-700">AI Response</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-dark-600 px-2 py-1 rounded hover:bg-gray-50"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="markdown-body">
                  <ReactMarkdown>{getResponseText()}</ReactMarkdown>
                </div>

                {/* Meta info */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-dark-400">
                  {result.model && <span>Model: {result.model}</span>}
                  {result.tokens && <span>Tokens: {result.tokens}</span>}
                  {result.usage && <span>Tokens: {result.usage.total_tokens || JSON.stringify(result.usage)}</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - History */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-dark-400" />
              <h3 className="text-sm font-semibold text-dark-700">Recent Queries</h3>
            </div>
            {history.length === 0 ? (
              <p className="text-xs text-dark-400 py-4 text-center">No queries yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(h.query)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
                  >
                    <p className="text-xs text-dark-600 line-clamp-2">{h.query}</p>
                    <p className="text-[10px] text-dark-400 mt-1">{h.timestamp}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
