import Script from 'next/script'

/**
 * PLACEHOLDER DO META PIXEL
 * Substitua "SEU_PIXEL_ID_AQUI" pelo ID real do Meta Pixel quando estiver disponível.
 * Dispara PageView automaticamente ao carregar a página.
 * O evento InitiateCheckout é disparado nos cliques de CTA (ver helper trackInitiateCheckout).
 */
export const META_PIXEL_ID = 'SEU_PIXEL_ID_AQUI'

export function MetaPixel() {
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
