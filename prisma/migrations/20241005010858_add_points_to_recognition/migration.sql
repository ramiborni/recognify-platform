/*
  Warnings:

  - Added the required column `points` to the `Recognition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recognition" ADD COLUMN     "points" INTEGER NOT NULL;
