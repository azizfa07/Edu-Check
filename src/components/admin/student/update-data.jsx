"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdateData({ student, onClose }) {
  const [name, setName] = useState(student?.name || "");
  const [role, setRole] = useState(student?.role || "");

  const handleSubmit = async () => {
    await fetch(`/api/admin/crud-student/update/${student.nis}`, {
      method: "PUT",
      body: JSON.stringify({ name, role }),
    });

    const result = await res.json();

    if (result.success) {
      toast({ title: "Berhasil!", description: result.message });
    } else {
      setErrorMessage(result.message || "Terjadi kesalahan");
    }
  };

  return (
    <Dialog open={!!student} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Siswa</DialogTitle>
        </DialogHeader>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={handleSubmit}>Simpan</Button>
      </DialogContent>
    </Dialog>
  );
}
