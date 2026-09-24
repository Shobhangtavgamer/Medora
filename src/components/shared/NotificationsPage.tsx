import { useEffect, useState } from 'react'
import {
  ArrowLeftRight,
  Bell,
  FileText,
  Inbox,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import type { Notification } from '@/data/notifications'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Workspace } from '@/context/AuthContext'
import { getNotifications, markNotificationsRead } from '@/lib/medoraServices'

type LiveNotification = { id: string; type: string; title: string; message: string; read: boolean; created_at: string }

const kindIcon = {
  request: Inbox,
  record: FileText,
  consent: ShieldCheck,
  referral: ArrowLeftRight,
  system: Bell,
  access: UserCheck,
}

const kindTone: Record<Notification['kind'], 'brand' | 'navy' | 'amber' | 'green' | 'red' | 'violet' | 'slate'> = {
  request: 'navy',
  record: 'violet',
  consent: 'green',
  referral: 'brand',
  system: 'slate',
  access: 'amber',
}

export function NotificationsPage({ role }: { role: Workspace }) {
  const [list, setList] = useState<LiveNotification[]>([])
  const [read, setRead] = useState<Record<string, boolean>>({})
  useEffect(() => { void getNotifications().then(setList).catch(() => setList([])) }, [role])
  const unread = list.filter((n) => !read[n.id] && !n.read).length

  const markAll = () => {
    const next: Record<string, boolean> = {}
    list.forEach((n) => (next[n.id] = true))
    setRead(next)
    void markNotificationsRead()
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description={`${unread} unread in this workspace.`}
      >
        <button onClick={markAll} className="text-sm font-semibold text-brand-600 transition hover:text-brand-700">
          Mark all as read
        </button>
      </PageHeader>

      {list.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-slate-500">You are all caught up.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((n) => {
            const kind: Notification['kind'] = n.type.includes('record') ? 'record' : n.type.includes('access') ? 'access' : 'request'
            const Icon = kindIcon[kind]
            const isUnread = !read[n.id] && !n.read
            return (
              <Card key={n.id} className={cn('transition', isUnread && 'ring-brand-300')}>
                <CardContent className="flex items-start gap-4 p-5">
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-xl ring-1',
                      kindTone[kind] === 'navy'
                          ? 'bg-navy-50 text-navy-600 ring-navy-100'
                          : kindTone[kind] === 'violet'
                            ? 'bg-violet-50 text-violet-600 ring-violet-100'
                            : kindTone[kind] === 'green'
                              ? 'bg-green-50 text-green-600 ring-green-100'
                              : kindTone[kind] === 'amber'
                                ? 'bg-amber-50 text-amber-600 ring-amber-100'
                                : kindTone[kind] === 'red'
                                  ? 'bg-red-50 text-red-600 ring-red-100'
                                : 'bg-slate-100 text-slate-500 ring-slate-200',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="flex items-center gap-2 font-semibold text-slate-900">
                        {n.title}
                        {isUnread ? <span className="size-2 rounded-full bg-brand-600" /> : null}
                      </p>
                      <Badge tone={kindTone[kind]} className="text-[10px]">
                        {kind}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{n.message}</p>
                    <p className="mt-1.5 text-xs text-slate-400">{formatDate(n.created_at)}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}