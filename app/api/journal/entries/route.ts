import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const entries = await prisma.journal.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      include: {
        tags: true,
      },
    });

    // Transform the data to include tag names as strings
    const transformedEntries = entries.map((entry: any) => ({
      ...entry,
      tags: entry.tags.map((tag: any) => tag.name),
    }));

    return NextResponse.json({ entries: transformedEntries });
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}
