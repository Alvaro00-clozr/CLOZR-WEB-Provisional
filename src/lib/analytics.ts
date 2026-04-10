type GtagPrimitive = string | number | boolean

type GtagParams = Record<string, GtagPrimitive | undefined>
const GA_MEASUREMENT_ID = 'G-LS76PCN9J5'
let analyticsInitScheduled = false

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

const ensureGtagStub = () => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    // Use the same queueing contract as the official Google snippet.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments)
    }
  }
}

const loadGtagScript = () => {
  if (typeof window === 'undefined') return
  if (document.querySelector(`script[data-ga-id="${GA_MEASUREMENT_ID}"]`)) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.setAttribute('data-ga-id', GA_MEASUREMENT_ID)
  document.head.appendChild(script)
}

export const initAnalytics = () => {
  if (typeof window === 'undefined' || analyticsInitScheduled) return

  analyticsInitScheduled = true

  const bootAnalytics = () => {
    ensureGtagStub()
    window.gtag?.('js', new Date())
    window.gtag?.('config', GA_MEASUREMENT_ID)
    loadGtagScript()
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => {
      bootAnalytics()
    }, { timeout: 3000 })
    return
  }

  window.setTimeout(() => {
    bootAnalytics()
  }, 1500)
}

export const trackEvent = (eventName: string, params?: GtagParams) => {
  if (!isGtagAvailable()) return

  window.gtag?.('event', eventName, params)
}

export const trackGenerateLead = (params?: GtagParams) => {
  trackEvent('generate_lead', params)
}

export {}
