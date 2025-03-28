/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Draft` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Planner` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Research` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Thought` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Draft` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `mood` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('HAPPY', 'SAD', 'REFLECTIVE', 'EXCITED', 'ANGRY', 'CALM', 'ANXIOUS');

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Planner" DROP CONSTRAINT "Planner_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Research" DROP CONSTRAINT "Research_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "TaskItem" DROP CONSTRAINT "TaskItem_taskListId_fkey";

-- DropForeignKey
ALTER TABLE "TaskList" DROP CONSTRAINT "TaskList_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "TaskList" DROP CONSTRAINT "TaskList_userId_fkey";

-- DropForeignKey
ALTER TABLE "Thought" DROP CONSTRAINT "Thought_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_collectionId_fkey";

-- AlterTable
ALTER TABLE "Draft" DROP COLUMN "collectionId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "collectionId",
DROP COLUMN "mood",
ADD COLUMN     "mood" "Mood" NOT NULL;

-- AlterTable
ALTER TABLE "Planner" DROP COLUMN "collectionId";

-- AlterTable
ALTER TABLE "Research" DROP COLUMN "collectionId";

-- AlterTable
ALTER TABLE "Thought" DROP COLUMN "collectionId";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "collectionId";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "TaskItem";

-- DropTable
DROP TABLE "TaskList";

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "moodScore" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JournalToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JournalToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_JournalToTag_B_index" ON "_JournalToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_userId_key" ON "Entry"("userId");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JournalToTag" ADD CONSTRAINT "_JournalToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JournalToTag" ADD CONSTRAINT "_JournalToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
