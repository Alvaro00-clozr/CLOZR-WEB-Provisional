import { useEffect, useRef } from "react"

function ParticleBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		if (reduceMotion) return

		let W = 0
		let H = 0
		const COUNT = 70
		const COLORS = [
			"rgba(216,170,99,",
			"rgba(120,165,255,",
			"rgba(108,231,155,",
			"rgba(184,163,255,",
		]

		const rand = (a: number, b: number) => a + Math.random() * (b - a)

		const particles = Array.from({ length: COUNT }, () => ({
			x: rand(0, 1),
			y: rand(0, 1),
			r: rand(1, 2.8),
			vx: rand(-0.06, 0.06),
			vy: rand(-0.08, -0.02),
			alpha: rand(0.15, 0.55),
			color: COLORS[Math.floor(rand(0, 4))],
			pulse: rand(0, Math.PI * 2),
			pulseSpeed: rand(0.008, 0.025),
		}))

		const resize = () => {
			W = canvas.width = window.innerWidth
			H = canvas.height = window.innerHeight
		}
		resize()
		window.addEventListener("resize", resize)

		let rafId = 0
		const draw = () => {
			ctx.clearRect(0, 0, W, H)
			for (const p of particles) {
				p.pulse += p.pulseSpeed
				const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
				ctx.beginPath()
				ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
				ctx.fillStyle = p.color + a + ")"
				ctx.fill()
				p.x += (p.vx / W) * 60
				p.y += (p.vy / H) * 60
				if (p.y < -0.02) p.y = 1.02
				if (p.x < -0.02) p.x = 1.02
				if (p.x > 1.02) p.x = -0.02
			}
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = (particles[i].x - particles[j].x) * W
					const dy = (particles[i].y - particles[j].y) * H
					const dist = Math.sqrt(dx * dx + dy * dy)
					if (dist < 120) {
						ctx.beginPath()
						ctx.moveTo(particles[i].x * W, particles[i].y * H)
						ctx.lineTo(particles[j].x * W, particles[j].y * H)
						ctx.strokeStyle = "rgba(216,170,99," + 0.06 * (1 - dist / 120) + ")"
						ctx.lineWidth = 0.8
						ctx.stroke()
					}
				}
			}
			rafId = requestAnimationFrame(draw)
		}
		draw()

		return () => {
			cancelAnimationFrame(rafId)
			window.removeEventListener("resize", resize)
		}
	}, [])

	return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}

export default ParticleBackground
