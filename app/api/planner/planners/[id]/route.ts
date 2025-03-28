import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const planner = await prisma.planner.findUnique({
      where: {
        id: params.id,
      },
      include: {
        events: true,
      },
    });

    if (!planner) {
      return NextResponse.json({ error: "Planner not found" }, { status: 404 });
    }

    if (planner.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(planner);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch planner" },
      { status: 500 }
    );
  }
}
