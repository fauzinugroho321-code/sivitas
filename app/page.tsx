import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import AnimateContainer from "@/components/AnimateContainer";
import AnimateItem from "@/components/AnimateItem";

export default async function Home() {
  const daftarInformasi = await prisma.informasi.findMany({
    where: { tipe: "UMUM" },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { pembuat: true },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <header className="sticky top-0 z-20 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-sivitas.png"
              alt="Logo SIVITAS"
              width={180}
              height={50}
              className="h-10 w-auto object-contain cursor-pointer"
              priority
            />
          </div>

          <div>
            <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Login</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION  */}
        <section className="w-full max-w-7xl mx-auto px-4 pt-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[600px]">

            {/* KOTAK UTAMA (KIRI) - Span 8 */}
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-sm group h-[400px] lg:h-[600px]">
                <Image
                  src="/Main-hero.png"
                  alt="Digitalisasi Desa"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              { }
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Teks Melayang di Atas Gambar */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Selamat Datang di Portal <br /> SIVITAS
                </h1>
                <p className="text-white/90 text-sm md:text-lg max-w-xl mb-8">
                  Langkah nyata menuju desa mandiri dan modern. Ajukan surat, sampaikan aspirasi, dan dapatkan informasi terkini langsung dari genggaman Anda.
                </p>
                <Link href="/login" className="inline-block bg-green-600 text-white font-bold px-8 py-3 rounded-full hover:bg-green-500 transition-all shadow-lg hover:shadow-green-500/30">
                  Masuk ke Sistem &rarr;
                </Link>
              </div>
            </div>

            {/* KOTAK PENDUKUNG (KANAN) - Span 4 */}
            <div className="lg:col-span-4 flex flex-col gap-4">

              {/* Pendukung 1 (Atas) */}
              <div className="relative rounded-3xl overflow-hidden shadow-sm group h-[250px] lg:h-[290px]">
                <Image
                  src="/support-hero1.png"
                  alt="Gotong Royong Warga"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                {/* Efek Glassmorphism */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white p-4 rounded-2xl">
                    <h3 className="font-semibold text-lg">Guyub Rukun</h3>
                    <p className="text-xs text-white/90 mt-1">Membangun desa dengan semangat gotong royong.</p>
                  </div>
                </div>
              </div>

              {/* Pendukung 2 (Bawah) */}
              <div className="relative rounded-3xl overflow-hidden shadow-sm group h-[250px] lg:h-[290px]">
                <Image
                  src="/support-hero2.png"
                  alt="Pelayanan Aparatur Desa"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                {/* Efek Glassmorphism */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white p-4 rounded-2xl">
                    <h3 className="font-semibold text-lg">Pelayanan Prima</h3>
                    <p className="text-xs text-white/90 mt-1">Aparatur desa hadir melayani sepenuh hati.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SEKSI FITUR UTAMA */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Layanan & Fitur Utama</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Solusi digital terpadu untuk kemudahan administrasi, aspirasi, dan informasi Desa.</p>
        </div>
        
        <AnimateContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kartu Fitur 1 */}
          <AnimateItem className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Layanan Pengajuan Surat</h3>
            <p className="text-gray-500 leading-relaxed">Ajukan berbagai jenis surat administrasi secara online dengan mudah, cepat, dan transparan tanpa harus antre di balai desa.</p>
          </AnimateItem>
          
          {/* Kartu Fitur 2 */}
          <AnimateItem className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Wadah Aspirasi & Aduan</h3>
            <p className="text-gray-500 leading-relaxed">Sampaikan aspirasi, saran, dan aduan secara langsung untuk tindak lanjut cepat dari perangkat desa demi lingkungan yang lebih baik.</p>
          </AnimateItem>
          
          {/* Kartu Fitur 3 */}
          <AnimateItem className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pusat Informasi Terkini</h3>
            <p className="text-gray-500 leading-relaxed">Akses pengumuman resmi, jadwal kegiatan, dan informasi penting lainnya yang dikabarkan langsung dari perangkat desa.</p>
          </AnimateItem>
        </AnimateContainer>
      </section>

      {/* SEKSI PENGUMUMAN */}
      <section className="w-full bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Pengumuman Desa</h2>
              <p className="text-gray-500 mt-3 text-lg">Kabar dan pembaruan terbaru dari Pemerintah Desa.</p>
            </div>
            <Link href="/berita" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-all flex items-center gap-2">
              Lihat Semua Berita
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          <AnimateContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {daftarInformasi.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-200 border-dashed">
                <p className="text-gray-400 font-medium text-lg">Belum ada pengumuman terbaru saat ini.</p>
              </div>
            ) : (
              daftarInformasi.map((info) => (
                <AnimateItem key={info.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">INFORMASI</span>
                    <span className="text-sm text-gray-400 font-medium">
                      {new Date(info.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-green-600 transition-colors leading-snug">{info.judul}</h3>
                  <p className="text-gray-500 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed">{info.konten}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{info.penulis}</span>
                    </div>
                    <span className="text-green-600 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Baca <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </AnimateItem>
              ))
            )}
          </AnimateContainer>
        </div>
      </section>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-600">© 2026 SIVITAS - Sistem Informasi Desa</div>
      </footer>
    </div>
  );
}
