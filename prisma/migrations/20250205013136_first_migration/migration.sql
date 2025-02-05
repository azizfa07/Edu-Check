-- CreateTable
CREATE TABLE "students" (
    "Id" BIGSERIAL NOT NULL,
    "nis" BIGINT NOT NULL,
    "name" VARCHAR(123) NOT NULL,
    "password" VARCHAR(123) NOT NULL,
    "classes_id" BIGINT NOT NULL,
    "teacher_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "Id" BIGSERIAL NOT NULL,
    "nip" BIGINT NOT NULL,
    "name" VARCHAR(123) NOT NULL,
    "password" VARCHAR(123) NOT NULL,
    "classes_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "className" (
    "Id" BIGSERIAL NOT NULL,
    "class" BIGINT NOT NULL,
    "code" VARCHAR(1) NOT NULL,

    CONSTRAINT "className_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "roles" (
    "Id" BIGSERIAL NOT NULL,
    "role" VARCHAR(12) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "Id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "check_in" TIMESTAMP NOT NULL,
    "check_out" TIMESTAMP NOT NULL,
    "student_id" BIGINT NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_nis_key" ON "students"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "students_teacher_id_key" ON "students"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_role_id_key" ON "students"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_nip_key" ON "teachers"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_classes_id_role_id_key" ON "teachers"("classes_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "className_Id_key" ON "className"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_Id_key" ON "roles"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_Id_key" ON "attendance"("Id");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_classes_id_fkey" FOREIGN KEY ("classes_id") REFERENCES "className"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_classes_id_fkey" FOREIGN KEY ("classes_id") REFERENCES "className"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
