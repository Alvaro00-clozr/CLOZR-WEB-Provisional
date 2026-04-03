import { useCallback } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

const hybridBridgeCopy = {
  eyebrow: enDictionary.advisory.eyebrow,
  title: enDictionary.advisory.title,
  subtitle: enDictionary.advisory.subtitle,
  panelTitle: enDictionary.advisory.panelTitle,
  panelLabel: enDictionary.advisory.panelLabel,
  ctaLabel: enDictionary.advisory.ctaLabel,
}

function HybridBridgeSection() {
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

  return (
    <section ref={sectionRef} id="advisory" className="site-section site-section-anchor">
      <div className="site-shell">
        <div className="site-shell-inner">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {hybridBridgeCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <h2
            data-reveal-text
            className="section-title text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.12] text-[var(--text-primary)]"
          >
            {hybridBridgeCopy.title}
          </h2>
          <p
            data-reveal-text
            className="body-lg section-copy mx-auto max-w-[680px] text-center text-[var(--text-secondary)]"
          >
            {hybridBridgeCopy.subtitle}
          </p>

          <div
            data-reveal-visual
            className="section-content advisory-offer-panel mx-auto max-w-[900px] px-6 py-8 text-center sm:px-10"
          >
            <div className="mx-auto max-w-[620px] text-center">
              <h3 className="advisory-offer-title text-[var(--text-primary)]">
                {hybridBridgeCopy.panelTitle}
              </h3>
              <p className="advisory-offer-subtitle mt-2 text-[var(--text-secondary)]">
                {hybridBridgeCopy.panelLabel}
              </p>
              <a
                href="/#contact"
                className="btn-gradient body mt-6 inline-flex min-h-12 items-center justify-center px-8 text-center"
              >
                {hybridBridgeCopy.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HybridBridgeSection
