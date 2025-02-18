import LogoutButton from '@/components/auth/logout-button';
import ReadData from '@/components/student/read-data';

export default function AbsensiPage() {
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center text-center space-y-4">
                <h1 className="text-2xl font-bold text-white">Data Siswa</h1>
                <ReadData />
                <LogoutButton />
            </div>
        </>
    )
}