import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req :Request, {params} : {params: {id: string}}) {
  try {
    const {id}= params;

    const student = await prisma.student.delete({
      where:{
        id : Number(id)
      }
    })

    if(!student){
      return NextResponse.json({message:"Student not found", status: 404})
    }

    return NextResponse.json({message: "Student deleted", status: 200})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}