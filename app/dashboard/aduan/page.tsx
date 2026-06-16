import Link from "next/link";
import { getAduan, updateStatusAduan } from "../../actions/aduan";
import { cookies } from "next/headers";

export default async function AduanListPage() {
  const aduans = await getAduan();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  let session: any = null;
  try {
    session = sessionCookie ? JSON.parse(sessionCookie.value as string) : null;
  } catch (e) {
    session = null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-800">Aduan Warga</h1>
          {session?.role === "WARGA" && (
            <Link href="/dashboard/aduan/tambah" className="bg-green-600 text-white px-4 py-2 rounded">Buat Aduan Baru</Link>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pengirim</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {aduans.map((a: any) => (
                  <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(a.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{a.user?.nama ?? "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.judul}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{a.deskripsi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {a.status === 'PENDING' ? (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Pending</span>
                      ) : a.status === 'DIPROSES' ? (
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Diproses</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Selesai</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex gap-2">
                        {session?.role === 'WARGA' ? (
                          <span className="text-xs text-gray-500">-</span>
                        ) : (
                          <>
                            {a.status === 'PENDING' && (
                              <form action={updateStatusAduan} className="inline">
                                <input type="hidden" name="id" value={String(a.id)} />
                                <input type="hidden" name="status" value="DIPROSES" />
                                <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Proses</button>
                              </form>
                            )}

                            {a.status === 'DIPROSES' && (
                              <form action={updateStatusAduan} className="inline">
                                <input type="hidden" name="id" value={String(a.id)} />
                                <input type="hidden" name="status" value="SELESAI" />
                                <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Selesai</button>
                              </form>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
