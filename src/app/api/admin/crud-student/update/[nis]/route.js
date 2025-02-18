import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  try {
    const { nis } = params; // Ambil NIS dari params
    const data = await req.json(); // Ambil data dari request body

    // Validasi data tidak boleh kosong
    if (!data.name || !data.class_name_id || !data.teacher_nip || !data.generation_year) {
      return NextResponse.json({ success: false, message: "Semua field harus diisi" }, { status: 400 });
    }

    // Validasi NIS harus angka
    if (!/^\d+$/.test(nis) || !/^\d+$/.test(data.nis)) {
      return NextResponse.json({ success: false, message: "NIS harus berupa angka" }, { status: 400 });
    }

    const nisInt = BigInt(nis);
    const newNisInt = BigInt(data.nis);

    // Validasi nama hanya boleh berisi huruf dan spasi
    if (!/^[A-Za-z\s]+$/.test(data.name)) {
      return NextResponse.json({ success: false, message: "Nama hanya boleh berisi huruf" }, { status: 400 });
    }

    // Pastikan siswa dengan NIS saat ini ada
    const existingStudent = await prisma.students.findUnique({
      where: { nis: nisInt },
    });

    if (!existingStudent) {
      return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });
    }

    // Validasi NIS baru tidak boleh digunakan oleh siswa lain
    if (nisInt !== newNisInt) {
      const nisExists = await prisma.students.findUnique({
        where: { nis: newNisInt },
      });

      if (nisExists) {
        return NextResponse.json({ success: false, message: "NIS sudah digunakan oleh siswa lain" }, { status: 400 });
      }
    }

    // Update siswa di database
    const updatedStudent = await prisma.students.update({
      where: { nis: nisInt },
      data: {
        ...data,
        nis: newNisInt, // Pastikan NIS tetap dalam format BigInt
      },
    });

    // Konversi BigInt ke String sebelum dikirim ke frontend
    const serializedStudent = {
      ...updatedStudent,
      nis: updatedStudent.nis.toString(),
      class_name_id: updatedStudent.class_name_id.toString(),
      teacher_nip: updatedStudent.teacher_nip.toString(),
      generation_year: updatedStudent.generation_year.toString(),
      role_id: updatedStudent.role_id.toString(),
    };

    return NextResponse.json({
      success: true,
      message: "Data berhasil diperbarui",
      student: serializedStudent,
    });
  } catch (error) {
    console.error("❌ Error Prisma:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Kesalahan database: " + error.message,
      },
      { status: 500 }
    );
  }
}
