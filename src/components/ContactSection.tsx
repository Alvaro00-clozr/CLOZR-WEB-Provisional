import { memo, useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'
import { trackGenerateLead } from '../lib/analytics'

const FORM_LIMITS = {
  nameMax: 80,
  emailMax: 160,
  companyMax: 120,
  messageMax: 1200,
} as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TURNSTILE_SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)?.trim() || ''

type TurnstileRenderOptions = {
  sitekey: string
  theme?: 'light' | 'dark' | 'auto'
  callback?: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
}

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const contactCopy = {
  eyebrow: enDictionary.contact.eyebrow,
  support: enDictionary.contact.support,
  headline: enDictionary.contact.headline,
  description: enDictionary.contact.description,
  ctaLabel: enDictionary.contact.ctaLabel,
  sendingLabel: enDictionary.contact.sendingLabel,
  successMessage: enDictionary.contact.successMessage,
  errorMessage: enDictionary.contact.errorMessage,
  legalPrefix: enDictionary.contact.legalPrefix,
  legalTermsLabel: enDictionary.contact.legalTermsLabel,
  legalAnd: enDictionary.contact.legalAnd,
  legalPrivacyLabel: enDictionary.contact.legalPrivacyLabel,
  form: {
    fullName: enDictionary.contact.form.fullName,
    workEmail: enDictionary.contact.form.workEmail,
    company: enDictionary.contact.form.company,
    monthlyRevenue: enDictionary.contact.form.monthlyRevenue,
    monthlyRevenuePlaceholder: enDictionary.contact.form.monthlyRevenuePlaceholder,
    monthlyRevenueOptions: [...enDictionary.contact.form.monthlyRevenueOptions],
    message: enDictionary.contact.form.message,
    messageOptional: enDictionary.contact.form.messageOptional,
    validation: enDictionary.contact.form.validation,
  },
}

const validatePayload = (payload: {
  name: string
  email: string
  company: string
  revenue: string
  message: string
}) => {
  if (!payload.name) return contactCopy.form.validation.nameRequired
  if (payload.name.length > FORM_LIMITS.nameMax) {
    return contactCopy.form.validation.nameTooLong
  }
  if (!payload.email) return contactCopy.form.validation.emailRequired
  if (payload.email.length > FORM_LIMITS.emailMax) {
    return contactCopy.form.validation.emailTooLong
  }
  if (!EMAIL_PATTERN.test(payload.email)) {
    return contactCopy.form.validation.emailInvalid
  }
  if (payload.company.length > FORM_LIMITS.companyMax) {
    return contactCopy.form.validation.companyTooLong
  }
  if (!payload.revenue) {
    return contactCopy.form.validation.revenueRequired
  }
  if (payload.message.length > FORM_LIMITS.messageMax) {
    return contactCopy.form.validation.messageTooLong
  }

  return ''
}

type FloatingInputFieldProps = {
  name: 'name' | 'email' | 'company'
  label: string
  type?: 'text' | 'email'
  required?: boolean
  maxLength: number
  inputMode?: 'text' | 'email'
  pattern?: string
}

const FloatingInputField = memo(function FloatingInputField({
  name,
  label,
  type = 'text',
  required = false,
  maxLength,
  inputMode,
  pattern,
}: FloatingInputFieldProps) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const showFloatingLabel = isFocused || value.length > 0

  return (
    <label className="relative block">
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        inputMode={inputMode}
        pattern={pattern}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-[12px] border border-[var(--contact-field-border)] bg-[var(--contact-field-bg)] px-4 pb-3 pt-7 text-[16px] text-[var(--text-primary)] outline-none transition-all focus:border-[var(--contact-field-focus)] focus:shadow-[0_0_0_3px_var(--contact-field-focus-glow)]"
      />
      <span
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          showFloatingLabel
            ? 'top-2 text-[0.72rem] tracking-[0.06em] text-[var(--text-muted)]'
            : 'top-1/2 -translate-y-1/2 text-[1rem] text-[var(--text-secondary)]'
        }`}
      >
        {label}
      </span>
    </label>
  )
})

type FloatingSelectFieldProps = {
  name: 'revenue'
  label: string
  required?: boolean
  options: string[]
}

const FloatingSelectField = memo(function FloatingSelectField({
  name,
  label,
  required = false,
  options,
}: FloatingSelectFieldProps) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const showFloatingLabel = isFocused || value.length > 0

  return (
    <label className="relative block">
      <select
        name={name}
        required={required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full appearance-none rounded-[12px] border border-[var(--contact-field-border)] bg-[var(--contact-field-bg)] px-4 pb-3 pt-7 pr-11 text-[16px] outline-none transition-all focus:border-[var(--contact-field-focus)] focus:shadow-[0_0_0_3px_var(--contact-field-focus-glow)] ${
          value ? 'text-[var(--text-primary)]' : 'text-transparent'
        }`}
      >
        <option
          value=""
          disabled
          style={{ color: 'var(--text-muted)', background: 'var(--contact-field-bg)' }}
        >
          {contactCopy.form.monthlyRevenuePlaceholder}
        </option>
        {options.map((optionValue) => (
          <option
            key={optionValue}
            value={optionValue}
            style={{ color: 'var(--text-primary)', background: 'var(--contact-field-bg)' }}
          >
            {optionValue}
          </option>
        ))}
      </select>
      <span
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          showFloatingLabel
            ? 'top-2 text-[0.72rem] tracking-[0.06em] text-[var(--text-muted)]'
            : 'top-1/2 -translate-y-1/2 text-[1rem] text-[var(--text-secondary)]'
        }`}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-[var(--text-muted)]"
      >
        v
      </span>
    </label>
  )
})

type FloatingTextareaFieldProps = {
  name: 'message'
  label: string
  maxLength: number
}

const FloatingTextareaField = memo(function FloatingTextareaField({
  name,
  label,
  maxLength,
}: FloatingTextareaFieldProps) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const showFloatingLabel = isFocused || value.length > 0

  return (
    <label className="relative block">
      <textarea
        name={name}
        rows={4}
        maxLength={maxLength}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="min-h-[142px] w-full resize-y rounded-[12px] border border-[var(--contact-field-border)] bg-[var(--contact-field-bg)] px-4 pb-3 pt-8 text-[16px] text-[var(--text-primary)] outline-none transition-all focus:border-[var(--contact-field-focus)] focus:shadow-[0_0_0_3px_var(--contact-field-focus-glow)]"
      />
      <span
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          showFloatingLabel
            ? 'top-2 text-[0.72rem] tracking-[0.06em] text-[var(--text-muted)]'
            : 'top-5 text-[1rem] text-[var(--text-secondary)]'
        }`}
      >
        {label}
      </span>
    </label>
  )
})

function ContactSection() {
  const isCaptchaEnabled = TURNSTILE_SITE_KEY.length > 0
  const [formResetKey, setFormResetKey] = useState(0)
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now().toString())
  const [captchaToken, setCaptchaToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formErrorMessage, setFormErrorMessage] = useState('')
  const captchaContainerRef = useRef<HTMLDivElement | null>(null)
  const captchaWidgetIdRef = useRef<string | null>(null)

  const { rootRef: textRevealRef } = useGsapReveal<HTMLElement>({
    itemsSelector: '[data-reveal-text]',
    start: 'top 60%',
    once: false,
    xItems: -68,
    yItems: 0,
    durationItems: 0.58,
    stagger: 0.1,
  })

  const { rootRef: visualRevealRef } = useGsapReveal<HTMLElement>({
    itemsSelector: '[data-reveal-visual]',
    start: 'top 60%',
    once: false,
    xItems: 0,
    yItems: 112,
    durationItems: 0.66,
    stagger: 0.14,
  })

  const sectionRef = useCallback(
    (node: HTMLElement | null) => {
      textRevealRef(node)
      visualRevealRef(node)
    },
    [textRevealRef, visualRevealRef],
  )

  useEffect(() => {
    if (!isCaptchaEnabled) return

    let isCancelled = false
    const scriptId = 'cf-turnstile-script'

    const renderCaptcha = () => {
      if (isCancelled || !window.turnstile || !captchaContainerRef.current) return

      if (captchaWidgetIdRef.current) {
        window.turnstile.remove(captchaWidgetIdRef.current)
        captchaWidgetIdRef.current = null
      }

      const widgetId = window.turnstile.render(captchaContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (token) => setCaptchaToken(token),
        'expired-callback': () => setCaptchaToken(''),
        'error-callback': () => setCaptchaToken(''),
      })

      captchaWidgetIdRef.current = widgetId
    }

    const onScriptLoad = () => {
      renderCaptcha()
    }

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null
    if (existingScript) {
      existingScript.addEventListener('load', onScriptLoad)
      renderCaptcha()
    } else {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.addEventListener('load', onScriptLoad)
      document.head.appendChild(script)
    }

    return () => {
      isCancelled = true
      const script = document.getElementById(scriptId) as HTMLScriptElement | null
      script?.removeEventListener('load', onScriptLoad)

      if (window.turnstile && captchaWidgetIdRef.current) {
        window.turnstile.remove(captchaWidgetIdRef.current)
        captchaWidgetIdRef.current = null
      }
    }
  }, [formResetKey, isCaptchaEnabled])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setFormStatus('idle')
    setFormErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      revenue: String(formData.get('revenue') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || '').trim(),
      startedAt: String(formData.get('startedAt') || '').trim(),
    }

    const validationMessage = validatePayload(payload)
    if (validationMessage) {
      setFormErrorMessage(validationMessage)
      setFormStatus('error')
      setIsSubmitting(false)
      return
    }

    if (isCaptchaEnabled && !captchaToken) {
      setFormErrorMessage('Please complete the captcha challenge.')
      setFormStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          captchaToken,
        }),
      })

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null
        throw new Error(
          errorPayload?.error || `Request failed with status ${response.status}`,
        )
      }

      trackGenerateLead({
        lead_source: 'website_contact_form',
        form_id: 'contact',
        revenue_range: payload.revenue || 'not_selected',
        has_company: Boolean(payload.company),
      })

      form.reset()
      setFormResetKey((current) => current + 1)
      setFormStartedAt(Date.now().toString())
      setCaptchaToken('')
      setFormStatus('success')
    } catch (error) {
      console.error('Contact form submission error:', error)
      setFormErrorMessage(error instanceof Error ? error.message : contactCopy.errorMessage)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="site-section site-section-anchor">
      <div className="site-shell">
        <div className="site-shell-inner">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {contactCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <h2
            data-reveal-text
            className="section-title text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.12] text-[var(--text-primary)]"
          >
            {contactCopy.headline}
          </h2>
          <p
            data-reveal-text
            className="body-lg section-copy mx-auto max-w-[680px] text-center text-[var(--text-secondary)]"
          >
            {contactCopy.description}
          </p>

          <article
            data-reveal-visual
            className="section-content relative mx-auto max-w-[760px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--contact-form-border)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.34)] sm:p-10"
            style={{ background: 'var(--contact-form-bg)' }}
          >
            <form key={formResetKey} className="relative grid gap-4" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
              />
              <input type="hidden" name="startedAt" value={formStartedAt} readOnly />

              <FloatingInputField
                name="name"
                label={contactCopy.form.fullName}
                required
                maxLength={FORM_LIMITS.nameMax}
              />

              <FloatingInputField
                name="email"
                label={contactCopy.form.workEmail}
                type="email"
                required
                inputMode="email"
                maxLength={FORM_LIMITS.emailMax}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              />

              <FloatingInputField
                name="company"
                label={contactCopy.form.company}
                maxLength={FORM_LIMITS.companyMax}
              />

              <FloatingSelectField
                name="revenue"
                label={contactCopy.form.monthlyRevenue}
                required
                options={contactCopy.form.monthlyRevenueOptions}
              />

              <FloatingTextareaField
                name="message"
                label={`${contactCopy.form.message} (${contactCopy.form.messageOptional})`}
                maxLength={FORM_LIMITS.messageMax}
              />

              {isCaptchaEnabled ? (
                <div className="mt-1 flex justify-center sm:justify-start">
                  <div ref={captchaContainerRef} />
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gradient body mt-2 inline-flex h-[var(--contact-submit-height)] w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isSubmitting ? contactCopy.sendingLabel : contactCopy.ctaLabel}
              </button>

              <p className="body-sm mt-1 text-center text-[var(--text-muted)]">
                {contactCopy.legalPrefix}{' '}
                <a className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" href="/terms">
                  {contactCopy.legalTermsLabel}
                </a>{' '}
                {contactCopy.legalAnd}{' '}
                <a className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" href="/privacy">
                  {contactCopy.legalPrivacyLabel}
                </a>
              </p>

              <p
                role="status"
                aria-live="polite"
                className={`body-sm min-h-[1.4rem] text-center ${
                  formStatus === 'success'
                    ? 'text-[var(--brand-profit)]'
                    : formStatus === 'error'
                      ? 'text-[var(--brand-loss)]'
                      : 'text-transparent'
                }`}
              >
                {formStatus === 'success'
                  ? contactCopy.successMessage
                  : formStatus === 'error'
                    ? formErrorMessage || contactCopy.errorMessage
                    : '.'}
              </p>
            </form>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
