"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, Wallet } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ProfilePage() {
  const [balance, setBalance] = useState("1,245.00")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [venmoConnected, setVenmoConnected] = useState(false)

  const handleConnectVenmo = () => {
    // In a real app, this would open Venmo OAuth flow
    setVenmoConnected(true)
  }

  const handleWithdraw = () => {
    // In a real app, this would process the withdrawal
    if (!withdrawAmount) return

    const currentBalance = Number.parseFloat(balance.replace(/,/g, ""))
    const amount = Number.parseFloat(withdrawAmount)

    if (amount > currentBalance) {
      alert("Insufficient balance")
      return
    }

    const newBalance = (currentBalance - amount).toFixed(2)
    setBalance(new Intl.NumberFormat().format(Number.parseFloat(newBalance)))
    setWithdrawAmount("")
    alert(`${amount} withdrawn to your Venmo account`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar balance={`$${balance}`} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">Profile</h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${balance}</div>
                <p className="text-xs text-muted-foreground">Available for trading or withdrawal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Bets</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Across 4 different markets</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+$245.00</div>
                <p className="text-xs text-muted-foreground">+22% from initial deposit</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="withdraw" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
            </TabsList>
            <TabsContent value="withdraw">
              <Card className={!venmoConnected ? "bg-transparent" : ""}>
                <CardHeader>
                  <CardTitle>Withdraw to Venmo</CardTitle>
                  <CardDescription>Withdraw your funds to your connected Venmo account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!venmoConnected ? (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <p className="text-center text-sm text-muted-foreground">
                        Connect your Venmo account to withdraw funds.
                      </p>
                      <Button className="bg-[#008CFF] hover:bg-[#0070CC] z-[100]" onClick={handleConnectVenmo}>
                        Connect Venmo
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                        <div className="h-8 w-8 rounded-full bg-[#008CFF] flex items-center justify-center text-white font-bold">
                          V
                        </div>
                        <div>
                          <p className="text-sm font-medium">Venmo Connected</p>
                          <p className="text-xs text-muted-foreground">@username</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0"
                            className="pl-8"
                            value={withdrawAmount}
                            onChange={(e) => {
                              // Only allow whole numbers
                              const value = e.target.value
                              if (value === "" || /^\d+$/.test(value)) {
                                setWithdrawAmount(value)
                              }
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!venmoConnected || !withdrawAmount} onClick={handleWithdraw}>
                    Withdraw to Venmo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="deposit">
              <Card className={!venmoConnected ? "bg-transparent" : ""}>
                <CardHeader>
                  <CardTitle>Deposit Funds</CardTitle>
                  <CardDescription>Add funds to your account using Venmo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!venmoConnected ? (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <p className="text-center text-sm text-muted-foreground">
                        Connect your Venmo account to deposit funds.
                      </p>
                      <Button className="bg-[#008CFF] hover:bg-[#0070CC] z-[100]" onClick={handleConnectVenmo}>
                        Connect Venmo
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                        <div className="h-8 w-8 rounded-full bg-[#008CFF] flex items-center justify-center text-white font-bold">
                          V
                        </div>
                        <div>
                          <p className="text-sm font-medium">Venmo Connected</p>
                          <p className="text-xs text-muted-foreground">@username</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deposit-amount">Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="deposit-amount"
                            type="number"
                            placeholder="0"
                            className="pl-8"
                            onChange={(e) => {
                              // Only allow whole numbers
                              const value = e.target.value
                              if (value === "" || /^\d+$/.test(value)) {
                                // This would update state in a real implementation
                              }
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!venmoConnected}>
                    Deposit from Venmo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
