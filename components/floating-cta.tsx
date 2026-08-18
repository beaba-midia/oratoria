'use client'

import { useEffect, useState } from 'react'
import { CtaButton } from '@/components/cta-button'
import { CTA_LABEL } from '@/lib/site'

export function FloatingCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Só aparece depois que o usuário rola para além da hero,
    // para não cobrir conteúdo logo de cara.
    function onScroll() {
      setShow(window.scrollY > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-all duration-300 md:px-8 ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-3 md:max-w-5xl md:justify-between">
        <p className="hidden text-sm text-muted-foreground md:block">
          Oratória Suprema — 17 de outubro, Macaé/RJ. Vagas limitadas.
        </p>
        <CtaButton className="w-full md:w-auto">{CTA_LABEL}</CtaButton>
      </div>
    </div>
  )
}
