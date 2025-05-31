"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { Mood } from "@prisma/client";

export async function getJournalEntries() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return [];
  }

  return prisma.journal.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    include: {
      tags: true,
    },
  });
}

export async function getJournalEntryById(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return null;
  }

  return prisma.journal.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      tags: true,
    },
  });
}

export async function createJournalEntry(data: {
  title: string;
  content: string;
  mood: string;
  moodScore: number;
  date: string;
  tags: string[];
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Create the journal entry with tags
  const entry = await prisma.journal.create({
    data: {
      title: data.title,
      content: data.content,
      mood: data.mood as Mood,
      moodScore: data.moodScore,
      date: new Date(data.date),
      userId: user.id,
      tags: {
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      tags: true,
    },
  });

  // Clear any existing draft
  await prisma.draft.deleteMany({
    where: { userId: user.id },
  });

  revalidatePath("/journal/entries");
  return entry;
}

export async function updateJournalEntry(
  id: string,
  data: {
    title: string;
    content: string;
    mood: string;
    moodScore: number;
    date: string;
    tags: string[];
  }
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const entry = await prisma.journal.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      tags: true,
    },
  });

  if (!entry) {
    throw new Error("Entry not found");
  }

  // Disconnect all existing tags
  await prisma.journal.update({
    where: { id },
    data: {
      tags: {
        disconnect: entry.tags.map((tag: any) => ({ id: tag.id })),
      },
    },
  });

  // Update the entry with new tags
  const updatedEntry = await prisma.journal.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      mood: data.mood as Mood,
      moodScore: data.moodScore,
      date: new Date(data.date),
      tags: {
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      tags: true,
    },
  });

  revalidatePath(`/journal/entries/${id}`);
  revalidatePath("/journal/entries");

  return updatedEntry;
}

export async function deleteJournalEntry(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const entry = await prisma.journal.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!entry) {
    throw new Error("Entry not found");
  }

  await prisma.journal.delete({
    where: { id },
  });

  revalidatePath("/journal/entries");

  return { success: true };
}

export async function saveDraft(data: {
  title: string;
  content: string;
  mood: string;
  date: string;
  tags: string[];
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Upsert the draft (create or update)
  const draft = await prisma.draft.upsert({
    where: { userId: user.id },
    update: {
      title: data.title,
      content: data.content,
      mood: data.mood,
      date: new Date(data.date),
      tags: data.tags,
    },
    create: {
      title: data.title,
      content: data.content,
      mood: data.mood,
      date: new Date(data.date),
      tags: data.tags,
      userId: user.id,
    },
  });

  return draft;
}
