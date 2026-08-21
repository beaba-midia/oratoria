'use client'

import { useEffect, useState } from 'react'

const EVENT_DATE = new Date('2026-10-17T08:30:00-03:00')

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now()
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0 }
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutos = Math.floor((diff / (1000 * 60)) % 60)
  return { dias, horas, minutos }
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{ dias: number; horas: number; minutos: number } | null>(
    null,
  )

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 60000)
    return () => clearInterval(interval)
  }, [])

  if (!timeLeft) return null

  const items = [
    { label: 'dias', value: timeLeft.dias },
    { label: 'horas', value: timeLeft.horas },
    { label: 'min', value: timeLeft.minutos },
  ]

  return (
    <div className="mx-auto mt-8 flex max-w-md justify-center gap-4 sm:gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-[72px] flex-col items-center rounded-xl border border-gold/30 bg-card/60 px-4 py-3"
        >
          <span className="font-serif text-2xl text-gold md:text-3xl">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
