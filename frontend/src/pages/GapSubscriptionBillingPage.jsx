// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../components/GapFeaturePage'
export default function GapSubscriptionBillingPage() {
  return (
    <GapFeaturePage
      title="Subscription Billing"
      description="Recurring-billing model beyond one-off invoices."
      slug="subscription-billing"
      aiResultKey="subscription"
      fields={[
        { name: 'clientId', label: 'Client ID', required: true },
        { name: 'plan', label: 'Plan', required: true, placeholder: 'pro / enterprise' },
        { name: 'amount', label: 'Amount', type: 'number', placeholder: '500' },
        { name: 'interval', label: 'Interval', placeholder: 'monthly / annual', defaultValue: 'monthly' },
      ]}
    />
  )
}
