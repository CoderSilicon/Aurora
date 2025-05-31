"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  PlusIcon,
  BookOpenIcon,
  SearchIcon,
  MoonIcon,
  SunIcon,
  CalendarIcon,
  XIcon,
} from "lucide-react";
import { format, isAfter, isBefore, isEqual, set } from "date-fns";
import { MOODS } from "@/data/moods";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function EntriesPage() {
  interface JournalEntry {
    id: string;
    title: string;
    content: string;
    mood: string;
    date: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    moodScore: number;
  }

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [allTags, setAllTags] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/journal/entries");
        if (response.ok) {
          const data = await response.json();
          setEntries(data.entries);

          // Extract all unique tags
          const tags = new Set<string>();
          data.entries.forEach((entry: JournalEntry) => {
            entry.tags.forEach((tag: string) => {
              tags.add(tag);
            });
          });
          setAllTags(Array.from(tags));
        }
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const toggleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMood(null);
    setSelectedTags([]);
    setDateRange({ from: undefined, to: undefined });
  };

  const filteredEntries = entries.filter((entry: JournalEntry) => {
    // Search term - check title, content, and tags
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = entry.title.toLowerCase().includes(searchLower);
      const contentMatch = entry.content.toLowerCase().includes(searchLower);
      const tagMatch = entry.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchLower)
      );
      const moodLabel = MOODS[entry.mood as keyof typeof MOODS]?.label || "";
      const moodMatch = moodLabel.toLowerCase().includes(searchLower);

      if (!(titleMatch || contentMatch || tagMatch || moodMatch)) {
        return false;
      }
    }

    // Filter by mood
    if (selectedMood && entry.mood !== selectedMood) {
      return false;
    }

    // Filter by tags
    if (
      selectedTags.length > 0 &&
      !selectedTags.some((tag) => entry.tags.includes(tag))
    ) {
      return false;
    }

    // Filter by date range
    const entryDate = new Date(entry.date);
    if (
      dateRange.from &&
      isBefore(entryDate, dateRange.from) &&
      !isEqual(entryDate, dateRange.from)
    ) {
      return false;
    }
    if (
      dateRange.to &&
      isAfter(entryDate, dateRange.to) &&
      !isEqual(entryDate, dateRange.to)
    ) {
      return false;
    }

    return true;
  });

  // Convert MOODS object to array for rendering
  const moodOptions = Object.entries(MOODS).map(([key, value]) => ({
    ...value,
    id: key,
  }));

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-400">
          Journal Entries
        </h1>
        <div className="flex items-center gap-2">
          <Link href="/journal">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-amber-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-amber-800" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
        <div className="mb-4">
          <div className="relative">
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search across title, content, and tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-amber-200 dark:border-amber-800"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Search will look through titles, content, and tags
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label
              htmlFor="mood-filter"
              className="text-sm text-amber-800 dark:text-amber-400 mb-1 block"
            >
              Filter by Mood
            </Label>
            <select
              id="mood-filter"
              value={selectedMood || ""}
              onChange={(e) => setSelectedMood(e.target.value || null)}
              className="w-full rounded-md border border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Moods</option>
              {moodOptions.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.emoji} {mood.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label
              htmlFor="date-filter"
              className="text-sm text-amber-800 dark:text-amber-400 mb-1 block"
            >
              Filter by Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-filter"
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-amber-200 dark:border-amber-800"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Filter by date"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) =>
                    setDateRange({ from: range?.from, to: range?.to })
                  }
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-end">
            <Button
              onClick={clearFilters}
              variant="outline"
              className="w-full border-amber-500 text-amber-700 dark:text-amber-400"
            >
              <XIcon className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        {allTags.length > 0 && (
          <div>
            <Label className="text-sm text-amber-800 dark:text-amber-400 mb-1 block">
              Filter by Tags
            </Label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  className={cn(
                    "cursor-pointer",
                    selectedTags.includes(tag)
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800"
                  )}
                  onClick={() => toggleTagFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {filteredEntries.length === 0 ? (
            <p>
              No entries match your search criteria. Try adjusting your filters.
            </p>
          ) : filteredEntries.length === entries.length ? (
            <p>Showing all {entries.length} entries</p>
          ) : (
            <p>
              Showing {filteredEntries.length} of {entries.length} entries
            </p>
          )}
        </div>
      )}

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg">
          <BookOpenIcon className="mx-auto h-12 w-12 text-amber-400" />
          <h3 className="mt-4 text-lg font-medium text-amber-800 dark:text-amber-400">
            No entries found
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {entries.length === 0
              ? "Start journaling to see your entries here."
              : "Try adjusting your filters to see more entries."}
          </p>
          {entries.length === 0 && (
            <Link href="/journal" className="mt-4 inline-block">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Create your first entry
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry: JournalEntry) => (
            <Link key={entry.id} href={`/journal/entries/${entry.id}`}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md border-amber-200 dark:border-amber-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-amber-800 dark:text-amber-400 line-clamp-1">
                      {entry.title}
                    </CardTitle>
                    <div
                      className="text-lg"
                      title={MOODS[entry.mood as keyof typeof MOODS]?.label}
                    >
                      {MOODS[entry.mood as keyof typeof MOODS]?.emoji}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(entry.date), "MMMM d, yyyy")}
                  </p>
                </CardHeader>
                <CardContent className="pb-2">
                  <div
                    className="line-clamp-3 text-gray-700 dark:text-gray-300 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: entry.content.substring(0, 150),
                    }}
                  />
                </CardContent>
                <CardFooter className="flex flex-wrap gap-1">
                  {entry.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
