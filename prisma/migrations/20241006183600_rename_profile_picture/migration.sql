/*
  Warnings:

  - You are about to drop the column `profilePicute` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicute",
ADD COLUMN     "profilePicture" TEXT;
