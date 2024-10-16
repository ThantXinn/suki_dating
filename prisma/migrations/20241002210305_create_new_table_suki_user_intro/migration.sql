-- CreateTable
CREATE TABLE "sukiUserIntro" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT,
    "title" TEXT DEFAULT '',
    "content" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sukiUserIntro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sukiUserIntro" ADD CONSTRAINT "sukiUserIntro_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "sukiUserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
