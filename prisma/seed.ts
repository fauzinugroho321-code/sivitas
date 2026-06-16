import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pad(n: number, width = 10) {
  return String(n).padStart(width, "0");
}

async function main() {
  console.log("Cleaning database...");
  // delete children first to avoid foreign key issues
  await prisma.aduan.deleteMany();
  await prisma.surat.deleteMany();
  await prisma.anggotaKeluarga.deleteMany();
  await prisma.informasi.deleteMany();
  await prisma.user.deleteMany();

  console.log("Generating users (mass)...");

  let nikCounter = 1990000000; // used to generate unique NIK tails

  const admin = await prisma.user.create({
    data: {
      nik: `320101${nikCounter++}`,
      password: "AdminDesa2026!",
      nama: "Admin Desa",
      role: "ADMIN",
      statusAkun: "APPROVED",
      noHp: "081200000001",
      desa: "Tirtonirmolo",
      dusun: "Mekarsari",
    },
  });

  const dukuhNames = ["Budi Santoso", "Slamet Riyadi", "Rahayu Suryani"];
  const dukuhs = [] as any[];
  for (let i = 0; i < dukuhNames.length; i++) {
    const u = await prisma.user.create({
      data: {
        nik: `320101${nikCounter++}`,
        password: `dukuh${i + 1}2026`,
        nama: dukuhNames[i],
        role: "DUKUH",
        statusAkun: "APPROVED",
        noHp: `08123${pad(i + 100, 6)}`,
        desa: "Tirtonirmolo",
        dusun: "Mekarsari",
      },
    });
    dukuhs.push(u);
  }

  const wargaNames = [
    "Rina Wijaya","Andi Saputra","Mawar Indah","Siti Aminah","Eko Prasetyo","Nina Lestari",
    "Hendra Putra","Dewi Sartika","Joko Susilo","Suwarno","Sri Hartati","Agus Nugroho",
    "Fitriani","Wahyu Hidayat","Lia Kurnia","Rizki Pratama",
  ];

  const wargaUsers = [] as any[];
  for (let i = 0; i < wargaNames.length; i++) {
    const dukuh = pick(dukuhs);
    const u = await prisma.user.create({
      data: {
        nik: `320101${nikCounter++}`,
        password: `warga${i + 1}2026`,
        nama: wargaNames[i],
        role: "WARGA",
        statusAkun: "APPROVED",
        noHp: `0812${pad(200000 + i, 7)}`,
        desa: "Tirtonirmolo",
        dusun: "Mekarsari",
        dukuhId: dukuh.id,
      },
    });
    wargaUsers.push(u);
  }

  // ensure total users >= 20 (1 admin + 3 dukuh + 16 warga = 20)
  console.log(`Created users: admin(1), dukuh(${dukuhs.length}), warga(${wargaUsers.length})`);

  // INFORMASI (15+)
  console.log("Seeding informasi (mass)...");
  const informasiTemplates = [
    {
      judul: "Jadwal Imunisasi Balita Posyandu Mekarsari",
      konten:
        "Imunisasi balita akan dilaksanakan di Posyandu Mekarsari pada Sabtu pukul 08.00-11.00. Mohon hadir tepat waktu dan membawa Kartu KMS serta identitas anak.",
      tipe: "UMUM",
    },
    {
      judul: "Pemberitahuan Pemadaman Listrik Bergilir",
      konten:
        "PLN akan melakukan pemadaman bergilir untuk pemeliharaan jaringan pada Rabu pukul 09.00-15.00. Harap mempersiapkan sumber listrik cadangan jika diperlukan.",
      tipe: "UMUM",
    },
    {
      judul: "Kerja Bakti Saluran Air RW 03",
      konten:
        "Kerja bakti akan dilaksanakan pada Minggu pagi. Warga RW 03 diharapkan membawa peralatan sederhana untuk membersihkan saluran agar tidak terjadi banjir saat musim hujan.",
      tipe: "UMUM",
    },
    {
      judul: "Pembagian Sembako untuk Lansia Terdaftar",
      konten:
        "Pembagian paket sembako akan dilakukan di Balai Desa. RT/RW diminta membantu verifikasi data penerima agar tepat sasaran.",
      tipe: "KHUSUS",
    },
    {
      judul: "Pengumuman Rapat Koordinasi RT",
      konten:
        "Rapat koordinasi antar RT akan diadakan di Balai Desa untuk membahas agenda kebersihan dan keamanan lingkungan. Mohon hadir perwakilan RT/RW.",
      tipe: "UMUM",
    },
    {
      judul: "Pembangunan Jalan Gang Kenanga",
      konten:
        "Pekerjaan pengerasan jalan di Gang Kenanga dimulai minggu depan. Harap maklum atas gangguan sementara dan ikuti petunjuk petugas lapangan.",
      tipe: "KHUSUS",
    },
    {
      judul: "Pemberitahuan Vaksinasi Hewan Peliharaan",
      konten:
        "Vaksinasi rabies untuk hewan peliharaan akan diselenggarakan di Lapangan Desa. Pemilik hewan dimohon hadir dan membawa bukti vaksin sebelumnya jika ada.",
      tipe: "UMUM",
    },
    {
      judul: "Pendaftaran Program Bantuan Sosial",
      konten:
        "Pendaftaran program bantuan sosial dibuka mulai 1 Agustus. Bawa fotokopi KTP dan KK ke kantor desa untuk proses verifikasi.",
      tipe: "UMUM",
    },
    {
      judul: "Perbaikan Jembatan Gantung RT 04",
      konten:
        "Jembatan gantung di RT 04 akan diperbaiki dan ditutup sementara selama dua hari. Mohon menggunakan jalur alternatif.",
      tipe: "KHUSUS",
    },
    {
      judul: "Pengumuman Pemilihan Ketua RT",
      konten:
        "Pemilihan Ketua RT akan diselenggarakan pada akhir bulan. Calon dapat mendaftar di kantor desa dan mengikuti tata cara yang ditetapkan.",
      tipe: "UMUM",
    },
    {
      judul: "Penyuluhan Pertanian dan Penggunaan Pupuk",
      konten:
        "Penyuluhan untuk petani kecil akan diadakan dengan narasumber dari dinas pertanian untuk meningkatkan produktivitas lahan.",
      tipe: "UMUM",
    },
    {
      judul: "Penutupan Sementara Balai Desa",
      konten:
        "Balai Desa tutup sementara pada hari libur nasional. Layanan administrasi akan dibuka kembali pada hari kerja berikutnya.",
      tipe: "UMUM",
    },
    {
      judul: "Pemberitahuan Pencairan Bantuan Langsung Tunai",
      konten:
        "Pencairan BLT akan dilakukan berdasarkan jadwal per RT. Warga penerima diminta membawa KTP untuk verifikasi.",
      tipe: "KHUSUS",
    },
    {
      judul: "Himbauan Kebersihan Lingkungan RW 05",
      konten:
        "Kegiatan kebersihan lingkungan bersama akan dilaksanakan pada Sabtu pagi. Harap semua RW berpartisipasi untuk menjaga lingkungan sehat.",
      tipe: "UMUM",
    },
    {
      judul: "Pengumuman Libur Layanan Administrasi",
      konten:
        "Layanan administrasi desa libur pada tanggal merah. Pelayanan akan kembali normal pada hari kerja berikutnya.",
      tipe: "UMUM",
    },
  ];

  // attach pembuatId randomly among admin and dukuhs
  for (const tpl of informasiTemplates) {
    const pembuat = pick([admin, ...dukuhs]);
    await prisma.informasi.create({
      data: {
        judul: tpl.judul,
        konten: tpl.konten,
        penulis: pembuat.nama,
        tipe: tpl.tipe,
        pembuatId: pembuat.id,
      },
    });
  }

  // Additional randomly generated informasi to reach at least 15 (already 15 in templates)

  console.log("Seeding aduan (mass, 25)...");
  const aduanTitles = [
    "Lampu Penerangan Jalan Padam",
    "Selokan Mampet di Gang Mawar",
    "Jalan Berlubang di RT 05",
    "Tumpukan Sampah di TPS RW 02",
    "Kebisingan dari Kegiatan Malam",
    "Pohon Tumbang Menutup Jalan",
    "Air PDAM Keruh",
    "Kebocoran Pipa Air",
  ];

  const aduanStatuses = ["PENDING", "DIPROSES", "SELESAI"];

  for (let i = 0; i < 25; i++) {
    const title = pick(aduanTitles);
    const warga = pick(wargaUsers);
    const status = pick(aduanStatuses);
    const desc = `${title} di area ${pick(["Jl. Mawar", "Jl. Kenanga", "Gang Melati", "RT 05"])}. Mohon penanganan segera agar ketenteraman dan kenyamanan warga kembali terjaga.`;
    await prisma.aduan.create({
      data: {
        judul: title,
        deskripsi: desc,
        status,
        userId: warga.id,
      },
    });
  }

  console.log("Seeding surat (mass, 20)...");
  const suratTypes = [
    "Surat Keterangan Domisili",
    "Surat Pengantar RT/RW",
    "Surat Keterangan Tidak Mampu",
    "Surat Keterangan Usaha",
    "Surat Keterangan Catatan Kepolisian",
  ];
  const suratStatuses = ["PENDING", "DISETUJUI", "DITOLAK"];

  for (let i = 0; i < 20; i++) {
    const jenis = pick(suratTypes);
    const status = pick(suratStatuses);
    const user = pick(wargaUsers);
    await prisma.surat.create({
      data: {
        jenis_surat: jenis,
        status,
        userId: user.id,
      },
    });
  }

  console.log("Seeding anggota keluarga (mass, 20)...");
  const anggotaNames = [
    "Ani Rina","Slamet Wijaya","Bunga Kartika","Dedi Prasetyo","Lestari Putri","Hadi Santoso","Yuni Rahma","Surya Agung","Euis Nurjanah","Tono Kurniawan",
    "Teguh Saputra","Maya Sari","Dina Kusuma","Rudi Hartono","Nani Melati","Bambang Supriadi","Sari Dewi","Iwan Kurnia","Putri Anggraini","Agung Prakoso",
  ];

  const hubunganOptions = ["Anak", "Istri", "Suami", "Orangtua", "Saudara"];

  let anggotaNikCounter = 1995000000;
  for (let i = 0; i < 20; i++) {
    const user = pick(wargaUsers);
    await prisma.anggotaKeluarga.create({
      data: {
        nik: `320101${anggotaNikCounter++}`,
        nama: anggotaNames[i % anggotaNames.length],
        hubungan: pick(hubunganOptions),
        userId: user.id,
        tanggalLahir: `${randInt(1950, 2018)}-${pad(randInt(1, 12), 2)}-${pad(randInt(1, 28), 2)}`,
        tempatLahir: "Tirtonirmolo",
      },
    });
  }

  console.log("Seeding complete.");

  const userCount = await prisma.user.count();
  const infoCount = await prisma.informasi.count();
  const aduanCount = await prisma.aduan.count();
  const suratCount = await prisma.surat.count();
  const anggotaCount = await prisma.anggotaKeluarga.count();

  console.log(`Users: ${userCount}, Informasi: ${infoCount}, Aduan: ${aduanCount}, Surat: ${suratCount}, AnggotaKeluarga: ${anggotaCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
