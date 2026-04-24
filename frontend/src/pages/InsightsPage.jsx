import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'category', label: 'Category', type: 'select', options: ['article', 'whitepaper', 'research', 'perspective', 'market-brief'] },
  { key: 'author', label: 'Author', type: 'text' },
  { key: 'summary', label: 'Summary', type: 'textarea' },
  { key: 'content', label: 'Content', type: 'textarea' },
  { key: 'tags', label: 'Tags', type: 'text' },
  { key: 'industry', label: 'Industry', type: 'text' },
  { key: 'region', label: 'Region', type: 'select', options: ['MENA', 'GCC', 'Europe', 'North America', 'Central Asia', 'Global'] },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'in-review', 'published', 'archived'] },
  { key: 'published_date', label: 'Published Date', type: 'date' },
  { key: 'views', label: 'Views', type: 'number' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'status', label: 'Status' },
  { key: 'published_date', label: 'Published Date' },
  { key: 'views', label: 'Views' },
]

export default function InsightsPage() {
  return <CrudPage title="Insights" endpoint="insights" fields={fields} columns={columns} />
}
