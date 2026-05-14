// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapCRMSyncPage() {
  return (
    <GapFeaturePage
      title="External CRM Sync"
      description="Salesforce / HubSpot / LinkedIn import."
      slug="crm-sync"
      aiResultKey="job"
      fields={[
        { name: 'provider', label: 'Provider', required: true, placeholder: 'salesforce / hubspot / linkedin' },
        { name: 'action', label: 'Action', placeholder: 'import / export / sync', defaultValue: 'import' },
        { name: 'payload', label: 'Payload (JSON)', type: 'json', placeholder: '{"records": []}' },
      ]}
    />
  )
}
