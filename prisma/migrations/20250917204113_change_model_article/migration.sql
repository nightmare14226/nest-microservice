/*
  Warnings:

  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "content" TEXT NOT NULL;
