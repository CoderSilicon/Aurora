/*
  Warnings:

  - Changed the type of `mood` on the `Journal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "Mood" ADD VALUE 'NEUTRAL';

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "mood",
ADD COLUMN     "mood" "Mood" NOT NULL;

-- CreateTable
CREATE TABLE "KanbanTodo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "mood" "Mood" DEFAULT 'HAPPY',
    "dueDate" TIMESTAMP(3),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "KanbanTodo_pkey" PRIMARY KEY ("id")
);
