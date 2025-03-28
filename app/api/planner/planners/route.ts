import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const planners = await prisma.planner.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        events: true,
      },
    });

    return NextResponse.json(planners);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch planners" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, startDate, endDate, type } = body;

    const planner = await prisma.planner.create({
      data: {
        title,
        startDate,
        endDate,
        type,
        userId: session.user.id,
      },
    });

    return NextResponse.json(planner);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create planner" },
      { status: 500 }
    );
  }
}
