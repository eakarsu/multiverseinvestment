import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'client_name', label: 'Client', type: 'text' },
  { key: 'value', label: 'Value', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'submitted', 'won', 'lost'] },
  { key: 'submitted_date', label: 'Submitted Date', type: 'date' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

const columns = [
  { key: 'title', label: 'Proposal' },
  { key: 'client_name', label: 'Client' },
  { key: 'value', label: 'Value' },
  { key: 'status', label: 'Status' },
  { key: 'submitted_date', label: 'Submitted' },
]

export default function ProposalsPage() {
  return <CrudPage title="Proposals" endpoint="proposals" fields={fields} columns={columns} />
}
