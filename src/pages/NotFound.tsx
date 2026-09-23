import { Link } from 'react-router-dom'
import { Home, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/shared/Reveal'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-brand-50 to-slate-50 px-4 py-16">
      <Reveal>
      <div className="text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-white shadow-card ring-1 ring-slate-200">
          <Stethoscope className="size-10 text-brand-500" />
        </div>
        <p className="mt-8 font-display text-7xl font-extrabold tracking-tight text-brand-600">
          404
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">
          This page isn’t in your chart
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          The page you’re looking for was moved, deleted, or never existed. Let’s get you
          back to care.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button size="lg">
              <Home className="size-4.5" />
              Back to home
            </Button>
          </Link>
          <Link to="/patient">
            <Button variant="outline" size="lg">
              Open patient workspace
            </Button>
          </Link>
        </div>
      </div>
      </Reveal>
    </section>
  )
}