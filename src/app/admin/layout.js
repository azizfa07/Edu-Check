import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const decoded = jwt.decode(token);

  if (decoded?.role !== "1") {
    redirect("/unauthorized"); // Hanya admin (role_id 1) yang bisa akses
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex">
        <SidebarTrigger />
        <Toaster />
        {children}
      </main>
    </SidebarProvider>
  );
}
