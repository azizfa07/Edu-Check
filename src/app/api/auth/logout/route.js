import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Ambil cookies instance
    const cookiesStore = await cookies();

    // Hapus cookie auth_token dengan cara set ulang dengan tanggal kadaluarsa di masa lalu
    cookiesStore.set("auth_token", "", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none",
      expires: new Date(0), // Kadaluarsa langsung
    });

    return NextResponse.json({ message: "Logout berhasil" });
  } catch (error) {
    console.error("Error saat logout:", error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
