import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { MetaPixel } from '@/components/meta-pixel'
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

export const metadata: Metadata = {
  title: 'Oratória Suprema | Jota Remédios',
  description:
    'Imersão presencial de oratória, PNL e inteligência emocional com Jota Remédios. 17 de outubro, Macaé/RJ. Vagas limitadas.',
  generator: 'v0.app',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
