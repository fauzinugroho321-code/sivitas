import Link from "next/link";
import { tambahSurat } from "../../../actions/surat";

export default function TambahSuratPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-green-800">Buat Pengajuan Surat</h1>

        <form action={tambahSurat} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Jenis Surat</label>
            <select name="jenis_surat" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">-- Pilih jenis surat --</option>
              <option>Surat Keterangan Domisili</option>
              <option>Surat Pengantar Nikah</option>
              <option>Surat Keterangan Usaha</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Ajukan</button>
            <Link href="/dashboard/surat" className="px-4 py-2 border rounded">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
