import { getPendingItems, updateStatusAduan, updateStatusSurat, setujuiWarga } from "../../actions/verifikasi";
import { cookies } from "next/headers";
import prisma from "../../../lib/prisma";

export default async function VerifikasiPage() {
  const { aduans, surats } = await getPendingItems();

  // determine pending registrants based on current session role
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  let pendingRegistrants: any[] = [];

  if (sessionCookie?.value) {
    try {
      const session = JSON.parse(sessionCookie.value as string);
      const role = session?.role;
      const sid = typeof session.id === "number" ? session.id : parseInt(String(session.id), 10);

      if (role === "ADMIN") {
        pendingRegistrants = await prisma.user.findMany({ where: { role: "DUKUH", statusAkun: "PENDING" }, orderBy: { createdAt: "desc" } });
      } else if (role === "DUKUH" && sid) {
        pendingRegistrants = await prisma.user.findMany({ where: { role: "WARGA", dukuhId: sid, statusAkun: "PENDING" }, orderBy: { createdAt: "desc" } });
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Pusat Verifikasi</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Registrants (ADMIN -> Dukuh, DUKUH -> Warga) */}
          <section className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Menunggu Persetujuan Akun</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">NIK</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dukuh</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pendingRegistrants.map((u: any) => (
                      <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.nama}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.nik}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.dukuhId ?? "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <form action={setujuiWarga} className="inline">
                            <input type="hidden" name="id" value={u.id} />
                            <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Setujui</button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Surat */}
          <section className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Menunggu Verifikasi Surat</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Warga</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jenis Surat</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {surats.map((s: any) => (
                      <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(s.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.user?.nama ?? "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.jenis_surat}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <form action={updateStatusSurat} className="inline">
                              <input type="hidden" name="id" value={s.id} />
                              <input type="hidden" name="status" value="DISETUJUI" />
                              <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Setujui</button>
                            </form>

                            <form action={updateStatusSurat} className="inline">
                              <input type="hidden" name="id" value={s.id} />
                              <input type="hidden" name="status" value="DITOLAK" />
                              <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Tolak</button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Aduan */}
          <section className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Menunggu Verifikasi Aduan</h2>
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
                          <div className="flex items-center gap-2">
                            <form action={updateStatusAduan} className="inline">
                              <input type="hidden" name="id" value={a.id} />
                              <input type="hidden" name="status" value="DISETUJUI" />
                              <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Setujui</button>
                            </form>

                            <form action={updateStatusAduan} className="inline">
                              <input type="hidden" name="id" value={a.id} />
                              <input type="hidden" name="status" value="DITOLAK" />
                              <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Tolak</button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
