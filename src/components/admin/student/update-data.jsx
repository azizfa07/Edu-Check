"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit } from "lucide-react";

export default function StudentEditForm({ initialData }) {
  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    class_name_id: "",
    teacher_nip: "",
    generation_year: "",
  });

  const [options, setOptions] = useState({
    teachers: [],
    classNames: [],
    generations: [],
  });

  const [errorMessage, setErrorMessage] = useState(""); // State untuk menampilkan pesan error

  const { toast } = useToast();

  // Perbarui formData saat initialData berubah
  useEffect(() => {
    if (initialData && options.classNames.length > 0 && options.teachers.length > 0) {
      setFormData({
        nis: initialData.nis || "",
        name: initialData.name || "",
        class_name_id: options.classNames.find(cls => cls.class_name === initialData.class)?.id || "",
        teacher_nip: options.teachers.find(teacher => teacher.name === initialData.teacher_name)?.nip || "",
        generation_year: initialData.generation_year || "",
      });
    }
  }, [initialData, options]);

  // Ambil data opsi dropdown
  useEffect(() => {
    async function fetchOptions() {
      const res = await fetch("/api/admin/crud-student/create/get-options-input");
      const data = await res.json();
      if (data.success) {
        setOptions({
          teachers: data.teachers,
          classNames: data.classNames,
          generations: data.generations,
        });
      }
    }
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error sebelum request

    const res = await fetch(`/api/admin/crud-student/update/${initialData.nis}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
      toast({ title: "Berhasil!", description: result.message });
    } else {
      toast({ title: "Gagal!", variant:"destructive", description: result.message }); // Set error ke state
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-20 h-full flex text-wrap">
          <Edit /> Edit
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="mb-4">
          <SheetTitle>Edit Siswa</SheetTitle>
          <SheetDescription>Perbarui data siswa di bawah ini.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="nis">NIS</Label>
            <Input type="text" name="nis" id="nis" value={formData.nis} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Nama</Label>
            <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="class_name_id">Pilih Kelas</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, class_name_id: value })}
              value={formData.class_name_id}
            >
              <SelectTrigger>
                {options.classNames.find((cls) => cls.id === formData.class_name_id)?.class_name || "Pilih Kelas"}
              </SelectTrigger>
              <SelectContent>
                {options.classNames.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.class_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="teacher_nip">Pilih Guru</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, teacher_nip: value })}
              value={formData.teacher_nip}
            >
              <SelectTrigger>
                {options.teachers.find((teacher) => teacher.nip === formData.teacher_nip)?.name || "Pilih Guru"}
              </SelectTrigger>
              <SelectContent>
                {options.teachers.map((teacher) => (
                  <SelectItem key={teacher.nip} value={teacher.nip}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="generation_year">Pilih Tahun Angkatan</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, generation_year: value })}
              value={formData.generation_year}
            >
              <SelectTrigger>
                {options.generations.find((gen) => gen.generation_year === formData.generation_year)?.generation_year || "Pilih Tahun"}
              </SelectTrigger>
              <SelectContent>
                {options.generations.map((gen) => (
                  <SelectItem key={gen.generation_year} value={gen.generation_year}>
                    {gen.generation_year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tempat menampilkan pesan error */}
          {errorMessage && (
            <div className="text-red-500 text-sm font-medium mt-2">{errorMessage}</div>
          )}

          <div className="space-y-1">
            <SheetFooter>
              <Button className="mt-4" type="submit">
                Update
              </Button>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
