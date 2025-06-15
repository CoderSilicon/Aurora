"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface JournalRole {
  title: string
  icon: React.ReactNode
  gradient: string
  impact: string
  description: string
  category: string
  featured: boolean
  tasks: string[]
}

interface JournalCardProps {
  role: JournalRole
  index: number
  isMobile: boolean
  isTablet: boolean
}

export default function JournalCard({ role, index, isMobile, isTablet }: JournalCardProps) {
  const getCardSpan = (featured: boolean, index: number) => {
    if (isMobile) {
      return "col-span-1"
    } else if (isTablet) {
      return "col-span-1"
    } else {
      if (featured) {
        return "col-span-6"
      } else {
        return index % 3 === 0 ? "col-span-4" : "col-span-3"
      }
    }
  }

  return (
    <Card
      className={cn(
        "relative bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg",
        getCardSpan(role.featured, index),
      )}
    >
      {/* Journal Page Effect - Always visible */}
      <div className="absolute -right-3 -bottom-3 w-12 h-12 bg-white/30 dark:bg-gray-800/30 rounded-tl-lg shadow-inner rotate-12 opacity-30"></div>

      {/* Gradient Glow - Always visible */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${role.gradient} rounded-lg blur opacity-20`}></div>

      <CardContent
        className={cn(
          "relative p-3 sm:p-4 h-full flex flex-col justify-between",
          role.featured ? "min-h-[200px] sm:min-h-[220px]" : "min-h-[160px]",
        )}
      >
        {/* Icon */}
        <div className={`mb-3 p-2 rounded-lg bg-gradient-to-r ${role.gradient} text-white w-fit shadow-md`}>
          {role.icon}
        </div>

        {/* Content */}
        <div className="space-y-1.5 sm:space-y-2 flex-grow">
          <h3
            className={cn(
              "font-bold text-transparent bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text",
              role.featured ? "text-base sm:text-lg" : "text-sm sm:text-base",
            )}
          >
            {role.title}
          </h3>

          <div className={`text-xs font-bold bg-gradient-to-r ${role.gradient} bg-clip-text text-transparent`}>
            {role.impact}
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{role.description}</p>

          {/* Tasks List - Always visible */}
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Key Tasks:</div>
            <div className="space-y-0.5">
              {role.tasks.slice(0, 3).map((task, taskIndex) => (
                <div key={taskIndex} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <div className="w-1 h-1 bg-current rounded-full mr-2 opacity-60"></div>
                  {task}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tag - Always visible */}
        <div className="absolute top-3 right-3">
          <span className="text-xs bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-full text-gray-600 dark:text-gray-400 capitalize">
            {role.category}
          </span>
        </div>

   
      </CardContent>
    </Card>
  )
}