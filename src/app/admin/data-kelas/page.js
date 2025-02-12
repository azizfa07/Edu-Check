"use client"

import AddClassData from "@/components/admin/class/add-data"

export default function DataKelasPage() {
    return(
        <>
            <div className="h-screen flex flex-col items-start justify-center text-center gap-y-5">
            <h1 className="text-2xl font-bold text-white">Data Kelas</h1>
            <AddClassData />
            </div>
        </>
    )
}