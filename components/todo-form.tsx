"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type TodoFormProps = {
  id?: string;
};

type Todo = {
  id: string;
  title: string;
  content: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
};

export default function TodoForm({ id }: TodoFormProps) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    content: "",
    priority: "MEDIUM",
    status: "PENDING",
  });
  const [loading, setLoading] = useState(id ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/todos/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch todo");
          }
          const data = await response.json();
          setTodo(data);
        } catch (err) {
          setError("Failed to load todo. Please try again later.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTodo();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value: string) => {
    setTodo((prev) => ({
      ...prev,
      priority: value as "LOW" | "MEDIUM" | "HIGH",
    }));
  };

  const handleStatusChange = (value: string) => {
    setTodo((prev) => ({
      ...prev,
      status: value as "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      if (!todo.title.trim()) {
        throw new Error("Title is required");
      }

      const url = id ? `/api/todos/${id}` : "/api/todos";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to ${id ? "update" : "create"} todo`
        );
      }

      setSuccess(`Todo ${id ? "updated" : "created"} successfully!`);

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/todos");
        router.refresh();
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          `Failed to ${id ? "update" : "create"} todo. Please try again.`
        );
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-slate-950 text-scheme"
    >
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title" className="text-amber-900">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={todo.title}
          onChange={handleChange}
          placeholder="Enter todo title"
          className="border-amber-200 focus:ring-amber-500"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-amber-900">
          Description
        </Label>
        <Textarea
          id="content"
          name="content"
          value={todo.content}
          onChange={handleChange}
          placeholder="Enter todo description"
          className="min-h-32 border-amber-200 focus:ring-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-amber-900">Priority</Label>
        <RadioGroup
          value={todo.priority}
          onValueChange={handlePriorityChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="LOW" id="low" className="text-green-600" />
            <Label htmlFor="low" className="text-green-800">
              Low
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="MEDIUM"
              id="medium"
              className="text-amber-600"
            />
            <Label htmlFor="medium" className="text-amber-800">
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="HIGH" id="high" className="text-red-600" />
            <Label htmlFor="high" className="text-red-800">
              High
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-amber-900">Status</Label>
        <RadioGroup
          value={todo.status}
          onValueChange={handleStatusChange}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="PENDING"
              id="pending"
              className="text-amber-600"
            />
            <Label htmlFor="pending" className="text-amber-800">
              Pending
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="IN_PROGRESS"
              id="in-progress"
              className="text-blue-600"
            />
            <Label htmlFor="in-progress" className="text-blue-800">
              In Progress
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="COMPLETED"
              id="completed"
              className="text-green-600"
            />
            <Label htmlFor="completed" className="text-green-800">
              Completed
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="CANCELLED"
              id="cancelled"
              className="text-gray-600"
            />
            <Label htmlFor="cancelled" className="text-gray-800">
              Cancelled
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white w-full py-6 text-lg"
        disabled={submitting}
      >
        {submitting
          ? id
            ? "Updating..."
            : "Creating..."
          : id
            ? "Update Todo"
            : "Create Todo"}
      </Button>
    </form>
  );
}
