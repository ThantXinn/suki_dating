/*
  Warnings:

  - The primary key for the `sukiUserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `sukiUserProfile` table. All the data in the column will be lost.
  - The required column `id` was added to the `sukiUserProfile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "sukiUserProfile" DROP CONSTRAINT "sukiUserProfile_pkey",
DROP COLUMN "profileId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "sukiUserProfile_pkey" PRIMARY KEY ("id");
