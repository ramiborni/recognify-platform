/*
  Warnings:

  - You are about to drop the `SurveyTeamMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SurveyTeamMember" DROP CONSTRAINT "SurveyTeamMember_memberId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyTeamMember" DROP CONSTRAINT "SurveyTeamMember_surveyId_fkey";

-- DropTable
DROP TABLE "SurveyTeamMember";

-- CreateTable
CREATE TABLE "_SurveyToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SurveyToUser_AB_unique" ON "_SurveyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SurveyToUser_B_index" ON "_SurveyToUser"("B");

-- AddForeignKey
ALTER TABLE "_SurveyToUser" ADD CONSTRAINT "_SurveyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SurveyToUser" ADD CONSTRAINT "_SurveyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
