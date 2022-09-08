/*
  Warnings:

  - Changed the type of `type` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "cardTypes" AS ENUM ('credit', 'debit', 'both');

-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "type",
ADD COLUMN     "type" "cardTypes" NOT NULL;
