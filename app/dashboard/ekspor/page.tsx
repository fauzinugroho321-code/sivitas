"use client";

import { useCallback, useState } from "react";

export default function EksporPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJson = useCallback(async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch error");
    return res.json();
  }, []);

  const escapeCSV = (value: any) => {
    if (value === null || value === undefined) return "";
    const s = String(value);
    if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const download = (filename: string, csv: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const exportWarga = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchJson("/api/ekspor/warga");
      const headers = ["NIK", "Nama", "Role", "CreatedAt"];
      const rows = data.map((r: any) => [
        escapeCSV(r.nik),
        escapeCSV(r.nama),
        escapeCSV(r.role),
        escapeCSV(r.createdAt),
      ]);
      const csv = [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
      download("data-warga.csv", csv);
    } catch (e: any) {
      setError(e.message || "Gagal mengekspor data warga");
    } finally {
      setLoading(false);
    }
  };

  const exportAduan = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchJson("/api/ekspor/aduan");
      const headers = ["Tanggal", "Pengirim", "Judul", "Deskripsi", "Status"];
      const rows = data.map((r: any) => [
        escapeCSV(r.createdAt),
        escapeCSV(r.user?.nama ?? ""),
        escapeCSV(r.judul),
        escapeCSV(r.deskripsi),
        escapeCSV(r.status),
      ]);
      const csv = [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
      download("data-aduan.csv", csv);
    } catch (e: any) {
      setError(e.message || "Gagal mengekspor aduan");
    } finally {
      setLoading(false);
    }
  };

  const exportSurat = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchJson("/api/ekspor/surat");
      const headers = ["Tanggal", "Nama Warga", "Jenis Surat", "Status"];
      const rows = data.map((r: any) => [
        escapeCSV(r.createdAt),
        escapeCSV(r.user?.nama ?? ""),
        escapeCSV(r.jenis_surat),
        escapeCSV(r.status),
      ]);
      const csv = [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
      download("data-surat.csv", csv);
    } catch (e: any) {
      setError(e.message || "Gagal mengekspor surat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Ekspor Laporan Desa</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-gray-800">Laporan Data Warga</h2>
            <p className="text-sm text-gray-600 mt-2">Unduh seluruh data warga dalam format CSV.</p>
            <button disabled={loading} onClick={exportWarga} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Unduh CSV</button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-gray-800">Laporan Aduan Warga</h2>
            <p className="text-sm text-gray-600 mt-2">Unduh seluruh data aduan untuk analisis atau arsip.</p>
            <button disabled={loading} onClick={exportAduan} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Unduh CSV</button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-gray-800">Laporan Pengajuan Surat</h2>
            <p className="text-sm text-gray-600 mt-2">Unduh semua record pengajuan surat warga.</p>
            <button disabled={loading} onClick={exportSurat} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Unduh CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}
