import { cookies } from "next/headers";
import { updateNama, tambahAnggotaKeluarga } from "@/app/actions/profil";
import Link from "next/link";
import prisma from "../../../../lib/prisma";

export default async function EditProfilPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  let nama = "";
  let id = "";
  let noKk = "";
  let alamat = "";

  if (sessionCookie?.value) {
    try {
      const s = JSON.parse(sessionCookie.value as string);
      nama = s?.nama ?? "";
      id = s?.id ? String(s.id) : "";

      const uid = typeof s.id === "number" ? s.id : parseInt(String(s.id), 10);
      if (!Number.isNaN(uid)) {
        const user = await prisma.user.findUnique({ where: { id: uid } });
        if (user) {
          nama = user.nama ?? nama;
          noKk = user.noKk ?? "";
          alamat = user.alamat ?? "";
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-green-800">Edit Profil Keluarga</h1>

          <form action={updateNama} className="mt-4 space-y-4">
            <input type="hidden" name="id" value={id} />
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input name="nama" defaultValue={nama} required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor KK</label>
              <input name="noKk" defaultValue={noKk} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Alamat Domisili</label>
              <input name="alamat" defaultValue={alamat} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
              <Link href="/dashboard/profil" className="px-4 py-2 border rounded">Batal</Link>
            </div>
          </form>

          <div className="mt-6 border-t pt-6">
            <h2 className="text-lg font-medium mb-3">Tambah Anggota Keluarga</h2>
            <form action={tambahAnggotaKeluarga} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="hidden" name="id" value={id} />

              <div>
                <label className="block text-sm font-medium text-gray-700">NIK</label>
                <input name="nik" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input name="nama" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hubungan</label>
                <input name="hubungan" required className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                <select name="jenisKelamin" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">-- Pilih --</option>
                  <option value="Laki-Laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                <input name="tempatLahir" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                <input type="date" name="tanggalLahir" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Agama</label>
                <select name="agama" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">-- Pilih --</option>
                  <option>Islam</option>
                  <option>Kristen</option>
                  <option>Katolik</option>
                  <option>Hindu</option>
                  <option>Buddha</option>
                  <option>Konghucu</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Pendidikan</label>
                <select name="pendidikan" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">-- Pilih --</option>
                  <option>Tidak/Belum Sekolah</option>
                  <option>SD</option>
                  <option>SMP</option>
                  <option>SMA/SMK</option>
                  <option>D1</option>
                  <option>D2</option>
                  <option>D3</option>
                  <option>S1</option>
                  <option>S2</option>
                  <option>S3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Pekerjaan</label>
                <select name="jenisPekerjaan" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">-- Pilih --</option>
                  <option>Tidak Bekerja</option>
                  <option>Pelajar/Mahasiswa</option>
                  <option>PNS</option>
                  <option>TNI/POLRI</option>
                  <option>Wiraswasta</option>
                  <option>Buruh</option>
                  <option>Petani</option>
                  <option>Nelayan</option>
                  <option>Ibu Rumah Tangga</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Golongan Darah</label>
                <select name="golonganDarah" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">-- Pilih --</option>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>O</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status Perkawinan</label>
                <select name="statusPerkawinan" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">-- Pilih --</option>
                  <option>Belum Kawin</option>
                  <option>Kawin</option>
                  <option>Cerai Hidup</option>
                  <option>Cerai Mati</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Kawin</label>
                <input type="date" name="tanggalKawin" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kewarganegaraan</label>
                <select name="kewarganegaraan" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">-- Pilih --</option>
                  <option>WNI</option>
                  <option>WNA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">No Paspor</label>
                <input name="noPaspor" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Ayah</label>
                <input name="namaAyah" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Ibu</label>
                <input name="namaIbu" className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2" />
              </div>

              <div className="md:col-span-2 flex items-center gap-3 mt-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Tambah Anggota</button>
                <Link href="/dashboard/profil" className="px-4 py-2 border rounded">Selesai</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
