"use server";

import prisma from "../../lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginResult =
  | { success: true; user: { id: number; nama: string; role: string } }
  | { success: false; error: string };

export async function loginUser(nik: string, password: string): Promise<LoginResult> {
  if (!nik || !password) {
    return { success: false, error: "NIK dan password wajib diisi" };
  }

  const user = await prisma.user.findUnique({ where: { nik } });

  if (!user) {
    return { success: false, error: "NIK tidak ditemukan" };
  }

  // NOTE: plain-text password check for initial implementation
  if (user.password !== password) {
    return { success: false, error: "Password salah" };
  }

  if (user.statusAkun === "PENDING") {
    if (user.role === "WARGA") {
      return { success: false, error: "Akun Anda belum disetujui oleh Dukuh. Silakan tunggu verifikasi." };
    }

    if (user.role === "DUKUH") {
      return { success: false, error: "Akun Dukuh Anda sedang menunggu verifikasi dari Admin Pusat." };
    }

    return { success: false, error: "Akun Anda sedang menunggu verifikasi." };
  }

  const userData = { id: user.id, nama: user.nama, role: user.role };

  // set session cookie (httpOnly)
  try {
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(userData), { httpOnly: true });
  } catch (e) {
    // ignore cookie set failure
  }

  return { success: true, user: userData };
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  } catch (e) {
    // ignore
  }

  redirect("/login");
}
