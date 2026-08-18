import { Hero } from '@/components/hero'
import { LandingSections } from '@/components/landing-sections'
import { FloatingCta } from '@/components/floating-cta'
import { heroContent } from '@/lib/site'

export function LandingPage({ variant }: { variant: 'vendas' | 'lideranca' }) {
  return (
    <main className="relative min-h-screen bg-background pb-24 md:pb-0">
      <Hero content={heroContent[variant]} />
      <LandingSections />
      <FloatingCta />
    </main>
  )
}
