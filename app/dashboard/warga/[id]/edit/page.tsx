import Link from "next/link";
import { getWargaById, updateWarga } from "@/app/actions/warga";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditWargaPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const warga = await getWargaById(id);

  if (!warga) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-600">Data warga tidak ditemukan.</p>
        <Link href="/dashboard/warga" className="text-green-600">Kembali</Link>
      </div>
    );
  }

  // enforce data isolation: Dukuh can only edit their own WARGA, WARGA can edit only themselves
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const session = sessionCookie ? JSON.parse(sessionCookie.value as string) : null;
    const sid = session && typeof session.id === "number" ? session.id : session ? parseInt(String(session.id), 10) : null;

    if (session?.role === "DUKUH") {
      if (warga.role !== "WARGA" || warga.dukuhId !== sid) {
        return notFound();
      }
    }

    if (session?.role === "WARGA") {
      if (warga.id !== sid) {
        return notFound();
      }
    }
  } catch (e) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Edit Data Warga</h1>

          <form action={updateWarga} className="space-y-4">
            <input type="hidden" name="id" value={String(warga.id)} />

            <div>
              <label className="block text-sm text-gray-700">Nama Lengkap</label>
              <input name="nama" defaultValue={warga.nama} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">NIK</label>
              <input name="nik" defaultValue={warga.nik} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Role</label>
              <select name="role" defaultValue={warga.role} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                <option value="WARGA">WARGA</option>
                <option value="DUKUH">DUKUH</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
              <Link href={`/dashboard/warga/${warga.id}`} className="px-4 py-2 border rounded">Batal</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
