import Link from 'next/link';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Semua Berita & Pengumuman - SIVITAS',
  description: 'Arsip lengkap berita, pengumuman, dan informasi terbaru dari Pemerintah Desa.',
};

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.q || '';

  // Mengambil data dari Prisma dengan filter pencarian
  const semuaInformasi = await prisma.informasi.findMany({
    where: {
      tipe: 'UMUM',
      ...(searchQuery
        ? { judul: { contains: searchQuery } }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER & PENCARIAN */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 group text-sm font-medium">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Arsip Pengumuman Desa
          </h1>
          <p className="text-slate-500 max-w-3xl leading-relaxed text-sm md:text-base mb-8">
            Kumpulan pengumuman resmi dari Pemerintah Desa. Terbaru ditampilkan di atas. Temukan pengumuman berdasarkan judul menggunakan kolom pencarian di bawah ini.
          </p>

          <form action="/berita" method="GET" className="flex max-w-md bg-white rounded-full shadow-sm border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#0f3d32] focus-within:border-transparent transition-all">
            <div className="pl-4 flex items-center justify-center text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" name="q" defaultValue={searchQuery} placeholder="Cari judul pengumuman..." className="w-full py-2.5 px-3 outline-none text-slate-700 bg-transparent placeholder-slate-400 text-sm" />
            <button type="submit" className="bg-[#0f3d32] hover:bg-[#0a2922] text-white px-6 text-sm font-semibold transition-colors">Cari</button>
          </form>
        </div>

        {/* GRID KARTU */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semuaInformasi.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">Tidak ada pengumuman yang sesuai dengan pencarian Anda.</p>
            </div>
          ) : (
            semuaInformasi.map((info) => (
              <div key={info.id} className="bg-white rounded-[1.5rem] p-6 border border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group">
                <div className="flex justify-between items-center mb-5">
                  <span className="px-3 py-1 bg-[#0f3d32] text-white text-[10px] uppercase font-bold rounded-full tracking-wider">
                    INFORMASI
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(info.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-snug">
                  {info.judul}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {info.konten}
                </p>
                
                <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{info.penulis}</span>
                  </div>
                  
                  <Link href={`/berita/${info.id}`} className="inline-flex items-center justify-between w-full text-slate-900 font-bold text-xs hover:text-[#0f3d32] transition-colors group/btn">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
