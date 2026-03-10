import { useCallback } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'

const attributionSectionCopy = {
  eyebrow: 'THE ATTRIBUTION ILLUSION',
  titleLine: 'According to market data,',
  titlePrefix: 'you are',
  titleHighlight: 'losing up to 30%',
  titleSuffix: 'of your margins',
  paragraphs: [
    'Ad platforms claim conversions. Your bank account tells a different story.',
    'Between iOS updates, attribution overlaps, refunds, and failed payments, relying on Meta or Google dashboards is burning your flow.',
  ],
  chartBadge: '30%',
  chartLabelClaimedLine1: 'Platform Claimed',
  chartLabelClaimedLine2: 'Revenue',
  chartLabelBankLine1: 'Actual Bank',
  chartLabelBankLine2: 'Deposit',
}

type AttributionComparisonChartProps = {
  chartBadge: string
  chartLabelClaimedLine1: string
  chartLabelClaimedLine2: string
  chartLabelBankLine1: string
  chartLabelBankLine2: string
}

function AttributionComparisonChart({
  chartBadge,
  chartLabelClaimedLine1,
  chartLabelClaimedLine2,
  chartLabelBankLine1,
  chartLabelBankLine2,
}: AttributionComparisonChartProps) {
  const claimedValue = 100
  const bankValue = 70

  const width = 420
  const height = 420
  const chartTop = 54
  const chartBottom = 302
  const chartLeft = 48
  const chartRight = 372
  const plotHeight = chartBottom - chartTop

  const barWidth = 86
  const claimedX = 102
  const bankX = 232
  const claimedCenterX = claimedX + barWidth / 2
  const bankCenterX = bankX + barWidth / 2

  const valueToY = (value: number) => chartBottom - (value / 100) * plotHeight

  const claimedY = valueToY(claimedValue)
  const bankY = valueToY(bankValue)

  const trendPath = `M ${claimedCenterX} ${claimedY} C ${claimedCenterX + 54} ${
    claimedY + 2
  }, ${bankCenterX - 56} ${bankY - 6}, ${bankCenterX} ${bankY}`

  return (
    <div className="relative w-full rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_18%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_90%,transparent)] p-2 sm:p-3">
      <svg
        role="img"
        aria-label="Revenue attribution comparison chart"
        className="block aspect-square w-full"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="claimedBarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--brand-info)', stopOpacity: 0.68 }} />
            <stop offset="100%" style={{ stopColor: 'var(--brand-info)', stopOpacity: 0.14 }} />
          </linearGradient>
          <linearGradient id="bankBarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--brand-info)', stopOpacity: 0.48 }} />
            <stop offset="100%" style={{ stopColor: 'var(--brand-info)', stopOpacity: 0.1 }} />
          </linearGradient>
          <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[100, 75, 50, 25, 0].map((level) => {
          const y = valueToY(level)
          const isBaseLine = level === 0

          return (
            <g key={level}>
              <line
                x1={chartLeft}
                y1={y}
                x2={chartRight}
                y2={y}
                stroke={
                  isBaseLine
                    ? 'color-mix(in srgb, var(--text-muted) 30%, transparent)'
                    : 'color-mix(in srgb, var(--text-muted) 16%, transparent)'
                }
                strokeWidth={isBaseLine ? 1.2 : 1}
                strokeDasharray={isBaseLine ? undefined : '3 5'}
              />
              <text
                x={chartLeft - 12}
                y={y + 4}
                textAnchor="end"
                className="font-numbers"
                fontSize="11"
                fill="color-mix(in srgb, var(--text-muted) 88%, transparent)"
              >
                {level}
              </text>
            </g>
          )
        })}

        <rect
          x={claimedX}
          y={claimedY}
          width={barWidth}
          height={chartBottom - claimedY}
          rx="8"
          fill="url(#claimedBarFill)"
          stroke="color-mix(in srgb, var(--brand-info) 60%, transparent)"
        />
        <rect
          x={bankX}
          y={bankY}
          width={barWidth}
          height={chartBottom - bankY}
          rx="8"
          fill="url(#bankBarFill)"
          stroke="color-mix(in srgb, var(--brand-info) 46%, transparent)"
        />

        <path
          d={trendPath}
          fill="none"
          stroke="var(--brand-info)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#lineGlow)"
        />

        <circle cx={claimedCenterX} cy={claimedY} r="4.5" fill="var(--brand-info)" />
        <circle cx={bankCenterX} cy={bankY} r="4.5" fill="var(--brand-info)" />

        <line
          x1="356"
          y1={claimedY}
          x2="356"
          y2={bankY}
          stroke="color-mix(in srgb, var(--brand-warning) 68%, transparent)"
          strokeWidth="1.2"
          strokeDasharray="2 4"
        />
        <line
          x1="350"
          y1={claimedY}
          x2="362"
          y2={claimedY}
          stroke="color-mix(in srgb, var(--brand-warning) 74%, transparent)"
          strokeWidth="1.2"
        />
        <line
          x1="350"
          y1={bankY}
          x2="362"
          y2={bankY}
          stroke="color-mix(in srgb, var(--brand-warning) 74%, transparent)"
          strokeWidth="1.2"
        />

        <rect
          x="328"
          y={(claimedY + bankY) / 2 - 15}
          width="54"
          height="30"
          rx="6"
          fill="color-mix(in srgb, var(--bg-card) 92%, transparent)"
          stroke="color-mix(in srgb, var(--brand-warning) 54%, transparent)"
        />
        <text
          x="355"
          y={(claimedY + bankY) / 2 + 4}
          textAnchor="middle"
          className="font-numbers"
          fontSize="14"
          fill="var(--brand-warning)"
        >
          {chartBadge}
        </text>

        <text
          x={claimedCenterX}
          y={claimedY - 10}
          textAnchor="middle"
          className="font-numbers"
          fontSize="13"
          fill="var(--text-primary)"
        >
          {claimedValue}
        </text>
        <text
          x={bankCenterX}
          y={bankY - 10}
          textAnchor="middle"
          className="font-numbers"
          fontSize="16"
          fill="var(--text-primary)"
        >
          {bankValue}
        </text>

        <text
          x={claimedCenterX}
          y="340"
          textAnchor="middle"
          fontSize="13"
          fill="var(--text-secondary)"
        >
          <tspan x={claimedCenterX} dy="0">
            {chartLabelClaimedLine1}
          </tspan>
          <tspan x={claimedCenterX} dy="16">
            {chartLabelClaimedLine2}
          </tspan>
        </text>
        <text
          x={bankCenterX}
          y="340"
          textAnchor="middle"
          fontSize="16"
          fill="var(--text-secondary)"
        >
          <tspan x={bankCenterX} dy="0">
            {chartLabelBankLine1}
          </tspan>
          <tspan x={bankCenterX} dy="16">
            {chartLabelBankLine2}
          </tspan>
        </text>
      </svg>

    </div>
  )
}

function AttributionSection() {
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
      id="product"
      className="relative overflow-hidden scroll-mt-24 bg-[var(--bg-primary)] py-20 md:scroll-mt-28 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(65% 82% at 72% 18%, color-mix(in srgb, var(--brand-warning) 22%, transparent) 0%, transparent 62%), radial-gradient(72% 76% at 26% 44%, color-mix(in srgb, var(--brand-info) 14%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 md:h-36"
        style={{
          background:
            'linear-gradient(180deg, rgba(6, 8, 13, 0) 0%, color-mix(in srgb, var(--bg-primary) 98%, transparent) 78%, var(--bg-primary) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div className="mx-auto max-w-[980px]">
          <div data-reveal-text className="flex items-center gap-5">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
            <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
              {attributionSectionCopy.eyebrow}
            </p>
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
          </div>

          <h2
            data-reveal-text
            className="mt-8 text-center font-[var(--font-heading)] text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.2] text-[var(--text-primary)]"
          >
            {attributionSectionCopy.titleLine}
            <br />
            {attributionSectionCopy.titlePrefix}{' '}
            <span className="text-[var(--brand-warning)]">
              {attributionSectionCopy.titleHighlight}
            </span>{' '}
            {attributionSectionCopy.titleSuffix}
          </h2>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,410px)] lg:gap-14">
            <div data-reveal-text className="space-y-6 text-[var(--text-secondary)]">
              {attributionSectionCopy.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-lg max-w-[620px]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              data-reveal-visual
              className="widget-premium-border relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-5 sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(80% 80% at 50% 12%, color-mix(in srgb, var(--brand-info) 22%, transparent) 0%, transparent 62%), radial-gradient(72% 95% at 18% 12%, color-mix(in srgb, var(--brand-warning) 18%, transparent) 0%, transparent 76%)',
                }}
              />

              <div className="relative">
                <AttributionComparisonChart
                  chartBadge={attributionSectionCopy.chartBadge}
                  chartLabelClaimedLine1={
                    attributionSectionCopy.chartLabelClaimedLine1
                  }
                  chartLabelClaimedLine2={
                    attributionSectionCopy.chartLabelClaimedLine2
                  }
                  chartLabelBankLine1={attributionSectionCopy.chartLabelBankLine1}
                  chartLabelBankLine2={attributionSectionCopy.chartLabelBankLine2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AttributionSection
