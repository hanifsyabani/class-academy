import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:  Request){
  try {
    const {Designation, fullName, email, gender, nik, classes, phone, password} = await req.json();

    if(!Designation || !fullName || !email || !gender || !nik || !classes){
      return new Response("Missing fields", {status: 400})
    }

    const studentExist = await prisma.student.findFirst({
      where:{
        fullName,
      }
    })

    const studentByEmail =  await prisma.student.findFirst({
      where:{
        email
      }
    })

    const studentByNik =  await prisma.student.findFirst({
      where:{
        nik
      }
    })
    
    if(studentByEmail){
      return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });
    }

    if(studentByNik){
      return new Response(JSON.stringify({ message: "Nik already exists" }), { status: 400 });
    }

    if(studentExist){
      return new Response(JSON.stringify({ message: "Name already exists" }), { status: 400 });
    }

    const student = await prisma.student.create({
      data:{
        Designation,
        fullName,
        email,
        gender,
        phone,
        password,
        nik,
        class: classes,
        role: 'students'
      }
    })

    if(!student) return new Response("Something went wrong", {status: 500})
     
    return NextResponse.json({status: 201})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}

export async function GET(){
  try {

    const student = await prisma.student.findMany();

    if(!student) return new Response(JSON.stringify({ message: "No Students found" }), { status: 404 });

    return NextResponse.json(student,{status: 200})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}