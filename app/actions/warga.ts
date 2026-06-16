"use server";

import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getSemuaWarga() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  let session: any = null;
  try {
    session = sessionCookie ? JSON.parse(sessionCookie.value as string) : null;
  } catch (e) {
    session = null;
  }

  if (session?.role === "ADMIN") {
    return prisma.user.findMany({
      where: { role: { in: ["DUKUH", "WARGA"] } },
      orderBy: { createdAt: "desc" },
    });
  }

  if (session?.role === "DUKUH") {
    const sid = typeof session.id === "number" ? session.id : parseInt(String(session.id), 10);
    return prisma.user.findMany({
      where: { role: "WARGA", dukuhId: sid },
      orderBy: { createdAt: "desc" },
    });
  }

  if (session?.role === "WARGA") {
    const sid = typeof session.id === "number" ? session.id : parseInt(String(session.id), 10);
    return prisma.user.findMany({ where: { id: sid }, orderBy: { nama: "asc" } });
  }

  // fallback: do not expose user list
  return [];
}

export async function getWargaById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function hapusWarga(formData: FormData) {
  const idRaw = formData.get("id");
  const id = typeof idRaw === "string" ? parseInt(idRaw, 10) : Number(idRaw);
  if (!id) throw new Error("Invalid id");

  await prisma.user.delete({ where: { id } });

  revalidatePath("/dashboard/warga");
  redirect("/dashboard/warga");
}

export async function updateWarga(formData: FormData) {
  const idRaw = formData.get("id");
  const namaRaw = formData.get("nama");
  const nikRaw = formData.get("nik");
  const roleRaw = formData.get("role");

  const id = typeof idRaw === "string" ? parseInt(idRaw, 10) : Number(idRaw);
  if (!id) throw new Error("Invalid id");

  const data: any = {};
  if (typeof namaRaw === "string") data.nama = namaRaw.trim();
  if (typeof nikRaw === "string") data.nik = nikRaw.trim();
  if (typeof roleRaw === "string") data.role = roleRaw;

  await prisma.user.update({ where: { id }, data });

  revalidatePath("/dashboard/warga");
  redirect(`/dashboard/warga/${id}`);
}
