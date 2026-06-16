"use client";

import React, { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/actions/register";

type Dukuh = { id: number; nama: string; nik: string };

export default function RegisterForm({ daftarDukuh }: { daftarDukuh: Dukuh[] }) {
  const [role, setRole] = useState<string>("WARGA");

  return (
    <form action={registerUser} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
        <input name="nama" required className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">NIK</label>
        <input name="nik" required className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">No HP</label>
        <input name="noHp" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Password</label>
        <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Provinsi</label>
        <input name="provinsi" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Kabupaten</label>
        <input name="kabupaten" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Kecamatan</label>
        <input name="kecamatan" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Desa</label>
        <input name="desa" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Dusun</label>
        <input name="dusun" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
      </div>

      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2">RW</label>
            <input name="rw" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2">RT</label>
            <input name="rt" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800" />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2">Daftar Sebagai (Role)</label>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800">
          <option value="WARGA">WARGA</option>
          <option value="DUKUH">DUKUH</option>
        </select>
      </div>

      {role === "WARGA" && (
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2">Pilih Dukuh</label>
          <select name="dukuhId" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#0f3d32] focus:border-transparent outline-none text-slate-800">
            <option value="">-- Pilih Dukuh --</option>
            {daftarDukuh.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama} ({d.nik})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="md:col-span-2 mt-4">
        <button type="submit" className="w-full bg-[#0f3d32] hover:bg-[#0a2922] text-white py-4 rounded-xl font-bold shadow-lg transition-all">Daftar (Menunggu Persetujuan)</button>

        <div className="mt-6 text-center text-slate-500 text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#0f3d32] font-bold hover:underline">
            Masuk
          </Link>
        </div>
      </div>
    </form>
  );
}
