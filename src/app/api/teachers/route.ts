import { prisma } from "@/lib/prisma";
import {  NextResponse } from "next/server";

export async function POST(req:  Request){
  try {
    const {Designation, fullName, email, gender, subject, classes, phone, password} = await req.json();

    if(!Designation || !fullName || !email || !gender || !subject || !classes){
      return new Response("Missing fields", {status: 400})
    }

    const teacher = await prisma.teacher.create({
      data:{
        Designation,
        fullName,
        email,
        gender,
        phone,
        password,
        subject,
        class: classes,
        role: "teachers"
      }
    })

    if(teacher){
      return NextResponse.json(teacher,{status: 200})
    }
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}

export async function GET(){
  try {

    const teacher = await prisma.teacher.findMany();

    if(!teacher) return NextResponse.json({message: "No teacher found"}, {status: 500});

    return NextResponse.json(teacher,{status: 200})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}