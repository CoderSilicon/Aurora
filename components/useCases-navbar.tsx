"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface JournalNavbarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function JournalNavbar({ activeFilter, onFilterChange }: JournalNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = [
    { id: "all", label: "All" },
    { id: "creative", label: "Creative" },
    { id: "tech", label: "Tech" },
    { id: "academic", label: "Academic" },
    { id: "health", label: "Health" },
  ]

  const handleFilterChange = (filter: string) => {
    onFilterChange(filter)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="mb-4 sm:mb-6">
      {/* Desktop Categories */}
      <div className="hidden sm:flex justify-center">
        <div className="inline-flex items-center bg-black/5 dark:bg-white/10 backdrop-blur-sm rounded-full p-0.5 border border-black/10 dark:border-white/20">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200",
                activeFilter === category.id
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                  : "text-gray-700 dark:text-gray-300",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Categories */}
      <div className="sm:hidden">
        {/* Mobile Dropdown Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between p-3 bg-black/5 dark:bg-white/10 backdrop-blur-sm rounded-lg border border-black/10 dark:border-white/20 text-gray-900 dark:text-gray-100"
        >
          <span className="font-medium text-sm">
            {categories.find((cat) => cat.id === activeFilter)?.label || "All"}
          </span>
          <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isMobileMenuOpen && "rotate-180")} />
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg border border-black/10 dark:border-white/20 shadow-lg overflow-hidden">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={cn(
                  "w-full text-left px-3 py-2 text-xs font-medium transition-colors duration-200 border-b border-black/5 dark:border-white/10 last:border-b-0",
                  activeFilter === category.id
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-700 dark:text-gray-300",
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}