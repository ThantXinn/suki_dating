/*
  Warnings:

  - The primary key for the `sukiUserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sukiUserProfile` table. All the data in the column will be lost.
  - The `bodyHeightCategory` column on the `sukiUserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `userProfileId` on table `sukiUserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "sukiUserProfile" DROP CONSTRAINT "sukiUserProfile_userProfileId_fkey";

-- AlterTable
ALTER TABLE "sukiUserProfile" DROP CONSTRAINT "sukiUserProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "offDayActivity" SET DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "bodyHeightCategory",
ADD COLUMN     "bodyHeightCategory" INTEGER,
ALTER COLUMN "personTypeCategory" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "userProfileId" SET NOT NULL,
ADD CONSTRAINT "sukiUserProfile_pkey" PRIMARY KEY ("userProfileId");

-- AddForeignKey
ALTER TABLE "sukiUserProfile" ADD CONSTRAINT "sukiUserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
