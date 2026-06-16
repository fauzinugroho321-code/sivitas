"use server";

import prisma from "../../lib/prisma";

export async function getAllWarga() {
  return prisma.user.findMany({
    orderBy: { nama: "asc" },
  });
}

export async function getAllAduan() {
  return prisma.aduan.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllSurat() {
  return prisma.surat.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}
