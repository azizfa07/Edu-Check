import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { nis } = params;
  const body = await req.json(); // Ambil data dari body request
  const { inputNis } = body; // NIS yang dimasukkan pengguna untuk konfirmasi

  try {
    if (!inputNis || parseInt(inputNis) !== parseInt(nis)) {
      return NextResponse.json(
        { error: "NIS tidak cocok." },
        { status: 400 }
      );
    }

    const student = await prisma.students.findUnique({
      where: { nis: parseInt(nis) },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Data siswa tidak ditemukan." },
        { status: 404 }
      );
    }

    await prisma.students.delete({
      where: { nis: parseInt(nis) },
    });

    return NextResponse.json(
      { message: "Data siswa berhasil dihapus." },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus data siswa.", details: error.message },
      { status: 500 }
    );
  }
}
