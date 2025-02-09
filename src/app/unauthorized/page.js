"use client";

import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">Akses Ditolak</h1>
      <p className="text-lg mb-6">Anda tidak memiliki izin untuk mengakses halaman yang dituju.</p>
      <Button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Kembali
      </Button>
    </div>
  );
}
