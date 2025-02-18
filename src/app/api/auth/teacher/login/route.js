import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Sesuaikan path Prisma client

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Format JSON tidak valid" },
        { status: 400 }
      );
    }

    const { nip, password } = body;

    if (!nip || !password) {
      return NextResponse.json(
        { message: "NIP dan password harus diisi" },
        { status: 400 }
      );
    }

    let nipBigInt;
    try {
      nipBigInt = BigInt(nip);
    } catch (error) {
      return NextResponse.json(
        { message: "Format NIP tidak valid" },
        { status: 400 }
      );
    }

    let teacher;
    try {
      teacher = await prisma.teachers.findUnique({
        where: { nip: nipBigInt },
        include: { roles: true },
      });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { message: "Gagal mengakses database" },
        { status: 500 }
      );
    }

    if (!teacher) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Bandingkan password menggunakan bcrypt
    const passwordMatch = await bcrypt.compare(password, teacher.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    let role = "teacher";
    if (teacher.role_id === BigInt(1)) role = "admin";
    else if (teacher.role_id === BigInt(2)) role = "teacher";

    let token;
    try {
      token = jwt.sign(
        {
          id: teacher.nip.toString(),
          name: teacher.name,
          role: teacher.role_id.toString() || null,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    } catch (error) {
      console.error("JWT error:", error);
      return NextResponse.json(
        { message: "Gagal membuat token" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      message: "Login berhasil",
      teacher: {
        nip: teacher.nip.toString(),
        name: teacher.name,
        role_id: teacher.role_id.toString(),
      },
    });

    try {
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });
    } catch (error) {
      console.error("Cookie error:", error);
      return NextResponse.json(
        { message: "Gagal menyimpan token di cookie" },
        { status: 500 }
      );
    }

    return response;
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
}
