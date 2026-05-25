import enDictionary from "../i18n/en"

const copy = enDictionary.revenueAuditCta

function RevenueAuditCtaSection() {
	return (
		<section id="audit" className="cta-section">
			<div className="cta-container">
				<h2 className="cta-title">
					{copy.headlineLine1}
					<br />
					{copy.headlineLine2}
				</h2>
				<p className="cta-sub">{copy.subcopy}</p>
				<a href="#contact" className="btn-primary-lg cta-button">
					{copy.ctaLabel}
				</a>
				<p className="cta-footnote">{copy.footnote}</p>
			</div>
		</section>
	)
}

export default RevenueAuditCtaSection
