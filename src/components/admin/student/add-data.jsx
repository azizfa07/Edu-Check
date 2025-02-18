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
import { Plus } from "lucide-react";

export default function StudentForm() {
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

  const { toast } = useToast();

  useEffect(() => {
    async function fetchOptions() {
      const res = await fetch(
        "/api/admin/crud-student/create/get-options-input"
      );
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
    const res = await fetch("/api/admin/crud-student/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    console.log(result);

    if (result.success) {
      toast({
        title: "Berhasil!",
        description: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Gagal!",
        description: result.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-40 h-full  flex text-wrap">
          Tambah Siswa
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="mb-4">
          <SheetTitle>Tambah Siswa</SheetTitle>
          <SheetDescription>
            Masukkan data siswa baru di bawah ini.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="nis">NIS</Label>
            <Input
              type="text"
              name="nis"
              id="nis"
              value={formData.nis}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Nama</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="class_name_id">Pilih Kelas</Label>
            <Select
              value={formData.class_name_id} // Menetapkan nilai yang dipilih
              onValueChange={(value) =>
                setFormData({ ...formData, class_name_id: value })
              }
            >
              <SelectTrigger>
                <span>
                  {options.classNames?.find(
                    (cls) => cls.id === formData.class_name_id
                  )?.class_name || "Pilih Kelas"}
                </span>
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
              value={formData.teacher_nip}
              onValueChange={(value) =>
                setFormData({ ...formData, teacher_nip: value })
              }
            >
              <SelectTrigger>
                <span>
                  {options.teachers.find(
                    (teacher) => teacher?.nip === formData.teacher_nip
                  )?.name || "Pilih Guru"}
                </span>
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
              value={formData.generation_year}
              onValueChange={(value) =>
                setFormData({ ...formData, generation_year: value })
              }
            >
              <SelectTrigger>
                <span>
                  {options.generations.find(
                    (gen) => gen.generation_year === formData.generation_year
                  )?.generation_year || "Pilih Tahun"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {options.generations.map((gen) => (
                  <SelectItem
                    key={gen.generation_year}
                    value={gen.generation_year}
                  >
                    {gen.generation_year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <SheetFooter>
              <Button className="mt-4" type="submit">
                Simpan
              </Button>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
