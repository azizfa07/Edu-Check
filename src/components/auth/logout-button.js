"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    // Redirect ke halaman login setelah logout
    router.push("/login");
  };

  return (
      <Button onClick={handleLogout} variant="destructive" className="hover:bg-red-600">
        Logout
        <LogOut />
      </Button>
  );
}
