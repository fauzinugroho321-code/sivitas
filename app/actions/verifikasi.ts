"use server";

import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPendingItems() {
  const aduans = await prisma.aduan.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const surats = await prisma.surat.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const pendingUsers = await prisma.user.findMany({
    where: { statusAkun: "PENDING", role: "WARGA" },
    orderBy: { createdAt: "desc" },
  });

  return { aduans, surats, pendingUsers };
}

export async function updateStatusAduan(formData: FormData) {
  const idRaw = formData.get("id");
  const statusRaw = formData.get("status");

  const id = typeof idRaw === "string" ? parseInt(idRaw, 10) : Number(idRaw);
  const status = typeof statusRaw === "string" ? statusRaw : String(statusRaw);

  if (!id || !status) {
    throw new Error("Invalid id or status");
  }

  await prisma.aduan.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/dashboard/verifikasi");
}

export async function updateStatusSurat(formData: FormData) {
  const idRaw = formData.get("id");
  const statusRaw = formData.get("status");

  const id = typeof idRaw === "string" ? parseInt(idRaw, 10) : Number(idRaw);
  const status = typeof statusRaw === "string" ? statusRaw : String(statusRaw);

  if (!id || !status) {
    throw new Error("Invalid id or status");
  }

  await prisma.surat.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/dashboard/verifikasi");
}

export async function setujuiWarga(formData: FormData) {
  const idRaw = formData.get("id");
  const id = typeof idRaw === "string" ? parseInt(idRaw, 10) : Number(idRaw);
  if (!id) throw new Error("Invalid id");

  await prisma.user.update({ where: { id }, data: { statusAkun: "APPROVED" } });

  revalidatePath("/dashboard/verifikasi");
  revalidatePath("/dashboard/warga");
}
