import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing-page'

export const metadata: Metadata = {
  title: 'Oratória Suprema | Autoridade de verdade',
  description:
    'Cargo de líder você já tem. Respeito, ainda não. Imersão de comunicação e liderança com Jota Remédios — 17 de outubro, Macaé/RJ.',
}

export default function LiderancaPage() {
  return <LandingPage variant="lideranca" />
}
