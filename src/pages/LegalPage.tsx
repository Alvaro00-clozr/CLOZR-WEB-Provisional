import Header from '../components/Header'
import Footer from '../components/Footer'
import GlobalMotionBackground from '../components/GlobalMotionBackground'
import enDictionary from '../i18n/en'
import usePageSeo from '../hooks/usePageSeo'

type LegalSection = {
  heading: string
  paragraphs: readonly string[]
}

type LegalPageProps = {
  title: string
  seoTitle: string
  seoDescription: string
  seoPath: string
  eyebrow: string
  intro: string
  lastUpdatedLabel: string
  lastUpdatedValue: string
  sections: readonly LegalSection[]
}

function LegalPage({
  title,
  seoTitle,
  seoDescription,
  seoPath,
  eyebrow,
  intro,
  lastUpdatedLabel,
  lastUpdatedValue,
  sections,
}: LegalPageProps) {
  usePageSeo({
    title: seoTitle,
    description: seoDescription,
    path: seoPath,
  })

  const shared = enDictionary.legalPages.shared

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative isolate flex-1 overflow-hidden pt-[60px]">
        <GlobalMotionBackground />
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
            <div className="mx-auto max-w-[920px]">
              <div className="flex items-center gap-5">
                <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
                <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
                  {eyebrow}
                </p>
                <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--text-muted)_32%,transparent)]" />
              </div>

              <div className="mt-10 rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_18%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_88%,transparent)] p-6 shadow-[0_20px_44px_rgba(0,0,0,0.32)] sm:p-8 md:p-10">
                <div className="flex flex-col gap-6 border-b border-[color-mix(in_srgb,var(--text-muted)_16%,transparent)] pb-8">
                  <a
                    href="/#top"
                    className="body-sm inline-flex w-fit rounded-[var(--radius-lg)] px-3 py-1.5 text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
                  >
                    {shared.backToHome}
                  </a>

                  <div className="space-y-4">
                    <h1 className="font-[var(--font-heading)] text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.06] text-[var(--text-primary)]">
                      {title}
                    </h1>
                    <p className="body text-[var(--text-secondary)]">
                      {lastUpdatedLabel}: {lastUpdatedValue}
                    </p>
                    <p className="body-lg max-w-[780px] text-[var(--text-secondary)]">{intro}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-8">
                  {sections.map((section) => (
                    <section key={section.heading} className="space-y-3">
                      <h2 className="font-[var(--font-heading)] text-[1.45rem] leading-[1.2] text-[var(--text-primary)]">
                        {section.heading}
                      </h2>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="body text-[var(--text-secondary)]">
                          {paragraph}
                        </p>
                      ))}
                    </section>
                  ))}
                </div>

                <div className="mt-10 rounded-[16px] border border-[color-mix(in_srgb,var(--brand-warning)_24%,transparent)] bg-[color-mix(in_srgb,var(--brand-warning)_8%,transparent)] p-5">
                  <h3 className="font-[var(--font-heading)] text-[1.05rem] text-[var(--text-primary)]">
                    {shared.noteTitle}
                  </h3>
                  <p className="body mt-2 text-[var(--text-secondary)]">{shared.noteBody}</p>
                  <p className="body mt-3 text-[var(--text-secondary)]">
                    {shared.contactLabel}: {shared.contactEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default LegalPage
