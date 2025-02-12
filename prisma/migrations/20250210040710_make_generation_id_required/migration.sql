/*
  Warnings:

  - Made the column `generation_id` on table `class_name` required. This step will fail if there are existing NULL values in that column.
  - Made the column `generation_id` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "class_name" DROP CONSTRAINT "class_name_generation_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_generation_id_fkey";

-- AlterTable
ALTER TABLE "class_name" ALTER COLUMN "generation_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "generation_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_name" ADD CONSTRAINT "class_name_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
