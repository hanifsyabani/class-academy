/*
  Warnings:

  - Added the required column `about` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyEvent` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "keyEvent" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Speaker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "eventID" INTEGER,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faciliator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "eventID" INTEGER,

    CONSTRAINT "Faciliator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faciliator" ADD CONSTRAINT "Faciliator_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
