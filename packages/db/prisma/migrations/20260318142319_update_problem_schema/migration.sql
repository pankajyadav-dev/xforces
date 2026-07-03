/*
  Warnings:

  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_problemid_fkey";

-- DropTable
DROP TABLE "Questions";

-- CreateTable
CREATE TABLE "ProblemCode" (
    "id" SERIAL NOT NULL,
    "classcode" TEXT NOT NULL,
    "maincode" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "ProblemCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problems" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "timelimit" INTEGER NOT NULL,
    "memorylimit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProblemCode" ADD CONSTRAINT "ProblemCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemid_fkey" FOREIGN KEY ("problemid") REFERENCES "Problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
