import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'type', label: 'Type', type: 'select', options: ['strategic', 'technology', 'referral', 'investment'] },
  { key: 'contact_person', label: 'Contact Person', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'region', label: 'Region', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'prospect'] },
  { key: 'partnership_value', label: 'Partnership Value', type: 'number' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
  { key: 'contact_person', label: 'Contact Person' },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status' },
  { key: 'partnership_value', label: 'Partnership Value' },
]

export default function PartnersPage() {
  return <CrudPage title="Partners" endpoint="partners" fields={fields} columns={columns} />
}
