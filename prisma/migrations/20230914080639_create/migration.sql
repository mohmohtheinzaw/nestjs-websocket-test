/*
  Warnings:

  - Added the required column `receiverId` to the `userMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userMessage" ADD COLUMN     "receiverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "userMessage" ADD CONSTRAINT "userMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
