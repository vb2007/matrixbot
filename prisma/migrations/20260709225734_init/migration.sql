-- CreateTable
CREATE TABLE "Economy" (
    "username" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "firstInteractionTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Economy_username_key" ON "Economy"("username");
