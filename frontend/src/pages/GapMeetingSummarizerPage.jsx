// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapMeetingSummarizerPage() {
  return (
    <GapFeaturePage
      title="AI Meeting Summarizer"
      description="Automated meeting summarizer for meetings.js."
      slug="meeting-summarizer"
      aiResultKey="minutes"
      fields={[
        { name: 'attendees', label: 'Attendees (comma-separated)', type: 'array', placeholder: 'Alice, Bob' },
        { name: 'transcript', label: 'Transcript', type: 'textarea', rows: 8, required: true, placeholder: 'Paste the meeting transcript here...' },
      ]}
    />
  )
}
