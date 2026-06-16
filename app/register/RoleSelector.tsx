"use client";

import React, { useState } from "react";

type DukuhOption = { id: number; nama: string; nik: string };

export default function RoleSelector({ daftarDukuh }: { daftarDukuh: DukuhOption[] }) {
  const [role, setRole] = useState<string>("WARGA");

  return (
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Daftar Sebagai (Role)</label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2"
        >
          <option value="WARGA">WARGA</option>
          <option value="DUKUH">DUKUH</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pilih Dukuh</label>
        <select
          name="dukuhId"
          className={`mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 ${role === "DUKUH" ? "opacity-50 pointer-events-none" : ""}`}
          disabled={role === "DUKUH"}
        >
          <option value="">-- Pilih Dukuh --</option>
          {daftarDukuh.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nama} ({d.nik})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
