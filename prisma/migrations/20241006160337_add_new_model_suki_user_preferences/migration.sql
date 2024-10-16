-- CreateTable
CREATE TABLE "sukiUserPreferences" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT,
    "userHobbies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userIntrests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userValues" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "sukiUserPreferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sukiUserPreferences" ADD CONSTRAINT "sukiUserPreferences_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "sukiUserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
