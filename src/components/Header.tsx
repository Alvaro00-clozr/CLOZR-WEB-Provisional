const navItems = ['Product', 'RevOps Consulting', 'Pricing', 'Contact']

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-15 md:h-20 backdrop-blur-[4px] backdrop-saturate-[130%]">
      <div className="mx-auto h-full flex w-full justify-between items-center px-6 md:px-8">
        <a className="h-full inline-flex shrink-0 items-center" href="/" aria-label="CLOZR home">
          <img
            className="h-full w-auto object-contain"
            src="/brand/logo_white.svg"
            alt="CLOZR"
          />
        </a>

        <nav
          className="flex items-center justify-center gap-8"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item}
              className="body-sm inline-flex w-fit cursor-pointer rounded-[var(--radius-lg)] px-2 py-1.5 transition-colors hover:bg-[color-mix(in_srgb,var(--brand-warning)_14%,transparent)] hover:text-[var(--text-primary)]"
              href="#"
            >
              {item}
            </a>
          ))}
        </nav>
        <a
          href="https://clozr.vercel.app/en/login"
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 w-36 body-sm flex justify-center items-center cursor-pointer tracking-wide btn-gradient"
        >
          Get Started
        </a>
      </div>
    </header>
  )
}

export default Header
