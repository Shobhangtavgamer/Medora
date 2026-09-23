import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export function PublicLayout() {
  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(37_99_235/0.07),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_88%_18%,rgb(6_182_212/0.06),transparent_70%)]" />
        <div className="absolute -top-44 right-[-12%] size-[34rem] rounded-full bg-brand-400/10 blur-3xl" />
        <div className="absolute -left-24 top-[-4rem] size-[28rem] rounded-full bg-secondary-300/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 size-[32rem] rounded-full bg-navy-300/10 blur-3xl" />
      </div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}