/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `sukiUserPreferences` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sukiUserPreferences" DROP CONSTRAINT "sukiUserPreferences_userProfileId_fkey";

-- AlterTable
ALTER TABLE "sukiUserPreferences" DROP COLUMN "userProfileId",
ADD COLUMN     "sukiUserProfileId" TEXT;

-- AddForeignKey
ALTER TABLE "sukiUserPreferences" ADD CONSTRAINT "sukiUserPreferences_sukiUserProfileId_fkey" FOREIGN KEY ("sukiUserProfileId") REFERENCES "sukiUserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
