import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    //  Ambil request body
    const body = await req.json();
    console.log("Request body:", body); // 🔍 Debugging body

    //  Destructuring body
    const {
      nis,
      name,
      password,
      class_name_id,
      teacher_nip,
      generation_year,
    } = body;

    //  Validasi input
    if (!nis || !name || !class_name_id || !teacher_nip || !generation_year) 
      {
      return new Response(
        JSON.stringify({ success: false, message: "Semua field harus diisi!" }),
        { status: 400 }
      );
    }

    //  Validasi NIS hanya angka
    if (!/^\d+$/.test(nis)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "NIS hanya boleh berupa angka!",
        }),
        { status: 400 }
      );
    }

    //  Validasi Name hanya huruf (tanpa angka atau simbol)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Nama hanya boleh berisi huruf!",
        }),
        { status: 400 }
      );
    }

    //  Cek apakah nis sudah ada
    const existingStudent = await prisma.students.findUnique({
      where: { nis: Number(nis) },
    });

    if (existingStudent) {
      return new Response(
        JSON.stringify({ success: false, message: "NIS sudah digunakan!" }),
        { status: 400 }
      );
    }

    //  Cek apakah data foreign key ada
    const className = await prisma.class_name.findUnique({
      where: { id: Number(class_name_id) },
    });
    const teacher = await prisma.teachers.findUnique({
      where: { nip: Number(teacher_nip) },
    });
    const generation = await prisma.generations.findUnique({
      where: { generation_year: Number(generation_year) },
    });

    if (!className || !teacher || !generation) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Foreign key tidak ditemukan!",
        }),
        { status: 400 }
      );
    }

    const defaultPassword = "$2a$12$tR/cveLfVT6lclzYF4rLVe3XPMIgYA.Jq/RUx8GgJFmriuxAX/CJe"; // Hash dari skema Prisma

    //  Buat student baru
    const newStudent = await prisma.students.create({
      data: {
        nis: Number(nis),
        name,
        password: defaultPassword,
        role: { connect: { id: 3 } },
        class_name: { connect: { id: Number(class_name_id) } },
        teacher: { connect: { nip: Number(teacher_nip) } },
        generation: { connect: { generation_year: Number(generation_year) } },
      },
    });

    //  Konversi BigInt ke String sebelum mengirim response
    return new Response(
      JSON.stringify(
        { success: true, data: newStudent, message: "Siswa berhasil ditambahkan!" },
        (_, value) => (typeof value === "bigint" ? value.toString() : value) // ✅ Konversi BigInt
      ),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error Prisma:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Kesalahan database: " + error.message,
      }),
      { status: 500 }
    );
  }
}
