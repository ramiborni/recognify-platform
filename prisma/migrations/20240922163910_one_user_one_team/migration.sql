/*
  Warnings:

  - You are about to drop the column `leaderId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `_TeamToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_leaderId_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_B_fkey";

-- DropIndex
DROP INDEX "Team_leaderId_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "leaderId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTeamLeader" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "teamId" TEXT;

-- DropTable
DROP TABLE "_TeamToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
