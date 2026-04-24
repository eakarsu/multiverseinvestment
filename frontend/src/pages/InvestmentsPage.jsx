import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Investment Name', type: 'text' },
  { key: 'type', label: 'Type', type: 'select', options: ['equity', 'debt', 'venture', 'real-estate'] },
  { key: 'amount', label: 'Amount', type: 'number' },
  { key: 'target_return', label: 'Target Return (%)', type: 'number' },
  { key: 'risk_level', label: 'Risk Level', type: 'select', options: ['low', 'medium', 'high'] },
  { key: 'status', label: 'Status', type: 'select', options: ['evaluating', 'active', 'exited', 'passed'] },
  { key: 'sector', label: 'Sector', type: 'text' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
  { key: 'amount', label: 'Amount' },
  { key: 'risk_level', label: 'Risk' },
  { key: 'status', label: 'Status' },
]

export default function InvestmentsPage() {
  return <CrudPage title="Investments" endpoint="investments" fields={fields} columns={columns} />
}
