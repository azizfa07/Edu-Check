"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoaderCircle } from "lucide-react";

const initialState = {
  nis: "",
  name: "",
  password: "",
  roleId: "",
  classNameId: "",
  teacherNip: "",
  generationYear: "",
};

const fields = [
  { id: "nis", label: "NIS", type: "text" },
  { id: "name", label: "Name", type: "text" },
  { id: "password", label: "Password", type: "password" },
  { id: "roleId", label: "Role ID", type: "text" },
  { id: "classNameId", label: "Class ID", type: "text" },
  { id: "teacherNip", label: "Teacher NIP", type: "text" },
  { id: "generationYear", label: "Generation Year", type: "text" },
];

export default function StudentForm() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const { nis, name, password, roleId, classNameId, teacherNip, generationYear } = formData;

    if (!nis || !name || !password || !roleId || !classNameId || !teacherNip || !generationYear) {
      return "Semua field harus diisi!";
    }

    if ([nis, roleId, classNameId, teacherNip, generationYear].some((field) => isNaN(Number(field)))) {
      return "NIS, Role, Class, Teacher, dan Generation harus berupa angka!";
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      return "Nama hanya boleh berisi huruf!";
    }

    return "";
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/crud-students/${formData.nis}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
          role_id: Number(formData.roleId),
          class_name_id: Number(formData.classNameId),
          teacher_nip: Number(formData.teacherNip),
          generation_year: Number(formData.generationYear),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Gagal memperbarui data!");
      } else {
        setFormData(initialState);
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Edit Student</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Student Data</SheetTitle>
            <SheetDescription>Masukkan data siswa yang akan diperbarui.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {fields.map(({ id, label, type }) => (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-left">{label}</Label>
                <Input
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="h-3">
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            </div>
          </div>
          <SheetFooter>
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Update"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
