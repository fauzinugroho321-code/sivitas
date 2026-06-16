import prisma from "../../lib/prisma";

export default async function DashboardPage() {
  const totalAduan = await prisma.aduan.count();
  const suratDiproses = await prisma.surat.count({ where: { status: "PENDING" } });
  const totalInformasi = await prisma.informasi.count();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-800">Selamat Datang, Pak Dukuh</h1>
          <p className="text-sm text-gray-600 mt-1">Ringkasan singkat aktivitas dan statistik desa.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Highlight card */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-green-700 to-green-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-sm opacity-90">Total Aduan</div>
              <div className="mt-2 text-5xl font-bold">{totalAduan}</div>
              <div className="text-sm opacity-80 mt-2">Aduan yang masuk hingga hari ini</div>
            </div>
            <div className="absolute -right-6 -top-6 opacity-20 w-48 h-48 rounded-full bg-white/30 transform rotate-45"></div>
          </div>

          {/* Small stat cards */}
          <div className="col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500">Surat Diproses</div>
            <div className="mt-2 text-3xl font-bold text-green-800">{suratDiproses}</div>
            <div className="text-xs text-gray-400 mt-1">Permohonan surat yang sedang diproses</div>
          </div>

          <div className="col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500">Pengumuman Aktif</div>
            <div className="mt-2 text-3xl font-bold text-green-800">{totalInformasi}</div>
            <div className="text-xs text-gray-400 mt-1">Pengumuman publik yang sedang tayang</div>
          </div>

          {/* Placeholder wide chart */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[300px] bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Statistik Aduan Mingguan</h3>
            <div className="w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-200">Area Grafik (Coming Soon)</div>
          </div>

          {/* Placeholder activity */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 min-h-[300px] bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-green-100" />
                <span className="text-gray-600">Aduan baru masuk</span>
              </div>
              <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-100" />
                <span className="text-gray-600">Surat disetujui</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
