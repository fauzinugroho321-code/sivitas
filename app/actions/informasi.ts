"use server";

import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getInformasi() {
  return prisma.informasi.findMany({
    orderBy: { createdAt: "desc" },
    include: { pembuat: true },
  });
}

export async function tambahInformasi(formData: FormData) {
  const judulRaw = formData.get("judul");
  const kontenRaw = formData.get("konten");
  const tipeRaw = formData.get("tipe");

  const judul = typeof judulRaw === "string" ? judulRaw.trim() : "";
  const konten = typeof kontenRaw === "string" ? kontenRaw.trim() : "";

  if (!judul || !konten) {
    throw new Error("Judul dan konten wajib diisi");
  }

  // determine pembuat from session cookie if present
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  let pembuatId: number | undefined = undefined;
  let penulisName: string | undefined = undefined;
  if (sessionCookie?.value) {
    try {
      const session = JSON.parse(sessionCookie.value as string);
      const sid = typeof session.id === "number" ? session.id : session ? parseInt(String(session.id), 10) : null;
      if (sid) pembuatId = sid;
      if (session.nama) penulisName = session.nama;
    } catch (e) {
      // ignore
    }
  }

  const data: any = {
    judul,
    konten,
    tipe: typeof tipeRaw === "string" && (tipeRaw === "UMUM" || tipeRaw === "KHUSUS") ? tipeRaw : "UMUM",
  };

  if (typeof pembuatId === "number") data.pembuatId = pembuatId;
  if (typeof penulisName === "string" && penulisName.length > 0) data.penulis = penulisName;

  await prisma.informasi.create({ data });

  // revalidate home and informasi list
  try {
    revalidatePath("/");
    revalidatePath("/dashboard/informasi");
  } catch (e) {
    // no-op
  }

  redirect("/dashboard/informasi");
}
