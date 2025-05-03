-- CreateEnum
CREATE TYPE "Status" AS ENUM ('New', 'InProgress', 'Completed', 'Canceled');

-- CreateTable
CREATE TABLE "appeals" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'New',
    "solution" TEXT,
    "cancelReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "takenAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),

    CONSTRAINT "appeals_pkey" PRIMARY KEY ("id")
);
