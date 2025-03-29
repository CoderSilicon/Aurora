import TodoForm from "@/components/todo-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditTodoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/todos">
            <Button
              variant="ghost"
              className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Todos
            </Button>
          </Link>
        </div>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-amber-900 mb-6">Edit Todo</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TodoForm id={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
