"use client";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    // Redirect ke halaman login setelah logout
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
        Logout
      </button>
    </div>
  );
}
