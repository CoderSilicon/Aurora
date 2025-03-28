/*
  Warnings:

  - Added the required column `mood` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moodScore` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "moodImageUrl" TEXT,
ADD COLUMN     "moodScore" INTEGER NOT NULL,
ALTER COLUMN "collectionId" DROP NOT NULL;
