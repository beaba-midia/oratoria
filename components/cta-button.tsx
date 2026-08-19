'use client'

import { cn } from '@/lib/utils'
import { CHECKOUT_URL } from '@/lib/site'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type CtaButtonProps = {
  children: React.ReactNode
  className?: string
    href?: string
  size?: 'default' | 'lg'
}

export function CtaButton({
  children,
  className,
    href = CHECKOUT_URL,
  size = 'default',
}: CtaButtonProps) {
  function handleClick() {
    // Dispara o evento de conversão no Meta Pixel ao clicar em qualquer CTA.
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout')
    }
  }

  return (
    <a
      href={CHECKOUT_URL}
      onClick={handleClick}
      className={cn(
        'inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-8 text-center font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        size === 'lg' ? 'text-base md:text-lg py-4' : 'text-sm md:text-base py-3',
        className,
      )}
    >
      {children}
    </a>
  )
}
