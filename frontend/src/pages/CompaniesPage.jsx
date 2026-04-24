import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'industry', label: 'Industry', type: 'text' },
  { key: 'size', label: 'Size', type: 'text' },
  { key: 'website', label: 'Website', type: 'text' },
  { key: 'headquarters', label: 'Headquarters', type: 'text' },
  { key: 'revenue', label: 'Revenue', type: 'number' },
  { key: 'relationship', label: 'Relationship', type: 'select', options: ['client', 'partner', 'vendor', 'prospect'] },
  { key: 'contact_person', label: 'Contact Person', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'industry', label: 'Industry' },
  { key: 'size', label: 'Size' },
  { key: 'headquarters', label: 'Headquarters' },
  { key: 'relationship', label: 'Relationship' },
  { key: 'revenue', label: 'Revenue' },
]

export default function CompaniesPage() {
  return <CrudPage title="Companies" endpoint="companies" fields={fields} columns={columns} />
}
