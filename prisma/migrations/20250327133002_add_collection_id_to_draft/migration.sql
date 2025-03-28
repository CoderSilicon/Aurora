-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "collectionId" TEXT;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
