/*
  Warnings:

  - You are about to drop the column `generation_id` on the `class_name` table. All the data in the column will be lost.
  - You are about to drop the column `generation_id` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "class_name" DROP CONSTRAINT "class_name_generation_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_generation_id_fkey";

-- AlterTable
ALTER TABLE "class_name" DROP COLUMN "generation_id",
ADD COLUMN     "generation_year" BIGINT;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "generation_id",
ADD COLUMN     "generation_year" BIGINT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_generation_year_fkey" FOREIGN KEY ("generation_year") REFERENCES "generations"("generation_year") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_name" ADD CONSTRAINT "class_name_generation_year_fkey" FOREIGN KEY ("generation_year") REFERENCES "generations"("generation_year") ON DELETE SET NULL ON UPDATE CASCADE;
