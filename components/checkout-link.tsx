'use client'

import { cn } from '@/lib/utils'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type CheckoutLinkProps = {
  children: React.ReactNode
  href: string
  className?: string
}

/**
 * Link de checkout "de verdade" — usado na página de obrigado, onde o clique
 * leva direto pro Kiwify. Dispara InitiateCheckout no momento exato em que a
 * pessoa efetivamente inicia o checkout (diferente do CtaButton da página
 * principal, que só abre o formulário de captação).
 */
export function CheckoutLink({ children, href, className }: CheckoutLinkProps) {
  function handleClick() {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout')
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-8 text-center font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring text-base md:text-lg py-4',
        className,
      )}
    >
      {children}
    </a>
  )
}
