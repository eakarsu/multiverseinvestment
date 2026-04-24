import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'relationship', label: 'Relationship', type: 'select', options: ['prospect', 'client', 'partner', 'vendor'] },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'relationship', label: 'Relationship' },
]

export default function ContactsPage() {
  return <CrudPage title="Contacts" endpoint="contacts" fields={fields} columns={columns} />
}
