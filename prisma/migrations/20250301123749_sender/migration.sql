/*
  Warnings:

  - You are about to drop the column `contactId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `isSent` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_contactId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "contactId",
DROP COLUMN "isSent",
ADD COLUMN     "senderId" INTEGER,
ADD COLUMN     "sentToId" INTEGER;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sentToId_fkey" FOREIGN KEY ("sentToId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
