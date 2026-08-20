'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LEAD_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbwdvp7MKtXHW0kuoNBYWvEIKSXhxrknZoYlf_5Og2lis5Y-sWzWPROK5c-ldjJqtXaj/exec'

const AREA_OPTIONS = ['Empresário/autônomo', 'Vendedor/comercial', 'Gestor/líder de equipe', 'Outro']

const FAIXA_OPTIONS = ['Menos de R$300', 'Entre R$300 e R$800', 'Acima de R$800']

const MOTIVO_OPTIONS = [
  'Perco vendas por não me comunicar bem',
  'Tenho medo de falar em público',
  'Quero mais autoridade e presença',
  'Quero liderar reuniões e equipes com mais confiança',
]

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

type QualificationFormContextValue = {
  openForm: (checkoutUrl: string) => void
}

const QualificationFormContext = createContext<QualificationFormContextValue | null>(null)

export function useQualificationForm() {
  const ctx = useContext(QualificationFormContext)
  if (!ctx) {
    throw new Error('useQualificationForm deve ser usado dentro de QualificationFormProvider')
  }
  return ctx
}

type Step = 'form' | 'enviando' | 'qualificado' | 'desqualificado'

export function QualificationFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [step, setStep] = useState<Step>('form')
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [areaAtuacao, setAreaAtuacao] = useState('')
  const [faixaInvestimento, setFaixaInvestimento] = useState('')
  const [motivo, setMotivo] = useState('')
  const [erro, setErro] = useState('')

  function resetForm() {
    setNome('')
    setWhatsapp('')
    setEmail('')
    setAreaAtuacao('')
    setFaixaInvestimento('')
    setMotivo('')
    setErro('')
  }

  function openForm(url: string) {
    setCheckoutUrl(url)
    setStep('form')
    setErro('')
    setIsOpen(true)
  }

  function closeForm() {
    setIsOpen(false)
    resetForm()
    setStep('form')
  }

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeForm()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !nome.trim() ||
      !whatsapp.trim() ||
      !email.trim() ||
      !areaAtuacao ||
      !faixaInvestimento ||
      !motivo
    ) {
      setErro('Preenche todos os campos pra gente continuar.')
      return
    }

    setErro('')
    setStep('enviando')

    const qualificado = faixaInvestimento !== 'Menos de R$300'

    const params = new URLSearchParams(window.location.search)
    const payload = {
      destino: 'oratoria',
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      areaAtuacao,
      faixaInvestimento,
      motivo,
      qualificado: qualificado ? 'Sim' : 'Não',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
      landing_page: typeof window !== 'undefined' ? window.location.href : '',
    }

    try {
      await fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.error('Erro ao enviar formulário de qualificação:', err)
    }

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: qualificado ? 'lead_qualificado' : 'lead_desqualificado',
        ...payload,
      })
    }

    if (qualificado) {
      setStep('qualificado')
      window.location.href = checkoutUrl
    } else {
      setStep('desqualificado')
    }
  }

  const value = useMemo(() => ({ openForm }), [])

  return (
    <QualificationFormContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeForm()
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gold/30 bg-card p-6 shadow-2xl md:p-8">
            <button
              type="button"
              onClick={closeForm}
              aria-label="Fechar"
              className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              ✕
            </button>

            {step === 'form' || step === 'enviando' ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  Antes de garantir sua vaga
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-tight text-foreground md:text-3xl">
                  Só mais um passo
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Preenche rapidinho pra gente confirmar sua vaga na Oratória Suprema.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="qf-nome" className="mb-1 block text-sm font-medium text-foreground">
                      Nome
                    </label>
                    <input
                      id="qf-nome"
                      type="text"
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:border-gold"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="qf-whatsapp" className="mb-1 block text-sm font-medium text-foreground">
                        WhatsApp
                      </label>
                      <input
                        id="qf-whatsapp"
                        type="tel"
                        value={whatsapp}
                        onChange={(event) => setWhatsapp(event.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:border-gold"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="qf-email" className="mb-1 block text-sm font-medium text-foreground">
                        E-mail
                      </label>
                      <input
                        id="qf-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:border-gold"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-foreground">Área de atuação</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {AREA_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${areaAtuacao === option
                              ? 'border-gold bg-gold/10 text-foreground'
                              : 'border-border text-muted-foreground hover:border-gold/50'
                            }`}
                        >
                          <input
                            type="radio"
                            name="areaAtuacao"
                            value={option}
                            checked={areaAtuacao === option}
                            onChange={(event) => setAreaAtuacao(event.target.value)}
                            className="accent-gold"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-foreground">Faixa de investimento</legend>
                    <div className="space-y-2">
                      {FAIXA_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${faixaInvestimento === option
                              ? 'border-gold bg-gold/10 text-foreground'
                              : 'border-border text-muted-foreground hover:border-gold/50'
                            }`}
                        >
                          <input
                            type="radio"
                            name="faixaInvestimento"
                            value={option}
                            checked={faixaInvestimento === option}
                            onChange={(event) => setFaixaInvestimento(event.target.value)}
                            className="accent-gold"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-foreground">
                      O que mais pesa pra você hoje?
                    </legend>
                    <div className="space-y-2">
                      {MOTIVO_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${motivo === option
                              ? 'border-gold bg-gold/10 text-foreground'
                              : 'border-border text-muted-foreground hover:border-gold/50'
                            }`}
                        >
                          <input
                            type="radio"
                            name="motivo"
                            value={option}
                            checked={motivo === option}
                            onChange={(event) => setMotivo(event.target.value)}
                            className="accent-gold"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {erro ? <p className="text-sm text-red-400">{erro}</p> : null}

                  <button
                    type="submit"
                    disabled={step === 'enviando'}
                    className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-8 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 md:text-base"
                  >
                    {step === 'enviando' ? 'Enviando...' : 'Confirmar e continuar'}
                  </button>
                </form>
              </>
            ) : null}

            {step === 'qualificado' ? (
              <div className="py-6 text-center">
                <p className="font-serif text-2xl text-foreground">Perfeito!</p>
                <p className="mt-2 text-sm text-muted-foreground">Redirecionando você pro checkout...</p>
              </div>
            ) : null}

            {step === 'desqualificado' ? (
              <div className="py-6 text-center">
                <p className="font-serif text-2xl text-foreground">Recebemos seus dados</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  No momento, com base nas suas respostas, essa imersão pode não ser o passo certo pra
                  você agora. Guardamos seu contato e, se fizer sentido, alguém da nossa equipe pode
                  falar com você.
                </p>
                <button
                  type="button"
                  onClick={closeForm}
                  className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-gold"
                >
                  Fechar
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </QualificationFormContext.Provider>
  )
}
