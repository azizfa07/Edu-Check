"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    // Redirect ke halaman login setelah logout
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
}
