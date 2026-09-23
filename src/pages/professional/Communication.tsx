import { useAuth } from '@/context/AuthContext'
import { PageHeader } from '@/components/shared/PageHeader'
import { ConversationList } from '@/components/shared/ConversationList'

export default function Communication() {
  const { user } = useAuth()
  return (
    <div className="space-y-6">
      <PageHeader
        title="Communication"
        description={`Secure messages with patients and colleagues · ${user?.professionalProfile.organisation ?? 'Your practice'}`}
      />
      <ConversationList workspace="professional" />
    </div>
  )
}