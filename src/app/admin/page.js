import LogoutButton from "@/components/auth/logout-button";

export default function AdminPage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-start justify-center text-center">
      <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
        <LogoutButton />
      </div>
    </>
  );
}
