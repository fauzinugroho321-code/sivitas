"use server";

import prisma from "../../lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateNama(formData: FormData) {
  const namaRaw = formData.get("nama");
  const nama = typeof namaRaw === "string" ? namaRaw.trim() : "";
  const noKkRaw = formData.get("noKk");
  const alamatRaw = formData.get("alamat");
  const noKk = typeof noKkRaw === "string" ? noKkRaw.trim() : "";
  const alamat = typeof alamatRaw === "string" ? alamatRaw.trim() : "";

  if (!nama) {
    throw new Error("Nama tidak boleh kosong");
  }

  // Prefer id from form (hidden input), fallback to session cookie
  const idRaw = formData.get("id");
  let id: number | null = null;
  if (typeof idRaw === "string" && idRaw.trim() !== "") {
    const parsed = parseInt(idRaw, 10);
    if (!Number.isNaN(parsed)) id = parsed;
  }

  if (!id) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie?.value) {
      throw new Error("Tidak terautentikasi");
    }

    let session: any = null;
    try {
      session = JSON.parse(sessionCookie.value as string);
    } catch (e) {
      throw new Error("Sesi tidak valid");
    }

    const sid = typeof session.id === "number" ? session.id : parseInt(String(session.id), 10);
    if (!sid || Number.isNaN(sid)) throw new Error("ID pengguna tidak valid");
    id = sid;
  }

  const updateData: any = { nama };
  if (noKk !== "") updateData.noKk = noKk;
  if (alamat !== "") updateData.alamat = alamat;

  await prisma.user.update({ where: { id }, data: updateData });

  revalidatePath("/dashboard/profil");
  redirect("/dashboard/profil");
}

export async function tambahAnggotaKeluarga(formData: FormData) {
  const getStr = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  const nik = getStr("nik");
  const nama = getStr("nama");
  const hubungan = getStr("hubungan");
  const jenisKelamin = getStr("jenisKelamin");
  const tempatLahir = getStr("tempatLahir");
  const tanggalLahir = getStr("tanggalLahir");
  const agama = getStr("agama");
  const pendidikan = getStr("pendidikan");
  const jenisPekerjaan = getStr("jenisPekerjaan");
  const golonganDarah = getStr("golonganDarah");
  const statusPerkawinan = getStr("statusPerkawinan");
  const tanggalKawin = getStr("tanggalKawin");
  const kewarganegaraan = getStr("kewarganegaraan");
  const noPaspor = getStr("noPaspor");
  const namaAyah = getStr("namaAyah");
  const namaIbu = getStr("namaIbu");

  if (!nik || !nama || !hubungan) {
    throw new Error("NIK, nama, dan hubungan harus diisi");
  }

  // Prefer id from form (hidden input), fallback to session cookie
  const idRaw = formData.get("id");
  let id: number | null = null;
  if (typeof idRaw === "string" && idRaw.trim() !== "") {
    const parsed = parseInt(idRaw, 10);
    if (!Number.isNaN(parsed)) id = parsed;
  }

  if (!id) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie?.value) {
      throw new Error("Tidak terautentikasi");
    }

    let session: any = null;
    try {
      session = JSON.parse(sessionCookie.value as string);
    } catch (e) {
      throw new Error("Sesi tidak valid");
    }

    const sid = typeof session.id === "number" ? session.id : parseInt(String(session.id), 10);
    if (!sid || Number.isNaN(sid)) throw new Error("ID pengguna tidak valid");
    id = sid;
  }

  const data: any = {
    nik,
    nama,
    hubungan,
    user: { connect: { id } },
  };

  if (jenisKelamin) data.jenisKelamin = jenisKelamin;
  if (tempatLahir) data.tempatLahir = tempatLahir;
  if (tanggalLahir) data.tanggalLahir = tanggalLahir;
  if (agama) data.agama = agama;
  if (pendidikan) data.pendidikan = pendidikan;
  if (jenisPekerjaan) data.jenisPekerjaan = jenisPekerjaan;
  if (golonganDarah) data.golonganDarah = golonganDarah;
  if (statusPerkawinan) data.statusPerkawinan = statusPerkawinan;
  if (tanggalKawin) data.tanggalKawin = tanggalKawin;
  if (kewarganegaraan) data.kewarganegaraan = kewarganegaraan;
  if (noPaspor) data.noPaspor = noPaspor;
  if (namaAyah) data.namaAyah = namaAyah;
  if (namaIbu) data.namaIbu = namaIbu;

  await prisma.anggotaKeluarga.create({ data });

  revalidatePath("/dashboard/profil");
  redirect("/dashboard/profil");
}
