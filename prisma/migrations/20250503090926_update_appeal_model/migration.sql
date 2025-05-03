/*
  Warnings:

  - You are about to drop the column `cancelReason` on the `appeals` table. All the data in the column will be lost.
  - You are about to drop the column `canceledAt` on the `appeals` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `appeals` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `appeals` table. All the data in the column will be lost.
  - You are about to drop the column `takenAt` on the `appeals` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `appeals` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `appeals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appeals" DROP COLUMN "cancelReason",
DROP COLUMN "canceledAt",
DROP COLUMN "completedAt",
DROP COLUMN "createdAt",
DROP COLUMN "takenAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "cancel_reason" TEXT,
ADD COLUMN     "canceled_at" TIMESTAMP(3),
ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "taken_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
