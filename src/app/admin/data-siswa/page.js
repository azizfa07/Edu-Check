import AddDataStudent from "@/components/admin/student/add-data";
import ReadDataStudent from "@/components/admin/student/read-data";

export default function DataSiswaPage() {
  return (
    <>
      <div className="h-fit w-full flex flex-col text-center gap-y-7 m-7">
        <h1 className="text-2xl text-left font-bold text-white">Data Siswa</h1>
        <AddDataStudent />
        <div className="w-full h-1/2">
          <ReadDataStudent />
        </div>
      </div>
    </>
  );
}
