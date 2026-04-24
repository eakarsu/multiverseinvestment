import CrudPage from '../components/CrudPage'

const fields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'attendees', label: 'Attendees', type: 'text' },
  { key: 'meeting_date', label: 'Meeting Date', type: 'date' },
  { key: 'meeting_time', label: 'Meeting Time', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'type', label: 'Type', type: 'select', options: ['strategy-call', 'client-review', 'internal', 'pitch', 'follow-up'] },
  { key: 'status', label: 'Status', type: 'select', options: ['scheduled', 'completed', 'cancelled'] },
  { key: 'agenda', label: 'Agenda', type: 'textarea' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'attendees', label: 'Attendees' },
  { key: 'meeting_date', label: 'Meeting Date' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'location', label: 'Location' },
]

export default function MeetingsPage() {
  return <CrudPage title="Meetings" endpoint="meetings" fields={fields} columns={columns} />
}
