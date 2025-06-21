"use client";

import {
  Code2,
  BookOpen,
  Brain,
  HeartPulse,
  GraduationCap,
  Palette,
  BookMarked,
  Zap,
  Users,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card, CardContent } from "@/components/ui/card"



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

interface JournalNavbarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");

  const journalRoles = [
    // Creative Category (3 roles)
    {
      title: "Writer Journals",
      icon: <BookOpen className="h-5 w-5" />,
      gradient: "from-purple-500 to-violet-400",
      glow: "shadow-purple-500/30",
      impact: "Capture Creative Inspiration",
      description: "Store ideas, outlines, and writing milestones.",
      category: "creative",
      featured: true,
      tasks: ["Story ideation", "Character development", "Plot tracking"],
    },
    {
      title: "Design Journals",
      icon: <Palette className="h-5 w-5" />,
      gradient: "from-pink-500 to-rose-400",
      glow: "shadow-pink-500/30",
      impact: "Collect Visual Inspiration",
      description: "Document design processes, feedback, and iterations.",
      category: "creative",
      featured: false,
      tasks: ["Design concepts", "Client feedback", "Color palettes"],
    },
    {
      title: "Content Creator Journals",
      icon: <Users className="h-5 w-5" />,
      gradient: "from-orange-500 to-yellow-400",
      glow: "shadow-orange-500/30",
      impact: "Build Engaging Content",
      description:
        "Plan content strategies, track engagement, and brainstorm ideas.",
      category: "creative",
      featured: false,
      tasks: ["Content calendar", "Audience insights", "Trend analysis"],
    },

    // Tech Category (2 roles)
    {
      title: "Developer Journals",
      icon: <Code2 className="h-5 w-5" />,
      gradient: "from-blue-500 to-cyan-400",
      glow: "shadow-blue-500/30",
      impact: "Track Coding Breakthroughs",
      description: "Document solutions, debug logs, and learning progress.",
      category: "tech",
      featured: true,
      tasks: ["Bug solutions", "Code reviews", "Learning notes"],
    },
    {
      title: "Product Manager Journals",
      icon: <TrendingUp className="h-5 w-5" />,
      gradient: "from-green-500 to-emerald-400",
      glow: "shadow-green-500/30",
      impact: "Drive Product Success",
      description:
        "Track feature requests, user feedback, and strategic decisions.",
      category: "tech",
      featured: false,
      tasks: ["Feature planning", "User research", "Roadmap updates"],
    },

    // Academic Category (2 roles)
    {
      title: "Research Journals",
      icon: <GraduationCap className="h-5 w-5" />,
      gradient: "from-teal-500 to-cyan-400",
      glow: "shadow-teal-500/30",
      impact: "Organize Academic Insights",
      description: "Track studies, experiments, and literature reviews.",
      category: "academic",
      featured: false,
      tasks: ["Literature review", "Experiment logs", "Data analysis"],
    },
    {
      title: "Student Journals",
      icon: <BookMarked className="h-5 w-5" />,
      gradient: "from-indigo-500 to-blue-400",
      glow: "shadow-indigo-500/30",
      impact: "Accelerate Learning",
      description: "Organize study notes, questions, and academic progress.",
      category: "academic",
      featured: false,
      tasks: ["Lecture notes", "Study schedules", "Assignment tracking"],
    },

    // Health Category (2 roles)
    {
      title: "Therapy Journals",
      icon: <HeartPulse className="h-5 w-5" />,
      gradient: "from-red-500 to-pink-400",
      glow: "shadow-red-500/30",
      impact: "Process Emotions Safely",
      description: "Document feelings, breakthroughs, and healing journeys.",
      category: "health",
      featured: false,
      tasks: ["Mood tracking", "Therapy sessions", "Coping strategies"],
    },
    {
      title: "Wellness Journals",
      icon: <Brain className="h-5 w-5" />,
      gradient: "from-emerald-500 to-teal-400",
      glow: "shadow-emerald-500/30",
      impact: "Enhance Well-being",
      description: "Track habits, mindfulness practices, and personal growth.",
      category: "health",
      featured: false,
      tasks: ["Habit tracking", "Meditation logs", "Gratitude practice"],
    },
  ];

  const filteredRoles =
    activeFilter === "all"
      ? journalRoles
      : journalRoles.filter((role) => role.category === activeFilter);

  const getGridClass = () => {
    if (isMobile) {
      return "grid-cols-1 gap-3";
    } else if (isTablet) {
      return "grid-cols-2 gap-4";
    } else {
      return "grid-cols-12 gap-4";
    }
  };

  return (
    <section className="min-h-screen  text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-6 h-8 bg-white dark:bg-gray-800 rounded-sm shadow-md opacity-20 rotate-12 animate-float"></div>
      <div className="absolute top-40 right-20 w-4 h-6 bg-white dark:bg-gray-800 rounded-sm shadow-md opacity-20 -rotate-6 animate-float-slow"></div>
      <div className="absolute bottom-40 left-20 w-8 h-10 bg-white dark:bg-gray-800 rounded-sm shadow-md opacity-20 rotate-3 animate-float-slower"></div>

      <div className="relative z-10 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* IMPACT HEADER */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4 caveat-600">
                Use Cases
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-light caveat-400">
                Transform your professional thoughts into{" "}
                <span className="text-black dark:text-white font-bold">
                  structured clarity
                </span>
              </p>
            </div>
          </div>

          {/* SIMPLE CATEGORIES NAVIGATION */}
          <JournalNavbar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* JOURNAL USE CASES GRID */}
          <div className={cn("grid", getGridClass(), "mb-8 sm:mb-12 md:mb-16")}>
            {filteredRoles.map((role, index) => (
              <JournalCard
                key={index}
                role={role}
                index={index}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalCard({ role, index, isMobile, isTablet }: JournalCardProps) {
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

function JournalNavbar({ activeFilter, onFilterChange }: JournalNavbarProps) {
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