"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function DeleteButton({ nis, onDelete }) {
  const [inputNis, setInputNis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/crud-student/delete/${nis}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputNis }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal menghapus data.");

      onDelete(nis);
      toast({
        title: "Berhasil!",
        description: data.message,
        variant: "default",
      });

    } catch (err) {
      toast({
        title: "Gagal!",
        description: err.message || "Terjadi kesalahan.",
        variant: "destructive",
      });

    } finally {
      setIsLoading(false);
      setInputNis(""); // Reset input setelah proses
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-20 h-full" variant="outline">
          <Trash2 />
          Hapus
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
        </DialogHeader>

        <p>Masukkan NIS siswa untuk konfirmasi penghapusan.</p>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="Masukkan NIS"
          value={inputNis}
          onChange={(e) => setInputNis(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading || inputNis === ""}>
            {isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
