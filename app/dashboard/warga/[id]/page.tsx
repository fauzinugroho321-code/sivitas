import Link from "next/link";
import { getWargaById } from "@/app/actions/warga";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function WargaDetailPage({ params }: { params: { id: string } }) {
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

  // enforce data isolation: Dukuh can only view their own WARGA, WARGA can view only themselves
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
    // if session parsing fails, treat as not found for safety
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Detail Warga</h1>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Nama</div>
              <div className="text-lg font-medium text-gray-800">{warga.nama}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">NIK</div>
              <div className="text-lg font-medium text-gray-800">{warga.nik}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Role</div>
              <div className="text-lg font-medium text-gray-800">{warga.role}</div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link href="/dashboard/warga" className="px-4 py-2 border rounded">Kembali</Link>
            <Link href={`/dashboard/warga/${warga.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
