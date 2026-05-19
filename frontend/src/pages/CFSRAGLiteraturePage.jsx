// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function CFSRAGLiteraturePage() {
  return (
    <GapFeaturePage
      title="RAG over Investment Literature"
      description="Ground answers in supplied passages (annual reports, white papers)."
      endpoint="/api/ai-extras/rag-literature"
      aiResultKey="answer"
      fields={[
        { name: 'question', label: 'Question', type: 'textarea', required: true, rows: 2 },
        { name: 'documents', label: 'Passages (comma-separated)', type: 'array', placeholder: 'passage1, passage2, ...' },
      ]}
    />
  )
}
