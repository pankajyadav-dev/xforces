/*
  Warnings:

  - Added the required column `problemid` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "problemid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemid_fkey" FOREIGN KEY ("problemid") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
