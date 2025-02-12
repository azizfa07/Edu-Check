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
import { useToast } from "@/hooks/use-toast"
import { Plus } from "lucide-react";

export default function StudentForm() {
  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    password: "",
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
        <Button variant="outline" className="w-2/12 flex">Tambah Siswa
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
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="class_name_id">Pilih Kelas</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, class_name_id: value })
              }
            >
              <SelectTrigger>
                {formData.class_name_id || "Pilih Kelas"}
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
              onValueChange={(value) =>
                setFormData({ ...formData, teacher_nip: value })
              }
            >
              <SelectTrigger>
                {formData.teacher_nip || "Pilih Guru"}
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
              onValueChange={(value) =>
                setFormData({ ...formData, generation_year: value })
              }
            >
              <SelectTrigger>
                {formData.generation_year || "Pilih Tahun"}
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
              <Button className="mt-4" type="submit">Simpan</Button>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
