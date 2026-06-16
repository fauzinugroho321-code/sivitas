import Link from "next/link";
import { tambahInformasi } from "../../../actions/informasi";

export default function TambahInformasiPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-green-800">Buat Pengumuman Baru</h1>

        <form action={tambahInformasi} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Pengumuman</label>
            <input name="judul" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Pengumuman</label>
            <select name="tipe" defaultValue="UMUM" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              <option value="UMUM">Publik / Semua Warga (Tampil di Halaman Depan)</option>
              <option value="KHUSUS">Privat / Khusus Warga Saya (Tampil di Dashboard Warga)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Isi / Konten Informasi</label>
            <textarea name="konten" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Buat Pengumuman</button>
            <Link href="/dashboard/informasi" className="px-4 py-2 border rounded">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
