-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "Designation" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
