/*
  Warnings:

  - You are about to drop the column `senderId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `unread` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "senderId",
DROP COLUMN "unread",
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSent" BOOLEAN NOT NULL DEFAULT true;
