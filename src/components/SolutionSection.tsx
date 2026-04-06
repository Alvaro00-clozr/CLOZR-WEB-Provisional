import { useCallback } from 'react'
import { RefreshCcw, Target, Droplets, Search, type LucideIcon } from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

type SolutionCard = {
  titleLine1: string
  titleLine2: string
  points: string[]
  accent: string
  Icon: LucideIcon
}

const solutionSectionCopy = {
  eyebrow: enDictionary.solution.eyebrow,
  titleLine1: enDictionary.solution.titleLine1,
  titleLine2: enDictionary.solution.titleLine2,
  cards: [
    {
      titleLine1: enDictionary.solution.cards.failedPaymentLeakage.titleLine1,
      titleLine2: enDictionary.solution.cards.failedPaymentLeakage.titleLine2,
      points: [...enDictionary.solution.cards.failedPaymentLeakage.points],
      accent: 'var(--brand-warning)',
      Icon: RefreshCcw,
    },
    {
      titleLine1: enDictionary.solution.cards.refundArbitrage.titleLine1,
      titleLine2: enDictionary.solution.cards.refundArbitrage.titleLine2,
      points: [...enDictionary.solution.cards.refundArbitrage.points],
      accent: 'var(--brand-info)',
      Icon: Target,
    },
    {
      titleLine1: enDictionary.solution.cards.chargebackBleeding.titleLine1,
      titleLine2: enDictionary.solution.cards.chargebackBleeding.titleLine2,
      points: [...enDictionary.solution.cards.chargebackBleeding.points],
      accent: 'var(--brand-loss)',
      Icon: Droplets,
    },
    {
      titleLine1: enDictionary.solution.cards.attributionLies.titleLine1,
      titleLine2: enDictionary.solution.cards.attributionLies.titleLine2,
      points: [...enDictionary.solution.cards.attributionLies.points],
      accent: 'var(--brand-warning)',
      Icon: Search,
    },
  ] satisfies SolutionCard[],
}

function SolutionSection() {
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
    stagger: 0.16,
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
      className="site-section"
    >
      <div className="site-shell">
        <div className="site-shell-inner">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {solutionSectionCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <h2
            data-reveal-text
            className="section-title text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.2] text-[var(--text-primary)]"
          >
            {solutionSectionCopy.titleLine1}
            <br />
            {solutionSectionCopy.titleLine2}
          </h2>

          <div className="section-content grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {solutionSectionCopy.cards.map((card) => (
              <article
                key={`${card.titleLine1}-${card.titleLine2}`}
                data-reveal-visual
                className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_22%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_92%,transparent)] p-5 shadow-[0_16px_34px_rgba(0,0,0,0.36)] transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-65"
                  style={{
                    background: `radial-gradient(88% 78% at 10% 8%, color-mix(in srgb, ${card.accent} 26%, transparent) 0%, transparent 62%), linear-gradient(180deg, rgba(8, 11, 17, 0) 0%, rgba(8, 11, 17, 0.22) 100%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border"
                      style={{
                        borderColor: `color-mix(in srgb, ${card.accent} 52%, transparent)`,
                        background: `linear-gradient(145deg, color-mix(in srgb, ${card.accent} 38%, transparent), color-mix(in srgb, ${card.accent} 14%, transparent))`,
                      }}
                    >
                      <card.Icon
                        size={18}
                        strokeWidth={2.15}
                        style={{
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>

                    <h3 className="font-[var(--font-heading)] text-[clamp(1.2rem,1.6vw,1.5rem)] leading-[1.2] text-[var(--text-primary)]">
                      {card.titleLine1}
                      <span
                        className="mt-1 block text-[clamp(0.92rem,1.2vw,1.08rem)] leading-[1.32]"
                        style={{
                          color: `color-mix(in srgb, ${card.accent} 78%, var(--text-primary) 22%)`,
                        }}
                      >
                        {card.titleLine2}
                      </span>
                    </h3>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {card.points.map((point, index) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="body-sm mt-[1px] text-[var(--text-muted)]">
                          {index === 0 ? '|-' : '\\-'}
                        </span>
                        <span className="body text-[var(--text-secondary)]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
