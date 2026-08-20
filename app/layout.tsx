import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { MetaPixel } from '@/components/meta-pixel'
import { QualificationFormProvider } from '@/components/qualification-form'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const SITE_URL = 'https://oratoria-115jaol8z-jota-remedios.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Oratória Suprema | Jota Remédios',
  description:
    'Imersão presencial de oratória, PNL e inteligência emocional com Jota Remédios. 17 de outubro, Macaé/RJ. Vagas limitadas.',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Oratória Suprema | Jota Remédios',
    description:
      'Imersão presencial de oratória, PNL e inteligência emocional com Jota Remédios. 17 de outubro, Macaé/RJ. Vagas limitadas.',
    url: SITE_URL,
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
    title: 'Oratória Suprema | Jota Remédios',
    description:
      'Imersão presencial de oratória, PNL e inteligência emocional com Jota Remédios. 17 de outubro, Macaé/RJ. Vagas limitadas.',
    images: ['/hero-desktop.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0b1120',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} bg-background`}
    >
      <head>
        <MetaPixel />
      </head>
      <body className="font-sans antialiased">
        <QualificationFormProvider>{children}</QualificationFormProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
