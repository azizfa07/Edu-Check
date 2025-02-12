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

export default function SheetSide() {
  const [classNumber, setClassNumber] = useState("");
  const [code, setCode] = useState("");
  const [generationId, setGenerationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State untuk pesan error

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(""); // Reset pesan error sebelum request

    try {
      const response = await fetch("/api/admin/crud-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classNumber: Number(classNumber),
          code,
          generationId: Number(generationId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to create class");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Add Class</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Add New Class</SheetTitle>
            <SheetDescription>
              Enter class details below and click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classNumber" className="text-left">
                Class Number
              </Label>
              <Input
                id="classNumber"
                type="text"
                value={classNumber}
                onChange={(e) => setClassNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-left">
                Code
              </Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="col-span-3"
                maxLength={1}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="generationId" className="text-left">
                Generation ID
              </Label>
              <Input
                id="generationId"
                type="text"
                value={generationId}
                onChange={(e) => setGenerationId(e.target.value)}
                className="col-span-3"
              />
            </div>
          <div className="h-3 mb-2">
          {/* Menampilkan pesan error di atas tombol */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-rigth">{errorMessage}</p>
          )}
          </div>
          </div>
          <SheetFooter>
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
