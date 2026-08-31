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
} from 'lucide-react'
import { CtaButton } from '@/components/cta-button'
import { Reveal } from '@/components/reveal'
import { CountdownTimer } from '@/components/countdown-timer'; import { VimeoFacade } from '@/components/vimeo-facade'
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

const socialProofVideos = [
  { id: '1203831427', title: 'Depoimento em vídeo 1' },
  { id: '1203933198', title: 'Depoimento em vídeo 2' },
  { id: '1203831428', title: 'Depoimento em vídeo 3' },
  { id: '1203831430', title: 'Depoimento em vídeo 4' },
  { id: '1219731043', title: 'Depoimento em vídeo 5' },
  { id: '1219731044', title: 'Depoimento em vídeo 6' },
  { id: '1219731045', title: 'Depoimento em vídeo 7' },
]

const faqItems = [
  {
    question: 'O evento é presencial ou online?',
    answer:
      'A Oratória Suprema é 100% presencial, no Paradiso Hotel, em Macaé/RJ, dia 17 de outubro de 2026, das 8:30h às 19h. Não há transmissão online.',
  },
  {
    question: 'Serve pra quem já fala bem em público?',
    answer:
      'Sim. A imersão trabalha técnicas avançadas de oratória, persuasão e controle emocional que vão além do básico — tanto pra quem trava na hora de falar quanto pra quem já fala bem e quer levar a comunicação a outro nível.',
  },
  {
    question: 'Posso parcelar o investimento?',
    answer:
      'Pode. O investimento individual sai em até 12x de R$ 46,23 (ou R$ 447,00 à vista), e o Duplo em até 12x de R$ 82,43 (ou R$ 797,00 à vista).',
  },
  {
    question: 'Se eu não puder ir depois de me inscrever, tem reembolso?',
    answer:
      'Tem. Você pode solicitar reembolso integral em até 7 dias corridos após a confirmação da inscrição. Depois desse prazo, a vaga fica garantida e não é reembolsável.',
  },
  {
    question: 'O que está incluso no investimento?',
    answer:
      'Certificado de conclusão, apostila, caneta e coffee break nos intervalos — inclusos tanto no Individual quanto no Duplo (pras 2 pessoas).',
  },
]

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

        <Reveal delay={100}>
          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {socialProofVideos.map((video) => (
              <div
                key={video.id}
                className="aspect-[9/16] w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-border/60 bg-card/40 sm:w-[46%] md:w-[240px] lg:w-[260px]"
              >
                <VimeoFacade videoId={video.id} title={video.title} />
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

{/* FAQ - Perguntas frequentes */}
<section className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-20">
  <Reveal>
    <SectionTitle overline="Perguntas frequentes">
      Antes de decidir, tira sua dúvida aqui
    </SectionTitle>
  </Reveal>

  <Reveal delay={100}>
    <div className="mx-auto mt-10 space-y-3">
      {faqItems.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-xl border border-border bg-card/50 p-5 open:border-gold/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground md:text-base">
            {faq.question}
            <span className="shrink-0 text-gold transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  </Reveal>
</section>

      {/* 7. CTA FINAL */}
      <section className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-8 md:py-28">
        <Reveal>
          <h2 className="text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
            Vagas limitadas. 17 de outubro, Macaé.
            <br className="hidden sm:block" /> Garanta a sua agora.
          </h2>
          <CountdownTimer />
          <div className="mt-8 flex justify-center">
            <CtaButton size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </CtaButton>
          </div>
        </Reveal>
      </section>

      {/* 8. RODAPÉ */}
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
