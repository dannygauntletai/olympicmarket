"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar({ balance = "$1,245.00" }: { balance?: string }) {
  const router = useRouter()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="2" />
              <path
                d="M14 5C14 5 9 9.5 9 14C9 18.5 14 23 14 23"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M14 5C14 5 19 9.5 19 14C19 18.5 14 23 14 23"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M6 14H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-lg">OlympicMarket</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Home
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
              Admin
            </Button>
          </Link>
          <Link href="/bookmarks">
            <Button variant="default" className="bg-amber-600 hover:bg-amber-700">
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmarks
            </Button>
          </Link>
          <div className="bg-gray-100 px-3 py-2 rounded-md font-medium">Balance: {balance}</div>
          <Avatar className="h-9 w-9 cursor-pointer" onClick={() => router.push("/profile")}>
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
