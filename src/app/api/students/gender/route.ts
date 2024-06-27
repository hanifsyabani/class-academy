import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const maleStudent = await prisma.student.findMany({
      where: {
        gender: "Male",
      },
    });

    const femaleStudent = await prisma.student.findMany({
      where: {
        gender: "Female",
      },
    });

    if (!maleStudent || !femaleStudent)
      return NextResponse.json(
        { message: "No Students found" },
        { status: 500 }
      );

    const dataGender = {
      male: maleStudent,
      female: femaleStudent,
    };
    return NextResponse.json(dataGender, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
