"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BookmarksPage() {
  const [bookmarkedMarkets, setBookmarkedMarkets] = useState([
    {
      id: "portugal-pm",
      title: "Next Prime Minister of Portugal after the 2025 election?",
      flag: "🇵🇹",
      volume: "$1.17m Vol.",
      date: "May 18, 2025",
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
  ])

  const removeBookmark = (marketId: string) => {
    setBookmarkedMarkets(bookmarkedMarkets.filter((market) => market.id !== marketId))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Bookmarked Markets</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span>{bookmarkedMarkets.length} Bookmarks</span>
          </Button>
        </div>

        {bookmarkedMarkets.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium mb-2">No bookmarked markets</h2>
            <p className="text-gray-500 mb-4">You haven't bookmarked any markets yet.</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Markets</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedMarkets.map((market) => (
              <Card key={market.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
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
                      <CardTitle className="text-base font-medium">{market.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-500"
                      onClick={() => removeBookmark(market.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div>{market.volume}</div>
                    <div>{market.date}</div>
                  </div>
                  <Link href={`/market/${market.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">View Market</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
