import Image from 'next/image'
import { CtaButton } from '@/components/cta-button'
import { CTA_LABEL, type HeroContent } from '@/lib/site'

export function Hero({ content }: { content: HeroContent }) {
  return (
    <header className="relative flex min-h-[90vh] w-full items-end overflow-hidden md:min-h-screen">
      {/* Imagem de fundo — full screen atrás do conteúdo */}
      <div className="absolute inset-0 z-0">
        {/* Mobile (retrato) */}
        <Image
                src="/banner%20mobile%202.1.png"
        alt="Jota Remédios, retrato profissional com uma águia estilizada ao fundo em tons de azul-marinho"
          fill
          priority
          sizes="100vw"
        className="object-cover object-[50%_70%] md:hidden"
        />
        {/* Desktop (paisagem) */}
        <Image
        src="/banner%20desktop%202.png"
        alt="Jota Remédios, retrato profissional com uma águia estilizada ao fundo em tons de azul-marinho"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0px"
        className="hidden object-cover object-[73%_25%] md:block"
        />
        {/* Overlay em gradiente para contraste e legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background/70" />
      </div>

      {/* Mobile: badge + headline fixados no topo */} <div className="absolute inset-x-0 top-0 z-10 px-4 pt-24 text-center md:hidden"> <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold"> Imersão presencial • Macaé/RJ </p> <h1 className="text-balance font-serif text-[1.85rem] leading-[1.15] tracking-tight text-foreground sm:text-4xl"> {content.headline} </h1> </div> {/* Conteúdo por cima do overlay */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-6 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-xl md:text-left">
          <p className="mb-4 hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold md:inline-flex">
            Imersão presencial • Macaé/RJ
          </p>

          <h1 className="hidden text-balance font-serif text-[1.85rem] leading-[1.15] tracking-tight text-foreground sm:text-4xl md:block md:text-5xl lg:text-[3.4rem]">
            {content.headline}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.subheadline}
          </p>

          {/* Bloco de dor */}
          <div className="mx-auto mt-6 hidden max-w-2xl rounded-2xl border border-border bg-card/85 px-5 py-5 backdrop-blur-md md:block md:px-7 md:py-6">
            <p className="text-pretty text-[0.95rem] leading-relaxed text-foreground/90 md:text-base">
              {content.pain}
            </p>
          </div>

          <div className="mt-7 flex justify-center">
            <CtaButton size="lg" href="#investimento" className="w-full sm:w-auto">
              {CTA_LABEL}
            </CtaButton>
          </div>
        </div>
      </div>
    </header>
  )
}
