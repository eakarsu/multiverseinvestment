import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'order_number', label: 'Order Number', type: 'text' },
  { key: 'client_name', label: 'Client Name', type: 'text' },
  { key: 'service', label: 'Service', type: 'text' },
  { key: 'amount', label: 'Amount', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'] },
  { key: 'order_date', label: 'Order Date', type: 'date' },
  { key: 'delivery_date', label: 'Delivery Date', type: 'date' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'order_number', label: 'Order Number' },
  { key: 'client_name', label: 'Client Name' },
  { key: 'service', label: 'Service' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'order_date', label: 'Order Date' },
]

export default function OrdersPage() {
  return <CrudPage title="Orders" endpoint="orders" fields={fields} columns={columns} />
}
