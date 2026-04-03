import { useCallback } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

const copy = enDictionary.revenueAuditCta

function RevenueAuditCtaSection() {
  const { rootRef: textRevealRef } = useGsapReveal<HTMLElement>({
    itemsSelector: '[data-reveal-text]',
    start: 'top 62%',
    once: false,
    xItems: -64,
    yItems: 0,
    durationItems: 0.56,
    stagger: 0.1,
  })

  const { rootRef: visualRevealRef } = useGsapReveal<HTMLElement>({
    itemsSelector: '[data-reveal-visual]',
    start: 'top 62%',
    once: false,
    xItems: 0,
    yItems: 96,
    durationItems: 0.64,
    stagger: 0.12,
  })

  const sectionRef = useCallback(
    (node: HTMLElement | null) => {
      textRevealRef(node)
      visualRevealRef(node)
    },
    [textRevealRef, visualRevealRef],
  )

  return (
    <section ref={sectionRef} id="audit" className="site-section site-section-anchor">
      <div className="site-shell">
        <div className="site-shell-inner">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {copy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <h2
            data-reveal-text
            className="section-title text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.18] text-[var(--text-primary)]"
          >
            {copy.headline}
          </h2>

          <p
            data-reveal-text
            className="body-lg section-copy mx-auto max-w-[760px] text-center text-[var(--text-secondary)]"
          >
            {copy.bodyLine1}
          </p>

          <article
            data-reveal-visual
            className="section-content widget-premium-border relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--bg-card)_92%,transparent)] px-6 py-8 text-center sm:px-10 sm:py-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-52"
              style={{
                background:
                  'radial-gradient(92% 84% at 18% 10%, color-mix(in srgb, var(--brand-warning) 22%, transparent) 0%, transparent 72%), radial-gradient(90% 86% at 84% 18%, color-mix(in srgb, var(--brand-info) 18%, transparent) 0%, transparent 74%)',
              }}
            />

            <div className="relative mx-auto max-w-[760px]">
              <p data-reveal-text className="body-lg text-[var(--text-primary)]">
                {copy.bodyLine2}
                <br />
                {copy.bodyLine3}
              </p>

              <p data-reveal-text className="body mt-4 text-[var(--text-muted)]">
                {copy.bodyLine4}
                <br />
                {copy.bodyLine5}
              </p>

              <a
                data-reveal-text
                href="/#contact"
                className="btn-gradient body mt-7 inline-flex h-12 items-center justify-center gap-2 px-8 text-center"
              >
                <span>{copy.ctaLabel}</span>
                <span aria-hidden="true"></span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default RevenueAuditCtaSection
