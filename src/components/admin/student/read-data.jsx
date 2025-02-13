"use client";

import { useEffect, useState } from "react";
import SearchInput from "@/components/admin/student/search-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UpdateData from "@/components/admin/student/update-data";
import { Button } from "@/components/ui/button";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 7;

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/admin/crud-student/read");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };

  const handleDelete = async (nis) => {
    if (!confirm("Apakah Anda yakin ingin menghapus siswa ini?")) return;
    try {
      const response = await fetch(`/api/admin/crud-student/delete/${nis}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Gagal menghapus data.");
      setStudents((prev) => prev.filter((student) => student.nis !== nis));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredStudents = search
    ? students.filter((student) => student.nis.toString().includes(search))
    : students;

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredStudents.length === 0 && (
        <p className="text-gray-500">Tidak ada data yang sesuai.</p>
      )}
      {!loading && !error && filteredStudents.length > 0 && (
        <div className="h-auto">
          <Card className="w-full rounded-md">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center whitespace-nowrap">
                    NIS
                  </TableHead>
                  <TableHead className="text-left whitespace-nowrap">
                    Nama
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Role
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Kelas
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Wali Kelas
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Tahun Angkatan
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.nis}>
                    <TableCell className="text-center">{student.nis}</TableCell>
                    <TableCell className="text-left truncate">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.role}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.class}
                    </TableCell>
                    <TableCell className="text-center truncate">
                      {student.teacher_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.generation_year}
                    </TableCell>
                    <TableCell className="w-full flex justify-center gap-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(student)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(student.nis)}>
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal Edit */}
      {isEditOpen && (
        <UpdateData student={selectedStudent} onClose={() => setIsEditOpen(false)} />
      )}
    </>
  );
}
