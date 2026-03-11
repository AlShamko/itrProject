-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'AUTHOR');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "logtoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_items" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 0,
    "creatorId" INTEGER NOT NULL,
    "customString1Name" TEXT,
    "customString1State" BOOLEAN NOT NULL DEFAULT false,
    "customString2Name" TEXT,
    "customString2State" BOOLEAN NOT NULL DEFAULT false,
    "customString3Name" TEXT,
    "customString3State" BOOLEAN NOT NULL DEFAULT false,
    "customInt1Name" TEXT,
    "customInt1State" BOOLEAN NOT NULL DEFAULT false,
    "customInt2Name" TEXT,
    "customInt2State" BOOLEAN NOT NULL DEFAULT false,
    "customInt3Name" TEXT,
    "customInt3State" BOOLEAN NOT NULL DEFAULT false,
    "customBool1Name" TEXT,
    "customBool1State" BOOLEAN NOT NULL DEFAULT false,
    "customBool2Name" TEXT,
    "customBool2State" BOOLEAN NOT NULL DEFAULT false,
    "customBool3Name" TEXT,
    "customBool3State" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_logtoId_key" ON "users"("logtoId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
