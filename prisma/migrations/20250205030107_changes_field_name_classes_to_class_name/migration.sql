/*
  Warnings:

  - You are about to drop the column `classes_id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `classes_id` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the `className` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[class_name_id,role_id]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_name_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name_id` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_classes_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_classes_id_fkey";

-- DropIndex
DROP INDEX "students_role_id_key";

-- DropIndex
DROP INDEX "students_teacher_id_key";

-- DropIndex
DROP INDEX "teachers_classes_id_role_id_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "classes_id",
ADD COLUMN     "class_name_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "classes_id",
ADD COLUMN     "class_name_id" BIGINT NOT NULL;

-- DropTable
DROP TABLE "className";

-- CreateTable
CREATE TABLE "class_name" (
    "Id" BIGSERIAL NOT NULL,
    "class" BIGINT NOT NULL,
    "code" VARCHAR(1) NOT NULL,

    CONSTRAINT "class_name_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_name_Id_key" ON "class_name"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_class_name_id_role_id_key" ON "teachers"("class_name_id", "role_id");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_class_name_id_fkey" FOREIGN KEY ("class_name_id") REFERENCES "class_name"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_class_name_id_fkey" FOREIGN KEY ("class_name_id") REFERENCES "class_name"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
