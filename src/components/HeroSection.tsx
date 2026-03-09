import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const rotatingPhrases = [
  'profitability works',
  'scaling becomes predictable',
  'ROAS stops lying',
  'growth is guaranteed',
]

function HeroSection() {
  const currentPhraseRef = useRef<HTMLSpanElement>(null)
  const nextPhraseRef = useRef<HTMLSpanElement>(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    const currentPhrase = currentPhraseRef.current
    const nextPhrase = nextPhraseRef.current

    if (!currentPhrase || !nextPhrase) {
      return
    }

    let activeIndex = 0
    currentPhrase.textContent = rotatingPhrases[activeIndex]
    nextPhrase.textContent =
      rotatingPhrases[(activeIndex + 1) % rotatingPhrases.length]

    gsap.set(currentPhrase, {
      yPercent: 0,
      rotationX: 0,
      opacity: 1,
      transformOrigin: 'bottom center',
    })
    gsap.set(nextPhrase, {
      yPercent: 100,
      rotationX: -82,
      opacity: 0,
      transformOrigin: 'top center',
    })

    const animateFlip = () => {
      if (isAnimatingRef.current) {
        return
      }

      isAnimatingRef.current = true
      const incomingIndex = (activeIndex + 1) % rotatingPhrases.length
      nextPhrase.textContent = rotatingPhrases[incomingIndex]

      gsap
        .timeline({
          onComplete: () => {
            activeIndex = incomingIndex
            currentPhrase.textContent = rotatingPhrases[activeIndex]

            gsap.set(currentPhrase, {
              yPercent: 0,
              rotationX: 0,
              opacity: 1,
            })
            gsap.set(nextPhrase, {
              yPercent: 100,
              rotationX: -82,
              opacity: 0,
            })
            isAnimatingRef.current = false
          },
        })
        .to(currentPhrase, {
          duration: 0.55,
          yPercent: -100,
          rotationX: 82,
          opacity: 0,
          ease: 'power2.in',
        })
        .to(
          nextPhrase,
          {
            duration: 0.55,
            yPercent: 0,
            rotationX: 0,
            opacity: 1,
            ease: 'power2.out',
          },
          0.08,
        )
    }

    const intervalId = window.setInterval(animateFlip, 2500)

    return () => {
      window.clearInterval(intervalId)
      isAnimatingRef.current = false
      gsap.killTweensOf([currentPhrase, nextPhrase])
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      <img
        aria-hidden="true"
        src="/assets/bg_hero.png"
        alt=""
        className="pointer-events-none block h-auto w-full select-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 14%, rgba(120, 165, 255, 0.2) 0%, rgba(120, 165, 255, 0.08) 34%, rgba(120, 165, 255, 0) 66%), linear-gradient(180deg, rgba(6, 8, 13, 0.08) 0%, rgba(6, 8, 13, 0.22) 42%, rgba(6, 8, 13, 0.44) 72%, rgba(6, 8, 13, 0.74) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-8 h-[520px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(214, 169, 110, 0.3) 0%, rgba(114, 148, 229, 0.14) 42%, rgba(114, 148, 229, 0) 78%)',
        }}
      />

      <div className="absolute inset-0 z-10">
        <div className="mx-auto w-full max-w-[1120px] px-6 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[980px] text-center">
          <h1
            className="font-[var(--font-heading)] text-[clamp(2.25rem,6vw,5rem)] leading-[1.1] text-[var(--text-primary)]"
          >
            When revenue is real,
            <br />
            <span className="relative inline-grid align-top text-[var(--brand-warning)] [perspective:1000px]">
              <span aria-hidden="true" className="invisible">
                scaling becomes predictable
              </span>
              <span
                ref={currentPhraseRef}
                className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]"
              />
              <span
                ref={nextPhraseRef}
                className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]"
              />
            </span>
          </h1>

          <p className="body-lg mx-auto mt-8 max-w-[900px] text-[var(--text-secondary)]">
            The Revenue Operating System for ambitious D2C brands.
            <br className="hidden sm:block" />
            Reconcile your ad platform data with actual bank deposits in real-time.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="btn-gradient body-lg inline-flex h-14 min-w-[280px] items-center justify-center gap-2 px-8"
            >
              <span>See your real numbers</span>
            </a>

            <a
              href="#"
              className="body-lg inline-flex h-14 min-w-[240px] items-center justify-center gap-3 rounded-[var(--radius-lg)] widget-premium-border px-8 text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
            >
              <span
                aria-hidden="true"
                className="inline-block h-0 w-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-[var(--text-secondary)]"
              />
              <span>Watch demo</span>
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
