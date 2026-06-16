"use server";

import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";

export async function getSurat() {
  return prisma.surat.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function tambahSurat(formData: FormData) {
  const jenisRaw = formData.get("jenis_surat");
  const jenis = typeof jenisRaw === "string" ? jenisRaw.trim() : "";

  if (!jenis) {
    throw new Error("Jenis surat wajib dipilih");
  }

  // Hardcoded user id for initial implementation (Pak Dukuh)
  const userId = 1;

  await prisma.surat.create({
    data: {
      jenis_surat: jenis,
      status: "PENDING",
      userId,
    },
  });

  redirect("/dashboard/surat");
}
