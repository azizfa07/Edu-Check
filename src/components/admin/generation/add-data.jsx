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

export default function GenerationForm() {
  const [generationYear, setGenerationYear] = useState("");
  const [generationNumber, setGenerationNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");

    // Validasi input sebelum mengirim ke API
    if (!generationYear || !generationNumber) {
      setErrorMessage("Semua field harus diisi!");
      setLoading(false);
      return;
    }

    if (isNaN(Number(generationYear)) || isNaN(Number(generationNumber))) {
      setErrorMessage("Harus berupa angka!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/crud-generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generation_year: Number(generationYear),
          generation_number: Number(generationNumber),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Gagal menambah data!");
      } else {
        setGenerationYear("");
        setGenerationNumber("");
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
          <Button variant="outline">Add Generation</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Add New Generation</SheetTitle>
            <SheetDescription>
              Masukkan data generasi di bawah.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="generationYear" className="text-left">
                Year
              </Label>
              <Input
                id="generationYear"
                type="text"
                value={generationYear}
                onChange={(e) => setGenerationYear(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="generationNumber" className="text-left">
                Number
              </Label>
              <Input
                id="generationNumber"
                type="text"
                value={generationNumber}
                onChange={(e) => setGenerationNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="w-full h-3">
              {errorMessage && <p className="text-red-500 text-sm">{error}</p>}{" "}
              {/* Menampilkan error */}
            </div>
          </div>
          <SheetFooter>
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
