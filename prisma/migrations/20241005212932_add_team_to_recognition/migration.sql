/*
  Warnings:

  - Added the required column `teamId` to the `Recognition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recognition" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isTeamLeader" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Recognition" ADD CONSTRAINT "Recognition_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
