const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'Product', href: '#product' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'RevOps Consulting', href: '#advisory' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#', iconSrc: '/network/LinkedIn.svg' },
  { label: 'X', href: '#', iconSrc: '/network/X.svg' },
  { label: 'Email', href: 'mailto:hello@clozr.com', iconSrc: '/network/Message.svg' },
]

function Footer() {
  return (
    <footer className="relative z-10">
      <div className="widget-premium-border mx-auto w-full rounded-[var(--radius-lg)] border-x-0 border-b-0 bg-secondary ![background:var(--bg-secondary)] px-6 py-7 sm:px-9 sm:py-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-10">
          <div className="flex justify-center md:justify-start">
            <img
              src="/brand/logo_text_white.png"
              alt="CLOZR"
              className="w-40"
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
                    className="body-sm inline-flex w-fit rounded-[var(--radius-lg)] px-1 py-0.5 text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
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
                href="#"
                className="body-sm inline-flex w-fit rounded-[var(--radius-lg)] px-3 py-1.5 text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="body-sm inline-flex w-fit rounded-[var(--radius-lg)] px-3 py-1.5 text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
              >
                Terms
              </a>
            </div>
            <p className="body text-center text-[var(--text-secondary)] md:text-left">
              Madrid, Spain. Built for global brands.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 md:justify-end">
            {socialLinks.map((item) => {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-14 w-14 items-center justify-center widget-premium-border transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)]"
                >
                  <img
                    src={item.iconSrc}
                    alt={item.label}
                    className="h-6 w-6"
                  />
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
