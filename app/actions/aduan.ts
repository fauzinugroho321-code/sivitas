"use server";

import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getAduan() {
  return prisma.aduan.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function tambahAduan(formData: FormData) {
  const judulRaw = formData.get("judul");
  const deskripsiRaw = formData.get("deskripsi");

  const judul = typeof judulRaw === "string" ? judulRaw.trim() : "";
  const deskripsi = typeof deskripsiRaw === "string" ? deskripsiRaw.trim() : "";

  if (!judul || !deskripsi) {
    throw new Error("Judul dan deskripsi wajib diisi");
  }

  // Hardcoded user id for initial implementation (Pak Dukuh)
  const userId = 1;

  await prisma.aduan.create({
    data: {
      judul,
      deskripsi,
      status: "PENDING",
      userId,
    },
  });

  redirect("/dashboard/aduan");
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

  revalidatePath("/dashboard/aduan");
}
