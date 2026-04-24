import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'deal_name', label: 'Deal Name', type: 'text' },
  { key: 'client_name', label: 'Client Name', type: 'text' },
  { key: 'contact_email', label: 'Contact Email', type: 'text' },
  { key: 'stage', label: 'Stage', type: 'select', options: ['inquiry', 'discussion', 'qualified', 'proposal', 'negotiation', 'won', 'lost'] },
  { key: 'value', label: 'Value', type: 'number' },
  { key: 'service_type', label: 'Service Type', type: 'text' },
  { key: 'source', label: 'Source', type: 'select', options: ['website', 'referral', 'linkedin', 'conference', 'partner', 'cold-outreach'] },
  { key: 'region', label: 'Region', type: 'select', options: ['MENA', 'GCC', 'Europe', 'North America', 'Central Asia', 'Asia-Pacific'] },
  { key: 'probability', label: 'Probability', type: 'number' },
  { key: 'expected_close', label: 'Expected Close', type: 'date' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'deal_name', label: 'Deal Name' },
  { key: 'client_name', label: 'Client Name' },
  { key: 'stage', label: 'Stage' },
  { key: 'value', label: 'Value' },
  { key: 'region', label: 'Region' },
  { key: 'probability', label: 'Probability' },
]

export default function PipelinePage() {
  return <CrudPage title="Pipeline" endpoint="pipeline" fields={fields} columns={columns} />
}
