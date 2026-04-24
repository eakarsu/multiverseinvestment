import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'invoice_number', label: 'Invoice Number', type: 'text' },
  { key: 'client_name', label: 'Client Name', type: 'text' },
  { key: 'project_name', label: 'Project Name', type: 'text' },
  { key: 'amount', label: 'Amount', type: 'number' },
  { key: 'payment_terms', label: 'Payment Terms', type: 'select', options: ['net-15', 'net-30', 'net-45', '50-upfront', 'milestone'] },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'sent', 'paid', 'overdue', 'cancelled'] },
  { key: 'issue_date', label: 'Issue Date', type: 'date' },
  { key: 'due_date', label: 'Due Date', type: 'date' },
  { key: 'paid_date', label: 'Paid Date', type: 'date' },
  { key: 'payment_method', label: 'Payment Method', type: 'select', options: ['stripe', 'wire', 'check', 'ach'] },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'invoice_number', label: 'Invoice Number' },
  { key: 'client_name', label: 'Client Name' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'due_date', label: 'Due Date' },
  { key: 'payment_method', label: 'Payment Method' },
]

export default function InvoicesPage() {
  return <CrudPage title="Invoices" endpoint="invoices" fields={fields} columns={columns} />
}
