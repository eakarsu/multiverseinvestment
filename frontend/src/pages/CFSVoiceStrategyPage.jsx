// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function CFSVoiceStrategyPage() {
  return (
    <GapFeaturePage
      title="Voice-enabled Strategy Sessions"
      description="Transcript -> minutes + action items."
      endpoint="/api/ai-extras/strategy-minutes"
      aiResultKey="minutes"
      fields={[
        { name: 'attendees', label: 'Attendees (comma-separated)', type: 'array', placeholder: 'Alice, Bob, Carol' },
        { name: 'transcript', label: 'Transcript', type: 'textarea', required: true, rows: 8 },
      ]}
    />
  )
}
