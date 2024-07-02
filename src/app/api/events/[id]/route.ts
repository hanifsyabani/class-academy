import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  rea: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
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
    const isPast = data.get("isPast") as string;


  } catch (error) {
    
  }
}
