"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Bookmark } from "lucide-react"

export function MarketsGrid() {
  const router = useRouter()
  const [bookmarkedMarkets, setBookmarkedMarkets] = useState<string[]>([])

  const markets = [
    {
      id: "portugal-pm",
      title: "Next Prime Minister of Portugal after the 2025 election?",
      flag: "🇵🇹",
      volume: "$1.17m Vol.",
      date: "May 18, 2025",
    },
    {
      id: "canada-pm",
      title: "Next Prime Minister of Canada after the election?",
      flag: "🇨🇦",
      volume: "$39m Vol.",
      date: "Dec 15, 2025",
    },
    {
      id: "us-recession",
      title: "US recession in 2025?",
      volume: "$2m Vol.",
      date: "Dec 31, 2025",
    },
    {
      id: "fed-decision",
      title: "Fed decision in May?",
      volume: "$19m Vol.",
      date: "May 1, 2025",
    },
    {
      id: "south-korea-president",
      title: "Next president of South Korea?",
      flag: "🇰🇷",
      volume: "$9m Vol.",
      date: "Mar 9, 2027",
    },
    {
      id: "trump-tariffs",
      title: "Will Trump lower tariffs on India first?",
      volume: "$367k Vol.",
      date: "Jul 31, 2025",
    },
    {
      id: "elon-trump",
      title: "Elon out of Trump administration before June?",
      volume: "$578k Vol.",
      date: "Jun 1, 2025",
    },
    {
      id: "trump-blanket-tariff",
      title: "Will Trump remove 10% blanket tariff in first 100 days?",
      volume: "$69k Vol.",
      date: "May 20, 2025",
    },
  ]

  const handleCardClick = (marketId: string) => {
    router.push(`/market/${marketId}`)
  }

  const toggleBookmark = (e: React.MouseEvent, marketId: string) => {
    e.stopPropagation()
    setBookmarkedMarkets((prev) =>
      prev.includes(marketId) ? prev.filter((id) => id !== marketId) : [...prev, marketId],
    )
  }

  const handleBuyYes = (e: React.MouseEvent, marketId: string) => {
    e.stopPropagation()
    router.push(`/market/${marketId}?action=buyYes`)
  }

  const handleBuyNo = (e: React.MouseEvent, marketId: string) => {
    e.stopPropagation()
    router.push(`/market/${marketId}?action=buyNo`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {markets.map((market) => (
        <div
          key={market.id}
          className="border rounded-lg p-4 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick(market.id)}
        >
          <div className="flex items-start gap-2 mb-3">
            {market.flag ? (
              <div className="text-2xl">{market.flag}</div>
            ) : (
              <div className="w-10 h-10 rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  width={40}
                  height={40}
                  alt={market.title}
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-sm font-medium flex-1">{market.title}</h3>
          </div>

          <div className="pt-3 border-t">
            <div className="flex justify-between mb-3">
              <Button
                className="bg-green-500 hover:bg-green-600 text-xs h-8"
                onClick={(e) => handleBuyYes(e, market.id)}
              >
                Buy Yes
              </Button>
              <Button
                className="bg-red-100 text-red-500 hover:bg-red-200 text-xs h-8"
                onClick={(e) => handleBuyNo(e, market.id)}
              >
                Buy No
              </Button>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <div>{market.volume}</div>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant={bookmarkedMarkets.includes(market.id) ? "default" : "ghost"}
                  className={`h-6 w-6 ${bookmarkedMarkets.includes(market.id) ? "bg-blue-600" : ""}`}
                  onClick={(e) => toggleBookmark(e, market.id)}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
