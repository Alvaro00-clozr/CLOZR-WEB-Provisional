import { useCallback } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

const hybridBridgeCopy = {
  eyebrow: enDictionary.advisory.eyebrow,
  titleLine1: enDictionary.advisory.titleLine1,
  titleLine2: enDictionary.advisory.titleLine2,
  body: enDictionary.advisory.body,
  ctaLabel: enDictionary.advisory.ctaLabel,
  ctaSupport: enDictionary.advisory.ctaSupport,
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
    <section
      ref={sectionRef}
      id="advisory"
      className="relative overflow-hidden scroll-mt-24 py-20 md:scroll-mt-28 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div className="mx-auto max-w-[980px]">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {hybridBridgeCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)] lg:gap-10">
            <div data-reveal-text>
              <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.18] text-[var(--text-primary)]">
                {hybridBridgeCopy.titleLine1}
                <br />
                {hybridBridgeCopy.titleLine2}
              </h2>

              <p className="body-lg mt-8 max-w-[760px] text-[var(--text-secondary)]">
                {hybridBridgeCopy.body}
              </p>
            </div>

            <aside
              data-reveal-visual
              className="widget-premium-border relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--bg-card)_92%,transparent)] p-5 sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    'radial-gradient(120% 110% at 6% 10%, color-mix(in srgb, var(--brand-info) 28%, transparent) 0%, transparent 70%)',
                }}
              />
              <div className="relative">
                <p className="caption tracking-[0.18em] text-[color-mix(in_srgb,var(--text-muted)_86%,var(--text-primary)_14%)]">
                  {hybridBridgeCopy.ctaSupport}
                </p>
                <a
                  href="/#contact"
                  className="btn-gradient body-lg p-1 mt-5 inline-flex w-full items-center justify-center px-8 text-center sm:px-10"
                >
                  {hybridBridgeCopy.ctaLabel}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HybridBridgeSection
