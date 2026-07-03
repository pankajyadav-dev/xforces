/*
  Warnings:

  - Added the required column `headercode` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maincode` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "headercode" TEXT NOT NULL,
ADD COLUMN     "maincode" TEXT NOT NULL;
