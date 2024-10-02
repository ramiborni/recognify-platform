/*
  Warnings:

  - The values [THANK] on the enum `RecognationReaction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecognationReaction_new" AS ENUM ('LIKE', 'LOVE', 'CLAP', 'WOW');
ALTER TABLE "Recognition" ALTER COLUMN "reactions" TYPE "RecognationReaction_new"[] USING ("reactions"::text::"RecognationReaction_new"[]);
ALTER TYPE "RecognationReaction" RENAME TO "RecognationReaction_old";
ALTER TYPE "RecognationReaction_new" RENAME TO "RecognationReaction";
DROP TYPE "RecognationReaction_old";
COMMIT;
