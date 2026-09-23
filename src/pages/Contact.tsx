import { useState } from 'react'
import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Reveal } from '@/components/shared/Reveal'

const channels = [
  {
    icon: Phone,
    title: 'Call us',
    subtitle: 'Mon–Sat, 9am–8pm IST',
    value: '+91 22 4900 0199',
  },
  {
    icon: Mail,
    title: 'Email us',
    subtitle: 'Replies within 4 hours',
    value: 'care@medora.app',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    subtitle: 'Mumbai headquarters',
    value: '12/E1, Next Galla Lane, Andheri East',
  },
  {
    icon: Clock,
    title: 'Support hours',
    subtitle: '24/7 for urgent care',
    value: 'Every day of the year',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <>
<section className="bg-gradient-to-b from-brand-50 to-slate-50 py-16 sm:py-20">
        <Reveal>
        <div className="container-site max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
            Contact us
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            We're here to help
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Questions about a bill, a record, or your coverage? Reach out — a real human
            replies quickly.
          </p>
        </div>
        </Reveal>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Channels */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ icon: Icon, title, subtitle, value }, i) => (
              <Reveal key={title} delay={i * 80} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                  <p className="mt-1 text-sm font-semibold text-brand-700">{value}</p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal delay={120} className="h-full">
          <div className="h-full rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-100">
                  <CheckCircle2 className="size-7" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Message sent</h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-500">
                    Thanks for reaching out. Our care team will get back to you within 4 hours.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <MessageSquare className="size-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900">Send a message</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <Input id="name" placeholder="Ava Thompson" required />
                  </Field>
                  <Field label="Email" required>
                    <Input id="email" type="email" placeholder="ava@example.com" required />
                  </Field>
                </div>
                <Field label="Topic">
                  <Select id="topic" defaultValue="billing">
                    <option value="billing">Billing & insurance</option>
                    <option value="records">Health records</option>
                    <option value="appointments">Appointments</option>
                    <option value="doctors">Doctor partnership</option>
                    <option value="other">Something else</option>
                  </Select>
                </Field>
                <Field label="Message" required>
                  <Textarea
                    id="message"
                    placeholder="How can we help? The more detail the better."
                    rows={5}
                    required
                  />
                </Field>
                <Button type="submit" size="lg" fullWidth>
                  Send message
                </Button>
                <p className="text-center text-xs text-slate-400">
                  For medical emergencies, call 112 or visit the nearest emergency room.
                </p>
              </form>
            )}
          </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}