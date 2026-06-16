import Link from "next/link";
import { getInformasi } from "../../actions/informasi";
import { cookies } from "next/headers";

export default async function InformasiPage() {
  const infos = await getInformasi();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  let role = "WARGA";
  if (sessionCookie?.value) {
    try {
      const s = JSON.parse(sessionCookie.value as string);
      role = s?.role ?? "WARGA";
    } catch (e) {
      // ignore
    }
  }

  const canCreate = role === "DUKUH";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-800">Pusat Informasi</h1>
          {canCreate && (
            <Link href="/dashboard/informasi/tambah" className="bg-green-600 text-white px-4 py-2 rounded">Buat Pengumuman Baru</Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {infos.map((i: any) => (
                <tr key={i.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(i.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{i.judul}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{i.pembuat?.nama ?? i.penulis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
