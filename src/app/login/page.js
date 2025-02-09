"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherLogin from "@/components/auth/teacher/teacher-login";
import StudentLogin from "@/components/auth/student/student-login";
import { X } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Link className="absolute top-5 right-5" href="/">
        <X />
      </Link>
      <Tabs
        defaultValue="guru"
        className="w-72 flex flex-col justify-center mx-auto h-screen"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guru">Guru</TabsTrigger>
          <TabsTrigger value="siswa">Siswa</TabsTrigger>
        </TabsList>
        <TabsContent value="guru">
          <TeacherLogin />
        </TabsContent>
        <TabsContent value="siswa">
          <StudentLogin />
        </TabsContent>
      </Tabs>
    </>
  );
}
