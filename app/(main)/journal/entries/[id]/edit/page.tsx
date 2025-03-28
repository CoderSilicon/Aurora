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
  ArrowLeftIcon,
  SaveIcon,
  CalendarIcon,
  PlusIcon,
  XIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { format } from "date-fns";
import { MOODS } from "@/data/moods";
import { updateJournalEntry } from "@/lib/actions";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditEntryPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("NEUTRAL");
  const [date, setDate] = useState<Date>(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Fetch the entry data
  useEffect(() => {
    async function fetchEntry() {
      try {
        const response = await fetch(`/api/journal/entries/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch entry");
        }

        const data = await response.json();
        setTitle(data.entry.title);
        setContent(data.entry.content);
        setSelectedMood(data.entry.mood);
        setDate(new Date(data.entry.date));
        setTags(data.entry.tags || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching entry:", error);
        router.push("/journal/entries");
      }
    }

    fetchEntry();
  }, [params.id, router]);

  const handleSave = async () => {
    if (!title || !content) return;

    setIsSaving(true);
    try {
      const mood = MOODS[selectedMood as keyof typeof MOODS];

      await updateJournalEntry(params.id, {
        title,
        content,
        mood: selectedMood,
        moodScore: mood.score,
        date: date.toISOString(),
        tags,
      });

      // Redirect to the entry detail page
      router.push(`/journal/entries/${params.id}`);
    } catch (error) {
      console.error("Failed to update entry:", error);
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
    ...value,
  }));

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-amber-600 dark:text-amber-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/journal/entries/${params.id}`}>
          <Button
            variant="ghost"
            className="text-amber-800 dark:text-amber-400"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Entry
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

      <Card className="bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-amber-800 dark:text-amber-400">
            Edit Journal Entry
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
                />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving || !title || !content}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isSaving ? "Saving..." : "Save Changes"}
            <SaveIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
