"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  EditIcon,
  TrashIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { format } from "date-fns";
import { MOODS } from "@/data/moods";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EntryPage({ params }: { params: { id: string } }) {
  const [entry, setEntry] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/journal/entries/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch entry");
        }

        const data = await response.json();
        setEntry(data.entry);
      } catch (error) {
        console.error("Error fetching entry:", error);
        router.push("/journal/entries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [params.id, router]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/journal/entries/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      router.push("/journal/entries");
    } catch (error) {
      console.error("Error deleting entry:", error);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-amber-600 dark:text-amber-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600 dark:text-red-400">Entry not found</div>
        </div>
      </div>
    );
  }

  const mood = MOODS[entry.mood as keyof typeof MOODS];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/journal/entries">
          <Button
            variant="ghost"
            className="text-amber-800 dark:text-amber-400"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Entries
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
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-amber-800 dark:text-amber-400 flex items-center gap-2">
                {entry.title}
                <span title={mood?.label}>{mood?.emoji}</span>
              </CardTitle>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {format(new Date(entry.date), "PPPP")}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/journal/entries/${entry.id}/edit`}>
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-700 dark:text-amber-400"
                >
                  <EditIcon className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-700 dark:text-red-400"
                  >
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your journal entry.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="prose dark:prose-invert prose-amber max-w-none"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />

          {entry.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-amber-200 dark:border-amber-800 pt-4 mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {format(new Date(entry.updatedAt), "PPP 'at' p")}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
