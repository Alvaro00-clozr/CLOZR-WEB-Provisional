import { useCallback, useState, type FormEvent } from 'react'
import { Mail, MessageSquareText } from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

const contactCopy = {
  eyebrow: enDictionary.contact.eyebrow,
  support: enDictionary.contact.support,
  headline: enDictionary.contact.headline,
  description: enDictionary.contact.description,
  ctaLabel: enDictionary.contact.ctaLabel,
  sideTitle: enDictionary.contact.sideTitle,
  sidePoints: [...enDictionary.contact.sidePoints],
  replyTime: enDictionary.contact.replyTime,
  sendingLabel: enDictionary.contact.sendingLabel,
  successMessage: enDictionary.contact.successMessage,
  errorMessage: enDictionary.contact.errorMessage,
  form: {
    fullName: enDictionary.contact.form.fullName,
    workEmail: enDictionary.contact.form.workEmail,
    company: enDictionary.contact.form.company,
    monthlyRevenue: enDictionary.contact.form.monthlyRevenue,
    monthlyRevenuePlaceholder: enDictionary.contact.form.monthlyRevenuePlaceholder,
    monthlyRevenueOptions: [...enDictionary.contact.form.monthlyRevenueOptions],
    message: enDictionary.contact.form.message,
  },
}

function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formErrorMessage, setFormErrorMessage] = useState('')

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
    gridColumns: 2,
  })

  const sectionRef = useCallback(
    (node: HTMLElement | null) => {
      textRevealRef(node)
      visualRevealRef(node)
    },
    [textRevealRef, visualRevealRef],
  )

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
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null
        throw new Error(
          errorPayload?.error || `Request failed with status ${response.status}`,
        )
      }

      form.reset()
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
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden scroll-mt-24 py-20 md:scroll-mt-28 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div className="mx-auto max-w-[980px]">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {contactCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <p
            data-reveal-text
            className="caption mt-5 text-center tracking-[0.2em] text-[color-mix(in_srgb,var(--brand-warning)_76%,var(--text-primary)_24%)]"
          >
            {contactCopy.support}
          </p>

          <h2
            data-reveal-text
            className="mt-6 text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.18] text-[var(--text-primary)]"
          >
            {contactCopy.headline}
          </h2>
          <p
            data-reveal-text
            className="body-lg mx-auto mt-6 max-w-[760px] text-center text-[var(--text-secondary)]"
          >
            {contactCopy.description}
          </p>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <article
              data-reveal-visual
              className="widget-premium-border relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--bg-card)_92%,transparent)] p-5 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-55"
                style={{
                  background:
                    'radial-gradient(94% 88% at 10% 8%, color-mix(in srgb, var(--brand-info) 24%, transparent) 0%, transparent 70%), radial-gradient(80% 80% at 88% 14%, color-mix(in srgb, var(--brand-warning) 18%, transparent) 0%, transparent 74%)',
                }}
              />
              <form className="relative grid gap-3" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="body-sm text-[var(--text-secondary)]">{contactCopy.form.fullName}</span>
                    <input
                      name="name"
                      type="text"
                      required
                      className="h-11 rounded-[10px] border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_78%,transparent)] px-3 text-[var(--text-primary)] outline-none transition-all focus:border-[color-mix(in_srgb,var(--brand-info)_58%,transparent)] focus:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-info)_42%,transparent)]"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="body-sm text-[var(--text-secondary)]">{contactCopy.form.workEmail}</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="h-11 rounded-[10px] border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_78%,transparent)] px-3 text-[var(--text-primary)] outline-none transition-all focus:border-[color-mix(in_srgb,var(--brand-info)_58%,transparent)] focus:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-info)_42%,transparent)]"
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="body-sm text-[var(--text-secondary)]">{contactCopy.form.company}</span>
                    <input
                      name="company"
                      type="text"
                      className="h-11 rounded-[10px] border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_78%,transparent)] px-3 text-[var(--text-primary)] outline-none transition-all focus:border-[color-mix(in_srgb,var(--brand-info)_58%,transparent)] focus:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-info)_42%,transparent)]"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="body-sm text-[var(--text-secondary)]">{contactCopy.form.monthlyRevenue}</span>
                    <select
                      name="revenue"
                      className="h-11 rounded-[10px] border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_78%,transparent)] px-3 text-[var(--text-primary)] outline-none transition-all focus:border-[color-mix(in_srgb,var(--brand-info)_58%,transparent)] focus:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-info)_42%,transparent)]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {contactCopy.form.monthlyRevenuePlaceholder}
                      </option>
                      {contactCopy.form.monthlyRevenueOptions.map((optionLabel) => (
                        <option key={optionLabel} value={optionLabel.replace(/\s+/g, '').toLowerCase()}>
                          {optionLabel}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="body-sm text-[var(--text-secondary)]">{contactCopy.form.message}</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="min-h-[132px] rounded-[10px] border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_78%,transparent)] px-3 py-2.5 text-[var(--text-primary)] outline-none transition-all focus:border-[color-mix(in_srgb,var(--brand-info)_58%,transparent)] focus:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-info)_42%,transparent)]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient body mt-2 inline-flex h-12 w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {isSubmitting ? contactCopy.sendingLabel : contactCopy.ctaLabel}
                </button>

                <p
                  role="status"
                  aria-live="polite"
                  className={`body-sm min-h-[1.4rem] ${
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

            <article
              data-reveal-visual
              className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_22%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_90%,transparent)] p-5 shadow-[0_16px_34px_rgba(0,0,0,0.34)] transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    'radial-gradient(94% 88% at 90% 12%, color-mix(in srgb, var(--brand-warning) 20%, transparent) 0%, transparent 72%)',
                }}
              />
              <div className="relative">
                <h3 className="font-[var(--font-heading)] text-[1.45rem] leading-[1.2] text-[var(--text-primary)]">
                  {contactCopy.sideTitle}
                </h3>

                <ul className="mt-5 space-y-3">
                  {contactCopy.sidePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <MessageSquareText
                        size={16}
                        className="mt-1 shrink-0 text-[color-mix(in_srgb,var(--brand-warning)_80%,var(--text-primary)_20%)]"
                      />
                      <span className="body text-[var(--text-secondary)]">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-[12px] border border-[color-mix(in_srgb,var(--text-muted)_22%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_72%,transparent)] p-4">
                  <p className="body-sm flex items-start gap-2 text-[var(--text-secondary)]">
                    <Mail size={16} className="mt-0.5 shrink-0 text-[var(--brand-info)]" />
                    <span>{contactCopy.replyTime}</span>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
