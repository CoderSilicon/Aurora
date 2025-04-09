import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await prisma.kanbanTodo.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Transform DB model to our front-end model
    const transformedTasks = tasks.map((task) => ({
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
    }));

    return NextResponse.json({ tasks: transformedTasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { title, content, priority, status, mood, dueDate, tags } = body;

    const task = await prisma.kanbanTodo.create({
      data: {
        title,
        content: content || "",
        priority: priority || "MEDIUM",
        status: status || "PENDING",
        mood: mood || "NEUTRAL",
        dueDate: dueDate ? new Date(dueDate) : null,
        tags: tags || [],
        userId: userId,
      },
    });

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
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
