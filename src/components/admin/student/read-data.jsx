"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/admin/crud-student/read");
        const data = await response.json();
        console.log("Data fetched from API:", data); // Debugging
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

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && students.length === 0 && (
        <p>Tidak ada data siswa.</p>
      )}
      {!loading && !error && students.length > 0 && (
        <Card className="rounded-md w-full">
        <Table className="gap-y-5">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">NIS</TableHead>
              <TableHead className="text-left">Nama</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Kelas</TableHead>
              <TableHead className="text-center">Wali Kelas</TableHead>
              <TableHead className="text-center">Tahun Angkatan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.nis}>
                <TableCell className="">{student.nis}</TableCell>
                <TableCell className="text-left">{student.name}</TableCell>
                <TableCell className="">{student.role}</TableCell>
                <TableCell className="">{student.class}</TableCell>
                <TableCell className="">{student.teacher_name}</TableCell>
                <TableCell className="">{student.generation_year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Card>
      )}
    </>
  );
}
