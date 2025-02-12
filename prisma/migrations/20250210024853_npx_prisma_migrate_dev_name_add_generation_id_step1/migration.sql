-- AlterTable
ALTER TABLE "class_name" ADD COLUMN     "generation_id" BIGINT;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "generation_id" BIGINT;

-- CreateTable
CREATE TABLE "generations" (
    "id" BIGSERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "generations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generations_id_key" ON "generations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "generations_year_key" ON "generations"("year");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_name" ADD CONSTRAINT "class_name_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
