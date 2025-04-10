"use client"

import { useState, useEffect } from "react"

type Order = {
  size: number
  total: number
}

export function OrderBook() {
  const [buyOrders, setBuyOrders] = useState<Order[]>([])
  const [sellOrders, setSellOrders] = useState<Order[]>([])

  // Generate mock order book data
  useEffect(() => {
    // Generate buy orders (bids)
    const bids: Order[] = []
    let totalBids = 0

    for (let i = 0; i < 10; i++) {
      const size = Math.floor(Math.random() * 1000) + 100
      totalBids += size
      bids.push({
        size,
        total: totalBids,
      })
    }

    // Generate sell orders (asks)
    const asks: Order[] = []
    let totalAsks = 0

    for (let i = 0; i < 10; i++) {
      const size = Math.floor(Math.random() * 1000) + 100
      totalAsks += size
      asks.push({
        size,
        total: totalAsks,
      })
    }

    setBuyOrders(bids)
    setSellOrders(asks)
  }, [])

  // Find the maximum order size for color intensity scaling
  const maxSize = Math.max(...buyOrders.map((order) => order.size), ...sellOrders.map((order) => order.size))

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b">
        <h3 className="font-medium">Order Book ($1 per share)</h3>
      </div>

      <div className="grid grid-cols-1 text-xs font-medium text-gray-500 p-2 border-b">
        <div className="text-center">Buy Size</div>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        <div className="grid grid-cols-1">
          {/* Buy orders only */}
          <div>
            {buyOrders.map((order, index) => (
              <div
                key={`buy-${index}`}
                className="p-2 text-center text-sm hover:bg-gray-50"
                style={{
                  background: `linear-gradient(to right, rgba(0, 255, 0, ${(order.size / maxSize) * 0.2}), transparent)`,
                }}
              >
                {order.size.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
