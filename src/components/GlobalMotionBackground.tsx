type GlobalMotionBackgroundProps = {
  className?: string
}

function GlobalMotionBackground({ className = '' }: GlobalMotionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="global-motion-layer global-motion-layer--amber hidden md:block" />
      <div className="global-motion-layer global-motion-layer--blue hidden md:block" />
      <div className="global-motion-layer global-motion-layer--soft hidden md:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,13,0.08)_0%,rgba(6,8,13,0.2)_100%)]" />
    </div>
  )
}

export default GlobalMotionBackground
