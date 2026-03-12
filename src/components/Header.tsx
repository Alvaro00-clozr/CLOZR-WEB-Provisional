import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'RevOps Consulting', href: '#advisory' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] backdrop-blur-[4px] backdrop-saturate-[130%]">
      <div className="mx-auto h-full flex w-full justify-between items-center px-6 md:px-8">
        <a className="h-full inline-flex shrink-0 items-center" href="#top" aria-label="CLOZR home">
          <img
            className="h-full max-h-[60px] w-auto object-contain"
            src="/brand/logo_white.svg"
            alt="CLOZR"
          />
        </a>

        <nav className="hidden items-center justify-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              className="body-sm inline-flex w-fit cursor-pointer rounded-[var(--radius-lg)] px-2 py-1.5 transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="https://clozr.vercel.app/en/login"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-12 w-36 body-sm cursor-pointer items-center justify-center tracking-wide btn-gradient md:flex"
        >
          Get Started
        </a>
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-main-navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_32%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_88%,transparent)] text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] md:hidden"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close mobile menu overlay"
            className="fixed inset-0 top-[60px] z-40 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-x-4 top-[calc(100%+0.5rem)] z-50">
            <div
              id="mobile-main-navigation"
              className="widget-premium-border rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4"
            >
              <nav className="flex flex-col gap-1.5" aria-label="Mobile main navigation">
                {navItems.map((item) => (
                  <a
                    key={`mobile-${item.label}`}
                    className="body inline-flex w-full rounded-[var(--radius-lg)] px-3 py-2.5 text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)]"
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                href="https://clozr.vercel.app/en/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient body inline-flex h-12 w-full items-center justify-center tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
