import { useCallback, useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

type PricingPlan = {
  name: string
  price: string
  previousPrice?: string
  hidePreviousPrice?: boolean
  subtitle: string
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  isPopular?: boolean
}

const pricingCopy = {
  eyebrow: enDictionary.pricing.eyebrow,
  support: enDictionary.pricing.support,
  headline: enDictionary.pricing.headline,
  popularBadge: enDictionary.pricing.popularBadge,
  showMoreFeatures: enDictionary.pricing.showMoreFeatures,
  showLessFeatures: enDictionary.pricing.showLessFeatures,
  comparison: {
    title: enDictionary.pricing.comparison.title,
    showToggle: enDictionary.pricing.comparison.showToggle,
    hideToggle: enDictionary.pricing.comparison.hideToggle,
    columns: enDictionary.pricing.comparison.columns,
    rows: [...enDictionary.pricing.comparison.rows],
  },
  plans: [
    {
      name: enDictionary.pricing.plans.starter.name,
      price: enDictionary.pricing.plans.starter.price,
      subtitle: enDictionary.pricing.plans.starter.subtitle,
      description: enDictionary.pricing.plans.starter.description,
      features: [...enDictionary.pricing.plans.starter.features],
      ctaLabel: enDictionary.pricing.plans.starter.cta,
      ctaHref: '/#contact',
    },
    {
      name: enDictionary.pricing.plans.professional.name,
      price: enDictionary.pricing.plans.professional.price,
      subtitle: enDictionary.pricing.plans.professional.subtitle,
      description: enDictionary.pricing.plans.professional.description,
      features: [...enDictionary.pricing.plans.professional.features],
      ctaLabel: enDictionary.pricing.plans.professional.cta,
      ctaHref: '/#contact',
      isPopular: true,
    },
    {
      name: enDictionary.pricing.plans.growthPartner.name,
      price: enDictionary.pricing.plans.growthPartner.price,
      previousPrice: enDictionary.pricing.plans.growthPartner.previousPrice,
      hidePreviousPrice: true,
      subtitle: enDictionary.pricing.plans.growthPartner.subtitle,
      description: enDictionary.pricing.plans.growthPartner.description,
      features: [...enDictionary.pricing.plans.growthPartner.features],
      ctaLabel: enDictionary.pricing.plans.growthPartner.cta,
      ctaHref: '/#contact',
    },
  ] as PricingPlan[],
}

const renderComparisonValue = (value: string) => {
  if (value === 'Yes') {
    return <Check size={16} className="text-[var(--brand-profit)]" />
  }

  if (value === 'No') {
    return <X size={16} className="text-[var(--brand-loss)]" />
  }

  return value
}

const pricingTextRevealOptions = {
  itemsSelector: '[data-reveal-text]',
  start: 'top 60%',
  once: false,
  xItems: -68,
  yItems: 0,
  durationItems: 0.58,
  stagger: 0.1,
} as const

const pricingVisualRevealOptions = {
  itemsSelector: '[data-reveal-visual]',
  start: 'top 60%',
  once: false,
  xItems: 0,
  yItems: 112,
  durationItems: 0.66,
  stagger: 0.16,
  gridColumns: 3,
} as const

const MAX_VISIBLE_FEATURES = 5

function PricingSection() {
  const [isComparisonVisible, setIsComparisonVisible] = useState(false)
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({})

  const { rootRef: textRevealRef } = useGsapReveal<HTMLElement>(pricingTextRevealOptions)

  const { rootRef: visualRevealRef } = useGsapReveal<HTMLElement>(pricingVisualRevealOptions)

  const sectionRef = useCallback(
    (node: HTMLElement | null) => {
      textRevealRef(node)
      visualRevealRef(node)
    },
    [textRevealRef, visualRevealRef],
  )

  useEffect(() => {
    let isDisposed = false
    let timeoutId: number | null = null
    const rafId = window.requestAnimationFrame(() => {
      void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (isDisposed) return
        ScrollTrigger.refresh()
        timeoutId = window.setTimeout(() => {
          if (isDisposed) return
          ScrollTrigger.refresh()
        }, 420)
      })
    })

    return () => {
      isDisposed = true
      window.cancelAnimationFrame(rafId)
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [isComparisonVisible])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="site-section site-section-anchor"
    >
      <div className="site-shell">
        <div className="site-shell-inner">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {pricingCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <p
            data-reveal-text
            className="caption section-support text-center tracking-[0.2em] text-[color-mix(in_srgb,var(--brand-warning)_76%,var(--text-primary)_24%)]"
          >
            {pricingCopy.support}
          </p>

          <h2
            data-reveal-text
            className="section-title text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.18] text-[var(--text-primary)]"
          >
            {pricingCopy.headline}
          </h2>

          <div className="section-content grid items-stretch gap-4 xl:gap-5 lg:grid-cols-3">
            {pricingCopy.plans.map((plan) => {
              const isExpanded = expandedPlans[plan.name] ?? false
              const hasOverflowFeatures = plan.features.length > MAX_VISIBLE_FEATURES
              const visibleFeatures =
                hasOverflowFeatures && !isExpanded
                  ? plan.features.slice(0, MAX_VISIBLE_FEATURES)
                  : plan.features

              return (
              <article
                key={plan.name}
                data-reveal-visual
                className={`relative isolate h-full overflow-hidden rounded-[var(--radius-lg)] p-5 transition-all duration-300 ease-out sm:p-6 ${
                  plan.isPopular
                    ? 'bg-[color-mix(in_srgb,var(--bg-card)_96%,transparent)] shadow-[var(--pricing-popular-shadow)]'
                    : 'border border-[color-mix(in_srgb,var(--text-muted)_22%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_90%,transparent)] shadow-[var(--pricing-standard-shadow)]'
                }`}
                style={
                  plan.isPopular
                    ? {
                        border: '2px solid var(--pricing-popular-border)',
                      }
                    : undefined
                }
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-55"
                  style={{
                    background: plan.isPopular
                      ? 'radial-gradient(90% 82% at 18% 10%, color-mix(in srgb, var(--brand-warning) 24%, transparent) 0%, transparent 72%), radial-gradient(86% 84% at 88% 16%, color-mix(in srgb, var(--brand-info) 20%, transparent) 0%, transparent 74%)'
                      : 'radial-gradient(88% 82% at 12% 10%, color-mix(in srgb, var(--brand-info) 18%, transparent) 0%, transparent 72%)',
                  }}
                />

                <div className="relative flex h-full flex-col">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-[var(--font-heading)] text-[1.7rem] leading-[1.05] text-[var(--text-primary)]">
                        {plan.name}
                      </h3>
                      {plan.isPopular ? (
                        <span className="caption inline-flex rounded-[999px] border border-[color-mix(in_srgb,var(--pricing-popular-border)_52%,transparent)] bg-[color-mix(in_srgb,var(--pricing-popular-border)_16%,transparent)] px-3 py-1 tracking-[0.08em] text-[color-mix(in_srgb,var(--pricing-popular-border)_84%,var(--text-primary)_16%)] text-center">
                          {pricingCopy.popularBadge}
                        </span>
                      ) : null}
                    </div>
                    <p className="body mt-3 text-[var(--text-secondary)]">{plan.subtitle}</p>
                  </div>

                  <div className="mt-7">
                    {plan.previousPrice && !plan.hidePreviousPrice ? (
                      <p className="body text-[var(--text-muted)] line-through decoration-[color-mix(in_srgb,var(--text-muted)_75%,transparent)]">
                        {plan.previousPrice}
                      </p>
                    ) : null}
                    <p
                      className={`mt-1 font-[var(--font-heading)] text-[clamp(2.2rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.02em] ${
                        plan.isPopular
                          ? 'text-[color-mix(in_srgb,var(--brand-warning)_88%,var(--text-primary)_12%)]'
                          : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {plan.price}
                    </p>
                  </div>
                  <p className="body mt-4 text-[var(--text-secondary)]">{plan.description}</p>

                  <div className="mt-6 flex-1">
                    <ul className="space-y-2.5">
                      {visibleFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check
                            size={16}
                            className="mt-1 shrink-0 text-[color-mix(in_srgb,var(--brand-warning)_84%,var(--text-primary)_16%)]"
                          />
                          <span className="body text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {hasOverflowFeatures ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedPlans((current) => ({
                            ...current,
                            [plan.name]: !isExpanded,
                          }))
                        }
                        className="body-sm mt-4 inline-flex rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] px-3 py-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_12%,transparent)] hover:text-[var(--text-primary)]"
                      >
                        {isExpanded ? pricingCopy.showLessFeatures : pricingCopy.showMoreFeatures}
                      </button>
                    ) : null}
                  </div>

                  <a
                    href={plan.ctaHref}
                    className={`body mt-7 inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-lg)] px-5 text-center transition-colors ${
                      plan.isPopular
                        ? 'btn-gradient'
                        : plan.previousPrice
                          ? 'border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_76%,transparent)] text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--brand-warning)_10%,transparent)]'
                          : 'border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-transparent text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--text-muted)_10%,transparent)]'
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>
                </div>
              </article>
              )
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsComparisonVisible((current) => !current)}
              className="body inline-flex h-11 items-center justify-center rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_78%,transparent)] px-6 text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_12%,transparent)]"
            >
              {isComparisonVisible
                ? pricingCopy.comparison.hideToggle
                : pricingCopy.comparison.showToggle}
            </button>
          </div>

          <div
            className={`grid transition-[grid-template-rows,opacity,margin-top] duration-500 ease-out ${
              isComparisonVisible
                ? 'mt-6 grid-rows-[1fr] opacity-100'
                : 'mt-0 grid-rows-[0fr] opacity-0'
            }`}
            aria-hidden={!isComparisonVisible}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className={`widget-premium-border relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-[var(--pricing-table-shell-border)] bg-[var(--pricing-table-shell-bg)] shadow-[var(--pricing-standard-shadow)] transition-transform duration-500 ease-out ${
                  isComparisonVisible ? 'translate-y-0' : '-translate-y-3'
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      'radial-gradient(94% 84% at 16% 10%, color-mix(in srgb, var(--brand-warning) 20%, transparent) 0%, transparent 74%), radial-gradient(92% 86% at 88% 14%, color-mix(in srgb, var(--brand-info) 16%, transparent) 0%, transparent 76%)',
                  }}
                />

                <div className="relative overflow-x-auto">
                  <table className="w-full min-w-[720px] border-separate border-spacing-0">
                    <thead>
                      <tr>
                        <th className="body-sm border-b border-[var(--pricing-table-border)] px-5 py-3 text-center font-medium uppercase tracking-[0.08em] text-[var(--text-muted)] sm:px-6">
                          <span className="inline-flex w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--pricing-table-header-bg)] px-2 py-1">
                            {pricingCopy.comparison.columns.feature}
                          </span>
                        </th>
                        <th className="body-sm border-b border-[var(--pricing-table-border)] px-5 py-3 text-center font-medium uppercase tracking-[0.08em] text-[var(--text-muted)] sm:px-6">
                          <span className="inline-flex w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--pricing-table-header-bg)] px-2 py-1">
                            {pricingCopy.comparison.columns.starter}
                          </span>
                        </th>
                        <th className="body-sm border-b border-[var(--pricing-table-border)] px-5 py-3 text-center font-medium uppercase tracking-[0.08em] text-[var(--brand-warning)] sm:px-6">
                          <span className="inline-flex w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--pricing-table-header-bg)] px-2 py-1">
                            {pricingCopy.comparison.columns.professional}
                          </span>
                        </th>
                        <th className="body-sm border-b border-[var(--pricing-table-border)] px-5 py-3 text-center font-medium uppercase tracking-[0.08em] text-[var(--text-muted)] sm:px-6">
                          <span className="inline-flex w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--pricing-table-header-bg)] px-2 py-1">
                            {pricingCopy.comparison.columns.scale}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingCopy.comparison.rows.map((row, index) => (
                        <tr
                          key={row.feature}
                          className={`transition-colors duration-200 hover:bg-[var(--pricing-table-row-hover-bg)] ${
                            index % 2 === 0
                              ? 'bg-[var(--pricing-table-row-bg)]'
                              : 'bg-[var(--pricing-table-row-alt-bg)]'
                          }`}
                        >
                          <td className="body border-b border-[var(--pricing-table-border)] px-5 py-4 text-center text-[var(--text-primary)] sm:px-6">
                            <span className="inline-flex w-full items-center justify-center">
                              {row.feature}
                            </span>
                          </td>
                          <td className="body border-b border-[var(--pricing-table-border)] px-5 py-4 text-center text-[var(--text-secondary)] sm:px-6">
                            <span className="inline-flex w-full items-center justify-center">
                              {renderComparisonValue(row.starter)}
                            </span>
                          </td>
                          <td className="body border-b border-[var(--pricing-table-border)] px-5 py-4 text-center font-medium text-[var(--text-primary)] sm:px-6">
                            <span className="inline-flex w-full items-center justify-center">
                              {renderComparisonValue(row.professional)}
                            </span>
                          </td>
                          <td className="body border-b border-[var(--pricing-table-border)] px-5 py-4 text-center text-[var(--text-secondary)] sm:px-6">
                            <span className="inline-flex w-full items-center justify-center">
                              {renderComparisonValue(row.scale)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
