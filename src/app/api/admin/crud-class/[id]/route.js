import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET CLASS BY ID
export async function GET(req, { params }) {
  try {
    const classId = parseInt(params.id);

    if (isNaN(classId)) {
      return NextResponse.json({ error: "Invalid class ID" }, { status: 400 });
    }

    const classData = await prisma.class_name.findUnique({
      where: { id: classId },
      include: {
        students: true,
        teachers: true,
      },
    });

    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(classData);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// UPDATE CLASS
export async function PUT(req, { params }) {
  try {
    const classId = parseInt(params.id);
    const { class: classNumber, code } = await req.json();

    if (isNaN(classId)) {
      return NextResponse.json({ error: "Invalid class ID" }, { status: 400 });
    }

    const updatedClass = await prisma.class_name.update({
      where: { id: classId },
      data: {
        class: classNumber,
        code,
      },
    });

    return NextResponse.json(updatedClass);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE CLASS
export async function DELETE(req, { params }) {
  try {
    const classId = parseInt(params.id);

    if (isNaN(classId)) {
      return NextResponse.json({ error: "Invalid class ID" }, { status: 400 });
    }

    await prisma.class_name.delete({ where: { id: classId } });

    return NextResponse.json({ message: "Class deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
