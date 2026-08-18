import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing-page'

export const metadata: Metadata = {
  title: 'Oratória Suprema | Feche mais negócios',
  description:
    'Você não perdeu a venda pro preço. Perdeu porque falou mal. Imersão de oratória com Jota Remédios — 17 de outubro, Macaé/RJ.',
}

export default function VendasPage() {
  return <LandingPage variant="vendas" />
}
