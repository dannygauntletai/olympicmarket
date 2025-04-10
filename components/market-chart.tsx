"use client"

import { useEffect, useRef } from "react"

export function MarketChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Chart data (simplified for this example)
    const data = [
      { date: new Date("2025-04-05"), india: 0.4, argentina: 0.2, vietnam: 0.3, israel: 0.1 },
      { date: new Date("2025-04-06"), india: 0.35, argentina: 0.25, vietnam: 0.25, israel: 0.15 },
      { date: new Date("2025-04-07"), india: 0.45, argentina: 0.2, vietnam: 0.2, israel: 0.35 },
      { date: new Date("2025-04-08"), india: 0.5, argentina: 0.15, vietnam: 0.15, israel: 0.45 },
      { date: new Date("2025-04-09"), india: 0.7, argentina: 0.1, vietnam: 0.05, israel: 0.05 },
    ]

    // Chart dimensions
    const width = rect.width
    const height = rect.height
    const padding = { top: 20, right: 30, bottom: 30, left: 10 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    const yGridLines = [0, 0.2, 0.4, 0.6, 0.8, 1]
    yGridLines.forEach((value) => {
      const y = padding.top + chartHeight - value * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      // Add percentage labels on the right
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`${value * 100}%`, width - padding.right + 20, y + 3)
    })

    // Draw lines for each country
    const drawLine = (data: { date: Date; value: number }[], color: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()

      data.forEach((point, i) => {
        const x = padding.left + (i / (data.length - 1)) * chartWidth
        const y = padding.top + chartHeight - point.value * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    }

    // Draw data lines
    drawLine(
      data.map((d) => ({ date: d.date, value: d.india })),
      "#3b82f6",
    ) // Blue for India
    drawLine(
      data.map((d) => ({ date: d.date, value: d.argentina })),
      "#ef4444",
    ) // Red for Argentina
    drawLine(
      data.map((d) => ({ date: d.date, value: d.vietnam })),
      "#8b5cf6",
    ) // Purple for Vietnam
    drawLine(
      data.map((d) => ({ date: d.date, value: d.israel })),
      "#22c55e",
    ) // Green for Israel

    // Draw x-axis date labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    const dateLabels = ["Apr 5", "Apr 6", "Apr 7", "Apr 8", "Apr 9"]
    dateLabels.forEach((label, i) => {
      const x = padding.left + (i / (dateLabels.length - 1)) * chartWidth
      ctx.fillText(label, x, height - 10)
    })

    // Add dots at the end of each line
    const lastIndex = data.length - 1

    // India (blue)
    ctx.fillStyle = "#3b82f6"
    ctx.beginPath()
    ctx.arc(
      padding.left + (lastIndex / (data.length - 1)) * chartWidth,
      padding.top + chartHeight - data[lastIndex].india * chartHeight,
      4,
      0,
      2 * Math.PI,
    )
    ctx.fill()

    // Argentina (red)
    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(
      padding.left + (lastIndex / (data.length - 1)) * chartWidth,
      padding.top + chartHeight - data[lastIndex].argentina * chartHeight,
      4,
      0,
      2 * Math.PI,
    )
    ctx.fill()

    // Vietnam (purple)
    ctx.fillStyle = "#8b5cf6"
    ctx.beginPath()
    ctx.arc(
      padding.left + (lastIndex / (data.length - 1)) * chartWidth,
      padding.top + chartHeight - data[lastIndex].vietnam * chartHeight,
      4,
      0,
      2 * Math.PI,
    )
    ctx.fill()

    // Israel (green)
    ctx.fillStyle = "#22c55e"
    ctx.beginPath()
    ctx.arc(
      padding.left + (lastIndex / (data.length - 1)) * chartWidth,
      padding.top + chartHeight - data[lastIndex].israel * chartHeight,
      4,
      0,
      2 * Math.PI,
    )
    ctx.fill()
  }, [])

  return (
    <div className="w-full h-[300px] relative">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
