-- CreateTable
CREATE TABLE "safeNotes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "safeNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cardHolderName" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "safeNotes_title_userId_key" ON "safeNotes"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_title_userId_key" ON "Cards"("title", "userId");

-- AddForeignKey
ALTER TABLE "safeNotes" ADD CONSTRAINT "safeNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
