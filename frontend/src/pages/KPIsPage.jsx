import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'KPI Name', type: 'text' },
  { key: 'category', label: 'Category', type: 'select', options: ['financial', 'operational', 'client', 'growth'] },
  { key: 'value', label: 'Value', type: 'number' },
  { key: 'target', label: 'Target', type: 'number' },
  { key: 'unit', label: 'Unit', type: 'text' },
  { key: 'trend', label: 'Trend', type: 'select', options: ['up', 'down', 'stable'] },
  { key: 'period', label: 'Period', type: 'text' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'KPI' },
  { key: 'category', label: 'Category' },
  { key: 'value', label: 'Value' },
  { key: 'target', label: 'Target' },
  { key: 'trend', label: 'Trend' },
]

export default function KPIsPage() {
  return <CrudPage title="KPIs" endpoint="kpis" fields={fields} columns={columns} />
}
