import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();

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
    return NextResponse.json({ error: "Nama, NIK, dan password wajib diisi" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { nik } });
  if (existing) {
    return NextResponse.json({ error: "NIK sudah terdaftar" }, { status: 400 });
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

  return NextResponse.redirect(new URL("/login", req.url));
}
