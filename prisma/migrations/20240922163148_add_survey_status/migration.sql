-- CreateEnum
CREATE TYPE "SurveyStatus" AS ENUM ('PENDING', 'ACTIVE', 'CLOSED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "status" "SurveyStatus" NOT NULL DEFAULT 'PENDING';
