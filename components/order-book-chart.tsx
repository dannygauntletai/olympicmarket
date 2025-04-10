"use client"

import { useEffect, useRef } from "react"

export function OrderBookChart() {
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

    // Chart dimensions
    const width = rect.width
    const height = rect.height
    const padding = { top: 20, right: 30, bottom: 30, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Generate mock order book data
    // In a real app, this would come from your API
    const buyOrders = [
      { size: 1200 },
      { size: 950 },
      { size: 800 },
      { size: 650 },
      { size: 500 },
      { size: 400 },
      { size: 300 },
      { size: 200 },
      { size: 150 },
      { size: 100 },
    ]

    const sellOrders = [
      { size: 100 },
      { size: 150 },
      { size: 200 },
      { size: 300 },
      { size: 400 },
      { size: 500 },
      { size: 650 },
      { size: 800 },
      { size: 950 },
      { size: 1200 },
    ]

    // Calculate cumulative sizes
    let cumulativeBuy = 0
    const cumulativeBuyOrders = buyOrders.map((order) => {
      cumulativeBuy += order.size
      return { ...order, cumulative: cumulativeBuy }
    })

    let cumulativeSell = 0
    const cumulativeSellOrders = sellOrders.map((order) => {
      cumulativeSell += order.size
      return { ...order, cumulative: cumulativeSell }
    })

    // Find max cumulative size for scaling
    const maxCumulative = Math.max(
      cumulativeBuyOrders[cumulativeBuyOrders.length - 1].cumulative,
      cumulativeSellOrders[cumulativeSellOrders.length - 1].cumulative,
    )

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    const yGridLines = [0, 2000, 4000, 6000, 8000]
    yGridLines.forEach((value) => {
      const y = padding.top + chartHeight - (value / maxCumulative) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      // Add volume labels on the left
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`${value.toLocaleString()}`, padding.left - 5, y + 3)
    })

    // Draw center line (current price)
    const centerX = padding.left + chartWidth / 2
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(centerX, padding.top)
    ctx.lineTo(centerX, height - padding.bottom)
    ctx.stroke()
    ctx.setLineDash([])

    // Add price label at the bottom
    ctx.fillStyle = "#000000"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("$1.00", centerX, height - 10)

    // Draw buy orders (left side)
    ctx.fillStyle = "rgba(34, 197, 94, 0.2)" // Light green
    ctx.beginPath()
    ctx.moveTo(centerX, height - padding.bottom)

    cumulativeBuyOrders.forEach((order, index) => {
      const x = centerX - (index / buyOrders.length) * (chartWidth / 2)
      const y = height - padding.bottom - (order.cumulative / maxCumulative) * chartHeight
      ctx.lineTo(x, y)
    })

    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.closePath()
    ctx.fill()

    // Draw buy order line
    ctx.strokeStyle = "#22c55e" // Green
    ctx.lineWidth = 2
    ctx.beginPath()

    cumulativeBuyOrders.forEach((order, index) => {
      const x = centerX - (index / buyOrders.length) * (chartWidth / 2)
      const y = height - padding.bottom - (order.cumulative / maxCumulative) * chartHeight

      if (index === 0) {
        ctx.moveTo(centerX, height - padding.bottom)
        ctx.lineTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw sell orders (right side)
    ctx.fillStyle = "rgba(239, 68, 68, 0.2)" // Light red
    ctx.beginPath()
    ctx.moveTo(centerX, height - padding.bottom)

    cumulativeSellOrders.forEach((order, index) => {
      const x = centerX + (index / sellOrders.length) * (chartWidth / 2)
      const y = height - padding.bottom - (order.cumulative / maxCumulative) * chartHeight
      ctx.lineTo(x, y)
    })

    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.closePath()
    ctx.fill()

    // Draw sell order line
    ctx.strokeStyle = "#ef4444" // Red
    ctx.lineWidth = 2
    ctx.beginPath()

    cumulativeSellOrders.forEach((order, index) => {
      const x = centerX + (index / sellOrders.length) * (chartWidth / 2)
      const y = height - padding.bottom - (order.cumulative / maxCumulative) * chartHeight

      if (index === 0) {
        ctx.moveTo(centerX, height - padding.bottom)
        ctx.lineTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Add labels for buy and sell sides
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#22c55e"
    ctx.textAlign = "center"
    ctx.fillText("Buy Orders", centerX - chartWidth / 4, padding.top + 15)

    ctx.fillStyle = "#ef4444"
    ctx.fillText("Sell Orders", centerX + chartWidth / 4, padding.top + 15)

    // Add volume label on y-axis
    ctx.save()
    ctx.translate(padding.left - 35, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Cumulative Volume", 0, 0)
    ctx.restore()
  }, [])

  return (
    <div className="w-full h-[300px] relative">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
