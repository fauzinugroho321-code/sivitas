import React from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutUser } from "../actions/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const rawSessionCookie = cookieStore.get("session");

  if (!rawSessionCookie || !rawSessionCookie.value) {
    redirect("/login");
  }

  let sessionCookie: { id: number; nama: string; role: string } | null = null;
  try {
    sessionCookie = JSON.parse(rawSessionCookie.value as string);
  } catch (e) {
    redirect("/login");
  }

  const nama = sessionCookie?.nama ?? "";
  const role = sessionCookie?.role ?? "WARGA";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 1. SIDEBAR KIRI (WAJIB HIJAU) */}
      <aside className="w-64 bg-[#0B6E4F] text-white flex flex-col h-full overflow-y-auto p-6">
        {/* PERTAHANKAN ISI LOGO DAN MENU SIDEBAR ANDA DI SINI */}
        <div className="mb-4">
          <Image
            src="/logo-sivitas-dashboard.png"
            alt="Logo SIVITAS"
            width={220}
            height={70}
            className="object-contain cursor-pointer mix-blend-multiply"
            priority
          />
          <div className="text-sm text-green-200 mt-1">{role === "WARGA" ? "Portal Warga" : "Panel Kelola Desa"}</div>
        </div>

        <div className="mb-6">
          <div className="text-sm">{nama}</div>
          <div className="text-xs text-green-200">{role}</div>
        </div>

        <nav className="flex-1">
          <Sidebar role={role} />
        </nav>
      </aside>

      {/* 2. AREA KANAN (KONTEN UTAMA) */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto p-4 md:p-8">

        {/* 3. HEADER PROFIL (WAJIB DI KANAN ATAS) */}
        <header className="w-full flex justify-end items-center mb-8">
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-800">{sessionCookie?.nama || "Pengguna SIVITAS"}</p>
              <p className="text-xs text-gray-500 font-medium">{sessionCookie?.role || "WARGA"}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg border-2 border-white shadow-sm">
              {sessionCookie?.nama ? sessionCookie.nama.charAt(0).toUpperCase() : "P"}
            </div>
          </div>
        </header>

        {/* 4. ISI DASHBOARD (BENTO GRID) */}
        {children}

      </main>
    </div>
  );
}
