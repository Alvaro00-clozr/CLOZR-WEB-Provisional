import { useEffect, useRef, useState } from "react"
import { Droplets, RefreshCcw, Search, Target, type LucideIcon } from "lucide-react"
import enDictionary from "../i18n/en"
import AttributionComparisonChart from "./AttributionComparisonChart"

const attribution = enDictionary.attribution
const solution = enDictionary.solution
const socialProof = enDictionary.socialProof
const howItWorks = enDictionary.howItWorks

const TOTAL = 4

const dotLabels = [
	attribution.eyebrow,
	solution.eyebrow,
	socialProof.eyebrow,
	howItWorks.eyebrow,
]

type SolutionCard = {
	titleLine1: string
	titleLine2: string
	points: readonly string[]
	accent: string
	Icon: LucideIcon
}

const solutionCardEntries: SolutionCard[] = [
	{
		...solution.cards.failedPaymentLeakage,
		accent: "var(--brand-warning)",
		Icon: RefreshCcw,
	},
	{
		...solution.cards.refundArbitrage,
		accent: "var(--brand-info)",
		Icon: Target,
	},
	{
		...solution.cards.chargebackBleeding,
		accent: "var(--brand-loss)",
		Icon: Droplets,
	},
	{
		...solution.cards.attributionLies,
		accent: "var(--brand-warning)",
		Icon: Search,
	},
]

const integrationEntries = [
	{ key: "stripe", label: socialProof.integrations.stripe, src: "/social/stripe_logo.png" },
	{ key: "meta", label: socialProof.integrations.meta, src: "/social/meta_icon.png" },
	{ key: "google", label: socialProof.integrations.google, src: "/social/google_icon.svg" },
]

function StickyFeaturesSection() {
	const trackRef = useRef<HTMLDivElement>(null)
	const [activeIdx, setActiveIdx] = useState(0)
	const [navVisible, setNavVisible] = useState(false)

	useEffect(() => {
		const track = trackRef.current
		if (!track) return

		const onScroll = () => {
			const rect = track.getBoundingClientRect()
			const trackH = track.offsetHeight
			const progress = -rect.top / (trackH - window.innerHeight)

			const inView =
				rect.top < window.innerHeight * 0.8 &&
				rect.bottom > window.innerHeight * 0.2
			setNavVisible(inView)

			if (progress < 0 || progress > 1) return
			const idx = Math.min(Math.floor(progress * TOTAL), TOTAL - 1)
			setActiveIdx(idx)
		}

		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const goPanel = (idx: number) => {
		const track = trackRef.current
		if (!track) return
		const rect = track.getBoundingClientRect()
		const offset = window.scrollY + rect.top
		const seg = track.offsetHeight / TOTAL
		window.scrollTo({ top: offset + seg * idx + 1, behavior: "smooth" })
	}

	return (
		<>
			<div className="sticky-features" id="product">
				<div className="sticky-track" ref={trackRef}>
					<div className="sticky-stage">
						<div className="sticky-inner">
							<div className={`sticky-panel ${activeIdx === 0 ? "active" : ""}`}>
								<div className="feature-grid">
									<div className="feature-text">
										<span className="feature-tag">{attribution.eyebrow}</span>
										<h2 className="feature-title">
											{attribution.titleLine}
											<br />
											{attribution.titlePrefix}{" "}
											<span style={{ color: "var(--brand-warning)" }}>
												{attribution.titleHighlight}
											</span>
											{attribution.titleSuffix ? ` ${attribution.titleSuffix}` : ""}
										</h2>
										<p className="feature-body">{attribution.paragraphs[0]}</p>
										<div className="feature-points">
											<div className="feature-point fp-green">{attribution.paragraphs[1]}</div>
											<div className="feature-point fp-green">{attribution.paragraphs[2]}</div>
											<div className="feature-point fp-green">{attribution.paragraphs[3]}</div>
										</div>
									</div>
									<div className="feature-visual feature-visual--chart">
										<AttributionComparisonChart
											chartBadge={attribution.chart.badge}
											chartLabelClaimedLine1={attribution.chart.labels.claimedLine1}
											chartLabelClaimedLine2={attribution.chart.labels.claimedLine2}
											chartLabelBankLine1={attribution.chart.labels.bankLine1}
											chartLabelBankLine2={attribution.chart.labels.bankLine2}
											chartAriaLabel={attribution.chart.ariaLabel}
										/>
									</div>
								</div>
							</div>

							<div className={`sticky-panel ${activeIdx === 1 ? "active" : ""}`}>
								<div className="solution-stack">
									<header className="solution-stack-header">
										<span className="feature-tag">{solution.eyebrow}</span>
										<h2 className="feature-title">
											{solution.titleLine1}
											<br />
											{solution.titleLine2}
										</h2>
										<p className="solution-stack-body">
											{solution.cards.failedPaymentLeakage.points[0]}{" "}
											{solution.cards.failedPaymentLeakage.points[1]}
										</p>
									</header>
									<div className="solution-cards-row">
										{solutionCardEntries.map((card) => (
											<article
												key={`${card.titleLine1}-${card.titleLine2}`}
												className="solution-card"
												style={{ ['--card-accent' as string]: card.accent }}
											>
												<div
													aria-hidden="true"
													className="solution-card-glow"
													style={{
														background: `radial-gradient(88% 78% at 10% 8%, color-mix(in srgb, ${card.accent} 26%, transparent) 0%, transparent 62%), linear-gradient(180deg, rgba(8,11,17,0) 0%, rgba(8,11,17,0.22) 100%)`,
													}}
												/>
												<div className="solution-card-content">
													<div
														className="solution-card-icon"
														style={{
															borderColor: `color-mix(in srgb, ${card.accent} 52%, transparent)`,
															background: `linear-gradient(145deg, color-mix(in srgb, ${card.accent} 38%, transparent), color-mix(in srgb, ${card.accent} 14%, transparent))`,
														}}
													>
														<card.Icon size={20} strokeWidth={2.15} color="var(--text-primary)" />
													</div>
													<h3 className="solution-card-title">
														{card.titleLine1}
														<span
															className="solution-card-subtitle"
															style={{
																color: `color-mix(in srgb, ${card.accent} 78%, var(--text-primary) 22%)`,
															}}
														>
															{card.titleLine2}
														</span>
													</h3>
													<ul className="solution-card-points">
														{card.points.map((point) => (
															<li key={point}>{point}</li>
														))}
													</ul>
												</div>
											</article>
										))}
									</div>
								</div>
							</div>

							<div className={`sticky-panel ${activeIdx === 2 ? "active" : ""}`}>
								<div className="feature-grid">
									<div className="feature-text">
										<span className="feature-tag">{socialProof.eyebrow}</span>
										<h2 className="feature-title">{socialProof.headline}</h2>
										<p className="feature-body">{socialProof.subcopy}</p>
										<div className="feature-points">
											{socialProof.certifications.map((cert) => (
												<div key={cert} className="feature-point fp-gold">{cert}</div>
											))}
										</div>
									</div>
									<div className="feature-visual">
										<div className="fv-eyebrow">{socialProof.integrationsTitle}</div>
										<div className="integrations-grid">
											{integrationEntries.map((int) => (
												<div key={int.key} className="integration-tile">
													<img src={int.src} alt="" />
													<span className="integration-label">{int.label}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							<div className={`sticky-panel ${activeIdx === 3 ? "active" : ""}`}>
								<div className="how-stack">
									<header className="how-stack-header">
										<span className="feature-tag">{howItWorks.eyebrow}</span>
										<h2 className="feature-title">{howItWorks.title}</h2>
									</header>
									<div className="steps-grid">
										{howItWorks.steps.map((step) => (
											<div key={step.number} className="step">
												<div className="step-num">{step.number}</div>
												<div className="step-title">{step.title}</div>
												<div className="step-body">{step.body}</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`sticky-nav ${navVisible ? "visible" : ""}`} aria-hidden={!navVisible}>
				{dotLabels.map((label, i) => (
					<button
						key={label}
						type="button"
						className={`sticky-dot ${activeIdx === i ? "active" : ""}`}
						onClick={() => goPanel(i)}
						aria-label={label}
					>
						<span className="sticky-dot-label">{label}</span>
					</button>
				))}
			</div>
		</>
	)
}

export default StickyFeaturesSection
