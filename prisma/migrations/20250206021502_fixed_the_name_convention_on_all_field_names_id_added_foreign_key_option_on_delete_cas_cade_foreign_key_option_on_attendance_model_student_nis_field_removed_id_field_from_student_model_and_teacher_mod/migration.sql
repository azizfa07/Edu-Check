/*
  Warnings:

  - The primary key for the `attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `attendance` table. All the data in the column will be lost.
  - The primary key for the `class_name` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `class_name` table. All the data in the column will be lost.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `roles` table. All the data in the column will be lost.
  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `students` table. All the data in the column will be lost.
  - The primary key for the `teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `class_name` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `student_nis` to the `attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_nip` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_student_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_class_name_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_role_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_class_name_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_role_id_fkey";

-- DropIndex
DROP INDEX "attendance_Id_key";

-- DropIndex
DROP INDEX "class_name_Id_key";

-- DropIndex
DROP INDEX "roles_Id_key";

-- AlterTable
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_pkey",
DROP COLUMN "Id",
DROP COLUMN "student_id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD COLUMN     "student_nis" BIGINT NOT NULL,
ADD CONSTRAINT "attendance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "class_name" DROP CONSTRAINT "class_name_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "class_name_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pkey",
DROP COLUMN "Id",
DROP COLUMN "teacher_id",
ADD COLUMN     "teacher_nip" BIGINT NOT NULL,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("nis");

-- AlterTable
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_pkey",
DROP COLUMN "Id",
ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("nip");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_id_key" ON "attendance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "class_name_id_key" ON "class_name"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_class_name_id_fkey" FOREIGN KEY ("class_name_id") REFERENCES "class_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_teacher_nip_fkey" FOREIGN KEY ("teacher_nip") REFERENCES "teachers"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_class_name_id_fkey" FOREIGN KEY ("class_name_id") REFERENCES "class_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_nis_fkey" FOREIGN KEY ("student_nis") REFERENCES "students"("nis") ON DELETE CASCADE ON UPDATE CASCADE;
