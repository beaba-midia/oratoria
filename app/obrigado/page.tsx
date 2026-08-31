import type { Metadata } from 'next'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { CheckoutLink } from '@/components/checkout-link'
import { CHECKOUT_URL, CHECKOUT_URL_DUPLO, eventDetails } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Garanta sua vaga | Oratória Suprema',
  robots: {
    index: false,
    follow: false,
  },
}

function buildCheckoutHref(base: string, params: URLSearchParams) {
  const separator = base.includes('?') ? '&' : '?'
  const query = params.toString()
  return query ? `${base}${separator}${query}` : base
}

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await searchParams

  const params = new URLSearchParams()
  for (const key of ['name', 'email', 'phone', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const value = resolvedParams[key]
    if (typeof value === 'string' && value) params.set(key, value)
  }

  const nome = typeof resolvedParams.name === 'string' ? resolvedParams.name : ''
  const primeiroNome = nome.trim().split(/\s+/)[0] || ''

  const individualHref = buildCheckoutHref(CHECKOUT_URL, params)
  const duploHref = buildCheckoutHref(CHECKOUT_URL_DUPLO, params)

  return (
    <main className="relative min-h-screen bg-background">
      <section className="mx-auto w-full max-w-3xl px-4 pb-8 pt-16 text-center md:px-8 md:pt-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
          Cadastro confirmado
        </p>
        <h1 className="text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
          {primeiroNome ? `Recebemos seus dados, ${primeiroNome}!` : 'Recebemos seus dados!'}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Falta só um passo: garantir sua vaga na Oratória Suprema. As condições de investimento
          estão logo abaixo.
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {eventDetails.map((detail, i) => {
            const Icon = [Calendar, Clock, MapPin][i]
            return (
              <div
                key={detail.label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 text-left"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="text-pretty text-sm font-medium text-foreground">{detail.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Investimento
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-gold/30 bg-card/70 p-7 text-center backdrop-blur-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
                Individual
              </p>
              <p className="mt-1 text-xs text-muted-foreground">1 pessoa</p>
              <p className="mt-4 text-base text-muted-foreground line-through">De R$ 997,00</p>
              <p className="mt-2 font-serif text-4xl leading-none text-foreground md:text-5xl">
                12x de R$ 46,23
              </p>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">ou R$ 447,00 à vista</p>
              <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                Inclui certificado de conclusão, apostila, caneta e coffee break nos intervalos.
              </p>
              <div className="mt-8 flex justify-center">
                <CheckoutLink href={individualHref} className="w-full">
                  Garantir minha vaga
                </CheckoutLink>
              </div>
            </div>
            <div className="rounded-3xl border border-gold/30 bg-card/70 p-7 text-center backdrop-blur-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
                Duplo
              </p>
              <p className="mt-1 text-xs text-muted-foreground">2 pessoas</p>
              <p className="mt-4 font-serif text-4xl leading-none text-foreground md:text-5xl">
                12x de R$ 82,43
              </p>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">ou R$ 797,00 à vista</p>
              <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                Inclui certificado de conclusão, apostila, caneta e coffee break nos intervalos para
                as 2 pessoas.
              </p>
              <div className="mt-8 flex justify-center">
                <CheckoutLink href={duploHref} className="w-full">
                  Garantir minhas vagas
                </CheckoutLink>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
            Reembolso integral garantido em até 7 dias corridos após a confirmação da inscrição.
          </p>
        </div>
      </section>
    </main>
  )
}
