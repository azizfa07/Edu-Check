"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import SearchInput from "@/components/admin/student/search-data";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/admin/crud-student/read");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const filteredStudents = students
  ? students.filter(
      (student) =>
        student.nis.toString().includes(search) ||
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.class.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  if (loading) {
    return <p className="text-center text-gray-500">Memuat data...</p>;
  }

  return (
    <>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="w-full">
      <Card className="mx-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">NIS</TableHead>
              <TableHead className="text-center">Nama</TableHead>
              <TableHead className="text-center">Kelas</TableHead>
              <TableHead className="text-center">Wali Kelas</TableHead>
              <TableHead className="text-center">Tahun Angkatan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.nis}>
                  <TableCell>{student.nis}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.teacher_name}</TableCell>
                  <TableCell>{student.generation_year}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Tidak ada data yang sesuai
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      </div>
    </>
  );
}
