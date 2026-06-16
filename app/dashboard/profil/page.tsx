import Link from "next/link";
import { cookies } from "next/headers";
import prisma from "../../../lib/prisma";

export default async function ProfilPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  let user: any = null;
  let fallbackNama = "";

  if (sessionCookie?.value) {
    try {
      const session = JSON.parse(sessionCookie.value as string);
      fallbackNama = session?.nama ?? "";

      const uid = typeof session.id === "number" ? session.id : parseInt(String(session.id), 10);
      if (!Number.isNaN(uid)) {
        user = await prisma.user.findUnique({ where: { id: uid }, include: { anggotaKeluarga: true } });
      }
    } catch (e) {
      // ignore
    }
  }

  const nama = user?.nama ?? fallbackNama ?? "-";
  const nik = user?.nik ?? "-";
  const noKk = user?.noKk ?? "-";
  const alamat = user?.alamat ?? "-";
  const anggota = user?.anggotaKeluarga ?? [];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Profil Keluarga</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nama Kepala Keluarga</p>
            <p className="text-lg font-medium text-gray-800">{nama || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Nomor NIK</p>
            <p className="text-lg font-medium text-gray-800">{nik || "-"}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Nomor KK</p>
          <p className="mt-1 text-gray-700">{noKk || "-"}</p>

          <p className="text-sm text-gray-500 mt-4">Alamat</p>
          <p className="mt-1 text-gray-700">{alamat || "-"}</p>

          <Link href="/dashboard/profil/edit" className="mt-4 inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
            Edit / Ajukan Pembaruan Data
          </Link>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-3 bg-gray-100 border-b">
          <h2 className="text-sm font-semibold text-gray-700">Anggota Keluarga</h2>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hubungan</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Lahir</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agama</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendidikan</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pekerjaan</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gol. Darah</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kawin</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Kawin</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kewarganegaraan</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Paspor</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Ayah</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Ibu</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {anggota.length === 0 ? (
                <tr>
                  <td colSpan={17} className="px-3 py-2 text-sm text-gray-700">Belum ada anggota keluarga.</td>
                </tr>
              ) : (
                anggota.map((a: any, idx: number) => (
                  <tr key={a.id}>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{idx + 1}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.nik ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.nama ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.hubungan ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.jenisKelamin ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.tempatLahir ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.tanggalLahir ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.agama ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.pendidikan ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.jenisPekerjaan ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.golonganDarah ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.statusPerkawinan ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.tanggalKawin ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.kewarganegaraan ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.noPaspor ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.namaAyah ?? '-'}</td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap">{a.namaIbu ?? '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
