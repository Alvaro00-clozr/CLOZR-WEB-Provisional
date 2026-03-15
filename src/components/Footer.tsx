import { Instagram, type LucideIcon } from 'lucide-react'
import enDictionary from '../i18n/en'

const copy = enDictionary.footer

const footerColumns = [
  {
    title: copy.columns.product.title,
    links: [
      { label: copy.columns.product.links.home, href: '/#top' },
      { label: copy.columns.product.links.product, href: '/#product' },
      { label: copy.columns.product.links.pricing, href: '/#pricing' },
    ],
  },
  {
    title: copy.columns.resources.title,
    links: [
      { label: copy.columns.resources.links.revopsConsulting, href: '/#advisory' },
      { label: copy.columns.resources.links.contact, href: '/#contact' },
    ],
  },
]

type SocialLink =
  | {
      label: string
      kind: 'link'
      href: string
      iconSrc?: string
      icon?: LucideIcon
    }
  | {
      label: string
      kind: 'disabled'
      iconSrc?: string
      icon?: LucideIcon
    }

const socialLinks: SocialLink[] = [
  {
    label: copy.social.linkedIn,
    href: 'https://www.linkedin.com/company/clozr-growth-partners/',
    kind: 'link',
    iconSrc: '/network/LinkedIn.svg',
  },
  {
    label: copy.social.x,
    kind: 'disabled',
    iconSrc: '/network/X.svg',
  },
  {
    label: copy.social.instagram,
    kind: 'disabled',
    icon: Instagram,
  },
  {
    label: copy.social.email,
    href: 'mailto:clozrhq@gmail.com',
    kind: 'link',
    iconSrc: '/network/Message.svg',
  },
]

function Footer() {
  return (
    <footer className="relative z-10">
      <div className="widget-premium-border mx-auto w-full rounded-[var(--radius-lg)] border-x-0 border-b-0 bg-secondary ![background:var(--bg-secondary)] px-6 py-7 sm:px-9 sm:py-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-10">
          <div className="flex justify-center md:justify-start">
            <img
              src="/brand/logo_white.svg"
              alt={copy.logoAlt}
              className="h-auto w-[168px] max-w-full shrink-0"
            />
          </div>

          <div className="grid grid-cols-2 text-center sm:gap-x-9">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col items-center gap-1.5 sm:items-start">
                <span className="body text-[var(--text-primary)]">{column.title}</span>
                {column.links.map((link) => (
                  <a
                    key={`${column.title}-${link.label}`}
                    href={link.href}
                    className="body-sm inline-flex w-fit rounded-[var(--radius-lg)] px-2 py-1 text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 pt-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-3">
              <a
                href="/privacy"
                className="body-sm inline-flex w-fit rounded-[var(--radius-lg)] px-3 py-1.5 text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
              >
                {copy.legal.privacyPolicy}
              </a>
              <a
                href="/terms"
                className="body-sm inline-flex w-fit rounded-[var(--radius-lg)] px-3 py-1.5 text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
              >
                {copy.legal.terms}
              </a>
            </div>
            <p className="body text-center text-[var(--text-secondary)] md:text-left">
              {copy.location}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 md:justify-end">
            {socialLinks.map((item) => {
              const Icon = item.icon
              const content = item.iconSrc ? (
                <img
                  src={item.iconSrc}
                  alt={item.label}
                  className="h-6 w-6"
                />
              ) : Icon ? (
                <Icon size={22} />
              ) : null

              if (item.kind === 'disabled') {
                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-label={item.label}
                    aria-disabled="true"
                    disabled
                    className="inline-flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--text-muted)_20%,transparent)] bg-[color-mix(in_srgb,var(--bg-card)_68%,transparent)] text-[var(--text-muted)] opacity-65"
                  >
                    {content}
                  </button>
                )
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-14 w-14 items-center justify-center widget-premium-border transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)]"
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
