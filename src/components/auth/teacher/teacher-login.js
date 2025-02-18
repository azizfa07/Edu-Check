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

export default function TeacherLogin() {
  const [nipTeacher, setNipTeacher] = useState("");
  const [passwordTeacher, setPasswordTeacher] = useState("");
  const [loadingTeacher, setLoadingTeacher] = useState(false);
  const [error, setError] = useState(""); // Menyimpan pesan error
  const router = useRouter();

  const handleLoginTeacher = async () => {
    setError(""); // Reset error saat mencoba login
    setLoadingTeacher(true);

    // Validasi input sebelum request
    if (!nipTeacher || !passwordTeacher) {
      setError("NIP dan Password harus diisi.");
      setLoadingTeacher(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/teacher/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nip: nipTeacher, password: passwordTeacher }),
      });

      const data = await res.json();
      setLoadingTeacher(false);

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
      if (data.teacher?.role_id) {
        router.push(
          data.teacher.role_id === "1"
            ? "/admin"
            : data.teacher.role_id === "2"
            ? "/teacher"
            : "/"
        );
      } else {
        setError("Anda tidak memiliki akses.");
      }
    } catch (error) {
      setLoadingTeacher(false);
      setError("Gagal menghubungi server. Periksa koneksi internet.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Masuk</CardTitle>
        <CardDescription>
          Masukkan NIP dan password untuk login sebagai guru.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <Label htmlFor="nipTeacher">NIP</Label>
          <Input
            type="text"
            placeholder="NIP"
            value={nipTeacher}
            onChange={(e) => setNipTeacher(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="passwordTeacher">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            value={passwordTeacher}
            onChange={(e) => setPasswordTeacher(e.target.value)}
          />
        </div>
        <div className="w-full h-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          {/* Menampilkan error */}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLoginTeacher}
          disabled={loadingTeacher}
          className="w-2/5"
        >
          {loadingTeacher ? <LoaderCircle className="animate-spin" /> : "Masuk"}
        </Button>
      </CardFooter>
    </Card>
  );
}
