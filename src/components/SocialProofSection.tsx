import { useCallback } from 'react'
import { BadgeCheck, Quote } from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

const socialProofCopy = {
  eyebrow: enDictionary.socialProof.eyebrow,
  headline: enDictionary.socialProof.headline,
  subcopy: enDictionary.socialProof.subcopy,
  integrationsTitle: enDictionary.socialProof.integrationsTitle,
  integrations: [
    { name: enDictionary.socialProof.integrations.stripe, src: '/social/stripe_logo.png' },
    { name: enDictionary.socialProof.integrations.meta, src: '/social/meta_icon.png' },
    { name: enDictionary.socialProof.integrations.google, src: '/social/google_icon.svg' },
  ],
  certificationsTitle: enDictionary.socialProof.certificationsTitle,
  certifications: [...enDictionary.socialProof.certifications],
  testimonial: enDictionary.socialProof.testimonial,
  testimonialAuthor: enDictionary.socialProof.testimonialAuthor,
}

function SocialProofSection() {
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

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative overflow-hidden scroll-mt-24 py-20 md:scroll-mt-28 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div className="mx-auto max-w-[980px]">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {socialProofCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <h2
            data-reveal-text
            className="mt-8 text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.18] text-[var(--text-primary)]"
          >
            {socialProofCopy.headline}
          </h2>
          <p
            data-reveal-text
            className="body-lg mx-auto mt-6 max-w-[760px] text-center text-[var(--text-secondary)]"
          >
            {socialProofCopy.subcopy}
          </p>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article
              data-reveal-visual
              className="widget-premium-border relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--bg-card)_92%,transparent)] p-5 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-55"
                style={{
                  background:
                    'radial-gradient(98% 86% at 12% 14%, color-mix(in srgb, var(--brand-info) 24%, transparent) 0%, transparent 72%)',
                }}
              />
              <div className="relative">
                <p className="caption tracking-[0.18em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
                  {socialProofCopy.integrationsTitle}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {socialProofCopy.integrations.map((integration) => (
                    <div
                      key={integration.name}
                      className="group flex h-14 items-center justify-center rounded-[12px] border border-[color-mix(in_srgb,var(--text-muted)_20%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_76%,transparent)] opacity-55 saturate-0 transition-all duration-300 hover:opacity-75 hover:saturate-100"
                    >
                      <img
                        src={integration.src}
                        alt={integration.name}
                        className="max-h-7 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
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
                    'radial-gradient(96% 96% at 92% 10%, color-mix(in srgb, var(--brand-warning) 20%, transparent) 0%, transparent 70%)',
                }}
              />
              <div className="relative">
                <p className="caption tracking-[0.18em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
                  {socialProofCopy.certificationsTitle}
                </p>
                <ul className="mt-5 space-y-3">
                  {socialProofCopy.certifications.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <BadgeCheck
                        size={16}
                        className="mt-1 shrink-0 text-[color-mix(in_srgb,var(--brand-warning)_80%,var(--text-primary)_20%)]"
                      />
                      <span className="body text-[var(--text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          {/*
          <article
            data-reveal-visual
            className="widget-premium-border relative isolate mt-4 overflow-hidden rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--bg-card)_90%,transparent)] p-6 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45"
              style={{
                background:
                  'radial-gradient(96% 88% at 22% 10%, color-mix(in srgb, var(--brand-warning) 18%, transparent) 0%, transparent 72%), radial-gradient(95% 90% at 86% 24%, color-mix(in srgb, var(--brand-info) 20%, transparent) 0%, transparent 75%)',
              }}
            />
            <div className="relative">
              <Quote
                size={20}
                className="text-[color-mix(in_srgb,var(--brand-warning)_78%,var(--text-primary)_22%)]"
              />
              <p className="body-lg mt-4 max-w-[900px] text-[var(--text-primary)]">
                &quot;{socialProofCopy.testimonial}&quot;
              </p>
              <p className="body mt-4 text-[color-mix(in_srgb,var(--text-muted)_92%,var(--text-primary)_8%)]">
                {socialProofCopy.testimonialAuthor}
              </p>
            </div>
          </article>
          */}
        </div>
      </div>
    </section>
  )
}

export default SocialProofSection
