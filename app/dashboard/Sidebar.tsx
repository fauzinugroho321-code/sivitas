"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, FileText, MessageCircle, Bell, Download, CheckSquare, LogOut } from "lucide-react";
import { logoutUser } from "../actions/auth";
import React from "react";

type Props = { role: string; };

export default function Sidebar({ role }: Props) {
  const pathname = usePathname() || "/";
  const menusWarga = [
    { label: "Pengajuan Keluhan", href: "/dashboard/aduan", icon: <MessageCircle className="w-5 h-5" /> },
    { label: "Pengajuan Surat", href: "/dashboard/surat", icon: <FileText className="w-5 h-5" /> },
    { label: "Papan Informasi", href: "/dashboard/informasi", icon: <Bell className="w-5 h-5" /> },
    { label: "Profil Keluarga", href: "/dashboard/profil", icon: <Users className="w-5 h-5" /> },
  ];

  const menusDukuh = [
    { label: "Dashboard Statistik", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { label: "Manajemen Data Warga", href: "/dashboard/warga", icon: <Users className="w-5 h-5" /> },
    { label: "Pusat Verifikasi", href: "/dashboard/verifikasi", icon: <CheckSquare className="w-5 h-5" /> },
    { label: "Aduan Warga", href: "/dashboard/aduan", icon: <MessageCircle className="w-5 h-5" /> },
    { label: "Manajemen Surat", href: "/dashboard/surat", icon: <FileText className="w-5 h-5" /> },
    { label: "Pusat Informasi", href: "/dashboard/informasi", icon: <Bell className="w-5 h-5" /> },
    { label: "Ekspor Laporan", href: "/dashboard/ekspor", icon: <Download className="w-5 h-5" /> },
  ];

  const menus = role === "WARGA" ? menusWarga : menusDukuh;

  return (
    <div className="flex-1 flex flex-col">
      <nav className="flex-1 overflow-y-auto py-2">
        {menus.map((item) => {
          // Active only when pathname exactly equals the menu href
          const active = pathname === item.href;
          const base = "flex items-center gap-3 px-4 py-3 mx-4 mb-2 transition-all duration-200";
          const activeCls = "bg-white/20 text-white font-semibold shadow-inner rounded-xl";
          const inactiveCls = "text-white/90 hover:bg-white/10 hover:text-white rounded-xl transition-all";

          return (
            <Link key={item.href} href={item.href} className={`${base} ${active ? activeCls : inactiveCls}`}>
              <span className="flex items-center justify-center">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/20 pt-4 pb-6">
        <div className="px-4">
          <form action={logoutUser}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/90 transition-all duration-200 hover:bg-red-500/20 hover:text-red-100">
              <LogOut className="w-5 h-5" />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
