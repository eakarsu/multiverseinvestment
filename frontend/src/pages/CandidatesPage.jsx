import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'role_applied', label: 'Role Applied', type: 'text' },
  { key: 'experience_years', label: 'Experience Years', type: 'number' },
  { key: 'skills', label: 'Skills', type: 'text' },
  { key: 'current_company', label: 'Current Company', type: 'text' },
  { key: 'expected_salary', label: 'Expected Salary', type: 'number' },
  { key: 'industry', label: 'Industry', type: 'text' },
  { key: 'region', label: 'Region', type: 'select', options: ['North America', 'Europe', 'MENA', 'Asia Pacific', 'Africa', 'Central Asia', 'Global'] },
  { key: 'role_level', label: 'Role Level', type: 'select', options: ['C-Suite', 'VP', 'Director', 'Manager', 'Senior', 'Mid-Level', 'Junior'] },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'availability', label: 'Availability', type: 'select', options: ['immediate', '2-weeks', '1-month', '3-months', 'not-available'] },
  { key: 'resume_url', label: 'Resume URL', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['screening', 'interviewing', 'offered', 'placed', 'rejected'] },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role_applied', label: 'Role Applied' },
  { key: 'current_company', label: 'Current Company' },
  { key: 'experience_years', label: 'Experience Years' },
  { key: 'region', label: 'Region' },
  { key: 'role_level', label: 'Role Level' },
  { key: 'status', label: 'Status' },
  { key: 'expected_salary', label: 'Expected Salary' },
]

export default function CandidatesPage() {
  return <CrudPage title="Candidates" endpoint="candidates" fields={fields} columns={columns} />
}
