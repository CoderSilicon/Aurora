/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KanbanTodo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MindMap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Planner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Research` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Thought` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_plannerId_fkey";

-- DropForeignKey
ALTER TABLE "Planner" DROP CONSTRAINT "Planner_userId_fkey";

-- DropForeignKey
ALTER TABLE "Research" DROP CONSTRAINT "Research_userId_fkey";

-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_researchId_fkey";

-- DropForeignKey
ALTER TABLE "Thought" DROP CONSTRAINT "Thought_userId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPaid" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "KanbanTodo";

-- DropTable
DROP TABLE "MindMap";

-- DropTable
DROP TABLE "Planner";

-- DropTable
DROP TABLE "Research";

-- DropTable
DROP TABLE "Source";

-- DropTable
DROP TABLE "Thought";

-- DropTable
DROP TABLE "Todo";

-- DropEnum
DROP TYPE "CollectionType";

-- DropEnum
DROP TYPE "PlanType";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "Status";
