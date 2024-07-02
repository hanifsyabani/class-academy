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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const {id} = params;

    const studentById = await prisma.student.findFirst({
      where:{
        id: Number(id)
      }
    })

    if(!studentById) return NextResponse.json({message:"Student not found", status: 404})

    return NextResponse.json(studentById, {status: 200})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {
    const {id} = params;

    const { Designation, fullName, email, gender, nik, classes, phone, password} = await req.json();

    const student = await prisma.student.update({
      where:{
        id: Number(id)
      },
      data:{
        Designation,
        fullName,
        email,
        gender,
        phone,
        password,
        nik,
        class: classes
      }
    });

    if(!student) return NextResponse.json({message:"Failed to update", status: 404});

    return NextResponse.json({status: 200})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}