import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { HowItWorks } from '@/components/home/HowItWorks'
import { RoleSections } from '@/components/home/RoleSections'
import { AIInBrief } from '@/components/home/AIInBrief'
import { PrivacyInBrief } from '@/components/home/PrivacyInBrief'
import { Stats } from '@/components/home/Stats'
import { Features } from '@/components/home/Features'
import { Services } from '@/components/home/Services'
import { Testimonials } from '@/components/home/Testimonials'
import { CTA } from '@/components/home/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <RoleSections />
      <AIInBrief />
      <PrivacyInBrief />
      <Services compact />
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
    </>
  )
}