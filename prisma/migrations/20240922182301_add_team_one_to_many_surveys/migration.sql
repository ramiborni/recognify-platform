/*
  Warnings:

  - Added the required column `teamId` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecognationReaction" AS ENUM ('LIKE', 'LOVE', 'CLAP', 'THANK');

-- CreateEnum
CREATE TYPE "RecognationBadges" AS ENUM ('STAR_PERFORMER', 'OUTSTANDING_ACHIEVEMENT', 'GREAT_TEAMWORK', 'INNOVATIVE_THINKER', 'CUSTOMER_FAVOURITE', 'LEADER');

-- AlterTable
ALTER TABLE "Recognition" ADD COLUMN     "badges" "RecognationBadges"[],
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reactions" "RecognationReaction"[];

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
