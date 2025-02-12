/*
  Warnings:

  - Made the column `generation_year` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_generation_year_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "generation_year" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_generation_year_fkey" FOREIGN KEY ("generation_year") REFERENCES "generations"("generation_year") ON DELETE RESTRICT ON UPDATE CASCADE;
