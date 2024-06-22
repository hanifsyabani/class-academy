import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const student = await prisma.teacher.delete({
      where: {
        id: Number(id),
      },
    });

    if (!student) {
      return NextResponse.json({ message: "Student not found", status: 404 });
    }

    return NextResponse.json({ message: "Student deleted", status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const teacher = await prisma.teacher.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!teacher)
      return NextResponse.json({ message: "Teacher not found", status: 404 });

    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.formData();
    const image = data.get("image") as File;
    const about = data.get("about") as string;
    const { id } = params;
    let imageUrl = null;

    if (image) {
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
    }

    const updateData : {image? : string, about? : string} = {};
    if(imageUrl) updateData.image = imageUrl;
    if(about) updateData.about = about;

    const teacher = await prisma.teacher.update({
      where: {
        id: Number(id),
      },
      data: updateData
    });

    if (!teacher)
      return NextResponse.json({ message: "Update failed", status: 404 });

    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
