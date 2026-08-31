'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LEAD_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbwdvp7MKtXHW0kuoNBYWvEIKSXhxrknZoYlf_5Og2lis5Y-sWzWPROK5c-ldjJqtXaj/exec'

const THANK_YOU_PATH = '/obrigado'

declare global {
  interface Window {
    dataLayer?: unknown[]
    __loadGTM?: () => void
  }
}

type QualificationFormContextValue = {
  openForm: () => void
}

const QualificationFormContext = createContext<QualificationFormContextValue | null>(null)

export function useQualificationForm() {
  const ctx = useContext(QualificationFormContext)
  if (!ctx) {
    throw new Error('useQualificationForm deve ser usado dentro de QualificationFormProvider')
  }
  return ctx
}

type Step = 'form' | 'enviando' | 'enviado'

export function QualificationFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')

  function resetForm() {
    setNome('')
    setWhatsapp('')
    setEmail('')
    setErro('')
  }

  function openForm() {
    setStep('form')
    setErro('')
    setIsOpen(true)
    if (typeof window !== 'undefined' && typeof window.__loadGTM === 'function') {
      window.__loadGTM()
    }
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

    if (!nome.trim() || !whatsapp.trim() || !email.trim()) {
      setErro('Preenche todos os campos pra gente continuar.')
      return
    }

    setErro('')
    setStep('enviando')

    const params = new URLSearchParams(window.location.search)
    const payload = {
      destino: 'oratoria',
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
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
      console.error('Erro ao enviar formulário de captação:', err)
    }

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      // Nome do evento mantido como 'lead_qualificado' de propósito: é o
      // evento que a tag do GTM/Pixel já está configurada para escutar.
      // Não há mais qualificação — todo envio de formulário é um lead.
      window.dataLayer.push({
        event: 'lead_qualificado',
        ...payload,
      })
    }

    setStep('enviado')

    const phoneDigits = whatsapp.replace(/\D/g, '')
    const thankYouParams = new URLSearchParams()
    thankYouParams.set('name', nome.trim())
    thankYouParams.set('email', email.trim())
    if (phoneDigits) thankYouParams.set('phone', phoneDigits)
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const value = params.get(key)
      if (value) thankYouParams.set(key, value)
    }
    const destino = `${THANK_YOU_PATH}?${thankYouParams.toString()}`

    // Pequeno atraso proposital: dá tempo do evento 'lead_qualificado' ser
    // processado pelo GTM/Pixel antes da navegação sair da página, evitando
    // que o redirecionamento imediato cancele o disparo do evento de conversão.
    window.setTimeout(() => {
      window.location.href = destino
    }, 400)
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

                  {erro ? <p className="text-sm text-red-400">{erro}</p> : null}

                  <button
                    type="submit"
                    disabled={step === 'enviando'}
                    className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-8 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 md:text-base"
                  >
                    {step === 'enviando' ? 'Enviando...' : 'Confirmar e continuar'}
                  </button>
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">Ao se cadastrar, você concorda com o tratamento dos seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD), para fins de contato sobre a Oratória Suprema.</p>
                </form>
              </>
            ) : null}

            {step === 'enviado' ? (
              <div className="py-6 text-center">
                <p className="font-serif text-2xl text-foreground">Perfeito!</p>
                <p className="mt-2 text-sm text-muted-foreground">Redirecionando você...</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </QualificationFormContext.Provider>
  )
}
