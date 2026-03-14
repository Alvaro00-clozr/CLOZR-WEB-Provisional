import { useCallback } from 'react'
import { RefreshCcw, Target, Droplets, type LucideIcon } from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

type SolutionCard = {
  titleLine1: string
  titleLine2: string
  description: string
  accent: string
  Icon: LucideIcon
}

const solutionSectionCopy = {
  eyebrow: enDictionary.solution.eyebrow,
  titleLine1: enDictionary.solution.titleLine1,
  titleLine2: enDictionary.solution.titleLine2,
  cards: [
    {
      titleLine1: enDictionary.solution.cards.reconciliation.titleLine1,
      titleLine2: enDictionary.solution.cards.reconciliation.titleLine2,
      description: enDictionary.solution.cards.reconciliation.description,
      accent: 'var(--brand-info)',
      Icon: RefreshCcw,
    },
    {
      titleLine1: enDictionary.solution.cards.trueCacRoas.titleLine1,
      titleLine2: enDictionary.solution.cards.trueCacRoas.titleLine2,
      description: enDictionary.solution.cards.trueCacRoas.description,
      accent: 'var(--brand-info)',
      Icon: Target,
    },
    {
      titleLine1: enDictionary.solution.cards.hiddenLeak.titleLine1,
      titleLine2: enDictionary.solution.cards.hiddenLeak.titleLine2,
      description: enDictionary.solution.cards.hiddenLeak.description,
      accent: 'var(--brand-warning)',
      Icon: Droplets,
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
    stagger: 0.2,
    gridColumns: 3,
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
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div className="mx-auto max-w-[980px]">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {solutionSectionCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <h2
            data-reveal-text
            className="mt-8 text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.2] text-[var(--text-primary)]"
          >
            {solutionSectionCopy.titleLine1}
            <br />
            {solutionSectionCopy.titleLine2}
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
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

                    <h3 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.15] text-[var(--text-primary)]">
                      {card.titleLine1}
                      <br />
                      <span
                        style={{
                          color: `color-mix(in srgb, ${card.accent} 78%, var(--text-primary) 22%)`,
                        }}
                      >
                        {card.titleLine2}
                      </span>
                    </h3>
                  </div>

                  <p className="body mt-5 max-w-[320px] text-[var(--text-secondary)]">
                    {card.description}
                  </p>
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
