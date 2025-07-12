/*
  Warnings:

  - Added the required column `contactedUserId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "contactedUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contactedUserId_fkey" FOREIGN KEY ("contactedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
