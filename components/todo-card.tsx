"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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

type TodoCardProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
};

export default function TodoCard({
  todo,
  onDelete,
  onStatusChange,
}: TodoCardProps) {
  const [isCompleted, setIsCompleted] = useState(todo.status === "COMPLETED");

  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked);
    const newStatus = checked ? "COMPLETED" : "PENDING";
    onStatusChange(todo.id, newStatus);
  };

  return (
    <Card className="bg-slate-950 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-josefin-700 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent flex items-center justify-between">
          {todo.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent">
          {todo.content || "No description"}
        </CardDescription>
        <p className="text-sm bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent mt-2">
          Priority: {todo.priority}
        </p>
        <p className="text-sm bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent">
          Status: {todo.status}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={isCompleted}
            onCheckedChange={handleCheckboxChange}
            className="border-amber-500 focus:ring-amber-500"
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className="text-sm font-josefin-700 leading-none peer-disabled:cursor-not-allowed bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent"
          >
            Complete
          </label>
        </div>
        <div className="flex space-x-2">
          <Link href={`/todos/${todo.id}`}>
            <Button
              size="sm"
              variant="outline"
              className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 hover:bg-amber-500"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
