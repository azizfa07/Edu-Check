import AddDataStudent from "@/components/admin/student/add-data";
import ReadDataStudent from "@/components/admin/student/read-data";

export default function DataSiswaPage() {
  return (
    <div className="w-full h-[100vh] flex flex-col text-center gap-y-4 p-7">
      <h1 className="text-2xl text-left font-bold text-white">Data Siswa</h1>
      <div className="flex flex-row gap-x-3">
        <AddDataStudent />
      </div>
      <div className="w-full flex-1 h-fit">
        <ReadDataStudent />
      </div>
    </div>
  );
}
