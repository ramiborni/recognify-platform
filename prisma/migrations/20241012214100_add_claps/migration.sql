/*
  Warnings:

  - You are about to drop the column `reactions` on the `Recognition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recognition" DROP COLUMN "reactions";

-- DropEnum
DROP TYPE "RecognationReaction";

-- CreateTable
CREATE TABLE "Clap" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "recognitionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clap_userId_recognitionId_key" ON "Clap"("userId", "recognitionId");

-- AddForeignKey
ALTER TABLE "Clap" ADD CONSTRAINT "Clap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clap" ADD CONSTRAINT "Clap_recognitionId_fkey" FOREIGN KEY ("recognitionId") REFERENCES "Recognition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
