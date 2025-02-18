"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";

export default function StudentLogin() {
  const [nisStudent, setNisStudent] = useState("");
  const [passwordStudent, setPasswordStudent] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [error, setError] = useState(""); // Menyimpan pesan error
  const router = useRouter();

  const handleLoginStudent = async () => {
    setError(""); // Reset error sebelum mencoba login
    setLoadingStudent(true);

    // Validasi input sebelum request
    if (!nisStudent || !passwordStudent) {
      setError("NIS dan Password harus diisi.");
      setLoadingStudent(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nis: nisStudent, password: passwordStudent }),
      });

      const data = await res.json();
      setLoadingStudent(false);

      if (!res.ok) {
        // Tangani error sesuai status response
        if (res.status === 400) setError("Format data tidak valid.");
        else if (res.status === 401) setError("Password salah.");
        else if (res.status === 404) setError("User tidak ditemukan.");
        else if (res.status === 500) setError("Terjadi kesalahan server.");
        else setError(data.message || "Terjadi kesalahan.");
        return;
      }

      // Redirect berdasarkan role_id
      if (data.student?.role_id === "3") {
        router.push("/student");
      } else {
        setError("Anda tidak memiliki akses.");
      }
    } catch (error) {
      setLoadingStudent(false);
      setError("Gagal menghubungi server. Periksa koneksi internet.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Masuk</CardTitle>
        <CardDescription>
          Masukkan NIS dan password untuk login sebagai siswa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <Label htmlFor="nisStudent">NIS</Label>
          <Input
            type="text"
            placeholder="NIS"
            value={nisStudent}
            onChange={(e) => setNisStudent(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="passwordStudent">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            value={passwordStudent}
            onChange={(e) => setPasswordStudent(e.target.value)}
          />
        </div>
        <div className="w-full h-3">
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Menampilkan error */}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLoginStudent}
          disabled={loadingStudent}
          className="w-2/5"
        >
          {loadingStudent ? <LoaderCircle className="animate-spin" /> : "Masuk"}
        </Button>
      </CardFooter>
    </Card>
  );
}
