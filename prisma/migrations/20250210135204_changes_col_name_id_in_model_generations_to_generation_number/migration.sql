/*
  Warnings:

  - The primary key for the `generations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `generations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[generation_number]` on the table `generations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `generation_number` to the `generations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "class_name" DROP CONSTRAINT "class_name_generation_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_generation_id_fkey";

-- DropIndex
DROP INDEX "generations_id_key";

-- AlterTable
ALTER TABLE "generations" DROP CONSTRAINT "generations_pkey",
DROP COLUMN "id",
ADD COLUMN     "generation_number" BIGINT NOT NULL DEFAULT 64,
ADD CONSTRAINT "generations_pkey" PRIMARY KEY ("generation_number");

-- CreateIndex
CREATE UNIQUE INDEX "generations_generation_number_key" ON "generations"("generation_number");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("generation_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_name" ADD CONSTRAINT "class_name_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("generation_number") ON DELETE RESTRICT ON UPDATE CASCADE;
