import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'project_name', label: 'Project', type: 'text' },
  { key: 'assigned_to', label: 'Assigned To', type: 'text' },
  { key: 'priority', label: 'Priority', type: 'select', options: ['low', 'medium', 'high', 'critical'] },
  { key: 'status', label: 'Status', type: 'select', options: ['pending', 'in-progress', 'completed', 'blocked'] },
  { key: 'due_date', label: 'Due Date', type: 'date' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

const columns = [
  { key: 'title', label: 'Task' },
  { key: 'project_name', label: 'Project' },
  { key: 'assigned_to', label: 'Assigned To' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
]

export default function TasksPage() {
  return <CrudPage title="Tasks" endpoint="tasks" fields={fields} columns={columns} />
}
