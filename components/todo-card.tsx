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
    <Card className="bg-white border-amber-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-amber-900 flex items-center justify-between">
          {todo.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-amber-700">
          {todo.content || "No description"}
        </CardDescription>
        <p className="text-sm text-amber-600 mt-2">Priority: {todo.priority}</p>
        <p className="text-sm text-amber-600">Status: {todo.status}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={isCompleted}
            onCheckedChange={handleCheckboxChange}
            className="border-amber-300 focus:ring-amber-500"
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-amber-800"
          >
            Complete
          </label>
        </div>
        <div className="flex space-x-2">
          <Link href={`/todos/${todo.id}`}>
            <Button
              size="sm"
              variant="outline"
              className="text-amber-700 hover:bg-amber-100"
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
