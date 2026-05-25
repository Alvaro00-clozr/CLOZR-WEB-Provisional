import { useEffect, useRef, useState } from 'react'
import enDictionary from '../i18n/en'

const copy = enDictionary.hero
const rotatingWords = [...copy.rotatingPhrases]

const COUNTER_ROAS_TARGET = 2.8
const COUNTER_WASTE_TARGET = 30
const COUNTER_CASH_TARGET = 500

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const twWordRef = useRef<HTMLElement>(null)

  const [roasValue, setRoasValue] = useState(0)
  const [wasteValue, setWasteValue] = useState(0)
  const [cashValue, setCashValue] = useState(0)

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll<HTMLElement>('.hero-reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Typewriter
  useEffect(() => {
    const el = twWordRef.current
    if (!el) return

    let i = 0
    let charIdx = 0
    let deleting = false
    let timeoutId: number | null = null
    let disposed = false

    const cursor = document.createElement('span')
    cursor.className = 'tw-cursor'
    el.after(cursor)

    const tick = () => {
      if (disposed) return
      const word = rotatingWords[i] ?? ''
      if (!deleting) {
        charIdx += 1
        el.textContent = word.slice(0, charIdx)
        if (charIdx === word.length) {
          deleting = true
          timeoutId = window.setTimeout(tick, 1800)
          return
        }
      } else {
        charIdx -= 1
        el.textContent = word.slice(0, charIdx)
        if (charIdx === 0) {
          deleting = false
          i = (i + 1) % rotatingWords.length
          timeoutId = window.setTimeout(tick, 320)
          return
        }
      }
      timeoutId = window.setTimeout(tick, deleting ? 55 : 90)
    }

    timeoutId = window.setTimeout(tick, 1200)

    return () => {
      disposed = true
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      cursor.remove()
    }
  }, [])

  // Counter animation on intersection
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let started = false
    const animate = (to: number, duration: number, setter: (v: number) => void) => {
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        setter(to * easeOut(t))
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true
          window.setTimeout(() => {
            animate(COUNTER_ROAS_TARGET, 1800, setRoasValue)
            animate(COUNTER_WASTE_TARGET, 1600, setWasteValue)
            animate(COUNTER_CASH_TARGET, 2000, setCashValue)
          }, 600)
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-container">
        <div className="hero-eyebrow hero-reveal">{copy.eyebrow}</div>
        <h1 className="hero-title hero-reveal" style={{ animationDelay: '0.1s' }}>
          {copy.titleStart} <em ref={twWordRef}>truth</em> about
          <br />
          your revenue.
        </h1>
        <p className="hero-sub hero-reveal" style={{ animationDelay: '0.22s' }}>
          {copy.descriptionLine1} {copy.descriptionLine2}
        </p>
        <div
          className="hero-actions hero-reveal"
          style={{ animationDelay: '0.34s' }}
        >
          <a href="/#contact" className="btn-primary-lg">
            {copy.primaryCta}
          </a>
        </div>

        <div
          className="hero-counters hero-reveal"
          style={{ animationDelay: '0.46s' }}
        >
          <div className="hero-counter-item">
            <div className="hero-counter">
              <span>{roasValue.toFixed(1)}</span>×
            </div>
            <div className="hero-counter-label">{copy.counters.roasLabel}</div>
          </div>
          <div className="hero-counter-item">
            <div className="hero-counter">
              −<span>{Math.round(wasteValue)}</span>%
            </div>
            <div className="hero-counter-label">{copy.counters.wasteLabel}</div>
          </div>
          <div className="hero-counter-item">
            <div className="hero-counter">
              $<span>{Math.round(cashValue).toLocaleString()}</span>k
            </div>
            <div className="hero-counter-label">{copy.counters.cashLabel}</div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection
