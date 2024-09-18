-- AlterTable
ALTER TABLE "user" ADD COLUMN     "acceptrules" BOOLEAN DEFAULT false,
ADD COLUMN     "bdday" INTEGER,
ADD COLUMN     "bdmonth" INTEGER,
ADD COLUMN     "bgyear" INTEGER,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "overeightenn" BOOLEAN DEFAULT false;
