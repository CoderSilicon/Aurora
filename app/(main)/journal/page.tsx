"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MoonIcon,
  SunIcon,
  SaveIcon,
  CalendarIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { format } from "date-fns";
import { MOODS } from "@/data/moods";
import { createJournalEntry, saveDraft } from "@/lib/actions";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("NEUTRAL");
  const [date, setDate] = useState<Date>(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content && !isDraftSaved) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [content, title, selectedMood, date, tags, isDraftSaved]);

  // Load draft if it exists
  useEffect(() => {
    const loadDraft = async () => {
      try {
        const response = await fetch("/api/journal/draft");
        if (response.ok) {
          const data = await response.json();
          if (data.draft) {
            setTitle(data.draft.title || "");
            setContent(data.draft.content || "");
            setSelectedMood(data.draft.mood || "NEUTRAL");
            setDate(data.draft.date ? new Date(data.draft.date) : new Date());
            setTags(data.draft.tags || []);
            setIsDraftSaved(true);
          }
        }
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    };

    loadDraft();
  }, []);

  const handleSaveDraft = async () => {
    try {
      await saveDraft({
        title,
        content,
        mood: selectedMood,
        date: date.toISOString(),
        tags,
      });
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  const handleSave = async () => {
    if (!title || !content) return;

    setIsSaving(true);
    try {
      const mood = MOODS[selectedMood as keyof typeof MOODS];

      await createJournalEntry({
        title,
        content,
        mood: selectedMood,
        moodScore: mood.score,
        date: date.toISOString(),
        tags,
      });

      // Redirect to the entries list
      router.push("/journal/entries");
    } catch (error) {
      console.error("Failed to save entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Convert MOODS object to array for rendering
  const moodOptions = Object.entries(MOODS).map(([key, value]) => ({
    id: key,
    ...(({ id, ...rest }) => rest)(value),
  }));

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 josefin-700 container mx-auto py-8 px-4 dark:bg-slate-950">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-400">
          New Journal Entry
        </h1>
        <div className="flex items-center gap-2">
          <Link href="/journal/entries">
            <Button
              variant="outline"
              className="border-amber-500 text-amber-700 dark:text-amber-400"
            >
              View All Entries
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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

      <Card className="bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-amber-800 dark:text-amber-400">
            Create a New Journal Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-amber-800 dark:text-amber-400"
            >
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter a title for your journal entry"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-amber-200 dark:border-amber-800 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="mood"
                className="text-amber-800 dark:text-amber-400"
              >
                How are you feeling?
              </Label>
              <select
                id="mood"
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full rounded-md border border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500"
              >
                {moodOptions.map((mood) => (
                  <option key={mood.id} value={mood.id}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
              {selectedMood && (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1">
                  {MOODS[selectedMood as keyof typeof MOODS]?.prompt ||
                    "How are you feeling today?"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-amber-800 dark:text-amber-400"
              >
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-amber-200 dark:border-amber-800"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="tags"
              className="text-amber-800 dark:text-amber-400"
            >
              Tags
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tags (e.g., personal, work, ideas)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-amber-200 dark:border-amber-800 focus:ring-amber-500"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                variant="outline"
                className="border-amber-500 text-amber-700 dark:text-amber-400"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press Enter or click the + button to add a tag
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-amber-800 dark:text-amber-400"
            >
              Journal Entry
            </Label>
            <div className="min-h-[300px] rounded-md border border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-800">
              {typeof window !== "undefined" && (
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  className="h-[250px] text-gray-900 dark:text-gray-100"
                  placeholder={
                    MOODS[selectedMood as keyof typeof MOODS]?.prompt ||
                    "Write your thoughts here..."
                  }
                />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            {isDraftSaved ? "Draft Saved!" : "Save Draft"}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !title || !content}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isSaving ? "Saving..." : "Save Entry"}
            <SaveIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
