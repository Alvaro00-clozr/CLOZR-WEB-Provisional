import { useCallback } from 'react'
import { Check } from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

type PricingPlan = {
  name: string
  price: string
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
      subtitle: enDictionary.pricing.plans.growthPartner.subtitle,
      description: enDictionary.pricing.plans.growthPartner.description,
      features: [...enDictionary.pricing.plans.growthPartner.features],
      ctaLabel: enDictionary.pricing.plans.growthPartner.cta,
      ctaHref: '/#contact',
    },
  ] satisfies PricingPlan[],
}

function PricingSection() {
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
      id="pricing"
      className="relative overflow-hidden scroll-mt-24 py-20 md:scroll-mt-28 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div className="mx-auto max-w-[980px]">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {pricingCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <p
            data-reveal-text
            className="caption mt-5 text-center tracking-[0.2em] text-[color-mix(in_srgb,var(--brand-warning)_76%,var(--text-primary)_24%)]"
          >
            {pricingCopy.support}
          </p>

          <h2
            data-reveal-text
            className="mt-6 text-center font-[var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.18] text-[var(--text-primary)]"
          >
            {pricingCopy.headline}
          </h2>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {pricingCopy.plans.map((plan) => (
              <article
                key={plan.name}
                data-reveal-visual
                className={`relative isolate h-full overflow-hidden rounded-[var(--radius-lg)] p-5 transition-all duration-300 ease-out sm:p-6 ${
                  plan.isPopular
                    ? 'widget-premium-border bg-[color-mix(in_srgb,var(--bg-card)_94%,transparent)] lg:-translate-y-3 lg:scale-[1.03] lg:hover:scale-[1.04]'
                    : 'border border-[color-mix(in_srgb,var(--text-muted)_22%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_90%,transparent)] shadow-[0_16px_34px_rgba(0,0,0,0.34)] lg:w-[94%] lg:justify-self-center lg:translate-y-3 lg:scale-[0.94] lg:opacity-90 lg:hover:scale-[0.97] lg:hover:opacity-100'
                }`}
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
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-[var(--font-heading)] text-[1.7rem] leading-[1.05] text-[var(--text-primary)]">
                        {plan.name}
                      </h3>
                      <p className="body mt-3 text-[var(--text-secondary)]">{plan.subtitle}</p>
                    </div>
                    {plan.isPopular ? (
                      <span className="caption inline-flex rounded-[999px] border border-[color-mix(in_srgb,var(--brand-warning)_62%,transparent)] bg-[color-mix(in_srgb,var(--brand-warning)_16%,transparent)] px-3 py-1 tracking-[0.08em] text-[color-mix(in_srgb,var(--brand-warning)_88%,var(--text-primary)_12%)]">
                        {pricingCopy.popularBadge}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-7 font-[var(--font-heading)] text-[2rem] leading-none text-[var(--text-primary)]">
                    {plan.price}
                  </p>
                  <p className="body mt-4 text-[var(--text-secondary)]">{plan.description}</p>

                  <div className="mt-6 flex-1">
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check
                            size={16}
                            className="mt-1 shrink-0 text-[color-mix(in_srgb,var(--brand-warning)_84%,var(--text-primary)_16%)]"
                          />
                          <span className="body text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={plan.ctaHref}
                    className={`body mt-7 inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-lg)] px-5 text-center transition-colors ${
                      plan.isPopular
                        ? 'btn-gradient'
                        : 'widget-premium-border text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)]'
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
