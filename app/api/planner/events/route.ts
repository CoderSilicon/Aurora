import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, startTime, endTime, plannerId } = body;

    // Create event in database
    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime,
        endTime,
        plannerId,
      },
    });

    // Sync with Google Calendar
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: session.accessToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: title,
        description,
        start: {
          dateTime: startTime,
        },
        end: {
          dateTime: endTime,
        },
        reminders: {
          useDefault: true,
        },
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const plannerId = searchParams.get("plannerId");

  try {
    const events = await prisma.event.findMany({
      where: {
        plannerId: plannerId!,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
