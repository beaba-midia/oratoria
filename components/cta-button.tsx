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
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Dispara o evento de conversão no Meta Pixel ao clicar em qualquer CTA.
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout')
    }

    if (href.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) {
        event.preventDefault()
        const startY = window.scrollY
        const targetY = startY + target.getBoundingClientRect().top
        const distance = targetY - startY
        const duration = 1600
        const startTime = performance.now()
        const easeInOutQuad = (t: number) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

        function step(now: number) {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          window.scrollTo(0, startY + distance * easeInOutQuad(progress))
          if (progress < 1) {
            requestAnimationFrame(step)
          }
        }

        requestAnimationFrame(step)
      }
    }
  }

  return (
    <a
      href={href}
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
