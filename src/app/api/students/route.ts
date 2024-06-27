import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:  Request){
  try {
    const {Designation, fullName, email, gender, nik, classes, phone, password} = await req.json();

    if(!Designation || !fullName || !email || !gender || !nik || !classes){
      return new Response("Missing fields", {status: 400})
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
        class: classes
      }
    })

    if(student){
      return NextResponse.json(student,{status: 200})
    }
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}

export async function GET(){
  try {

    const student = await prisma.student.findMany();

    if(!student) return NextResponse.json({message: "No Students found"}, {status: 500});

    return NextResponse.json(student,{status: 200})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}