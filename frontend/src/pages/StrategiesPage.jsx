import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'client_name', label: 'Client', type: 'text' },
  { key: 'objective', label: 'Objective', type: 'textarea' },
  { key: 'approach', label: 'Approach', type: 'textarea' },
  { key: 'timeline', label: 'Timeline', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'in-review', 'approved', 'active'] },
  { key: 'kpi_targets', label: 'KPI Targets', type: 'textarea' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'client_name', label: 'Client' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'status', label: 'Status' },
]

export default function StrategiesPage() {
  return <CrudPage title="Strategies" endpoint="strategies" fields={fields} columns={columns} />
}
