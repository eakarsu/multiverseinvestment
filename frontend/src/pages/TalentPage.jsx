import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'skills', label: 'Skills', type: 'text' },
  { key: 'experience_years', label: 'Experience (Years)', type: 'number' },
  { key: 'hourly_rate', label: 'Hourly Rate', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['available', 'assigned', 'unavailable'] },
  { key: 'bio', label: 'Bio', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience_years', label: 'Experience' },
  { key: 'status', label: 'Status' },
]

export default function TalentPage() {
  return <CrudPage title="Talent" endpoint="talent" fields={fields} columns={columns} />
}
