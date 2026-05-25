import { useEffect, useRef, useState } from "react"
import type { EChartsOption } from "echarts"

type AttributionComparisonChartProps = {
	chartBadge: string
	chartLabelClaimedLine1: string
	chartLabelClaimedLine2: string
	chartLabelBankLine1: string
	chartLabelBankLine2: string
	chartAriaLabel: string
}

function AttributionComparisonChart({
	chartBadge,
	chartLabelClaimedLine1,
	chartLabelClaimedLine2,
	chartLabelBankLine1,
	chartLabelBankLine2,
	chartAriaLabel,
}: AttributionComparisonChartProps) {
	const chartRef = useRef<HTMLDivElement | null>(null)
	const [isChartActive, setIsChartActive] = useState(false)
	const claimedValue = 4
	const bankValue = 2.8
	const formatRoas = (value: number) => `${value.toFixed(1)}x`

	useEffect(() => {
		const chartNode = chartRef.current
		if (!chartNode || isChartActive) return

		if (!("IntersectionObserver" in window)) {
			setIsChartActive(true)
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setIsChartActive(true)
						observer.disconnect()
						break
					}
				}
			},
			{ rootMargin: "200px 0px" },
		)

		observer.observe(chartNode)

		return () => {
			observer.disconnect()
		}
	}, [isChartActive])

	useEffect(() => {
		if (!isChartActive) return

		const chartNode = chartRef.current
		if (!chartNode) return

		let isDisposed = false
		let resizeObserver: ResizeObserver | null = null
		let chartDispose: (() => void) | null = null

		const readCssVar = (variableName: string, fallback: string) => {
			const value = getComputedStyle(document.documentElement)
				.getPropertyValue(variableName)
				.trim()
			return value || fallback
		}

		const withAlpha = (color: string, alpha: number) => {
			const normalized = color.trim()
			if (normalized.startsWith("#")) {
				let hex = normalized.slice(1)
				if (hex.length === 3) {
					hex = hex.split("").map((c) => `${c}${c}`).join("")
				}
				const int = Number.parseInt(hex, 16)
				if (!Number.isNaN(int)) {
					const r = (int >> 16) & 255
					const g = (int >> 8) & 255
					const b = int & 255
					return `rgba(${r}, ${g}, ${b}, ${alpha})`
				}
			}
			const rgbMatch = normalized.match(/^rgba?\(([^)]+)\)$/i)
			if (rgbMatch) {
				const channels = rgbMatch[1].split(",").slice(0, 3).map((c) => c.trim())
				if (channels.length === 3) {
					return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`
				}
			}
			return normalized
		}

		const brandInfo = readCssVar("--brand-info", "#75a5ff")
		const brandWarning = readCssVar("--brand-warning", "#d6a85e")
		const bgPrimary = readCssVar("--bg-primary", "#06080d")
		const textPrimary = readCssVar("--text-primary", "#f3f4ff")
		const textSecondary = readCssVar("--text-secondary", "#ced4e8")
		const textMuted = readCssVar("--text-muted", "#8b91a5")
		const bgCard = readCssVar("--bg-card", "#0b1226")
		const numbersFont = readCssVar(
			"--font-chart",
			readCssVar("--font-body", "Plus Jakarta Sans, sans-serif"),
		)

		const initChart = async () => {
			const [coreModule, chartsModule, componentsModule, renderersModule] =
				await Promise.all([
					import("echarts/core"),
					import("echarts/charts"),
					import("echarts/components"),
					import("echarts/renderers"),
				])

			if (isDisposed || !chartNode) return

			const { use: registerEchartsModules, init, graphic } = coreModule
			const { BarChart, LineChart } = chartsModule
			const { GraphicComponent, GridComponent, TooltipComponent } = componentsModule
			const { CanvasRenderer } = renderersModule

			registerEchartsModules([
				BarChart,
				LineChart,
				GridComponent,
				GraphicComponent,
				TooltipComponent,
				CanvasRenderer,
			])

			const chart = init(chartNode)
			chartDispose = () => chart.dispose()

			const option: EChartsOption = {
				animationDuration: 760,
				animationDurationUpdate: 520,
				animationEasing: "cubicOut",
				animationEasingUpdate: "cubicOut",
				textStyle: { fontFamily: numbersFont },
				grid: { left: 38, right: 26, top: 26, bottom: 76 },
				xAxis: {
					type: "category",
					data: [
						`${chartLabelClaimedLine1}\n${chartLabelClaimedLine2}`,
						`${chartLabelBankLine1}\n${chartLabelBankLine2}`,
					],
					axisTick: { show: false },
					axisLine: { lineStyle: { color: withAlpha(textMuted, 0.3) } },
					axisLabel: {
						interval: 0,
						margin: 18,
						color: textSecondary,
						fontFamily: numbersFont,
						fontSize: 12,
						lineHeight: 16,
					},
				},
				yAxis: {
					type: "value",
					min: 0,
					max: 4.5,
					interval: 0.5,
					axisLine: { show: false },
					axisTick: { show: false },
					axisLabel: {
						color: textMuted,
						fontFamily: numbersFont,
						fontSize: 11,
						formatter: (value) => formatRoas(Number(value)),
					},
					splitLine: {
						lineStyle: { color: withAlpha(textMuted, 0.16), type: "dashed" },
					},
				},
				series: [
					{
						type: "bar",
						barWidth: 58,
						label: {
							show: true,
							position: "top",
							distance: 8,
							color: textPrimary,
							fontFamily: numbersFont,
							fontSize: 16,
							fontWeight: 700,
							formatter: (params) => {
								const rawValue = Array.isArray(params.value) ? params.value[1] : params.value
								return formatRoas(Number(rawValue))
							},
						},
						data: [
							{
								value: claimedValue,
								itemStyle: {
									borderRadius: [9, 9, 0, 0],
									borderWidth: 1,
									borderColor: withAlpha(brandInfo, 0.6),
									color: new graphic.LinearGradient(0, 0, 0, 1, [
										{ offset: 0, color: withAlpha(brandInfo, 0.72) },
										{ offset: 1, color: withAlpha(brandInfo, 0.18) },
									]),
								},
							},
							{
								value: bankValue,
								itemStyle: {
									borderRadius: [9, 9, 0, 0],
									borderWidth: 1,
									borderColor: withAlpha(brandInfo, 0.48),
									color: new graphic.LinearGradient(0, 0, 0, 1, [
										{ offset: 0, color: withAlpha(brandInfo, 0.56) },
										{ offset: 1, color: withAlpha(brandInfo, 0.14) },
									]),
								},
							},
						],
						z: 2,
					},
					{
						type: "line",
						data: [claimedValue, bankValue],
						smooth: 0.4,
						symbol: "circle",
						symbolSize: 8,
						lineStyle: { color: brandInfo, width: 2.2 },
						itemStyle: {
							color: brandInfo,
							borderColor: withAlpha(bgPrimary, 0.9),
							borderWidth: 2,
						},
						z: 3,
					},
				],
				graphic: [],
				tooltip: { show: false },
			}

			chart.setOption(option)

			const updateGraphicOverlay = () => {
				const claimedTop = chart.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, [
					0,
					claimedValue,
				]) as number[]
				const bankTop = chart.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, [
					1,
					bankValue,
				]) as number[]

				const x = Math.min(bankTop[0] + 50, chart.getWidth() - 32)
				const yTop = claimedTop[1]
				const yBottom = bankTop[1]
				const yCenter = (yTop + yBottom) / 2

				chart.setOption(
					{
						graphic: [
							{
								type: "line",
								shape: { x1: x, y1: yTop, x2: x, y2: yBottom },
								style: {
									stroke: withAlpha(brandWarning, 0.68),
									lineWidth: 1.2,
									lineDash: [3, 4],
								},
								silent: true,
							},
							{
								type: "line",
								shape: { x1: x - 6, y1: yTop, x2: x + 6, y2: yTop },
								style: { stroke: withAlpha(brandWarning, 0.74), lineWidth: 1.2 },
								silent: true,
							},
							{
								type: "line",
								shape: { x1: x - 6, y1: yBottom, x2: x + 6, y2: yBottom },
								style: { stroke: withAlpha(brandWarning, 0.74), lineWidth: 1.2 },
								silent: true,
							},
							{
								type: "rect",
								shape: { x: x - 27, y: yCenter - 16, width: 54, height: 30, r: 6 },
								style: {
									fill: withAlpha(bgCard, 0.92),
									stroke: withAlpha(brandWarning, 0.54),
									lineWidth: 1,
								},
								silent: true,
							},
							{
								type: "text",
								style: {
									x,
									y: yCenter - 1,
									text: chartBadge,
									fill: brandWarning,
									textAlign: "center",
									textVerticalAlign: "middle",
									fontFamily: numbersFont,
									fontWeight: 700,
									fontSize: 14,
								},
								silent: true,
							},
						],
					},
					{ replaceMerge: ["graphic"] },
				)
			}

			updateGraphicOverlay()

			resizeObserver = new ResizeObserver(() => {
				chart.resize()
				updateGraphicOverlay()
			})

			resizeObserver.observe(chartNode)
		}

		void initChart()

		return () => {
			isDisposed = true
			resizeObserver?.disconnect()
			chartDispose?.()
		}
	}, [
		chartBadge,
		chartLabelBankLine1,
		chartLabelBankLine2,
		chartLabelClaimedLine1,
		chartLabelClaimedLine2,
		isChartActive,
	])

	return (
		<div
			ref={chartRef}
			role="img"
			aria-label={chartAriaLabel}
			className="attribution-chart"
		/>
	)
}

export default AttributionComparisonChart
