import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'amount', label: 'Amount', type: 'number' },
  { key: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'AED', 'SAR'] },
  { key: 'service', label: 'Service', type: 'text' },
  { key: 'client_name', label: 'Client Name', type: 'text' },
  { key: 'invoice_number', label: 'Invoice Number', type: 'text' },
  { key: 'payment_method', label: 'Payment Method', type: 'select', options: ['stripe', 'wire', 'check', 'ach', 'credit-card'] },
  { key: 'status', label: 'Status', type: 'select', options: ['pending', 'completed', 'failed', 'refunded'] },
  { key: 'receipt_url', label: 'Receipt URL', type: 'text' },
  { key: 'payment_date', label: 'Payment Date', type: 'date' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'client_name', label: 'Client Name' },
  { key: 'service', label: 'Service' },
  { key: 'amount', label: 'Amount' },
  { key: 'currency', label: 'Currency' },
  { key: 'payment_method', label: 'Payment Method' },
  { key: 'status', label: 'Status' },
  { key: 'payment_date', label: 'Payment Date' },
]

export default function PaymentsPage() {
  return <CrudPage title="Payments" endpoint="payments" fields={fields} columns={columns} />
}
