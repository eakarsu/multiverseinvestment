// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapRoleSpecPage() {
  return (
    <GapFeaturePage
      title="AI Role-Spec Generator"
      description="Talent brief / role-spec generator for executive-search.js."
      slug="role-spec-generator"
      aiResultKey="spec"
      fields={[
        { name: 'role', label: 'Role Title', required: true, placeholder: 'VP Engineering' },
        { name: 'seniority', label: 'Seniority', placeholder: 'Senior / Director / VP' },
        { name: 'mustHaves', label: 'Must-Have Skills (comma-separated)', type: 'array', placeholder: 'TypeScript, Kubernetes, Mentorship' },
      ]}
    />
  )
}
