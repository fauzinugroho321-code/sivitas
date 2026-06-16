"use server";

import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const getStr = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  const nama = getStr("nama");
  const nik = getStr("nik");
  const password = getStr("password");
  const noHp = getStr("noHp");
  const provinsi = getStr("provinsi");
  const kabupaten = getStr("kabupaten");
  const kecamatan = getStr("kecamatan");
  const desa = getStr("desa");
  const dusun = getStr("dusun");
  const rw = getStr("rw");
  const rt = getStr("rt");
  const dukuhIdRaw = getStr("dukuhId");
  const roleRaw = getStr("role");
  const role = roleRaw || "WARGA";

  if (!nama || !nik || !password) {
    throw new Error("Nama, NIK, dan password wajib diisi");
  }

  const existing = await prisma.user.findUnique({ where: { nik } });
  if (existing) {
    throw new Error("NIK sudah terdaftar");
  }

  const data: any = {
    nik,
    nama,
    password,
    noHp: noHp || null,
    provinsi: provinsi || null,
    kabupaten: kabupaten || null,
    kecamatan: kecamatan || null,
    desa: desa || null,
    dusun: dusun || null,
    rw: rw || null,
    rt: rt || null,
    role,
    statusAkun: "PENDING",
  };

  if (dukuhIdRaw) {
    const parsed = parseInt(dukuhIdRaw, 10);
    if (!Number.isNaN(parsed)) data.dukuhId = parsed;
  }

  await prisma.user.create({ data });

  redirect("/login");
}
