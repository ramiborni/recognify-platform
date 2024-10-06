/*
  Warnings:

  - You are about to drop the column `response` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `responses` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `questions` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "response",
ADD COLUMN     "responses" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "questions",
ADD COLUMN     "questions" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "SurveyTeamMember" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyTeamMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyTeamMember" ADD CONSTRAINT "SurveyTeamMember_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyTeamMember" ADD CONSTRAINT "SurveyTeamMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
