"use client";

import {
  Code2,
  BookMarked,
  GraduationCap,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalRole {
  title: string;
  icon: React.ReactNode;
  impact: string;
  description: string;
  category: string;
  featured: boolean;
}

interface JournalCardProps {
  role: JournalRole;
  index: number;
}

export default function Page() {
  const journalRoles = [
    {
      title: "Developer ",
      icon: <Code2 className="h-5 w-5" />,
      impact: "Track Coding Breakthroughs",
      description: "Document solutions, debug logs, and learning progress.",
      category: "tech",
      featured: false,
    },
    {
      title: "Student ",
      icon: <BookMarked className="h-5 w-5" />,
      impact: "Accelerate Learning",
      description: "Organize study notes, questions, and academic progress.",
      category: "academic",
      featured: true,
    },
    {
      title: "Research ",
      icon: <GraduationCap className="h-5 w-5" />,
      impact: "Organize Academic Insights",
      description: "Track studies, experiments, and literature reviews.",
      category: "academic",
      featured: true,
    },
  ];

  return (
    <section className="text-gray-900 dark:text-gray-100 relative overflow-hidden">
      <div className="relative z-10 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* IMPACT HEADER */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lexend-600 font-light text-gray-900 dark:text-gray-100 mb-4 poppins-400">
                Use Cases
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-light poppins-400">
                Transform your professional thoughts into{" "}
                <span className="text-black dark:text-white ">
                  structured clarity
                </span>
              </p>
            </div>
          </div>

          {/* JOURNAL USE CASES GRID */}
          <div
            className={cn(
              "grid gap-6 mb-8 sm:mb-12 md:mb-16",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {journalRoles.map((role, index) => (
              <JournalCard
                key={index}
                role={role}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalCard({ role }: JournalCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl bg-slate-50/80 border-2 border-zinc-800 dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all p-8 lexend-300 relative flex flex-col"
      )}
    >
      <div className="p-5 flex flex-row items-center justify-between relative">
        {/* Text Content */}
        <div className="flex flex-col items-start text-left flex-1">
          {/* Title */}
          <h3 className="font-semibold text-base text-black dark:text-white mb-1">
            {role.title}
          </h3>
          {/* Impact */}
          <div className="text-xs text-gray-800 dark:text-gray-200 mb-1 font-medium">
            {role.impact}
          </div>
          {/* Description */}
          <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
            {role.description}
          </p>
          {/* Category Tag */}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white font-semibold capitalize mt-1">
            {role.category}
          </span>
        </div>
        {/* Icon */}
        <div className="flex items-center justify-center ml-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-black/10 dark:bg-white/10">
            <span className="text-black dark:text-white text-2xl">
              {role.icon}
            </span>
          </span>
        </div>
        {/* Featured Badge */}
        {role.featured && (
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-black/80 dark:bg-white/20 text-white dark:text-black text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow">
            <Zap className="h-3 w-3" /> Featured
          </span>
        )}
      </div>
    </article>
  );
}
