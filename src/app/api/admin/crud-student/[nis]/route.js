import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Ambil data siswa berdasarkan NIS
export async function GET( { params } ) {
  try {
    const student = await prisma.students.findUnique({
      where: { nis: BigInt(params.nis) },
      include: { class_name: true, generation: true, teacher: true },
    });

    if (!student) {
      return NextResponse.json({ success: false, message: "Siswa tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update data siswa berdasarkan NIS
export async function PUT(req, { params } ) {
  try {
    const { name, password, class_name_id, teacher_nip, generation_year } = await req.json();

    const updatedStudent = await prisma.students.update({
      where: { nis: BigInt(params.nis) },
      data: { name, password, role_id, class_name_id, teacher_nip, generation_year },
    });

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE: Hapus siswa berdasarkan NIS
export async function DELETE({ params }) {
  try {
    await prisma.students.delete({ where: { nis: BigInt(params.nis) } });

    return NextResponse.json({ success: true, message: "Siswa berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
