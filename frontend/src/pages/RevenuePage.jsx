import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'source', label: 'Source', type: 'text' },
  { key: 'client_name', label: 'Client', type: 'text' },
  { key: 'amount', label: 'Amount', type: 'number' },
  { key: 'type', label: 'Type', type: 'select', options: ['consulting', 'advisory', 'investment', 'retainer'] },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'quarter', label: 'Quarter', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['received', 'pending', 'invoiced'] },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'source', label: 'Source' },
  { key: 'client_name', label: 'Client' },
  { key: 'amount', label: 'Amount' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
]

export default function RevenuePage() {
  return <CrudPage title="Revenue" endpoint="revenue" fields={fields} columns={columns} />
}
