import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGsapReveal } from '../hooks/useGsapReveal'

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
          duration: 0.82,
          yPercent: -100,
          rotationX: 82,
          opacity: 0,
          ease: 'power2.in',
        })
        .to(
          nextPhrase,
          {
            duration: 0.82,
            yPercent: 0,
            rotationX: 0,
            opacity: 1,
            ease: 'power2.out',
          },
          0.12,
        )
    }

    const kickOffId = window.setTimeout(animateFlip, 1700)
    const intervalId = window.setInterval(animateFlip, 3000)

    return () => {
      window.clearTimeout(kickOffId)
      window.clearInterval(intervalId)
      isAnimatingRef.current = false
      gsap.killTweensOf([currentPhrase, nextPhrase])
    }
  }, [])

  const { rootRef: textRevealRef } = useGsapReveal<HTMLElement>({
    itemsSelector: '[data-reveal-text]',
    start: 'top 86%',
    once: false,
    xItems: -72,
    yItems: 0,
    durationItems: 0.6,
    stagger: 0.12,
  })

  const { rootRef: visualRevealRef } = useGsapReveal<HTMLElement>({
    itemsSelector: '[data-reveal-visual]',
    start: 'top 84%',
    once: false,
    xItems: 0,
    yItems: 52,
    durationItems: 0.62,
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
      className="relative min-h-[700px] overflow-hidden bg-[var(--bg-primary)] sm:min-h-[780px] md:min-h-0"
    >
      <img
        aria-hidden="true"
        src="/assets/bg_hero.png"
        alt=""
        className="pointer-events-none hidden h-auto w-full select-none md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 md:hidden"
        style={{
          background:
            'radial-gradient(65% 82% at 72% 84%, color-mix(in srgb, var(--brand-warning) 22%, transparent) 0%, transparent 62%), radial-gradient(72% 76% at 26% 62%, color-mix(in srgb, var(--brand-info) 14%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 md:hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 98%, transparent) 72%, rgba(6, 8, 13, 0) 100%)',
        }}
      />

      <div className="absolute inset-0 z-10">
        <div className="mx-auto w-full max-w-[1120px] px-5 pt-12 sm:px-6 sm:pt-14 md:px-8 md:pt-20">
          <div className="mx-auto max-w-[980px] text-center">
            <h1
              data-reveal-text
              className="font-[var(--font-heading)] text-[clamp(2.05rem,10vw,5rem)] leading-[1.1] text-[var(--text-primary)]"
            >
              When revenue is real,
              <br />
              <span className="relative mx-auto inline-grid w-[8.2em] align-top text-center text-[var(--brand-warning)] [perspective:1000px] md:w-auto md:whitespace-nowrap">
                <span aria-hidden="true" className="invisible block md:whitespace-nowrap">
                  scaling becomes predictable
                </span>
                <span
                  ref={currentPhraseRef}
                  className="absolute inset-0 block [backface-visibility:hidden] [transform-style:preserve-3d] md:whitespace-nowrap"
                >
                  profitability works
                </span>
                <span
                  ref={nextPhraseRef}
                  className="absolute inset-0 block [backface-visibility:hidden] [transform-style:preserve-3d] md:whitespace-nowrap"
                >
                  scaling becomes predictable
                </span>
              </span>
            </h1>

            <p
              data-reveal-text
              className="mx-auto mt-10 max-w-[860px] text-[clamp(1rem,4.8vw,1.25rem)] leading-[1.5] text-[var(--text-secondary)] md:body-lg"
            >
              The Revenue Operating System for ambitious D2C brands.
              <br />
              Reconcile your ad platform data with actual bank deposits in real-time.
            </p>

            <div
              data-reveal-visual
              className="mx-auto mt-8 flex w-full max-w-[860px] flex-col items-center justify-center gap-4 sm:mt-10 sm:max-w-none sm:flex-row sm:gap-4"
            >
              <a
                href="#"
                className="btn-gradient body-lg inline-flex h-14 w-full items-center justify-center gap-2 px-6 sm:w-auto sm:min-w-[250px] sm:px-7"
              >
                <span>See your real numbers</span>
              </a>

              <a
                href="#"
                className="body-lg inline-flex h-14 w-full items-center justify-center gap-3 rounded-[var(--radius-lg)] widget-premium-border px-6 text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)] sm:w-auto sm:min-w-[220px] sm:px-7"
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
