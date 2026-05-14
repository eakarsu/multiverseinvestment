// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapCalendarIntegrationPage() {
  return (
    <GapFeaturePage
      title="Calendar Integration"
      description="Google / Outlook calendar event creation for meetings."
      slug="calendar-integration"
      aiResultKey="event"
      fields={[
        { name: 'provider', label: 'Provider', placeholder: 'google / outlook', defaultValue: 'google' },
        { name: 'accessToken', label: 'Access Token', required: true, placeholder: 'OAuth bearer token' },
        { name: 'eventTitle', label: 'Event Title', required: true },
        { name: 'startsAt', label: 'Starts At (ISO)', placeholder: '2026-06-01T15:00:00Z' },
        { name: 'durationMinutes', label: 'Duration (minutes)', type: 'number', defaultValue: '30' },
      ]}
    />
  )
}
