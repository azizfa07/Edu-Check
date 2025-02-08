-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_class_name_id_fkey";

-- AlterTable
ALTER TABLE "teachers" ALTER COLUMN "class_name_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_class_name_id_fkey" FOREIGN KEY ("class_name_id") REFERENCES "class_name"("id") ON DELETE SET NULL ON UPDATE CASCADE;
