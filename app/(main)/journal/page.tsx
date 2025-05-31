"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Link as TipTapLink } from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
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
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  ImageIcon,
  Link2,
} from "lucide-react";
import { MOODS } from "@/data/moods";
import { createJournalEntry, saveDraft } from "@/lib/actions";


export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("NEUTRAL");
  const [date, setDate] = useState<Date>(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Set up TipTap Editor with basic extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: MOODS[selectedMood as keyof typeof MOODS]?.prompt || "Write your thoughts here..."
      }),
      TipTapLink.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[250px] p-4 text-gray-900 dark:text-gray-100',
      },
    },
  });

  const handleAIInput = async (editor: Editor | null) => {
    if (!aiPrompt.trim() || !editor) return;
    
    try {
      const response = await fetch('/api/journal/ai-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          currentContent: editor.getHTML()
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
  
      const data = await response.json();
      if (data.content && editor) {
        editor.commands.setContent(data.content);
        setAiPrompt(""); // Clear the input after using it
      }
    } catch (error) {
      console.error('Error:', error);
      if (editor) {
        editor.commands.setContent(editor.getHTML() + '\n\nFailed to get AI response. Please try again.');
      }
    }
  }
  

  // Update placeholder when mood changes
  useEffect(() => {
    if (editor && selectedMood) {
      // This is a simplified approach - just recreating the editor when mood changes
      editor.commands.setContent(editor.getHTML());
    }
  }, [selectedMood, editor]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!editor) return;
    
    const timer = setTimeout(() => {
      if (editor.getHTML() && !isDraftSaved) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [editor, title, selectedMood, date, tags, isDraftSaved]);

  // Load draft if it exists
  useEffect(() => {
    const loadDraft = async () => {
      if (!editor) return;
      
      try {
        const response = await fetch("/api/journal/draft");
        if (response.ok) {
          const data = await response.json();
          if (data.draft) {
            setTitle(data.draft.title || "");
            editor.commands.setContent(data.draft.content || "");
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

    if (editor) {
      loadDraft();
    }
  }, [editor]);

  const handleSaveDraft = async () => {
    if (!editor) return;
    
    try {
      await saveDraft({
        title,
        content: editor.getHTML(),
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
    if (!editor || !title || editor.isEmpty) return;

    setIsSaving(true);
    try {
      const mood = MOODS[selectedMood as keyof typeof MOODS];

      await createJournalEntry({
        title,
        content: editor.getHTML(),
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

  // Convert MOODS object to array for rendering
  const moodOptions = Object.entries(MOODS).map(([key, value]) => ({
    id: key,
    ...(({ id, ...rest }) => rest)(value),
  }));

  return (
    <div className="lexend-400 container mx-auto py-8 px-4 dark:bg-slate-950">
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
              {editor && <EditorToolbar editor={editor} handleAIInput={handleAIInput} />}
              <EditorContent editor={editor} className="min-h-[250px]" />
            </div>
            
            {/* Add AI prompt input here */}
            <div className="flex gap-2 mt-4">
              <Input
                id="ai-prompt"
                placeholder="Enter a prompt for AI to generate journal content"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="border-amber-200 dark:border-amber-800 focus:ring-amber-500"
              />
              <Button
                type="button"
                onClick={() => handleAIInput(editor)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 
                          text-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                Generate
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Type a prompt and click Generate to create AI-powered journal content
            </p>
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
            disabled={isSaving || !title || (editor?.isEmpty ?? true)}
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

const EditorToolbar = ({ 
  editor, 
  handleAIInput 
}: { 
  editor: Editor | null,
  handleAIInput: (editor: Editor | null) => void 
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-amber-200 dark:border-amber-800 p-2 flex flex-wrap gap-1 mb-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-amber-100 dark:bg-amber-900' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-amber-100 dark:bg-amber-900' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-amber-100 dark:bg-amber-900' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-amber-100 dark:bg-amber-900' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-amber-100 dark:bg-amber-900' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-amber-100 dark:bg-amber-900' : ''}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={editor.isActive('link') ? 'bg-amber-100 dark:bg-amber-900' : ''}
      >
        <Link2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt('Image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};