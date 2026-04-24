import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'industry', label: 'Industry', type: 'text' },
  { key: 'contact_email', label: 'Contact Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'prospect'] },
  { key: 'revenue', label: 'Revenue', type: 'number' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'industry', label: 'Industry' },
  { key: 'contact_email', label: 'Email' },
  { key: 'status', label: 'Status' },
  { key: 'revenue', label: 'Revenue' },
]

export default function ClientsPage() {
  return <CrudPage title="Clients" endpoint="clients" fields={fields} columns={columns} />
}
