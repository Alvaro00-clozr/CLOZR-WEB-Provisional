type GlobalMotionBackgroundProps = {
  className?: string
}

function GlobalMotionBackground({ className = '' }: GlobalMotionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div className="global-motion-layer global-motion-layer--amber" />
      <div className="global-motion-layer global-motion-layer--blue" />
      <div className="global-motion-layer global-motion-layer--soft" />
    </div>
  )
}

export default GlobalMotionBackground
