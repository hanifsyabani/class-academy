import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {
    const {id} = params;

    const teacherById = await prisma.teacher.findFirst({
      where:{
        id: Number(id)
      }
    })

    if(!teacherById || !teacherById.class){
      return NextResponse.json({message:"Teacher not found", status: 404})
    }

    const studentByTeacher = await prisma.student.findMany({
      where:{
        class: teacherById.class
      }
    })

    if(!studentByTeacher){
      return NextResponse.json({message:"Student not found", status: 404})
    }

    return NextResponse.json(studentByTeacher, {status: 200})
    
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({message:error.message, status: 500})
    }
  }
}