-- AlterTable
ALTER TABLE "Economy" ADD CONSTRAINT "Economy_pkey" PRIMARY KEY ("username");

-- CreateTable
CREATE TABLE "EconomyActionTimes" (
    "username" TEXT NOT NULL,
    "lastWorkTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EconomyActionTimes_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "EconomyActionTimes_username_key" ON "EconomyActionTimes"("username");

-- AddForeignKey
ALTER TABLE "EconomyActionTimes" ADD CONSTRAINT "EconomyActionTimes_username_fkey" FOREIGN KEY ("username") REFERENCES "Economy"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
