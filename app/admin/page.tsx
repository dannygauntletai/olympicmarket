"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminPage() {
  const [markets, setMarkets] = useState([
    {
      id: "portugal-pm",
      title: "Next Prime Minister of Portugal after the 2025 election?",
      resolved: false,
      outcome: null,
    },
    {
      id: "canada-pm",
      title: "Next Prime Minister of Canada after the election?",
      resolved: false,
      outcome: null,
    },
    {
      id: "us-recession",
      title: "US recession in 2025?",
      resolved: false,
      outcome: null,
    },
    {
      id: "fed-decision",
      title: "Fed decision in May?",
      resolved: true,
      outcome: "yes",
    },
  ])

  const [newMarketTitle, setNewMarketTitle] = useState("")
  const [newMarketDescription, setNewMarketDescription] = useState("")
  const [newMarketEndDate, setNewMarketEndDate] = useState("")
  const [newMarketEndTime, setNewMarketEndTime] = useState("")
  const [newMarketOccurrence, setNewMarketOccurrence] = useState("one-time")

  const handleResolveMarket = (id: string, outcome: "yes" | "no") => {
    setMarkets(
      markets.map((market) => {
        if (market.id === id) {
          return { ...market, resolved: true, outcome }
        }
        return market
      }),
    )
  }

  const handleCreateMarket = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = newMarketTitle.toLowerCase().replace(/\s+/g, "-").slice(0, 20)

    setMarkets([
      ...markets,
      {
        id: newId,
        title: newMarketTitle,
        resolved: false,
        outcome: null,
      },
    ])

    setNewMarketTitle("")
    setNewMarketDescription("")
    setNewMarketEndDate("")
    setNewMarketEndTime("")
    setNewMarketOccurrence("one-time")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Resolve Markets</h2>
            <div className="space-y-4">
              {markets.map((market) => (
                <Card key={market.id}>
                  <CardHeader>
                    <CardTitle>{market.title}</CardTitle>
                    <CardDescription>
                      Status: {market.resolved ? `Resolved (${market.outcome?.toUpperCase()})` : "Unresolved"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!market.resolved ? (
                      <div className="flex gap-2">
                        <Button
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleResolveMarket(market.id, "yes")}
                        >
                          Resolve YES
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleResolveMarket(market.id, "no")}
                        >
                          Resolve NO
                        </Button>
                      </div>
                    ) : (
                      <div className="text-gray-500">This market has been resolved.</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Create New Market</h2>
            <Card>
              <CardHeader>
                <CardTitle>New Prediction Market</CardTitle>
                <CardDescription>Create a new yes/no prediction market</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateMarket} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Market Question</Label>
                    <Input
                      id="title"
                      value={newMarketTitle}
                      onChange={(e) => setNewMarketTitle(e.target.value)}
                      placeholder="e.g., Will Bitcoin reach $100,000 in 2025?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newMarketDescription}
                      onChange={(e) => setNewMarketDescription(e.target.value)}
                      placeholder="Provide details about this market..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date (CST)</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={newMarketEndDate}
                        onChange={(e) => setNewMarketEndDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time (CST)</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={newMarketEndTime}
                        onChange={(e) => setNewMarketEndTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occurrence">Occurrence</Label>
                    <Select value={newMarketOccurrence} onValueChange={setNewMarketOccurrence}>
                      <SelectTrigger id="occurrence">
                        <SelectValue placeholder="Select occurrence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Market
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
