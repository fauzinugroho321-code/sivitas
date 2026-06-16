import Link from "next/link";
import { cookies } from "next/headers";
import { getSurat } from "../../actions/surat";

export default async function SuratListPage() {
  const surats = await getSurat();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value ?? null;
  let role: string | null = null;
  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie);
      role = session?.role ?? null;
    } catch (e) {
      // ignore parse errors and treat as no session
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-800">Pengajuan Surat</h1>
          {role === "WARGA" && (
            <Link href="/dashboard/surat/tambah" className="bg-green-600 text-white px-4 py-2 rounded">Buat Pengajuan Baru</Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Warga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Surat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {surats.map((s: any) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(s.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.user?.nama ?? "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{s.jenis_surat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${s.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
