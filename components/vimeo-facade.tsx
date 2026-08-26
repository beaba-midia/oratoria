'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

/**
   * Renders a lightweight placeholder instead of an eager Vimeo <iframe>.
   * The real player (and its ~2.8MB of JS/CSS) is only mounted after a
   * genuine click, so pages with several testimonial videos don't pay
   * that cost for visitors who never press play.
   */
export function VimeoFacade({
    videoId,
    title,
    className,
}: {
    videoId: string
    title: string
    className?: string
}) {
    const [loaded, setLoaded] = useState(false)

  if (loaded) {
        return (
                <iframe
                          className={className ?? 'h-full w-full'}
                          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`}
                          title={title}
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
              )
  }

  return (
        <button
                type="button"
                onClick={() => setLoaded(true)}
                aria-label={`Reproduzir vídeo: ${title}`}
                className={
                          className ??
                          'group flex h-full w-full items-center justify-center bg-gradient-to-b from-card to-background'
                }
              >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold text-background shadow-lg shadow-black/30 transition-transform group-hover:scale-110 sm:size-14">
                      <Play className="size-5 translate-x-0.5 fill-current sm:size-6" aria-hidden="true" />
              </span>
        </button>
      )
}
