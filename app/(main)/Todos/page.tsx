import TodoList from "@/components/todo-list";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function TodosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-amber-900">My Todos</h1>
          <Link href="/todos/new">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Todo
            </Button>
          </Link>
        </div>
        <TodoList />
      </div>
    </div>
  );
}
