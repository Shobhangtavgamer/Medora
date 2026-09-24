import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/Feedback'
import type { Workspace } from '@/context/AuthContext'
import { createConversation, getConversations, sendConversationMessage, type LiveConversation } from '@/lib/medoraServices'
import { cn } from '@/lib/utils'

function resourceHref(workspace: Workspace, kind: string): string {
  if (kind === 'Referral') return workspace === 'professional' ? '/professional/referrals' : '/patient/my-health/timeline'
  if (kind === 'Request') return workspace === 'patient' ? '/patient/requests' : '/professional/requests'
  return workspace === 'patient' ? '/patient/records' : '/professional/patients'
}

function resourceLabel(kind: string): string {
  if (kind === 'Record') return 'View record'
  if (kind === 'Referral') return 'View referral'
  return 'View request'
}

export function ConversationList({ workspace }: { workspace: Workspace }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [convos, setConvos] = useState<LiveConversation[]>([])
  const [draft, setDraft] = useState('')
  const [recipient, setRecipient] = useState('')
  const [conversationError, setConversationError] = useState<string | null>(null)
  useEffect(() => { void getConversations().then(setConvos).catch(() => setConvos([])) }, [workspace])
  const active = convos.find((c) => c.id === activeId) ?? null

  if (convos.length === 0) {
    return <EmptyState title="No messages" description="Start a secure conversation with another Medora user." action={<form className="flex w-full max-w-sm gap-2" onSubmit={async (event) => { event.preventDefault(); setConversationError(null); try { await createConversation(recipient); setConvos(await getConversations()); setRecipient('') } catch (error) { setConversationError(error instanceof Error ? error.message : 'Unable to start conversation.') } }}><input value={recipient} onChange={(event) => setRecipient(event.target.value)} type="email" required placeholder="Recipient email" className="min-w-0 flex-1 rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-slate-200" /><button className="rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white">Start</button>{conversationError ? <span className="text-xs text-red-600">{conversationError}</span> : null}</form>} />
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(280px,340px)_1fr]">
      <div className="space-y-2.5">
        {convos.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={cn(
              'w-full rounded-2xl bg-white p-4 text-left ring-1 ring-slate-200 shadow-soft transition',
              activeId === c.id ? 'ring-2 ring-brand-500' : 'hover:bg-slate-50',
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white',
                  c.avatarColor,
                )}
              >
                {c.participant.replace('Dr. ', '').charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-semibold text-slate-900">{c.participant}</p>
                  <span className="shrink-0 text-[11px] text-slate-400">{c.time}</span>
                </div>
                <p className="truncate text-xs text-slate-500">{c.participantRole}</p>
              </div>
            </div>
            <p className="mt-2 truncate text-sm text-slate-600">{c.preview}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="truncate text-xs text-slate-400">
                {c.messages.length} message{c.messages.length === 1 ? '' : 's'}
              </p>
              {c.unread > 0 ? <Badge tone="green" className="text-[10px]">{c.unread} new</Badge> : null}
            </div>
          </button>
        ))}
      </div>

      <div className="flex min-h-[420px] flex-col rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft">
        {active ? (
          <>
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <span
                className={cn(
                  'flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white',
                  active.avatarColor,
                )}
              >
                {active.participant.replace('Dr. ', '').charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{active.participant}</p>
                <p className="text-xs text-slate-500">{active.participantRole}</p>
              </div>
              {active.online ? (
                <span className="ml-auto text-xs font-medium text-green-600">● Online</span>
              ) : null}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {active.messages.map((m) => (
                <div key={m.id} className={cn('flex flex-col', m.from === 'me' ? 'items-end' : 'items-start')}>
                  {m.resource ? (
                    <a
                      href={resourceHref(workspace, m.resource.kind)}
                      className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 py-1 pl-3 pr-1 text-xs
                        font-semibold text-brand-700 hover:bg-brand-100"
                    >
                      {m.resource.label}
                      <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">
                        {resourceLabel(m.resource.kind)}
                      </span>
                    </a>
                  ) : null}
                  <p
                    className={cn(
                      'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      m.from === 'me'
                        ? 'rounded-br-sm bg-brand-600 text-white'
                        : 'rounded-bl-sm bg-slate-100 text-slate-700',
                    )}
                  >
                    {m.text}
                  </p>
                  <span className="mt-1 text-[11px] text-slate-400">{m.time}</span>
                </div>
              ))}
            </div>

            <form className="flex items-center gap-2 border-t border-slate-100 px-4 py-3" onSubmit={async (e) => { e.preventDefault(); if (!draft.trim() || !active) return; await sendConversationMessage(active.id, draft.trim()); setDraft(''); const updated = await getConversations(); setConvos(updated) }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a message…"
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-2.5 text-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700"
              >
                <Send className="size-4.5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-slate-400">
            Select a conversation to view it here.
          </div>
        )}
      </div>
    </div>
  )
}