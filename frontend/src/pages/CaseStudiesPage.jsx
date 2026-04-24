import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'client_name', label: 'Client Name', type: 'text' },
  { key: 'industry', label: 'Industry', type: 'text' },
  { key: 'region', label: 'Region', type: 'select', options: ['MENA', 'GCC', 'Europe', 'North America', 'Central Asia', 'Asia-Pacific'] },
  { key: 'challenge', label: 'Challenge', type: 'textarea' },
  { key: 'solution', label: 'Solution', type: 'textarea' },
  { key: 'results', label: 'Results', type: 'textarea' },
  { key: 'services_used', label: 'Services Used', type: 'text' },
  { key: 'duration', label: 'Duration', type: 'text' },
  { key: 'value_delivered', label: 'Value Delivered', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'in-review', 'published', 'archived'] },
  { key: 'published_date', label: 'Published Date', type: 'date' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'client_name', label: 'Client Name' },
  { key: 'industry', label: 'Industry' },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status' },
  { key: 'value_delivered', label: 'Value Delivered' },
]

export default function CaseStudiesPage() {
  return <CrudPage title="Case Studies" endpoint="case-studies" fields={fields} columns={columns} />
}
