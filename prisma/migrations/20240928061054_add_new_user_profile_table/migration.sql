-- CreateTable
CREATE TABLE "sukiUserProfile" (
    "id" TEXT NOT NULL,
    "jobCategory" TEXT,
    "offDayCategory" TEXT,
    "offDayActivity" TEXT[] DEFAULT ARRAY['default A', 'default B']::TEXT[],
    "livingCategory" TEXT,
    "bodyHeightCategory" TEXT,
    "bodyTypeCategory" TEXT,
    "smokingCategory" TEXT,
    "personTypeCategory" TEXT[] DEFAULT ARRAY['default A', 'default B', 'default C']::TEXT[],
    "incomeCategory" TEXT,
    "educationCategory" TEXT,
    "profilePhotoUrl" TEXT,
    "userProfileId" TEXT,

    CONSTRAINT "sukiUserProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sukiUserProfile" ADD CONSTRAINT "sukiUserProfile_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
