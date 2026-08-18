import Image from 'next/image'
import {
  Check,
  X,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Camera,
  MessageCircle,
  Quote,
} from 'lucide-react'
import { CtaButton } from '@/components/cta-button'
import { Reveal } from '@/components/reveal'
import {
  CTA_LABEL,
  audienceFit,
  audienceNotFit,
  curriculum,
  eventDetails,
  contact,
} from '@/lib/site'

function SectionTitle({
  overline,
  children,
}: {
  overline?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {overline ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {overline}
        </p>
      ) : null}
      <h2 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl md:text-4xl">
        {children}
      </h2>
    </div>
  )
}

export function LandingSections() {
  return (
    <>
      {/* 1. O QUE É O TREINAMENTO */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <SectionTitle overline="O que é o treinamento">
            Técnica aplicável no dia seguinte — não palestra motivacional
          </SectionTitle>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base leading-relaxed text-muted-foreground md:text-lg">
            Oratória Suprema é o treinamento que une oratória técnica, PNL e
            inteligência emocional. Um dia inteiro de imersão prática. Não é
            palestra motivacional, é técnica aplicável no dia seguinte.
          </p>
        </Reveal>
      </section>

      {/* 2. PARA QUEM É / PARA QUEM NÃO É */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionTitle overline="Antes de garantir sua vaga">
            É para você — ou definitivamente não é
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-gold/30 bg-card/60 p-6 md:p-8">
              <h3 className="mb-5 font-serif text-xl text-gold md:text-2xl">
                É para você
              </h3>
              <ul className="space-y-4">
                {audienceFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-pretty text-sm leading-relaxed text-foreground/90 md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-border bg-card/40 p-6 md:p-8">
              <h3 className="mb-5 font-serif text-xl text-muted-foreground md:text-2xl">
                Não é para você
              </h3>
              <ul className="space-y-4">
                {audienceNotFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <X className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. CONTEÚDO PROGRAMÁTICO */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionTitle overline="Conteúdo programático">
            O que você vai dominar na imersão
          </SectionTitle>
        </Reveal>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
          {curriculum.map((item, i) => (
            <Reveal as="li" key={item} delay={(i % 2) * 100}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card/50 p-4 md:p-5">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="text-pretty text-sm leading-relaxed text-foreground/90 md:text-base">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* 4. SOBRE O INSTRUTOR */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <Reveal className="mx-auto w-full max-w-sm md:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border shadow-xl shadow-black/40">
              <Image
                src="/instrutor.jpg"
                alt="Retrato de Jota Remédios"
                width={900}
                height={1350}
                loading="lazy"
                sizes="(min-width: 768px) 40vw, 90vw"
                className="aspect-[3/4] h-auto w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Sobre o instrutor
            </p>
            <h2 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl md:text-4xl">
              Jota Remédios
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Treinador comportamental, Master Coach, formação em PNL,
              especialista em DISC, formação de palestrante, pós-graduação em
              liderança e coaching em gestão de pessoas.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. PROVA SOCIAL */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionTitle overline="Prova social">
            Quem viveu a imersão, conta
          </SectionTitle>
        </Reveal>

        {/*
          CARROSSEL DE PROVA SOCIAL (VÍDEOS)
          Os embeds de vídeo (YouTube, Instagram, etc.) entram aqui.
          Cada card abaixo é um placeholder pronto para receber um <iframe> de embed.
          Ex.: <iframe src="https://www.youtube.com/embed/VIDEO_ID" ... />
        */}
        <Reveal delay={100}>
          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-[9/16] min-w-[75%] shrink-0 snap-center flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center sm:min-w-[55%] md:aspect-video md:min-w-0"
              >
                {/* SUBSTITUIR POR: <iframe className="h-full w-full rounded-2xl" src="..." allowFullScreen /> */}
                <Quote className="size-8 text-gold/60" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">
                  Depoimento em vídeo em breve
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 6. DETALHES DO EVENTO */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionTitle overline="Detalhes do evento">
            Onde e quando acontece
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {eventDetails.map((detail, i) => {
            const Icon = [Calendar, Clock, MapPin][i]
            return (
              <Reveal key={detail.label} delay={i * 100}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-7 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="text-pretty font-serif text-lg text-foreground md:text-xl">
                    {detail.value}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 7. INVESTIMENTO */}
      <section
        className="relative w-full overflow-hidden py-16 md:py-24"
        style={{
          backgroundImage: 'url(/textura-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-3xl px-4 md:px-8">
          <Reveal>
            <div className="rounded-3xl border border-gold/30 bg-card/70 p-7 text-center backdrop-blur-sm md:p-12">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                Investimento
              </p>
              <p className="text-base text-muted-foreground line-through">
                De R$ 997,00
              </p>
              <p className="mt-2 font-serif text-4xl leading-none text-foreground md:text-6xl">
                R$ 447,00
                <span className="ml-2 align-middle text-base font-normal text-muted-foreground md:text-xl">
                  à vista
                </span>
              </p>
              <p className="mt-3 text-base text-foreground/90 md:text-lg">
                ou 12x de R$ 46,20
              </p>

              <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Inclui certificado de conclusão, apostila, caneta e coffee break
                nos intervalos.
              </p>

              <div className="mt-8 flex justify-center">
                <CtaButton size="lg" className="w-full sm:w-auto">
                  {CTA_LABEL}
                </CtaButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-8 md:py-28">
        <Reveal>
          <h2 className="text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
            Vagas limitadas. 17 de outubro, Macaé.
            <br className="hidden sm:block" /> Garanta a sua agora.
          </h2>
          <div className="mt-8 flex justify-center">
            <CtaButton size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </CtaButton>
          </div>
        </Reveal>
      </section>

      {/* 9. RODAPÉ */}
      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <div>
              <p className="font-serif text-xl text-foreground">
                Oratória Suprema
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Jota Remédios — Treinador comportamental
              </p>
            </div>

            <ul className="flex flex-col items-center gap-4 md:items-end">
              <li className="flex items-center gap-3">
                <MessageCircle className="size-5 text-gold" aria-hidden="true" />
                <a
                  href={contact.whatsappUrl}
                  className="text-sm text-foreground/90 transition-colors hover:text-gold"
                >
                  {contact.phones.join(' / ')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-gold" aria-hidden="true" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-foreground/90 transition-colors hover:text-gold"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Camera className="size-5 text-gold" aria-hidden="true" />
                <a
                  href={contact.instagramUrl}
                  className="text-sm text-foreground/90 transition-colors hover:text-gold"
                >
                  {contact.instagram}
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 border-t border-border pt-6">
            <a
              href={contact.whatsappUrl}
              aria-label="WhatsApp"
              className="flex size-11 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="E-mail"
              className="flex size-11 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Mail className="size-5" aria-hidden="true" />
            </a>
            <a
              href={contact.instagramUrl}
              aria-label="Instagram"
              className="flex size-11 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Camera className="size-5" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jota Remédios. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  )
}
