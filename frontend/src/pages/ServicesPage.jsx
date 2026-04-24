import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'category', label: 'Category', type: 'select', options: ['diagnostic', 'market-entry', 'ai-readiness', 'transformation', 'advisory', 'search'] },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'deliverables', label: 'Deliverables', type: 'textarea' },
  { key: 'duration', label: 'Duration', type: 'text' },
  { key: 'price_min', label: 'Price Min', type: 'number' },
  { key: 'price_max', label: 'Price Max', type: 'number' },
  { key: 'pricing_model', label: 'Pricing Model', type: 'select', options: ['fixed', 'milestone', 'hourly', 'retainer'] },
  { key: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'coming-soon'] },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'pricing_model', label: 'Pricing Model' },
  { key: 'price_min', label: 'Price Min' },
  { key: 'price_max', label: 'Price Max' },
  { key: 'status', label: 'Status' },
]

export default function ServicesPage() {
  return <CrudPage title="Services" endpoint="services" fields={fields} columns={columns} />
}
