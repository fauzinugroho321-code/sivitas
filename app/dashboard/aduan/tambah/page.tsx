import Link from "next/link";
import { tambahAduan } from "../../../actions/aduan";

export default function TambahAduanPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-green-800">Buat Aduan Baru</h1>

        <form action={tambahAduan} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Aduan</label>
            <input name="judul" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea name="deskripsi" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Kirim Aduan</button>
            <Link href="/dashboard/aduan" className="px-4 py-2 border rounded">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
