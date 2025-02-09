import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Sesuaikan path Prisma client

export async function POST(req) {
  try {
    // Pastikan request memiliki JSON yang valid
    const body = await req.json();
    const { nis, password } = body;

    if (!nis || !password) {
      return NextResponse.json(
        { message: "NIS dan password harus diisi" },
        { status: 400 }
      );
    }

    // Konversi NIS ke BigInt (karena bisa disimpan sebagai angka besar)
    const nisBigInt = BigInt(nis);

    // Cari student berdasarkan NIS
    const student = await prisma.students.findUnique({
      where: { nis: nisBigInt },
      include: { role: true, teacher: true, class_name: true },
    });

    if (!student) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Validasi password (tanpa hashing)
    if (student.password !== password) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // Tentukan role berdasarkan role_id
    let role = "student";
    if (student.role_id === BigInt(1)) role = "admin";
    else if (student.role_id === BigInt(3)) role = "siswa";

    // Pastikan JWT_SECRET tersedia
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET tidak ditemukan di environment variables.");
      return NextResponse.json(
        { message: "Konfigurasi server bermasalah" },
        { status: 500 }
      );
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        id: student.nis.toString(),
        name: student.name,
        role: student.role_id.toString() || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Simpan token di cookie
    const response = NextResponse.json({
      message: "Login berhasil",
      student: {
        nis: student.nis.toString(),
        name: student.name,
        class_name: student.class_name_id.toString(),
        teacher_name: student.teacher ? student.teacher.name : null,
        role_id: student.role_id.toString(),
      },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Hanya secure di production
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error Internal Server:", error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
