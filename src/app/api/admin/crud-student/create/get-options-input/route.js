import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [teachers, classNames, generations] = await Promise.all([
      prisma.teachers.findMany({ select: { nip: true, name: true } }),
      prisma.class_name.findMany({ select: { id: true, class:true, code: true } }),
      prisma.generations.findMany({ select: { generation_year: true } }),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        teachers: teachers.map((t) => ({
          nip: t.nip.toString(),
          name: t.name,
        })),
        classNames: classNames.map((c) => ({
          id: c.id.toString(),
          class_name: `${c.class}-${c.code}`,
        })),
        generations: generations.map((g) => ({
          generation_year: g.generation_year.toString(),
        })),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error Prisma:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Kesalahan database!" }),
      { status: 500 }
    );
  }
}
