type GtagPrimitive = string | number | boolean

type GtagParams = Record<string, GtagPrimitive | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (
      command: 'event' | 'config' | 'js',
      target: string | Date,
      params?: GtagParams,
    ) => void
  }
}

const isGtagAvailable = () =>
  typeof window !== 'undefined' && typeof window.gtag === 'function'

export const trackEvent = (eventName: string, params?: GtagParams) => {
  if (!isGtagAvailable()) return

  window.gtag?.('event', eventName, params)
}

export const trackGenerateLead = (params?: GtagParams) => {
  trackEvent('generate_lead', params)
}

export {}
