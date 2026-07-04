import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Template from "@/models/Template";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

export async function GET() {
  await connectDB();

  const templates = await Template.find().sort({
    createdAt: -1,
  });

  return NextResponse.json({
    success: true,
    templates,
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;

    const description = formData.get("description") as string;

    const category = formData.get("category") as string;

    let filePath = "";

    const file = formData.get("file") as File;

    if (file) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "templates",
      );

      await mkdir(uploadDir, {
        recursive: true,
      });

      const fileName = `${Date.now()}_${file.name}`;

      await writeFile(path.join(uploadDir, fileName), buffer);

      filePath = `/uploads/templates/${fileName}`;
    }

    const template = await Template.create({
      title,
      description,
      category,
      file: filePath,
    });

    return NextResponse.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
