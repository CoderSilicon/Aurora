"use client";

import { useEffect, useState } from "react";
import TodoCard from "./todo-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Todo = {
  id: string;
  title: string;
  content: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
        setFilteredTodos(data);
      } catch (err) {
        setError("Failed to load todos. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (priorityFilter === "ALL") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(
        todos.filter((todo) => todo.priority === priorityFilter)
      );
    }
  }, [priorityFilter, todos]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo status");
      }

      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError("Failed to update todo status. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 bg-slate-860 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 josefin-700">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-48">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="bg-white border-amber-200 focus:ring-amber-500">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Priorities</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between mt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-amber-800 text-lg mb-6">
            {priorityFilter !== "ALL"
              ? `No ${priorityFilter.toLowerCase()} priority todos found`
              : "No todos found. Create your first todo!"}
          </p>
          <Link href="/todos/new">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Todo
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
