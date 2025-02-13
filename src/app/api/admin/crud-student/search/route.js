import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    // Ambil query dari URL
    const { searchParams } = new URL(req.url);
    const nis = searchParams.get("nis");

    if (!nis) {
      return NextResponse.json({ error: "NIS diperlukan" }, { status: 400 });
    }

    // Cari user berdasarkan NIS
    const user = await prisma.user.findUnique({
      where: { nis: parseInt(nis) },
      select: { id: true, nis: true, username: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
