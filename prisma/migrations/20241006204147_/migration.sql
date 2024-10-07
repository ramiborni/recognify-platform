/*
  Warnings:

  - The `responses` column on the `Feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `questions` column on the `Survey` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "responses",
ADD COLUMN     "responses" JSONB[];

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "questions",
ADD COLUMN     "questions" JSONB[];
