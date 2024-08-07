import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const image = data.get("image") as File;
    const title = data.get("title") as string;
    const time = data.get("timeEvent") as string;
    const description = data.get("description") as string;
    const about = data.get("about") as string;
    const key1 = data.get("key1") as string;
    const key2 = data.get("key2") as string;
    const category = data.get("categoryEvent") as string;

    let imageUrl = null;

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Decode base64 image data to binary buffer
    const imageBuffer = Buffer.from(base64, "base64");

    // Define file path and name for the PNG image
    const fileName = `${Date.now()}.png`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write the binary buffer to a PNG image file
    fs.writeFileSync(filePath, imageBuffer);
    imageUrl = `/uploads/${fileName}`;

    const res = await prisma.event.create({
      data: {
        title,
        img: imageUrl,
        category,
        time,
        status: 'ongoing',
        about,
        description,
        keyEvent: [key1, key2],
      },
    });

    if (!res) {
      return NextResponse.json({ message: "Failed add event", status: 500 });
    }

    return NextResponse.json({ message: "Success add event", status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const event = await prisma.event.findMany({
      where:{
        status:'ongoing'
      }
    });
    const pastEvent = await prisma.event.findMany({
      where:{
        status:'done'
      }
    })

    if (!event) throw new Error(`Could not find event`);

    const data ={
      event,
      pastEvent
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
