"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function LoginPage() {
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nip, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      ("Login berhasil!");
      router.push("/admin"); // Sesuaikan dengan halaman admin
    } else {
      (data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="NIP"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "Memproses..." : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
