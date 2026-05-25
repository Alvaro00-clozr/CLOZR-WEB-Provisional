import { useEffect, useState } from 'react'
import enDictionary from '../i18n/en'

const copy = enDictionary.header

const navItems = [
  { label: copy.navItems.product, href: '/#product' },
  { label: copy.navItems.pricing, href: '/#pricing' },
  { label: copy.navItems.revopsConsulting, href: '/#audit' },
  { label: copy.navItems.contact, href: '/#contact' },
]

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 ${
        isScrolled ? 'site-header--scrolled' : ''
      }`}
    >
      <div
        className="mx-auto flex h-full w-full items-center justify-between box-border"
        style={{ padding: '0 clamp(20px, 4vw, 64px)' }}
      >
        <a
          className="site-header-logo shrink-0"
          href="/#top"
          aria-label={copy.logoAriaLabel}
        >
          <img
            src="/brand/logo_white.png"
            alt={copy.logoAlt}
            width={352}
            height={235}
            decoding="async"
          />
        </a>

        <nav
          className="hidden items-center md:flex"
          style={{ gap: 36 }}
          aria-label={copy.navAriaLabel}
        >
          {navItems.map((item) => (
            <a key={item.label} className="site-nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className="hidden items-center md:flex"
          style={{ gap: 16 }}
        >
          <a
            href="https://app.clozr.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-sm"
          >
            {copy.cta.getStarted}
          </a>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? copy.closeMenuAriaLabel : copy.openMenuAriaLabel}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-main-navigation"
          className={`nav-hamburger md:hidden ${isMobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        id="mobile-main-navigation"
        className={`nav-drawer md:hidden ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-label={copy.mobileNavAriaLabel}
        aria-hidden={!isMobileMenuOpen}
      >
        {navItems.map((item) => (
          <a
            key={`mobile-${item.label}`}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <div className="nav-drawer-cta">
          <a
            href="https://app.clozr.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {copy.cta.getStarted}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
