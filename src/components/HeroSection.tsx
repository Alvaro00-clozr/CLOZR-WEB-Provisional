import { useCallback, useEffect, useRef } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import enDictionary from '../i18n/en'

type GsapInstance = (typeof import('gsap'))['gsap']

let heroGsapPromise: Promise<GsapInstance> | null = null

async function loadHeroGsap() {
  if (!heroGsapPromise) {
    heroGsapPromise = import('gsap').then((module) => module.gsap)
  }

  return heroGsapPromise
}

const copy = enDictionary.hero
const rotatingPhrases = [...copy.rotatingPhrases]
const longestRotatingPhrase = rotatingPhrases.reduce(
  (longestPhrase, phrase) => (phrase.length > longestPhrase.length ? phrase : longestPhrase),
  rotatingPhrases[0] ?? '',
)

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

    let isDisposed = false
    let gsapInstance: GsapInstance | null = null
    let kickOffId: number | null = null
    let intervalId: number | null = null

    let activeIndex = 0
    currentPhrase.textContent = rotatingPhrases[activeIndex]
    nextPhrase.textContent =
      rotatingPhrases[(activeIndex + 1) % rotatingPhrases.length]

    const initAnimation = async () => {
      const gsap = await loadHeroGsap()
      if (isDisposed) {
        return
      }

      gsapInstance = gsap

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
        if (isAnimatingRef.current || !gsapInstance) {
          return
        }

        isAnimatingRef.current = true
        const incomingIndex = (activeIndex + 1) % rotatingPhrases.length
        nextPhrase.textContent = rotatingPhrases[incomingIndex]

        gsapInstance
          .timeline({
            onComplete: () => {
              activeIndex = incomingIndex
              currentPhrase.textContent = rotatingPhrases[activeIndex]

              gsapInstance?.set(currentPhrase, {
                yPercent: 0,
                rotationX: 0,
                opacity: 1,
              })
              gsapInstance?.set(nextPhrase, {
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

      kickOffId = window.setTimeout(animateFlip, 1700)
      intervalId = window.setInterval(animateFlip, 3000)
    }

    void initAnimation()

    return () => {
      isDisposed = true
      if (kickOffId !== null) {
        window.clearTimeout(kickOffId)
      }
      if (intervalId !== null) {
        window.clearInterval(intervalId)
      }
      isAnimatingRef.current = false
      gsapInstance?.killTweensOf([currentPhrase, nextPhrase])
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
      className="relative min-h-[700px] overflow-hidden bg-transparent sm:min-h-[780px] md:min-h-[860px] lg:min-h-[960px]"
    >
      <picture
        aria-hidden="true"
        className="hero-bg-image pointer-events-none absolute inset-0 z-0 block h-full w-full select-none"
      >
        <source
          media="(max-width: 767px)"
          srcSet="/assets/planet-mobile.jpg 1x, /assets/planet-mobile@2x.jpg 2x"
          type="image/jpeg"
        />
        <source media="(min-width: 768px)" srcSet="/assets/bg-hero.jpeg" />
        <img
          src="/assets/planet-mobile.jpg"
          alt={copy.backgroundAlt}
          width={720}
          height={720}
          decoding="async"
          loading="eager"
          fetchPriority="high"
          className="block h-full w-full object-cover object-bottom"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(3, 5, 9, 0.78) 0%, rgba(4, 6, 10, 0.58) 30%, rgba(5, 7, 12, 0.18) 54%, rgba(6, 8, 13, 0) 76%), radial-gradient(88% 54% at 50% 24%, rgba(4, 6, 10, 0.4) 0%, rgba(4, 6, 10, 0.14) 44%, transparent 74%)',
        }}
      />
      <div className="absolute inset-0 z-10">
        <div className="mx-auto w-full max-w-[1120px] px-5 pt-12 sm:px-6 sm:pt-14 md:px-8 md:pt-20">
          <div className="mx-auto max-w-[980px] text-center">
            <h1
              data-reveal-text
              className="mx-auto max-w-[16ch] px-2 font-[var(--font-heading)] text-[clamp(1.5rem,7vw,3rem)] leading-[1.06] text-[var(--text-primary)] sm:max-w-[19ch] sm:px-0 sm:text-[clamp(1.85rem,7.6vw,4.25rem)] sm:leading-[1.1] lg:max-w-none"
            >
              {copy.titleStart}
              <br />
              <span className="relative mx-auto inline-grid w-[7.8em] align-top text-center text-[var(--brand-warning)] [perspective:1000px] sm:w-[8.4em] lg:w-auto lg:whitespace-nowrap">
                <span aria-hidden="true" className="invisible block lg:whitespace-nowrap">
                  {longestRotatingPhrase}
                </span>
                <span
                  ref={currentPhraseRef}
                  className="absolute inset-0 block [backface-visibility:hidden] [transform-style:preserve-3d] lg:whitespace-nowrap"
                >
                  {copy.rotatingPhrases[0]}
                </span>
                <span
                  ref={nextPhraseRef}
                  className="absolute inset-0 block [backface-visibility:hidden] [transform-style:preserve-3d] lg:whitespace-nowrap"
                >
                  {copy.rotatingPhrases[1]}
                </span>
              </span>
            </h1>

            <p
              data-reveal-text
              className="mx-auto mt-10 max-w-[34ch] px-2 text-[clamp(0.88rem,3.2vw,1.1rem)] leading-[1.42] text-[var(--text-primary)] sm:max-w-[860px] sm:px-0 md:body-lg"
            >
              {copy.descriptionLine1}
              <br />
              {copy.descriptionLine2}
            </p>

            <div
              data-reveal-visual
              className="mx-auto mt-8 flex w-full max-w-[860px] flex-col items-center justify-center gap-4 sm:mt-10 sm:max-w-none sm:flex-row sm:gap-4"
            >
              <a
                href="/#contact"
                className="btn-gradient body-lg inline-flex h-14 w-full items-center justify-center gap-2 px-6 sm:w-auto sm:min-w-[250px] sm:px-7"
              >
                <span>{copy.primaryCta}</span>
              </a>

              <button
                type="button"
                disabled
                aria-disabled="true"
                className="body-lg inline-flex h-14 w-full cursor-not-allowed items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_22%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_72%,transparent)] px-6 text-[var(--text-muted)] opacity-85 sm:w-auto sm:min-w-[220px] sm:px-7"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-0 w-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-[var(--text-muted)]"
                />
                <span>{copy.secondaryCta}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
