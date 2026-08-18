import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing-page'

const title = 'Oratória Suprema | Feche mais negócios'
const description =
  'Você não perdeu a venda pro preço. Perdeu porque falou mal. Imersão de oratória com Jota Remédios — 17 de outubro, Macaé/RJ.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/vendas',
  },
  openGraph: {
    title,
    description,
    url: '/vendas',
    siteName: 'Oratória Suprema',
    images: [
      {
        url: '/hero-desktop.png',
        width: 1448,
        height: 1086,
        alt: 'Oratória Suprema com Jota Remédios',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/hero-desktop.png'],
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Oratória Suprema',
  description,
  startDate: '2026-10-17T08:30:00-03:00',
  endDate: '2026-10-17T19:00:00-03:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Paradiso Hotel',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Macaé',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
  },
  organizer: {
    '@type': 'Person',
    name: 'Jota Remédios',
  },
  offers: {
    '@type': 'Offer',
    price: '447.00',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
  },
}

export default function VendasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <LandingPage variant="vendas" />
    </>
  )
}
