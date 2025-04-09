import { BrainCircuit } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-amber-50/30 dark:bg-slate-950">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-white dark:bg-slate-900 border-r border-amber-100 dark:border-amber-900/20">
        <div className="p-4 flex items-center gap-3 border-b border-amber-100 dark:border-amber-900/20">
          <BrainCircuit className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="p-4">
          <Skeleton className="h-4 w-20 mb-4" />
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
          </div>

          <Skeleton className="h-4 w-20 mt-8 mb-4" />
          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-slate-900 border-b border-amber-100 dark:border-amber-900/20 p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-64" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-9 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full rounded-lg" />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-72 w-full rounded-lg" />
                ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-9 w-56" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-36 w-full rounded-lg" />
                  ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-7 w-40 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
