import LogoutButton from '@/components/auth/logout-button';

export default function AbsensiPage() {
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold text-white">Absensi</h1>
                <LogoutButton />
            </div>
        </>
    )
}