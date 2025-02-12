/*
  Warnings:

  - The primary key for the `generations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `year` on the `generations` table. All the data in the column will be lost.
  - You are about to alter the column `generation_number` on the `generations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - A unique constraint covering the columns `[generation_year]` on the table `generations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "class_name" DROP CONSTRAINT "class_name_generation_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_generation_id_fkey";

-- DropIndex
DROP INDEX "generations_year_key";

-- AlterTable
ALTER TABLE "generations" DROP CONSTRAINT "generations_pkey",
DROP COLUMN "year",
ADD COLUMN     "generation_year" BIGINT NOT NULL DEFAULT 2024,
ALTER COLUMN "generation_number" DROP DEFAULT,
ALTER COLUMN "generation_number" SET DATA TYPE INTEGER,
ADD CONSTRAINT "generations_pkey" PRIMARY KEY ("generation_year");

-- CreateIndex
CREATE UNIQUE INDEX "generations_generation_year_key" ON "generations"("generation_year");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("generation_year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_name" ADD CONSTRAINT "class_name_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("generation_year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "generations_id_key" RENAME TO "generations_generation_number_key";
