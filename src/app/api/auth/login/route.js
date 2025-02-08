import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma"; // Sesuaikan path Prisma client

export async function POST(req) {
  try {
    const { nip, password } = await req.json();

    // Cari admin berdasarkan NIP
    const admin = await prisma.teachers.findUnique({
      where: { nip: BigInt(nip) },
      include: { roles: true },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek apakah password cocok (tanpa hashing)
    if (admin.password !== password) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // console.log("Role ID dari Database:", admin.role_id);

    // Cek role admin (misalnya, role_id 1 adalah admin)
    if (admin.role_id !== BigInt(1)) {
      return NextResponse.json(
        { message: "Anda bukan admin" },
        { status: 403 }
      );
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: admin.nip.toString(), name: admin.name, role: admin.role_id.toString() || null },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Simpan token di cookie (gunakan cookiesStore)
    const cookiesStore = await cookies();
    cookiesStore.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none"
    });

    return NextResponse.json({
      message: "Login berhasil",
      user: { nip: admin.nip.toString(), name: admin.name },
    });
  } catch (error) {
    console.error("Error Internal Server:", error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
