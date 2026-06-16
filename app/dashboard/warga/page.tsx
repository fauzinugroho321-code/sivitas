import Link from "next/link";
import { getSemuaWarga, hapusWarga } from "../../actions/warga";
import DeleteButton from "./DeleteButton";

export default async function WargaPage() {
  const daftarWarga = await getSemuaWarga();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-green-800">Manajemen Data Kepala Keluarga / Warga</h1>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <input
              placeholder="Search by NIK/Nama..."
              className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <Link href="/dashboard/warga/tambah" className="bg-green-600 text-white px-4 py-2 rounded">Tambah Warga Baru</Link>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">NIK</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {daftarWarga.map((w: any, idx: number) => (
                  <tr key={w.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{w.nik}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{w.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {w.role === 'DUKUH' ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Dukuh</span>
                      ) : w.role === 'ADMIN' ? (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">Admin</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Warga</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/warga/${w.id}`} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Detail</Link>
                        <Link href={`/dashboard/warga/${w.id}/edit`} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">Edit</Link>

                        <form id={`hapus-form-${w.id}`} action={hapusWarga} className="hidden">
                          <input type="hidden" name="id" value={String(w.id)} />
                        </form>

                        <DeleteButton formId={`hapus-form-${w.id}`} />
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
