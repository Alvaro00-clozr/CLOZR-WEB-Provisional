import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlobalMotionBackground from '../components/GlobalMotionBackground'
import enDictionary from '../i18n/en'
import usePageSeo from '../hooks/usePageSeo'

function NotFoundPage() {
  const copy = enDictionary.notFound

  usePageSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: '/404',
  })

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    const previous = robots?.getAttribute('content') ?? null
    robots?.setAttribute('content', 'noindex, follow')
    return () => {
      if (robots && previous !== null) robots.setAttribute('content', previous)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="site-main-offset relative isolate flex-1 overflow-hidden">
        <GlobalMotionBackground />
        <section className="site-section">
          <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="caption tracking-[0.42em] text-[color-mix(in_srgb,var(--text-muted)_88%,var(--text-primary)_12%)]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-6 font-[var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-[var(--text-primary)]">
                {copy.title}
              </h1>
              <p className="body-lg mx-auto mt-6 max-w-[560px] text-[var(--text-secondary)]">
                {copy.description}
              </p>
              <a
                href="/"
                className="mt-10 inline-flex items-center rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--brand-warning)_24%,transparent)] bg-[color-mix(in_srgb,var(--brand-warning)_8%,transparent)] px-5 py-3 text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_18%,transparent)]"
              >
                {copy.cta}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default NotFoundPage
