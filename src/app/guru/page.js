import LogouButton from "@/components/auth/logout-button"

export default function GuruPage() {
    return(
        <>
            <div className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-white">Dashboard Guru</h1>
                <LogouButton />
            </div>
        </>
    )
}