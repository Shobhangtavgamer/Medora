import { PageHeader } from '@/components/shared/PageHeader'
import { ConversationList } from '@/components/shared/ConversationList'

export default function Messages() {
  return (
    <div className="space-y-6">
      <PageHeader title="Communication" description="Secure messages sent and received through your care network." />
      <ConversationList workspace="patient" />
    </div>
  )
}