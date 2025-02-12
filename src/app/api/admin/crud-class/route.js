import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// CREATE CLASS
export async function POST(req) {
  try {
    const body = await req.json();
    const { classNumber, code, generationYear } = body;

    // Validasi input tidak boleh kosong
    if (!classNumber || !code || !generationYear) {
      return NextResponse.json(
        { error: "Class, code, and generationYear are required" },
        { status: 400 }
      );
    }

    // Pastikan classNumber adalah angka
    if (typeof classNumber !== "number") {
      return NextResponse.json(
        { error: "Class number must be a number" },
        { status: 400 }
      );
    }

    // Validasi code: Harus berupa string dengan panjang 1 dan huruf kapital (A-Z)
    if (!/^[A-Z]$/.test(code)) {
      return NextResponse.json(
        { error: "Code must be a single uppercase letter (A-Z)" },
        { status: 400 }
      );
    }

    // Cek apakah generationYear yang diberikan ada di database
    const existingGeneration = await prisma.generations.findUnique({
      where: { generation_year: generationYear },
    });

    if (!existingGeneration) {
      return NextResponse.json(
        { error: "Generation Year does not exist" },
        { status: 404 }
      );
    }

    // Cek apakah kombinasi classNumber + code + generationYear sudah ada
    const existingClass = await prisma.class_name.findFirst({
      where: {
        class: classNumber,
        code: code,
        generation_year: generationYear,
      },
    });

    if (existingClass) {
      return NextResponse.json(
        { error: "Class with this code and generation already exists" },
        { status: 409 }
      );
    }

    // Jika semua validasi lolos, buat kelas baru
    const newClass = await prisma.class_name.create({
      data: {
        class: classNumber,
        code,
        generation_id: generationYear,
      },
    });

    return NextResponse.json(
      {
        ...newClass,
        id: newClass.id.toString(),
        class: newClass.class.toString(),
        generation_id: newClass.generation_id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// READ ALL CLASSES
export async function GET() {
  try {
    const classes = await prisma.class_name.findMany({
      include: {
        students: true,
        teachers: true,
      },
    });

    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
