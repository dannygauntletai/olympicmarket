import { MarketsGrid } from "@/components/markets-grid"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <MarketsGrid />
      </div>
    </div>
  )
}
