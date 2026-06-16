import Link from "next/link";
import prisma from "../../lib/prisma";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  const daftarDukuhRaw = await prisma.user.findMany({ where: { role: "DUKUH" } });
  const daftarDukuh = daftarDukuhRaw.map((d: any) => ({ id: d.id, nama: d.nama, nik: d.nik }));

  return (
    <div
      className="min-h-screen w-full flex justify-center items-start overflow-y-auto py-16 px-4"
      style={{
        backgroundImage: "url('/background-login.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ecfdf5',
      }}
    >
      <div className="w-full max-w-4xl mx-auto bg-white/98 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-200 relative z-10">
        <div className="mb-6 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0f3d32] transition-colors text-sm font-bold group">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f3d32] mb-3">Daftar Akun</h1>
          <p className="text-slate-500 max-w-lg mx-auto">Bergabunglah dengan SIVITAS untuk akses layanan administrasi desa yang lebih mudah.</p>
        </div>

        <RegisterForm daftarDukuh={daftarDukuh} />
      </div>
    </div>
  );
}
