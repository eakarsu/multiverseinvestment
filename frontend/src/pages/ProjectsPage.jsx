import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Project Name', type: 'text' },
  { key: 'client_name', label: 'Client', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['planning', 'in-progress', 'completed', 'on-hold'] },
  { key: 'budget', label: 'Budget', type: 'number' },
  { key: 'start_date', label: 'Start Date', type: 'date' },
  { key: 'end_date', label: 'End Date', type: 'date' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Project' },
  { key: 'client_name', label: 'Client' },
  { key: 'status', label: 'Status' },
  { key: 'budget', label: 'Budget' },
  { key: 'start_date', label: 'Start Date' },
]

export default function ProjectsPage() {
  return <CrudPage title="Projects" endpoint="projects" fields={fields} columns={columns} />
}
