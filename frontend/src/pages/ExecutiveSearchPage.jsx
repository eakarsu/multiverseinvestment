import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'position_title', label: 'Position Title', type: 'text' },
  { key: 'client_name', label: 'Client Name', type: 'text' },
  { key: 'role_level', label: 'Role Level', type: 'select', options: ['c-suite', 'vp', 'director', 'senior-manager', 'manager'] },
  { key: 'department', label: 'Department', type: 'text' },
  { key: 'compensation_min', label: 'Compensation Min', type: 'number' },
  { key: 'compensation_max', label: 'Compensation Max', type: 'number' },
  { key: 'required_skills', label: 'Required Skills', type: 'textarea' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['open', 'screening', 'interviewing', 'offer', 'filled', 'cancelled'] },
  { key: 'candidates_sourced', label: 'Candidates Sourced', type: 'number' },
  { key: 'source_channels', label: 'Source Channels', type: 'text' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'position_title', label: 'Position Title' },
  { key: 'client_name', label: 'Client Name' },
  { key: 'role_level', label: 'Role Level' },
  { key: 'status', label: 'Status' },
  { key: 'location', label: 'Location' },
  { key: 'candidates_sourced', label: 'Candidates Sourced' },
]

export default function ExecutiveSearchPage() {
  return <CrudPage title="Executive Searches" endpoint="executive-search" fields={fields} columns={columns} />
}
