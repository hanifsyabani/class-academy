import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  rea: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!event) throw new Error(`Could not find event`);
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {
    const data = await req.formData();
    const image = data.get("image") as File;
    const title = data.get("title") as string;
    const time = data.get("timeEvent") as string;
    const category = data.get("categoryEvent") as string;
    const status = data.get("status") as string;

    const event = await prisma.event.update({
      where:{
        id: Number(params.id)
      },
      data:{
        title,
        time,
        category,
        status,
      }
    });

    if(!event){
      return NextResponse.json({message:"Event not found", status: 404})
    }

    return NextResponse.json({message: "Event updated", status: 200})

  } catch (error) {
    if(error instanceof Error){
      return new Response(error.message, {status: 500})
    }
  }
}
