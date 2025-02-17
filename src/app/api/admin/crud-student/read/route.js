import prisma from "@/lib/prisma"; // Pastikan prisma sudah dikonfigurasi

export async function GET() {
  try {
    const students = await prisma.students.findMany({
      select: {
        nis: true,
        name: true,
        role: {   // Mengambil nama role dari tabel roles
          select: {
            role: true,
          },
        },
        class_name: { // Mengambil data kelas
          select: {
            class: true,
            code: true,
          },
        },
        teacher: { // 🔥 Perbaikan: Ambil data guru melalui relasi `teacher`
          select: {
            name: true,
          },
        },
        generation_year: true,
      },
    });

    return new Response(
      JSON.stringify(
        students.map((student) => ({
          nis: student.nis.toString(),
          name: student.name,
          role: student.role?.role || "Tidak ada data",
          class: student.class_name
            ? `${student.class_name.class}-${student.class_name.code}`
            : "Tidak ada data",
          teacher_name: student.teacher?.name || "Tidak ada data", // 🔥 Ambil nama guru
          generation_year: student.generation_year?.toString() || "Tidak ada data",
        })),
        (_, value) => (typeof value === "bigint" ? value.toString() : value)
      ),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Gagal mengambil data siswa", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
