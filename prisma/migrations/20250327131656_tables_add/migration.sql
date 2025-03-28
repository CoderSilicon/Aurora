/*
  Warnings:

  - Added the required column `mood` to the `Draft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Draft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
