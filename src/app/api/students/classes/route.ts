import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const allclass10 = ["10 IPA 1", "10 IPA 2", "10 IPA 3", "10 IPA 4", "10 IPS 1", "10 IPS 2", "10 IPS 3"]
    const allclass11 = ["11 IPA 1", "11 IPA 2", "11 IPA 3", "11 IPA 4", "11 IPS 1", "11 IPS 2", "11 IPS 3"]
    const allclass12 = ["12 IPA 1", "12 IPA 2", "12 IPA 3", "12 IPA 4", "12 IPS 1", "12 IPS 2", "12 IPS 3"]

    const class10 = await prisma.student.findMany({
      where:{
        class:{
          in: allclass10
        }
      }
    })

    const class11 = await prisma.student.findMany({
      where:{
        class:{
          in: allclass11
        }
      }
    })

    const class12 = await prisma.student.findMany({
      where:{
        class:{
          in: allclass12
        }
      }
    })

    const dataClass={
      class10,
      class11,
      class12
    }


    if(!class10) return NextResponse.json({message: "No Students found"}, {status: 500});

    return NextResponse.json(dataClass, {status: 200})
  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}