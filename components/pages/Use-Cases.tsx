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
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import JournalNavbar from "@/components/journal-navbar";
import JournalCard from "../journal-card";

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
    <section className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 relative overflow-hidden">
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
