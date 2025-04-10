"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { YesNoChart } from "@/components/yes-no-chart"
import { OrderBook } from "@/components/order-book"
import { Bookmark } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function MarketPage({ params }: { params: { id: string } }) {
  // Properly unwrap params with React.use() as required by Next.js 15
  const resolvedParams = React.use(params as any) as { id: string };
  const id = resolvedParams.id;

  const [amount, setAmount] = useState("")
  const [selectedOption, setSelectedOption] = useState("yes")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const searchParams = useSearchParams()

  // Sample market data - in a real app, this would come from an API
  const market = {
    id: id,
    title:
      id === "portugal-pm"
        ? "Next Prime Minister of Portugal after the 2025 election?"
        : id === "trump-tariffs"
          ? "Will Trump lower tariffs on India first?"
          : "Market Question",
    yesPercentage: id === "portugal-pm" ? 90 : 70,
    volume: id === "portugal-pm" ? "$1,173,232" : "$367,902",
    date: id === "portugal-pm" ? "May 18, 2025" : "Jul 31, 2025",
    flag: id === "portugal-pm" ? "🇵🇹" : null,
  }

  useEffect(() => {
    // Check if there's an action in the URL
    const action = searchParams.get("action")
    if (action === "buyYes") {
      setSelectedOption("yes")
    } else if (action === "buyNo") {
      setSelectedOption("no")
    }
  }, [searchParams])

  const handleAddAmount = (value: number) => {
    setAmount((prev) => {
      const currentAmount = prev === "" ? 0 : Number.parseInt(prev)
      return (currentAmount + value).toString()
    })
  }

  const handleMaxAmount = () => {
    // In a real app, this would be the user's available balance
    setAmount("1000")
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleTrade = () => {
    // In a real app, this would execute the trade
    alert(`Trading ${amount || "0"} on ${selectedOption === "yes" ? "YES" : "NO"} for ${market.title}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                {market.flag ? (
                  <div className="w-16 h-16 flex items-center justify-center text-4xl bg-gray-100">{market.flag}</div>
                ) : (
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    width={64}
                    height={64}
                    alt={market.title}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{market.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{market.volume} Vol.</span>
                  <span>{market.date}</span>
                </div>
              </div>
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="icon"
                className={isBookmarked ? "bg-blue-600" : ""}
                onClick={handleBookmark}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-lg p-4 mb-6">
              <YesNoChart yesPercentage={market.yesPercentage} />
            </div>

            <OrderBook />
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 sticky top-4">
              <div className="mb-4">
                <div className="font-medium text-base">{market.title}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  className={`h-12 text-base ${
                    selectedOption === "yes"
                      ? "bg-green-500 hover:bg-green-500"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedOption("yes")}
                >
                  Yes
                </Button>
                <Button
                  className={`h-12 text-base ${
                    selectedOption === "no"
                      ? "bg-red-500 hover:bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedOption("no")}
                >
                  No
                </Button>
              </div>

              <div className="mb-4">
                <div className="text-sm mb-2">Amount</div>
                <div className="relative">
                  <div className="border rounded-md p-2 flex items-center">
                    <span className="text-gray-400 mr-2 text-lg">$</span>
                    <input
                      className="w-full border-0 p-0 m-0 text-lg focus:outline-none bg-transparent"
                      value={amount}
                      onChange={(e) => {
                        // Only allow whole numbers
                        const value = e.target.value
                        if (value === "" || /^\d+$/.test(value)) {
                          setAmount(value)
                        }
                      }}
                      placeholder="0"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-2 mb-4">
                <Button variant="outline" size="sm" className="flex-1 h-9 text-xs" onClick={() => handleAddAmount(1)}>
                  +$1
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-9 text-xs" onClick={() => handleAddAmount(20)}>
                  +$20
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-9 text-xs" onClick={() => handleAddAmount(100)}>
                  +$100
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-9 text-xs" onClick={handleMaxAmount}>
                  Max
                </Button>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-600 h-10 text-base mb-3" onClick={handleTrade}>
                Buy
              </Button>

              <div className="text-center text-xs text-gray-500">
                By trading, you agree to the{" "}
                <Link href="#" className="text-blue-600 underline">
                  Terms of Use
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}