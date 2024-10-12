-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isLTD" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripePlan" TEXT;
