import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const taskId = await params.id;

    const task = await prisma.kanbanTodo.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({
      task: {
        id: task.id,
        title: task.title,
        content: task.content,
        priority: task.priority,
        status: task.status,
        mood: task.mood,
        dueDate: task.dueDate?.toISOString(),
        tags: task.tags,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const taskId = params.id;
    const body = await request.json();

    // First, check if the task exists and belongs to the user
    const existingTask = await prisma.kanbanTodo.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (existingTask.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update the task
    const updatedTask = await prisma.kanbanTodo.update({
      where: {
        id: taskId,
      },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        content: body.content !== undefined ? body.content : undefined,
        priority: body.priority !== undefined ? body.priority : undefined,
        status: body.status !== undefined ? body.status : undefined,
        mood: body.mood !== undefined ? body.mood : undefined,
        dueDate:
          body.dueDate !== undefined
            ? body.dueDate
              ? new Date(body.dueDate)
              : null
            : undefined,
        tags: body.tags !== undefined ? body.tags : undefined,
      },
    });

    return NextResponse.json({
      task: {
        id: updatedTask.id,
        title: updatedTask.title,
        content: updatedTask.content,
        priority: updatedTask.priority,
        status: updatedTask.status,
        mood: updatedTask.mood,
        dueDate: updatedTask.dueDate?.toISOString(),
        tags: updatedTask.tags,
        createdAt: updatedTask.createdAt.toISOString(),
        updatedAt: updatedTask.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const taskId = params.id;

    // First, check if the task exists and belongs to the user
    const existingTask = await prisma.kanbanTodo.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (existingTask.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete the task
    await prisma.kanbanTodo.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
