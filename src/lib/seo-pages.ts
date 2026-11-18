import type { Metadata } from "next";

export type SeoPageSlug =
  | "kaos-custom"
  | "polo-shirt-custom"
  | "kaos-gathering-kantor"
  | "seragam-kerja-polo-shirt"
  | "kaos-event-promosi"
  | "konveksi-kaos-jakarta-selatan"
  | "konveksi-kaos-jakarta"
  | "konveksi-kaos-tangerang"
  | "konveksi-kaos-bekasi"
  | "konveksi-kaos-depok"
  | "konveksi-kaos-bogor";

export interface SeoHighlightItem {
  title: string;
  desc: string;
}

export interface SeoEditorialPoint {
  label: string;
  title: string;
  desc: string;
}

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoMoneyPage {
  slug: SeoPageSlug;
  category: "service" | "location";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  breadcrumbLabel: string;
  eyebrow: string;
  h1Primary: string;
  h1Highlight: string;
  heroDescription: string;
  waMessage: string;
  heroImage: string;
  heroImageAlt: string;
  badgeTopTitle: string;
  badgeTopValue: string;
  badgeBottomTitle: string;
  badgeBottomValue: string;
  pricingMode: "kaos" | "polo" | "both";
  highlightsTitle: string;
  highlights: SeoHighlightItem[];
  editorialTitle: string;
  editorialSubtitle: string;
  editorialPoints: SeoEditorialPoint[];
  editorialSideBox: {
    badge: string;
    title: string;
    desc: string;
    bullets: string[];
  };
  faqs: SeoFaqItem[];
}

export const seoServicePages: SeoMoneyPage[] = [
  {
    slug: "kaos-custom",
    category: "service",
    metaTitle: "Produsen & Vendor Kaos Custom Perusahaan | CITILEX ASIA",
    metaDescription:
      "Vendor & produsen kaos custom skala besar minimal 50 pcs untuk perusahaan, event, dan merchandise. Bahan Cotton Combed 30s/24s, Cotton Bamboo & Polyester dengan sablon DTF, Plastisol & Rubber presisi.",
    keywords: [
      "vendor kaos custom",
      "produsen kaos custom jakarta",
      "bikin kaos custom perusahaan",
      "konveksi kaos cotton combed",
      "sablon kaos DTF plastisol",
    ],
    breadcrumbLabel: "Kaos Custom",
    eyebrow: "CUSTOM T-SHIRT MANUFACTURING",
    h1Primary: "Produsen Kaos Custom",
    h1Highlight: "Sablon DTF, Plastisol & Cotton Premium",
    heroDescription:
      "CITILEX ASIA memproduksi kaos custom skala besar minimal 50 pcs untuk kebutuhan korporat, kampanye brand, komunitas, dan instansi. Pilihan bahan 100% Cotton Combed 30s/24s, Cotton Bamboo antibakteri, hingga Polyester ekonomis dengan jahitan rantai standar distro.",
    waMessage:
      "Halo CITILEX ASIA, saya ingin konsultasi produksi Kaos Custom (minimal 50 pcs). Mohon info estimasi harga dan rekomendasi bahan terbaik.",
    heroImage: "/galeri3.png",
    heroImageAlt: "Hasil produksi kaos custom sablon DTF full color CITILEX ASIA",
    badgeTopTitle: "PILIHAN KAIN",
    badgeTopValue: "Combed 30s/24s, Bamboo, PE",
    badgeBottomTitle: "TEKNIK CETAK",
    badgeBottomValue: "DTF, Plastisol, Rubber, Bordir",
    pricingMode: "kaos",
    highlightsTitle: "Standar Kualitas Kaos Custom Citilex Asia",
    highlights: [
      {
        title: "Material Kain Terkurasi",
        desc: "Tersedia Polyester ekonomis, Cotton Combed 30s yang adem, Combed 24s lebih tebal, hingga Cotton Bamboo premium antibakteri.",
      },
      {
        title: "Sablon Tajam & Tahan Cuci",
        desc: "Bebas pilih sablon DTF full color detail tinggi, Plastisol bertekstur solid untuk desain besar, Rubber lentur, atau kombinasi bordir.",
      },
      {
        title: "Jahitan Rantai Rapi & Presisi",
        desc: "Pola potong standar ukuran Asia (XS hingga Jumbo) dengan jahitan overdeck dan bis rantai pundak yang awet serta nyaman dipakai.",
      },
    ],
    editorialTitle: "Panduan Spesifikasi Produksi Kaos Custom",
    editorialSubtitle:
      "Sesuaikan ketebalan gramasi kain dan metode sablon agar hasil akhir selaras dengan citra brand serta anggaran pengadaan perusahaan.",
    editorialPoints: [
      {
        label: "01 / COTTON COMBED 30s & 24s",
        title: "Pilihan Favorit Acara & Komunitas",
        desc: "100% serat katun alami yang menyerap keringat maksimal. Combed 30s terasa ringan dan sejuk untuk aktivitas luar ruang, sedangkan Combed 24s memberi kesan lebih kokoh untuk merchandise.",
      },
      {
        label: "02 / COTTON BAMBOO PREMIUM",
        title: "Tekstur Sutra & Antibakteri Alami",
        desc: "Menggabungkan serat bambu dan katun premium untuk kenyamanan tingkat tertinggi, tidak mudah bau, dan ideal bagi suvenir VIP atau eksekutif perusahaan.",
      },
      {
        label: "03 / SABLON DTF VS PLASTISOL",
        title: "Presisi Desain Sesuai Kebutuhan",
        desc: "Gunakan DTF untuk logo bergradasi atau ilustrasi multi-warna tanpa batasan warna, sementara Plastisol cocok untuk warna solid korporat dengan daya tahan cuci bertahun-tahun.",
      },
      {
        label: "04 / KAPASITAS SKALA BESAR",
        title: "MOQ 50 Pcs Hingga Ribuan Potong",
        desc: "Alur cutting, printing, sewing, hingga quality control terstandar memungkinkan produksi selesai mulai 3 hingga 21 hari kerja sesuai antrean dan tingkat kerumitan.",
      },
    ],
    editorialSideBox: {
      badge: "B2B PROCUREMENT READY",
      title: "Butuh Penawaran Resmi & Mockup Digital?",
      desc: "Tim kami menyiapkan Surat Penawaran Harga (SPH) resmi PT Nusa Garment Indonesia lengkap dengan simulasi mockup desain kaos brand Anda.",
      bullets: [
        "Gratis konsultasi pemilihan bahan",
        "Gratis pembuatan mockup awal",
        "Tersedia ukuran lengkap XS – Jumbo",
      ],
    },
    faqs: [
      {
        question: "Apa perbedaan utama bahan Cotton Combed 30s, 24s, dan Cotton Bamboo?",
        answer:
          "Cotton Combed 30s memiliki gramasi lebih tipis dan sangat adem sehingga paling sering dipakai untuk acara outdoor maupun gathering kantor. Combed 24s lebih tebal dan terasa lebih berisi. Sementara Cotton Bamboo memadukan katun dengan serat bambu yang jauh lebih lembut, jatuh di badan, serta memiliki sifat antibakteri alami.",
      },
      {
        question: "Kapan sebaiknya memilih sablon DTF dibandingkan Plastisol?",
        answer:
          "Sablon DTF sangat unggul jika desain Anda memiliki banyak gradasi warna, detail tipis, atau foto full color. Sablon Plastisol lebih cocok untuk desain vektor dengan 1 hingga 4 warna solid yang membutuhkan ketahanan tarik tinggi dan hasil warna sangat pekat.",
      },
      {
        question: "Apakah harga kaos custom sudah termasuk sablon dan kemasan?",
        answer:
          "Harga dasar paket mulai Rp 55.000 (Polyester), Rp 79.000 (Cotton Combed), dan Rp 89.000 (Cotton Bamboo) sudah mencakup bahan dan finishing rapi. Harga final disesuaikan dengan jumlah order, jumlah titik serta ukuran cetakan, lengan panjang/pendek, dan tambahan ukuran jumbo di atas XL.",
      },
      {
        question: "Apakah bisa melihat sampel kain atau meminta mockup sebelum DP?",
        answer:
          "Bisa. Anda cukup mengirimkan logo atau konsep desain lewat WhatsApp untuk kami buatkan mockup digital gratis. Untuk perusahaan di area Jakarta Selatan dan Tangerang Selatan, Anda juga dapat menjadwalkan konsultasi sampel kain di Rep. Office Bintaro.",
      },
    ],
  },
  {
    slug: "polo-shirt-custom",
    category: "service",
    metaTitle: "Vendor Polo Shirt Custom Bordir Komputer | CITILEX ASIA",
    metaDescription:
      "Konveksi & vendor polo shirt custom bordir komputer presisi minimal 50 pcs. Pilihan bahan Lacoste Soft, Lacoste Pique, dan Lacoste Diamond Premium untuk seragam kantor & event korporat.",
    keywords: [
      "vendor polo shirt custom",
      "konveksi polo shirt bordir",
      "bikin kaos kerah bordir perusahaan",
      "polo shirt lacoste pique",
      "harga polo shirt custom",
    ],
    breadcrumbLabel: "Polo Shirt Custom",
    eyebrow: "CUSTOM POLO SHIRT & EMBROIDERY",
    h1Primary: "Vendor Polo Shirt Custom",
    h1Highlight: "Bordir Komputer Presisi & Elegan",
    heroDescription:
      "Produksi polo shirt custom berkualitas tinggi dengan mesin bordir komputer otomatis untuk tampilan yang rapi dan berwibawa. Tersedia pilihan bahan Lacoste Soft, Lacoste Pique, hingga Lacoste Diamond Premium mulai Rp 79.000/pcs.",
    waMessage:
      "Halo CITILEX ASIA, saya tertarik memesan Polo Shirt Custom Bordir (minimal 50 pcs). Mohon info penawaran bahan Lacoste dan estimasi waktu pengerjaan.",
    heroImage: "/lia-karina.png",
    heroImageAlt: "Polo shirt custom bordir komputer CITILEX ASIA",
    badgeTopTitle: "MATERIAL LACOSTE",
    badgeTopValue: "Soft, Pique, Diamond",
    badgeBottomTitle: "APLIKASI LOGO",
    badgeBottomValue: "Bordir Komputer Presisi",
    pricingMode: "polo",
    highlightsTitle: "Keunggulan Produksi Polo Shirt Citilex Asia",
    highlights: [
      {
        title: "Bordir Komputer Kerapatan Tinggi",
        desc: "Setiap garis logo perusahaan, nama divisi, dan slogan dijahit menggunakan mesin bordir komputer multi-head agar simetris dan tidak mudah berbulu.",
      },
      {
        title: "Kerah & Manset Rib Kokoh",
        desc: "Menggunakan bahan kerah dan rib lengan berkualitas sehingga kerah polo tetap tegak rapi setelah dicuci berkali-kali.",
      },
      {
        title: "Tiga Tingkatan Bahan Lacoste",
        desc: "Fleksibel menyesuaikan anggaran: Lacoste Soft untuk skala besar ekonomis, Lacoste Pique berpori rapi, atau Lacoste Diamond grade eksekutif.",
      },
    ],
    editorialTitle: "Detail Teknis Polo Shirt untuk Korporat & Instansi",
    editorialSubtitle:
      "Dirancang untuk memberikan kenyamanan kerja seharian sekaligus menonjolkan profesionalitas tim di hadapan klien dan mitra.",
    editorialPoints: [
      {
        label: "01 / LACOSTE SOFT (EKONOMIS)",
        title: "Ringan untuk Event & Promosi Massal",
        desc: "Tekstur permukaan lebih halus dan ringan, sangat pas untuk panitia seminar, pameran, maupun merchandise distribusi berskala ratusan hingga ribuan pcs.",
      },
      {
        label: "02 / LACOSTE PIQUE (TERPOPULER)",
        title: "Pori Hexagonal Rapi Standar Kantor",
        desc: "Kain pique bersirkulasi udara baik dengan ketebalan ideal, tidak menerawang, serta menjaga siluet bahu tetap tegas saat dipakai di kantor atau lapangan.",
      },
      {
        label: "03 / LACOSTE DIAMOND PREMIUM",
        title: "Finishing Eksekutif & Nyaman Seharian",
        desc: "Handfeel lembut dengan anyaman rapat yang mewah, direkomendasikan untuk seragam manajemen, tim sales korporat, dan suvenir klien prioritas.",
      },
      {
        label: "04 / CUSTOM PLAKET & LIST WARNA",
        title: "Kombinasi Kerah, Kancing & Saku",
        desc: "Dapat dikustomisasi dengan list warna pada kerah/ujung lengan, tambahan saku dada, jumlah kancing 2 atau 3, serta pola potongan reguler maupun lengan panjang.",
      },
    ],
    editorialSideBox: {
      badge: "PRECISION EMBROIDERY",
      title: "Konsultasi Jumlah Titik Bordir Polo",
      desc: "Kirimkan file logo vector (AI/CDR/PDF) atau PNG resolusi tinggi agar tim kami dapat menghitung kebutuhan tusuk bordir secara akurat.",
      bullets: [
        "Bordir dada kiri, lengan, atau punggung",
        "Minimum order 50 pcs per desain",
        "Bisa campur ukuran XS hingga Big Size",
      ],
    },
    faqs: [
      {
        question: "Apakah logo perusahaan pada polo shirt selalu menggunakan bordir?",
        answer:
          "Secara standar, polo shirt paling direkomendasikan menggunakan bordir komputer karena serat kain Lacoste berpori sehingga hasil bordir tampak jauh lebih rapi, menyatu, dan tahan lama dibanding sablon.",
      },
      {
        question: "Apa beda Polo Lacoste Soft, Lacoste Pique, dan Lacoste Diamond?",
        answer:
          "Lacoste Soft merupakan opsi paling ekonomis mulai Rp 79.000 dengan bahan lembut untuk event besar. Lacoste Pique (mulai Rp 113.000) adalah standar seragam kerja terbaik dengan tekstur pori rapi dan kokoh. Lacoste Diamond (mulai Rp 119.000) menawarkan finishing paling detail dan sejuk untuk kebutuhan premium.",
      },
      {
        question: "Bisakah pesan polo shirt dengan variasi warna kerah atau lengan panjang?",
        answer:
          "Tentu bisa. Dengan minimal pemesanan 50 pcs, Anda dapat meminta kombinasi list warna kerah, manset lengan, penambahan saku dada, hingga model polo lengan panjang untuk kebutuhan seragam lapangan.",
      },
      {
        question: "Berapa lama proses produksi polo shirt bordir 100–300 pcs?",
        answer:
          "Estimasi pengerjaan berkisar antara 7 hingga 21 hari kerja setelah DP dan mockup desain disetujui secara tertulis, tergantung kepadatan titik bordir dan antrean produksi.",
      },
    ],
  },
  {
    slug: "kaos-gathering-kantor",
    category: "service",
    metaTitle: "Vendor Kaos Gathering Kantor, Outing & Family Day | CITILEX ASIA",
    metaDescription:
      "Solusi produksi kaos gathering kantor, company outing, team building, dan family day minimal 50 pcs. Kain adem menyerap keringat, ukuran lengkap XS–Jumbo, garansi tepat waktu sebelum hari-H.",
    keywords: [
      "vendor kaos gathering kantor",
      "bikin kaos outing perusahaan",
      "kaos family day custom",
      "kaos team building kantor",
      "konveksi kaos gathering jakarta",
    ],
    breadcrumbLabel: "Kaos Gathering Kantor",
    eyebrow: "CORPORATE GATHERING & OUTING",
    h1Primary: "Vendor Kaos Gathering Kantor",
    h1Highlight: "Outing & Family Day Tepat Waktu",
    heroDescription:
      "Mudahkan pekerjaan panitia HRD & acara perusahaan Anda. CITILEX ASIA menghadirkan paket kaos oblong maupun polo gathering minimal 50 pcs dengan kain sejuk, ukuran lengkap dari anak hingga jumbo, serta jadwal pengiriman yang menjaga timeline keberangkatan acara.",
    waMessage:
      "Halo CITILEX ASIA, perusahaan kami berencana mengadakan gathering/outing dan butuh pembuatan kaos/polo. Boleh minta rekomendasi bahan & timeline produksinya?",
    heroImage: "/galeri5.png",
    heroImageAlt: "Kaos gathering kantor Cotton Combed 30s produksi CITILEX ASIA",
    badgeTopTitle: "IDEAL UNTUK ACARA",
    badgeTopValue: "Outing, Family Day, Raker",
    badgeBottomTitle: "JAMINAN TIMELINE",
    badgeBottomValue: "On-Schedule Sebelum Hari-H",
    pricingMode: "both",
    highlightsTitle: "Kenapa Panitia HRD Mempercayakan Kaos Gathering ke Citilex",
    highlights: [
      {
        title: "Nyaman untuk Aktivitas Outdoor",
        desc: "Rekomendasi utama kami adalah Cotton Combed 30s dan Cotton Bamboo yang cepat menyerap keringat di pantai, gunung, maupun area outbond.",
      },
      {
        title: "Rekap Ukuran Fleksibel (XS – Jumbo)",
        desc: "Mendukung distribusi ukuran beragam karyawan termasuk ukuran besar (2XL ke atas) serta opsi kaos anak untuk acara Family Day keluarga.",
      },
      {
        title: "Pengiriman ke Lokasi Acara / Kantor",
        desc: "Pesanan dikemas rapi per ukuran dan dapat dikirim langsung ke kantor pusat atau titik kumpul/hotel lokasi gathering Anda.",
      },
    ],
    editorialTitle: "Checklist Sukses Pengadaan Kaos Gathering Perusahaan",
    editorialSubtitle:
      "Menghindari kaos kekecilan, kain gerah, dan keterlambatan tiba di hari keberangkatan adalah prioritas utama layanan B2B kami.",
    editorialPoints: [
      {
        label: "01 / KAOS OBLONG VS POLO GATHERING",
        title: "Sesuaikan dengan Konsep Acara",
        desc: "Pilih Kaos Cotton Combed untuk game outdoor & team building yang aktif, atau Polo Shirt Lacoste Pique untuk rapat kerja (Raker) dan makan malam formal perusahaan.",
      },
      {
        label: "02 / MOCKUP VISUAL CEPAT",
        title: "Memudahkan Persetujuan Direksi & Panitia",
        desc: "Sebelum masuk meja potong, kami siapkan mockup digital beresolusi tinggi agar tim panitia mudah mempresentasikannya ke manajemen untuk approval.",
      },
      {
        label: "03 / PACKING PER DIVISI / SIZE",
        title: "Mempercepat Pembagian di Lapangan",
        desc: "Setiap kaos lolos inspeksi QC benang dan hasil sablon/bordir lalu dilipat rapi dalam plastik kemasan sehingga panitia tinggal membagikan ke peserta.",
      },
      {
        label: "04 / DEADLINE FRIENDLY",
        title: "Pengiriman Tepat Waktu",
        desc: "Jadwal cutting, sablon, hingga pengiriman dipantau ketat agar kaos tiba dengan aman beberapa hari sebelum tanggal keberangkatan gathering.",
      },
    ],
    editorialSideBox: {
      badge: "HRD & PANITIA SUPPORT",
      title: "Deadline Acara Sudah Dekat?",
      desc: "Informasikan tanggal keberangkatan outing dan estimasi jumlah peserta Anda melalui WhatsApp agar tim produksi kami dapat mengecek slot pengerjaan tercepat.",
      bullets: [
        "Produksi cepat mulai 3 hari (sesuai qty)",
        "Tersedia pilihan Kaos & Polo Shirt",
        "Dokumen SPH & Invoice resmi perusahaan",
      ],
    },
    faqs: [
      {
        question: "Bahan apa yang paling enak dipakai untuk gathering outdoor seharian?",
        answer:
          "Kami sangat menyarankan Cotton Combed 30s atau Cotton Bamboo. Keduanya berbahan serat alami yang ringan, halus di kulit, dan tidak membuat gerah saat peserta mengikuti aktivitas fisik di luar ruangan.",
      },
      {
        question: "Apakah dalam 1 pesanan 50 pcs bisa pesan campur ukuran S sampai Jumbo?",
        answer:
          "Bisa sekali. Untuk kebutuhan karyawan kantor, ukuran dalam 1 pesanan bebas dicampur mulai dari XS, S, M, L, XL hingga ukuran Jumbo (2XL, 3XL, dan seterusnya dengan penyesuaian biaya kain jumbo).",
      },
      {
        question: "Kapan waktu paling aman untuk mulai pesan kaos gathering?",
        answer:
          "Idealnya 2 hingga 3 minggu sebelum hari-H acara agar ada waktu cukup untuk finalisasi mockup, pendataan ukuran karyawan, produksi, dan pengiriman ke kantor atau venue acara.",
      },
      {
        question: "Apakah bisa dikirim langsung ke hotel atau villa tempat gathering berlangsung?",
        answer:
          "Ya, kami bisa mengirimkan langsung ke alamat kantor Anda maupun ke panitia/lokasi penginapan di Jabodetabek, Puncak, Bandung, hingga kota tujuan gathering lainnya di seluruh Indonesia.",
      },
    ],
  },
  {
    slug: "seragam-kerja-polo-shirt",
    category: "service",
    metaTitle: "Pembuatan Seragam Kerja Polo Shirt Korporat & Instansi | CITILEX ASIA",
    metaDescription:
      "Jasa konveksi seragam kerja polo shirt custom untuk perusahaan, BUMN, instansi, dan tim operasional. Bahan Lacoste Pique & Diamond tebal, bordir logo presisi, legalitas PT lengkap.",
    keywords: [
      "seragam kerja polo shirt",
      "konveksi seragam polo perusahaan",
      "bikin baju kerja kerah bordir",
      "vendor seragam korporat jakarta",
      "polo shirt karyawan custom",
    ],
    breadcrumbLabel: "Seragam Kerja Polo Shirt",
    eyebrow: "CORPORATE UNIFORM MANUFACTURING",
    h1Primary: "Seragam Kerja Polo Shirt",
    h1Highlight: "Rapi, Awet & Representatif untuk Tim Anda",
    heroDescription:
      "Wujudkan seragam kerja polo shirt yang nyaman dipakai tim kantor, teknisi lapangan, hingga sales representatif setiap minggu. Menggunakan bahan Lacoste Pique & Diamond dengan ketahanan cuci tinggi serta kelengkapan administrasi pengadaan resmi PT Nusa Garment Indonesia.",
    waMessage:
      "Halo CITILEX ASIA, kami ingin memesan Seragam Kerja Polo Shirt untuk perusahaan/instansi. Mohon informasi penawaran harga resmi (SPH) & minimal order.",
    heroImage: "/galeri6.png",
    heroImageAlt: "Seragam kerja polo shirt perusahaan CITILEX ASIA",
    badgeTopTitle: "LEGALITAS B2B",
    badgeTopValue: "PT Nusa Garment Indonesia",
    badgeBottomTitle: "KETAHANAN PAKAI",
    badgeBottomValue: "Jahitan & Kerah Standar Kerja",
    pricingMode: "polo",
    highlightsTitle: "Keunggulan Seragam Kerja Produksi Citilex Asia",
    highlights: [
      {
        title: "Sirkulasi Udara & Daya Tahan Cuci",
        desc: "Bahan Lacoste Pique dan Diamond memiliki anyaman kuat yang tidak mudah melar atau pudar meski digunakan sebagai seragam mingguan karyawan.",
      },
      {
        title: "Identitas Brand Lebih Berwibawa",
        desc: "Bordir logo perusahaan di dada, slogan di punggung, serta bendera/badge di lengan dijahit rapat menggunakan benang bordir mengilap tahan lama.",
      },
      {
        title: "Siap Administrasi Korporat & Pengadaan",
        desc: "Mendukung penerbitan Surat Penawaran Harga (SPH) dan Invoice resmi di bawah entitas PT Nusa Garment Indonesia untuk mempermudah proses procurement.",
      },
    ],
    editorialTitle: "Standar Pengadaan Seragam Polo Korporat",
    editorialSubtitle:
      "Seragam kerja bukan sekadar pakaian, melainkan citra profesional perusahaan Anda di mata pelanggan maupun mitra bisnis.",
    editorialPoints: [
      {
        label: "01 / KONSISTENSI WARNA CORPORATE",
        title: "Menyesuaikan Brand Guidelines Perusahaan",
        desc: "Pilihan warna kain beragam mulai dari hitam pekat, navy, putih, abu-abu, merah maroon, hingga warna khusus perusahaan dengan kombinasi list kerah.",
      },
      {
        label: "02 / OPSI LENGAN PENDEK & PANJANG",
        title: "Fleksibel untuk Beragam Divisi & Hijab",
        desc: "Dalam satu pengadaan seragam kantor, Anda dapat mengombinasikan potongan lengan pendek dan lengan panjang bermanset dalam desain yang seragam.",
      },
      {
        label: "03 / RE-ORDER BERKALA MUDAH",
        title: "Pola & File Bordir Tersimpan Rapi",
        desc: "File digital pola bordir dan spesifikasi kain perusahaan Anda terdokumentasi di sistem kami untuk kebutuhan penambahan seragam karyawan baru.",
      },
      {
        label: "04 / QUALITY CONTROL KETAT",
        title: "Finishing Bersih Siap Pakai",
        desc: "Setiap lembar seragam melalui pemeriksaan kebersihan sisa benang, kerapian kancing, dan kelurusan posisi bordir sebelum dikemas.",
      },
    ],
    editorialSideBox: {
      badge: "CORPORATE PROCUREMENT",
      title: "Butuh Dokumen SPH untuk Approval Finance?",
      desc: "Sampaikan jumlah estimasi seragam, pilihan material Lacoste Pique atau Diamond, serta titik bordir yang diinginkan via WhatsApp.",
      bullets: [
        "Penawaran harga transparan & rinci",
        "Bisa kombinasi lengan pendek & panjang",
        "Minimum order 50 pcs per desain",
      ],
    },
    faqs: [
      {
        question: "Apakah Citilex Asia menyediakan Surat Penawaran Harga (SPH) & Invoice resmi perusahaan?",
        answer:
          "Ya, setiap pengadaan B2B dapat diterbitkan SPH dan Invoice resmi atas nama Citilex Asia / PT Nusa Garment Indonesia untuk kelengkapan dokumen finance atau procurement perusahaan.",
      },
      {
        question: "Bahan polo apa yang paling awet untuk seragam kerja harian/mingguan?",
        answer:
          "Untuk penggunaan rutin jangka panjang, kami sangat merekomendasikan Polo Lacoste Pique (mulai Rp 113.000) atau Polo Lacoste Diamond Premium (mulai Rp 119.000) karena struktur kainnya lebih tebal, tidak mudah berbulu, dan kerahnya tetap rapi.",
      },
      {
        question: "Apakah bisa memesan campur lengan pendek dan lengan panjang sekaligus?",
        answer:
          "Bisa. Anda dapat menggabungkan pesanan lengan pendek dan lengan panjang dalam minimal order 50 pcs dengan desain serta posisi bordir yang sama.",
      },
      {
        question: "Bagaimana sistem pembayaran untuk pemesanan seragam kantor?",
        answer:
          "Pengerjaan dimulai setelah persetujuan mockup desain tertulis dan pembayaran Down Payment (DP), kemudian pelunasan dilakukan sesuai kesepakatan saat produksi selesai dan siap dikirim.",
      },
    ],
  },
  {
    slug: "kaos-event-promosi",
    category: "service",
    metaTitle: "Konveksi Kaos Event, Seminar, Reuni & Promosi Brand | CITILEX ASIA",
    metaDescription:
      "Produsen kaos event, seminar, jalan sehat, reuni akbar, dan merchandise promosi brand minimal 50 pcs. Paket ekonomis Polyester mulai Rp 55.000 hingga Combed premium. Pengiriman seluruh Indonesia.",
    keywords: [
      "konveksi kaos event",
      "bikin kaos promosi perusahaan",
      "kaos seminar dan reuni custom",
      "vendor kaos jalan sehat massal",
      "produsen merchandise kaos brand",
    ],
    breadcrumbLabel: "Kaos Event & Promosi",
    eyebrow: "EVENT, SEMINAR & BRAND PROMOTION",
    h1Primary: "Konveksi Kaos Event",
    h1Highlight: "Seminar, Reuni & Merchandise Promosi Brand",
    heroDescription:
      "Kebutuhan kaos acara massal, fun run, jalan sehat, reuni alumni, hingga kampanye aktivasi brand butuh vendor dengan kapasitas besar dan harga efisien. Mulai Rp 55.000/pcs dengan minimal order 50 pcs hingga puluhan ribu pcs ke seluruh Indonesia.",
    waMessage:
      "Halo CITILEX ASIA, saya ingin memesan Kaos untuk Event/Promosi/Seminar. Mohon info paket harga terbaik sesuai jumlah kebutuhan kami.",
    heroImage: "/galeri3.png",
    heroImageAlt: "Produksi kaos event dan merchandise promosi CITILEX ASIA",
    badgeTopTitle: "KAPASITAS PABRIK",
    badgeTopValue: "50 Pcs – Skala Massal",
    badgeBottomTitle: "HARGA EKONOMIS",
    badgeBottomValue: "Mulai Rp 55.000 /pcs",
    pricingMode: "kaos",
    highlightsTitle: "Keunggulan Produksi Kaos Event Skala Besar",
    highlights: [
      {
        title: "Efisiensi Biaya untuk Kuantitas Besar",
        desc: "Tersedia paket Kaos Polyester Soft mulai Rp 55.000/pcs untuk acara massal serta skema harga khusus menyesuaikan peningkatan volume order.",
      },
      {
        title: "Cetak Desain Sponsor & Logo Berwarna",
        desc: "Banyak logo sponsor di punggung atau warna brand gradasi tetap tercetak jelas dan presisi dengan teknologi DTF maupun sablon screen printing.",
      },
      {
        title: "Pengiriman Kargo Darat, Laut & Udara",
        desc: "Bekerja sama dengan ekspedisi tepercaya untuk menjangkau lokasi acara Anda di Jabodetabek, Pulau Jawa, Sumatra, Kalimantan, Sulawesi, hingga Indonesia Timur.",
      },
    ],
    editorialTitle: "Menyesuaikan Spesifikasi Kaos dengan Tujuan Event",
    editorialSubtitle:
      "Memilih material yang tepat memastikan anggaran promosi Anda efektif sekaligus membuat peserta senang mengenakan kaos tersebut.",
    editorialPoints: [
      {
        label: "01 / EVENT MASSAL & JALAN SEHAT",
        title: "Kaos Polyester Soft (Mulai Rp 55.000)",
        desc: "Solusi paling efisien secara anggaran untuk ratusan hingga ribuan peserta acara jalan sehat, car free day, atau pembagian kaos promosi gratis.",
      },
      {
        label: "02 / SEMINAR, REUNI & KOMUNITAS",
        title: "Kaos Cotton Combed (Mulai Rp 79.000)",
        desc: "Memberikan kenyamanan tinggi agar kaos reuni, kaos panitia kampus, atau seragam seminar tetap dipakai ulang oleh peserta setelah acara berakhir.",
      },
      {
        label: "03 / MERCHANDISE RETAIL & BRAND",
        title: "Cotton Bamboo Premium (Mulai Rp 89.000)",
        desc: "Untuk brand launch, komunitas eksklusif, atau merchandise berbayar yang menuntut kualitas kain ultra lembut berstandar ritel modern.",
      },
      {
        label: "04 / DUKUNGAN TIM DESAIN",
        title: "Bantuan Penataan Layout Logo Sponsor",
        desc: "Belum punya file cetak siap produksi? Tim desain kami membantu menyusun tata letak logo sponsor dan visual kaos melalui mockup digital gratis.",
      },
    ],
    editorialSideBox: {
      badge: "EVENT ORGANIZER & BRAND PARTNER",
      title: "Rencanakan Produksi Event Anda Sekarang",
      desc: "Diskusikan target jumlah peserta, tanggal acara, dan kota tujuan pengiriman bersama tim konsultan kami lewat WhatsApp.",
      bullets: [
        "Kapasitas teruji 50.000+ pcs diproduksi",
        "Melayani pengiriman seluruh Indonesia",
        "MOQ terjangkau mulai 50 pcs per desain",
      ],
    },
    faqs: [
      {
        question: "Apakah bisa pesan kaos event 500 hingga ribuan pcs dengan deadline ketat?",
        answer:
          "Bisa. Kapasitas lini produksi kami terbiasa menangani pesanan skala ratusan hingga ribuan potong. Silakan konsultasikan jadwal acara Anda di awal agar kami dapat mengunci slot produksi tepat waktu.",
      },
      {
        question: "Mana yang lebih hemat untuk acara massal 1.000 peserta dengan banyak logo sponsor?",
        answer:
          "Untuk event publik berskala besar dengan target efisiensi biaya, paket Kaos Polyester mulai Rp 55.000 sangat direkomendasikan. Jika ingin kaos lebih adem dan dipakai jangka panjang sebagai kenang-kenangan reuni atau seminar, pilih Cotton Combed 30s.",
      },
      {
        question: "Apakah bisa cetak banyak logo sponsor di bagian belakang kaos?",
        answer:
          "Sangat bisa. Kami dapat mencetak barisan logo sponsor baik dengan warna penuh (sablon DTF) maupun sablon solid 1–2 warna agar biaya produksi tetap optimal.",
      },
      {
        question: "Apakah melayani pengiriman ke luar Jabodetabek untuk acara daerah?",
        answer:
          "Ya, kami melayani pengiriman ke seluruh kota dan kabupaten di Indonesia melalui layanan kargo darat, laut, maupun udara sesuai kebutuhan kecepatan tiba.",
      },
    ],
  },
];

export const seoLocationPages: SeoMoneyPage[] = [
  {
    slug: "konveksi-kaos-jakarta-selatan",
    category: "location",
    metaTitle: "Konveksi Kaos & Vendor Polo Shirt Jakarta Selatan (Bintaro) | CITILEX ASIA",
    metaDescription:
      "Vendor & konveksi kaos custom, polo shirt bordir, dan seragam kantor di Jakarta Selatan. Rep. Office resmi PT Nusa Garment Indonesia di Bintaro Pesanggrahan — melayani SCBD, TB Simatupang, Kuningan, & Pondok Indah minimal 50 pcs.",
    keywords: [
      "konveksi kaos jakarta selatan",
      "vendor kaos bintaro",
      "bikin kaos custom scbd tb simatupang",
      "konveksi polo shirt jakarta selatan",
      "vendor seragam kantor bintaro pesanggrahan",
    ],
    breadcrumbLabel: "Jakarta Selatan",
    eyebrow: "JAKARTA REPRESENTATIVE OFFICE • BINTARO",
    h1Primary: "Konveksi Kaos Jakarta Selatan",
    h1Highlight: "Rep. Office Bintaro untuk Korporat & Event",
    heroDescription:
      "Berlokasi strategis di Jl. Bintaro Tengah Blok J4 No.12, Pesanggrahan, Jakarta Selatan. CITILEX ASIA melayani pengadaan kaos custom & polo shirt bordir minimal 50 pcs untuk perkantoran TB Simatupang, SCBD, Kuningan, Kemang, hingga Pondok Indah dengan opsi konsultasi sampel kain langsung.",
    waMessage:
      "Halo CITILEX ASIA, kami berlokasi di Jakarta Selatan dan ingin konsultasi pembuatan kaos/polo custom (minimal 50 pcs). Apakah bisa koordinasi via Rep. Office Bintaro?",
    heroImage: "/lia-karina.png",
    heroImageAlt: "Konveksi kaos dan polo shirt Jakarta Selatan Bintaro CITILEX ASIA",
    badgeTopTitle: "KANTOR PERWAKILAN",
    badgeTopValue: "Bintaro, Jakarta Selatan",
    badgeBottomTitle: "LAYANAN KORPORAT",
    badgeBottomValue: "SCBD, Kuningan, Simatupang",
    pricingMode: "both",
    highlightsTitle: "Keunggulan Pesan dari Rep. Office Jakarta Selatan",
    highlights: [
      {
        title: "Konsultasi & Cek Sampel di Bintaro",
        desc: "Tim procurement dan panitia acara di area Jakarta Selatan dapat membuat janji temu di kantor Bintaro Pesanggrahan untuk memegang langsung tekstur Cotton Combed, Bamboo, dan Lacoste.",
      },
      {
        title: "Siap Administrasi Vendor Korporat",
        desc: "Terbiasa menangani pengadaan perusahaan multinasional, startup, perbankan, hingga BUMN di koridor Sudirman–SCBD–TB Simatupang dengan dokumen SPH dan Invoice resmi PT.",
      },
      {
        title: "Pengiriman Cepat ke Kantor Pusat",
        desc: "Pesanan yang lolos QC dikirim langsung ke gedung perkantoran Jakarta Selatan lengkap dengan pemilahan ukuran sehingga panitia tinggal mendistribusikan ke karyawan.",
      },
    ],
    editorialTitle: "Melayani Kawasan Bisnis Utama Jakarta Selatan",
    editorialSubtitle:
      "Kombinasi kemudahan koordinasi tatap muka di Jakarta Selatan dan kapasitas pabrik terpusat memastikan hasil seragam perusahaan Anda seragam tanpa cacat.",
    editorialPoints: [
      {
        label: "01 / KORIDOR TB SIMATUPANG & PONDOK INDAH",
        title: "Akses Dekat dari Bintaro Pesanggrahan",
        desc: "Hanya berjarak singkat melalui Tol JORR W2 untuk tim HRD perusahaan energi, konstruksi, dan perbankan di sepanjang TB Simatupang, Lebak Bulus, dan Pondok Indah.",
      },
      {
        label: "02 / SCBD, SENOPATI & KUNINGAN",
        title: "Kualitas Rapi Standar Eksekutif",
        desc: "Kain Cotton Bamboo dan Polo Lacoste Diamond banyak dipilih kantor korporat SCBD dan Kuningan untuk townhall, merchandise klien, maupun acara peluncuran produk.",
      },
      {
        label: "03 / KEMANG, PANCORAN & TEBET",
        title: "Kaos Event Agency & Kreatif",
        desc: "Mendukung kebutuhan agensi aktivasi brand dan event organizer dengan sablon DTF presisi warna tinggi maupun Plastisol solid untuk kampanye pemasaran.",
      },
      {
        label: "04 / RE-ORDER BERKALA MUDAH",
        title: "Arsip Pola & Warna Corporate",
        desc: "Spesifikasi warna Pantone/kain serta setting file bordir komputer perusahaan Anda disimpan rapi untuk memudahkan pemesanan tambahan karyawan baru.",
      },
    ],
    editorialSideBox: {
      badge: "JAKARTA SELATAN HUB",
      title: "Butuh Diskusi Sampel di Bintaro?",
      desc: "Hubungi tim kami terlebih dahulu melalui WhatsApp untuk penjadwalan konsultasi di Jl. Bintaro Tengah Blok J4 No.12, Jakarta Selatan 12330.",
      bullets: [
        "Senin – Sabtu, 09:00 – 17:00 WIB",
        "Mockup desain digital gratis sebelum produksi",
        "Legalitas lengkap PT Nusa Garment Indonesia",
      ],
    },
    faqs: [
      {
        question: "Apakah bisa datang langsung ke kantor Citilex Asia di Jakarta Selatan untuk cek bahan?",
        answer:
          "Bisa. Jakarta Representative Office kami berlokasi di Jl. Bintaro Tengah Blok J4 No.12, Bintaro, Pesanggrahan, Jakarta Selatan. Silakan konfirmasi jadwal kedatangan terlebih dahulu via WhatsApp (+62 813-2927-1515) agar tim kami menyiapkan sampel bahan.",
      },
      {
        question: "Apakah pengiriman ke area SCBD, Kuningan, atau TB Simatupang bisa cepat?",
        answer:
          "Ya, setelah produksi selesai dan lolos QC, paket dikemas rapi per ukuran dan dikirim menggunakan kurir armada khusus ke gedung perkantoran atau lobi perusahaan Anda di seluruh Jakarta Selatan.",
      },
      {
        question: "Berapa minimal pemesanan kaos & polo untuk kantor di Jakarta Selatan?",
        answer:
          "Minimal order standar kami adalah 50 pcs per desain, dengan fleksibilitas campur ukuran mulai XS, S, M, L, XL hingga ukuran Jumbo.",
      },
      {
        question: "Apakah bisa menerbitkan SPH dan Invoice resmi atas nama perusahaan?",
        answer:
          "Tentu. Seluruh transaksi B2B diterbitkan secara resmi di bawah naungan PT Nusa Garment Indonesia untuk mempermudah proses approval finance perusahaan Anda.",
      },
    ],
  },
  {
    slug: "konveksi-kaos-jakarta",
    category: "location",
    metaTitle: "Konveksi Kaos & Vendor Polo Custom DKI Jakarta | CITILEX ASIA",
    metaDescription:
      "Jasa konveksi kaos custom dan polo shirt bordir untuk seluruh wilayah DKI Jakarta (Jakarta Pusat, Jakarta Barat, Jakarta Timur, Jakarta Utara). Minimal 50 pcs, kapasitas skala besar & tepat waktu.",
    keywords: [
      "konveksi kaos jakarta",
      "vendor polo shirt jakarta",
      "pabrik kaos custom jakarta pusat barat timur utara",
      "konveksi seragam kantor jakarta",
      "bikin kaos event jakarta",
    ],
    breadcrumbLabel: "DKI Jakarta",
    eyebrow: "DKI JAKARTA B2B HUB",
    h1Primary: "Konveksi Kaos DKI Jakarta",
    h1Highlight: "Pusat, Barat, Timur & Utara dalam Satu Pintu",
    heroDescription:
      "Melayani pengadaan kaos event, gathering, seminar, serta seragam polo shirt untuk perkantoran di Thamrin–Sudirman (Jakarta Pusat), Slipi–Puri Indah (Jakarta Barat), kawasan industri Pulogadung–Cakung (Jakarta Timur), hingga Sunter–Kelapa Gading–PIK (Jakarta Utara).",
    waMessage:
      "Halo CITILEX ASIA, perusahaan kami di area DKI Jakarta membutuhkan produksi kaos/polo custom. Mohon info paket harga dan estimasi pengiriman.",
    heroImage: "/galeri3.png",
    heroImageAlt: "Produksi kaos event dan perusahaan area DKI Jakarta CITILEX ASIA",
    badgeTopTitle: "CAKUPAN WILAYAH",
    badgeTopValue: "Pusat, Barat, Timur, Utara",
    badgeBottomTitle: "KAPASITAS ORDER",
    badgeBottomValue: "50 Pcs – Ribuan Potong",
    pricingMode: "both",
    highlightsTitle: "Solusi Konveksi Terstandar untuk Klien DKI Jakarta",
    highlights: [
      {
        title: "Skala Ratusan hingga Ribuan Pcs",
        desc: "Mendukung acara skala besar di GBK Senayan, JIExpo Kemayoran, JCC, maupun pengadaan seragam tahunan kantor pusat kementerian dan BUMN di Jakarta Pusat.",
      },
      {
        title: "Koordinasi Digital Tanpa Macet",
        desc: "Dari konsultasi kain, pembuatan mockup desain, hingga update progres produksi dapat dipantau praktis via WhatsApp atau janji temu di Rep. Office Jakarta Selatan.",
      },
      {
        title: "Kualitas Terkontrol & Bergaransi Waktu",
        desc: "Sistem produksi terpusat menjaga konsistensi warna kain dan kerapatan jahitan agar ribuan potong kaos tetap memiliki mutu seragam.",
      },
    ],
    editorialTitle: "Cakupan Distribusi B2B di 4 Wilayah Utama Jakarta",
    editorialSubtitle:
      "Setiap kawasan bisnis di DKI Jakarta memiliki karakter kebutuhan apparel yang berbeda—kami menyiapkan spesifikasi yang tepat untuk masing-masing.",
    editorialPoints: [
      {
        label: "01 / JAKARTA PUSAT (THAMRIN, MENTENG, KEMAYORAN)",
        title: "Instansi, Kementerian & Event Exhibition",
        desc: "Produksi seragam polo bordir instansi serta kaos panitia pameran/konferensi di JCC Senayan maupun JIExpo Kemayoran dengan ketepatan waktu ketat.",
      },
      {
        label: "02 / JAKARTA BARAT (SLIPI, GROGOL, PURI INDAH)",
        title: "Korporat Swasta, Kampus & Ritel",
        desc: "Menangani kebutuhan kaos merchandise perusahaan ritel, seragam kampus di koridor Grogol, dan acara aktivasi brand di mal besar Jakarta Barat.",
      },
      {
        label: "03 / JAKARTA TIMUR (PULOGADUNG, CAKUNG, MT HARYONO)",
        title: "Kawasan Industri, Konstruksi & Logistik",
        desc: "Pengadaan rutin polo shirt kerja berbahan Lacoste Pique tebal dan kaos lapangan karyawan pabrik maupun proyek infrastruktur di Jakarta Timur.",
      },
      {
        label: "04 / JAKARTA UTARA (SUNTER, KELAPA GADING, PIK)",
        title: "Perusahaan Otomotif, Pelabuhan & F&B",
        desc: "Menyediakan seragam polo tim showroom otomotif, operasional logistik pelabuhan, hingga kaos promo komunitas otomotif & lifestyle di PIK dan Kelapa Gading.",
      },
    ],
    editorialSideBox: {
      badge: "JAKARTA B2B DELIVERY",
      title: "Kirim ke Gedung Kantor atau Venue Event",
      desc: "Sebutkan lokasi kantor atau gedung penyelenggaraan event Anda di Jakarta agar tim logistik kami menghitung jadwal tiba paling aman.",
      bullets: [
        "Minimal order 50 pcs per desain",
        "Opsi Polyester, Combed, Bamboo & Lacoste",
        "Support pengiriman ke venue pameran Jakarta",
      ],
    },
    faqs: [
      {
        question: "Apakah bisa kirim langsung ke venue acara di Senayan, Kemayoran, atau gedung perkantoran Thamrin?",
        answer:
          "Ya, sangat sering kami lakukan. Kami bisa menjadwalkan pengiriman langsung ke panitia di lokasi pameran/hotel maupun ke bagian general affair kantor pusat Anda di seluruh DKI Jakarta.",
      },
      {
        question: "Bagaimana jika desain kami butuh revisi sebelum diproduksi massal?",
        answer:
          "Sebelum masuk tahap potong kain, tim kami mengirimkan mockup digital resmi terlebih dahulu agar seluruh penempatan logo, ukuran sablon/bordir, dan warna kain disetujui penuh oleh tim Anda.",
      },
      {
        question: "Apakah melayani order ekspres untuk acara mendadak di Jakarta?",
        answer:
          "Waktu pengerjaan standar adalah 3 hingga 21 hari kerja tergantung kuantitas dan kerumitan cetak. Jika acara Anda mendesak, konsultasikan tanggal hari-H Anda via WhatsApp agar kami cek slot produksi tercepat.",
      },
      {
        question: "Jenis kaos apa yang paling laris dipesan perusahaan Jakarta?",
        answer:
          "Untuk event & gathering paling laris adalah Cotton Combed 30s dengan sablon DTF, sedangkan untuk seragam kantor paling banyak dipilih Polo Lacoste Pique dengan bordir komputer.",
      },
    ],
  },
  {
    slug: "konveksi-kaos-tangerang",
    category: "location",
    metaTitle: "Konveksi Kaos Tangerang Selatan, BSD & Tangerang | CITILEX ASIA",
    metaDescription:
      "Vendor kaos custom dan polo shirt bordir terdekat untuk Tangerang Selatan (BSD City, Bintaro Jaya, Alam Sutera, Serpong) serta Tangerang Kota & kawasan industri. Minimal order 50 pcs.",
    keywords: [
      "konveksi kaos tangerang selatan",
      "vendor kaos bsd city serpong",
      "konveksi kaos bintaro jaya alam sutera",
      "vendor seragam polo tangerang",
      "bikin kaos custom tangerang",
    ],
    breadcrumbLabel: "Tangerang & Tangsel",
    eyebrow: "TANGSEL, BSD & TANGERANG RAYA",
    h1Primary: "Konveksi Kaos Tangerang & Tangsel",
    h1Highlight: "Layanan Cepat untuk BSD, Bintaro Jaya & Alam Sutera",
    heroDescription:
      "Dari kantor perwakilan kami di perbatasan Bintaro Pesanggrahan, CITILEX ASIA sangat dekat menjangkau korporat dan komunitas di Bintaro Jaya, BSD City, Alam Sutera, Gading Serpong, hingga kawasan industri Tangerang Raya. Kualitas terukur minimal 50 pcs.",
    waMessage:
      "Halo CITILEX ASIA, kami dari area Tangerang/Tangsel (BSD/Bintaro/Alam Sutera) ingin konsultasi pembuatan kaos/polo custom minimal 50 pcs.",
    heroImage: "/galeri5.png",
    heroImageAlt: "Konveksi kaos custom area Tangerang Selatan BSD Bintaro Jaya CITILEX ASIA",
    badgeTopTitle: "JARAK TERDEKAT",
    badgeTopValue: "Bersebelahan Bintaro Jaya",
    badgeBottomTitle: "AREA PRIORITAS",
    badgeBottomValue: "BSD, Serpong, Cikupa, Bandara",
    pricingMode: "both",
    highlightsTitle: "Kenapa Perusahaan di Tangerang & Tangsel Memilih Citilex",
    highlights: [
      {
        title: "Lokasi Berbatasan Langsung dengan Tangsel",
        desc: "Kantor Rep. Office kami di Bintaro Tengah hanya selangkah dari Bintaro Jaya dan akses tol Serpong–Pondok Aren, memudahkan koordinasi cek sampel bahan.",
      },
      {
        title: "Melayani Kawasan Digital Hub & Perkantoran Modern",
        desc: "Mendukung perusahaan teknologi di BSD Green Office Park, perusahaan properti, bank, serta event berskala besar di ICE BSD City.",
      },
      {
        title: "Pengerjaan Massal untuk Industri Tangerang",
        desc: "Siap melayani pengadaan seragam kerja polo shirt dan kaos karyawan pabrik di kawasan industri Cikupa, Jatake, Curug, dan Bandara Soekarno-Hatta.",
      },
    ],
    editorialTitle: "Cakupan Layanan Konveksi Tangerang & Tangerang Selatan",
    editorialSubtitle:
      "Menjawab kebutuhan event pameran modern di BSD/Serpong hingga pengadaan seragam pabrik berskala besar di Kabupaten Tangerang.",
    editorialPoints: [
      {
        label: "01 / BINTARO JAYA & CIPUTAT",
        title: "Koordinasi Paling Cepat & Praktis",
        desc: "Jarak sangat dekat ke Rep. Office Bintaro memungkinkan tim HRD, sekolah, maupun kampus di Ciputat dan Bintaro Jaya berkonsultasi tanpa hambatan jarak.",
      },
      {
        label: "02 / BSD CITY & ICE BSD EXHIBITION",
        title: "Kaos Event, Startup & Tenant Pameran",
        desc: "Produksi cepat kaos Cotton Combed & Bamboo untuk kebutuhan peserta seminar, kru pameran di ICE BSD, maupun seragam santai startup digital.",
      },
      {
        label: "03 / ALAM SUTERA & GADING SERPONG",
        title: "Seragam Polo Bordir & Komunitas",
        desc: "Polo Lacoste Pique dan Diamond berbordir rapi untuk dealer otomotif, perusahaan properti, sekolah internasional, serta komunitas olahraga di Serpong.",
      },
      {
        label: "04 / TANGERANG KOTA, JATAKE & CIKUPA",
        title: "Kaos Karyawan & Seragam Pabrik",
        desc: "Pilihan paket ekonomis hingga menengah untuk pengadaan ratusan hingga ribuan seragam kerja pabrik dan gudang distribusi logistik Tangerang.",
      },
    ],
    editorialSideBox: {
      badge: "TANGERANG RAYA SERVICE",
      title: "Persiapan Acara di ICE BSD atau Kantor Tangsel?",
      desc: "Konsultasikan desain, pilihan bahan, dan jumlah pesanan minimal 50 pcs Anda sekarang agar tim kami dapat menyiapkan estimasi lengkap.",
      bullets: [
        "Dekat dari Bintaro Jaya, BSD & Serpong",
        "Kualitas sablon DTF & bordir komputer presisi",
        "Paket harga mulai Rp 55.000 – Rp 119.000/pcs",
      ],
    },
    faqs: [
      {
        question: "Seberapa dekat kantor perwakilan Citilex dengan area Bintaro Jaya dan BSD?",
        answer:
          "Kantor perwakilan kami berada di Jl. Bintaro Tengah Blok J4 No.12, Pesanggrahan — tepat di perbatasan Bintaro Jaya Sektor 1/2 dan terhubung langsung ke akses Tol Pondok Aren–Serpong menuju BSD.",
      },
      {
        question: "Apakah bisa antar pesanan langsung ke gedung perkantoran di BSD atau ICE BSD?",
        answer:
          "Ya, kami melayani pengantaran langsung ke kantor Anda di kawasan BSD, Alam Sutera, Gading Serpong, maupun langsung ke venue pameran seperti ICE BSD City.",
      },
      {
        question: "Bahan apa yang cocok untuk seragam perusahaan manufaktur di Cikupa atau Jatake?",
        answer:
          "Untuk operasional lapangan atau pabrik kami menyarankan Polo Lacoste Pique (kokoh dan tetap sejuk) atau kaos Cotton Combed 24s/30s yang menyerap keringat.",
      },
      {
        question: "Apakah tersedia ukuran besar (Jumbo) untuk seragam karyawan?",
        answer:
          "Tersedia. Ukuran standar Asia kami meliputi XS hingga XL, serta melayani ukuran Big Size/Jumbo mulai 2XL ke atas sesuai rekap ukuran karyawan Anda.",
      },
    ],
  },
  {
    slug: "konveksi-kaos-bekasi",
    category: "location",
    metaTitle: "Konveksi Kaos Bekasi & Kawasan Industri Cikarang | CITILEX ASIA",
    metaDescription:
      "Vendor & konveksi kaos custom, polo shirt bordir, dan seragam karyawan pabrik skala besar untuk area Bekasi Kota serta kawasan industri Cikarang (Jababeka, MM2100, EJIP, Delta Silicon).",
    keywords: [
      "konveksi kaos bekasi",
      "vendor seragam cikarang",
      "konveksi polo shirt jababeka mm2100",
      "pabrik kaos karyawan bekasi cikarang",
      "bikin kaos family day perusahaan bekasi",
    ],
    breadcrumbLabel: "Bekasi & Cikarang",
    eyebrow: "BEKASI & CIKARANG INDUSTRIAL CORRIDOR",
    h1Primary: "Konveksi Kaos Bekasi & Cikarang",
    h1Highlight: "Spesialis Order Skala Besar Pabrik & Industri",
    heroDescription:
      "Mendukung kebutuhan seragam kerja polo shirt, kaos family day karyawan, serta peringatan HUT perusahaan di kawasan industri Bekasi, Tambun, hingga Cikarang (Jababeka, MM2100, EJIP, Delta Silicon, GIIC). Kapasitas teruji ribuan pcs dengan legalitas PT lengkap.",
    waMessage:
      "Halo CITILEX ASIA, perusahaan/pabrik kami di area Bekasi/Cikarang membutuhkan pengadaan kaos atau polo shirt jumlah besar. Mohon info SPH resmi & harganya.",
    heroImage: "/galeri3.png",
    heroImageAlt: "Konveksi kaos perusahaan dan industri Bekasi Cikarang CITILEX ASIA",
    badgeTopTitle: "KORIDOR INDUSTRI",
    badgeTopValue: "Jababeka, MM2100, EJIP, GIIC",
    badgeBottomTitle: "VOLUME PRODUKSI",
    badgeBottomValue: "50 Pcs hingga Ribuan Pcs",
    pricingMode: "both",
    highlightsTitle: "Keunggulan untuk Procurement Pabrik Bekasi & Cikarang",
    highlights: [
      {
        title: "Terbiasa Order Kuantitas Ribuan Potong",
        desc: "Pengadaan kaos family day buruh/karyawan atau pembagian seragam tahunan pabrik membutuhkan vendor yang mampu menjaga konsistensi warna dan jahitan di angka ribuan pcs.",
      },
      {
        title: "Bordir & Sablon Tahan Lama untuk Kerja",
        desc: "Aplikasi bordir komputer rapat untuk logo pabrik di dada dan punggung polo shirt, serta opsi sablon Plastisol yang tidak mudah pecah meski sering dicuci.",
      },
      {
        title: "Dokumen Pengadaan Korporat Lengkap",
        desc: "Setiap penawaran dilengkapi Surat Penawaran Harga (SPH) dan Invoice resmi di bawah badan hukum PT Nusa Garment Indonesia sesuai prosedur bagian purchasing pabrik.",
      },
    ],
    editorialTitle: "Melayani Kawasan Industri & Bisnis Bekasi – Cikarang",
    editorialSubtitle:
      "Dari pengadaan seragam kerja harian di lini manufaktur hingga kaos event HUT perusahaan berskala ribuan peserta.",
    editorialPoints: [
      {
        label: "01 / KAWASAN MM2100 & CIBITUNG",
        title: "Seragam Polo Kerja & Operasional Gudang",
        desc: "Bahan Lacoste Pique dan Diamond berpori menjaga kenyamanan staf produksi, supervisor, serta operator logistik sepanjang shift kerja.",
      },
      {
        label: "02 / JABABEKA, EJIP & DELTA SILICON CIKARANG",
        title: "Kaos Family Day & Anniversary Pabrik",
        desc: "Menyediakan Cotton Combed 30s maupun Polyester ekonomis untuk acara jalan sehat dan family day ribuan karyawan beserta keluarganya (tersedia ukuran anak hingga Jumbo).",
      },
      {
        label: "03 / BEKASI KOTA & HARAPAN INDAH",
        title: "Komersial, Perbankan & Event Olahraga",
        desc: "Melayani kantor cabang perusahaan, dealer, instansi, dan komunitas olahraga di wilayah Bekasi Barat, Summarecon Bekasi, hingga Pondok Gede.",
      },
      {
        label: "04 / PACKING TERLABEL & PENGIRIMAN CARGO",
        title: "Siap Kirim ke Area Pabrik Cikarang",
        desc: "Pesanan dikemas dalam dus karton rapi dengan label ukuran per divisi/departemen sehingga tim HRD pabrik mudah mendistribusikannya.",
      },
    ],
    editorialSideBox: {
      badge: "PURCHASING & HRD CIKARANG",
      title: "Minta Penawaran Harga untuk Tender atau Order Besar",
      desc: "Kirimkan perkiraan jumlah pcs, jenis bahan, dan titik bordir/sablon ke WhatsApp kami untuk mendapatkan penawaran harga khusus volume besar.",
      bullets: [
        "Teruji proyek hingga 5.200+ pcs per order",
        "Bisa terbitkan SPH & Invoice resmi PT",
        "Kualitas QC ketat pada seluruh batch pengiriman",
      ],
    },
    faqs: [
      {
        question: "Apakah Citilex Asia berpengalaman mengerjakan order ribuan pcs untuk pabrik?",
        answer:
          "Ya. Dalam dokumentasi portofolio kami, Citilex Asia telah dipercaya mengerjakan proyek korporasi hingga 5.200 pcs dalam satu project (Adhi Karya) serta ribuan pcs untuk berbagai brand nasional.",
      },
      {
        question: "Apakah bisa mengirimkan SPH resmi terlebih dahulu untuk diajukan ke manajemen pabrik?",
        answer:
          "Bisa. Informasikan nama perusahaan, alamat pabrik di Bekasi/Cikarang, spesifikasi kaos/polo, serta jumlah kebutuhan Anda agar tim sales kami menerbitkan dokumen SPH resmi PT Nusa Garment Indonesia.",
      },
      {
        question: "Untuk acara Family Day ribuan peserta, apakah tersedia ukuran anak sampai Jumbo?",
        answer:
          "Ya, pengadaan kaos Family Day perusahaan bisa menggabungkan ukuran anak, dewasa XS–XL, hingga Big Size Jumbo (2XL ke atas) dalam satu batch produksi.",
      },
      {
        question: "Bagaimana sistem pengemasan untuk pengiriman ke kawasan industri Cikarang?",
        answer:
          "Seluruh produk dilipat rapi dalam plastik satuan dan dipisahkan per ukuran dalam kardus terlabel agar bagian GA/HRD mudah melakukan serah terima dan pembagian per divisi.",
      },
    ],
  },
  {
    slug: "konveksi-kaos-depok",
    category: "location",
    metaTitle: "Konveksi Kaos Depok & Sekitarnya | CITILEX ASIA",
    metaDescription:
      "Vendor konveksi kaos custom & polo shirt bordir melayani Depok, Margonda, Kampus UI, Cimanggis, Cinere, dan Sawangan. Minimal 50 pcs, cocok untuk panitia kampus, seminar, sekolah, & instansi.",
    keywords: [
      "konveksi kaos depok",
      "vendor kaos acara kampus depok",
      "bikin kaos panitia margonda",
      "konveksi polo shirt depok",
      "vendor kaos reuni seminar depok",
    ],
    breadcrumbLabel: "Depok",
    eyebrow: "DEPOK, MARGONDA & PENDIDIKAN",
    h1Primary: "Konveksi Kaos Depok",
    h1Highlight: "Event Kampus, Instansi, Seminar & Komunitas",
    heroDescription:
      "Melayani produksi kaos kepanitiaan universitas, seminar nasional, reuni alumni, seragam yayasan sekolah, hingga event perusahaan di wilayah Margonda, Kampus UI, Cinere, Cimanggis, dan Sawangan. Minimum order 50 pcs dengan kualitas sablon DTF & jahitan rantai rapi.",
    waMessage:
      "Halo CITILEX ASIA, kami dari area Depok ingin pesan kaos/polo custom untuk acara/instansi (minimal 50 pcs). Mohon info daftar paket dan estimasi jadinya.",
    heroImage: "/galeri6.png",
    heroImageAlt: "Konveksi kaos acara kampus, komunitas dan instansi di Depok CITILEX ASIA",
    badgeTopTitle: "TARGET KEBUTUHAN",
    badgeTopValue: "Kampus, Yayasan, Seminar, Instansi",
    badgeBottomTitle: "HARGA BERSAHABAT",
    badgeBottomValue: "Mulai Rp 55.000 /pcs",
    pricingMode: "both",
    highlightsTitle: "Solusi Konveksi Kaos & Polo Tepercaya untuk Area Depok",
    highlights: [
      {
        title: "Hasil Sablon Distro untuk Acara Kampus",
        desc: "Desain visual acara mahasiswa, himpunan, maupun festival seni tercetak penuh warna secara presisi menggunakan teknologi sablon DTF atau Plastisol di atas Cotton Combed 30s/24s.",
      },
      {
        title: "Tepat Waktu Mengikuti Kalender Acara",
        desc: "Jadwal produksi transparan mulai 3–21 hari kerja (menyesuaikan kuantitas) menjaga kepastian agar kaos panitia dan peserta siap sebelum pembukaan acara.",
      },
      {
        title: "Dekat dengan Akses Cinere – Jakarta Selatan",
        desc: "Lokasi perwakilan Bintaro dapat dijangkau dengan mudah via Tol Brigif / Desari bagi koordinator acara dari Cinere, Limo, maupun Margonda.",
      },
    ],
    editorialTitle: "Ragam Kebutuhan Apparel Custom di Wilayah Depok",
    editorialSubtitle:
      "Fleksibilitas bahan mulai dari paket hemat acara publik hingga kualitas premium untuk suvenir pembicara dan alumni.",
    editorialPoints: [
      {
        label: "01 / KAWASAN KAMPUS MARGONDA & UI",
        title: "Kaos Panitia, BEM, Seminar & Festival",
        desc: "Cotton Combed 30s dan 24s paling diminati mahasiswa untuk kaos kepanitiaan, merchandise wisuda, serta acara seminar berskala regional maupun nasional.",
      },
      {
        label: "02 / YAYASAN PENDIDIKAN & SEKOLAH",
        title: "Kaos Olahraga, Outing & Seragam Polo Guru",
        desc: "Berpengalaman memproduksi kaos murid maupun seragam polo bordir bagi guru dan staf sekolah (seperti proyek SDIT BIKA sebanyak 400 pcs).",
      },
      {
        label: "03 / REUNI ALUMNI & KOMUNITAS DEPOK",
        title: "Ukuran Lengkap untuk Lintas Usia",
        desc: "Mendukung rekap ukuran beragam dari S hingga Jumbo serta pilihan kaos lengan panjang dan hijab-friendly untuk reuni alumni angkatan.",
      },
      {
        label: "04 / BANTUAN MOCKUP DESAIN",
        title: "Penyempurnaan Desain Sketsa Panitia",
        desc: "Belum punya file vektor siap cetak? Kirimkan konsep atau referensi warna agar tim desain kami menyusun mockup digital siap ACC tanpa biaya tambahan.",
      },
    ],
    editorialSideBox: {
      badge: "DEPOK EVENT & CAMPUS SUPPORT",
      title: "Hitung Budget Kaos Panitia atau Reuni Sekarang",
      desc: "Konsultasikan estimasi jumlah pesanan dan anggaran per pcs Anda bersama tim kami di WhatsApp untuk rekomendasi bahan terbaik.",
      bullets: [
        "MOQ 50 pcs (bebas campur ukuran & lengan)",
        "Tersedia Cotton Combed 30s/24s hingga PE hemat",
        "Gratis pembuatan mockup digital awal",
      ],
    },
    faqs: [
      {
        question: "Apakah bisa pesan kaos panitia acara kampus dengan desain full color banyak warna?",
        answer:
          "Sangat bisa. Kami menggunakan sablon DTF resolusi tinggi yang mampu mencetak ilustrasi penuh warna, gradasi, dan banyak logo media partner tanpa biaya tambahan per warna.",
      },
      {
        question: "Apakah melayani kaos sekolah atau yayasan lengkap dengan sablon nama angkatan?",
        answer:
          "Ya, seperti proyek 400 pcs kaos SDIT BIKA pada portofolio kami. Tersedia pilihan lengan panjang maupun pendek untuk kenyamanan siswa dan guru.",
      },
      {
        question: "Berapa minimal pemesanan jika panitia acara kami baru butuh 50–100 pcs?",
        answer:
          "Minimal order standar kami tepat di angka 50 pcs per desain, sehingga sangat cocok untuk kebutuhan panitia divisi, komunitas, maupun acara alumni.",
      },
      {
        question: "Berapa biaya kirim ke daerah Margonda, Cinere, atau Sawangan?",
        answer:
          "Biaya pengiriman disesuaikan volume berat kemasan menggunakan kurir/ekspedisi reguler atau kargo Jakarta–Depok yang cepat sampai dalam hitungan jam hingga hari yang sama setelah barang dikirim dari hub.",
      },
    ],
  },
  {
    slug: "konveksi-kaos-bogor",
    category: "location",
    metaTitle: "Konveksi Kaos Bogor, Sentul & Outing Puncak | CITILEX ASIA",
    metaDescription:
      "Vendor kaos gathering kantor, outing, family day, dan polo shirt bordir untuk perusahaan di Bogor Kota, Sentul, Cibinong, hingga venue acara Puncak. Minimal 50 pcs, kain adem & pengiriman tepat waktu.",
    keywords: [
      "konveksi kaos bogor",
      "vendor kaos gathering sentul puncak",
      "bikin kaos outing bogor",
      "konveksi polo shirt bogor cibinong",
      "kaos raker perusahaan sentul",
    ],
    breadcrumbLabel: "Bogor & Sentul",
    eyebrow: "BOGOR, SENTUL & OUTING PUNCAK HUB",
    h1Primary: "Konveksi Kaos Bogor & Sentul",
    h1Highlight: "Outing Kantor, Gathering Puncak & Industri",
    heroDescription:
      "Menangani pembuatan kaos gathering, seragam outing/team building, serta polo shirt rapat kerja untuk perusahaan yang berlokasi di Bogor–Cibinong–Gunung Putri maupun kantor Jakarta yang menggelar acara di Sentul dan Puncak. Kain adem menyerap keringat dengan garansi kirim sebelum hari-H.",
    waMessage:
      "Halo CITILEX ASIA, kami membutuhkan kaos/polo untuk acara gathering di area Bogor/Sentul/Puncak (minimal 50 pcs). Mohon info rekomendasi bahan dan jadwal kirimnya.",
    heroImage: "/galeri5.png",
    heroImageAlt: "Kaos gathering dan outing kantor area Bogor Sentul Puncak CITILEX ASIA",
    badgeTopTitle: "SPESIALIS ACARA",
    badgeTopValue: "Gathering Sentul & Puncak",
    badgeBottomTitle: "REKOMENDASI KAIN",
    badgeBottomValue: "Combed 30s & Lacoste Pique",
    pricingMode: "both",
    highlightsTitle: "Solusi Konveksi Kaos untuk Bogor, Sentul & Venue Puncak",
    highlights: [
      {
        title: "Nyaman di Iklim Lembap maupun Aktivitas Outbond",
        desc: "Cotton Combed 30s dan Cotton Bamboo terasa sejuk saat aktivitas team building siang hari, sementara Polo Lacoste Pique menjaga tampilan rapi di ruang konferensi hotel Sentul/Bogor.",
      },
      {
        title: "Opsi Pengiriman ke Kantor atau Langsung ke Hotel/Resort",
        desc: "Fleksibel dikirim ke kantor Jakarta sebelum rombongan berangkat, atau dikirim langsung ke panitia di hotel/villa lokasi acara di Sentul maupun Puncak.",
      },
      {
        title: "Layanan Industri & Instansi Bogor",
        desc: "Juga melayani pemesanan seragam kerja perusahaan manufaktur di koridor Cibinong, Citeureup, dan Gunung Putri serta lembaga riset dan pendidikan di Bogor Kota.",
      },
    ],
    editorialTitle: "Kebutuhan Apparel Khusus Area Bogor, Sentul & Puncak",
    editorialSubtitle:
      "Memastikan acara gathering perusahaan maupun operasional industri di Bogor berjalan lancar dengan apparel yang tepat fungsi.",
    editorialPoints: [
      {
        label: "01 / SENTUL CITY & SICC MEETING HUB",
        title: "Polo Shirt Raker & Gala Dinner Korporat",
        desc: "Kombinasi seragam polo bordir logo perusahaan berbahan Lacoste Pique untuk sesi rapat kerja siang dan kegiatan team building bersama.",
      },
      {
        label: "02 / PUNCAK, CIAWI & PANCAR",
        title: "Kaos Outing, Lengan Panjang & Team Building",
        desc: "Pilihan kaos Cotton Combed 30s lengan panjang atau pendek yang lembut di kulit dan nyaman untuk udara sejuk pegunungan.",
      },
      {
        label: "03 / CIBINONG, CITEUREUP & GUNUNG PUTRI",
        title: "Seragam Pabrik & Perusahaan Logistik",
        desc: "Pengadaan ratusan hingga ribuan pcs seragam karyawan pabrik dengan standar jahitan kuat serta dokumen penawaran B2B resmi PT.",
      },
      {
        label: "04 / BOGOR KOTA & KAMPUS",
        title: "Kaos Komunitas, Seminar & Event Publik",
        desc: "Paket Polyester mulai Rp 55.000 hingga Cotton Bamboo Rp 89.000 untuk jalan sehat, peringatan instansi, dan acara mahasiswa di Bogor.",
      },
    ],
    editorialSideBox: {
      badge: "OUTING & GATHERING READY",
      title: "Booking Slot Produksi Sebelum Tanggal Keberangkatan",
      desc: "Beritahukan tanggal acara Anda di Bogor, Sentul, atau Puncak serta estimasi jumlah peserta lewat WhatsApp untuk mengunci timeline pengerjaan.",
      bullets: [
        "Bisa kirim ke kantor pusat atau hotel lokasi acara",
        "Tersedia opsi kaos oblong + polo dalam 1 event",
        "Minimal order 50 pcs per desain",
      ],
    },
    faqs: [
      {
        question: "Apakah bisa kirim kaos gathering langsung ke hotel di Sentul atau Puncak?",
        answer:
          "Bisa. Banyak klien kami dari Jakarta meminta barang dikirim ke kantor H-3 keberangkatan atau langsung ke resepsionis/panitia di hotel lokasi acara area Bogor dan Sentul.",
      },
      {
        question: "Apakah tersedia kaos lengan panjang untuk udara dingin di Puncak?",
        answer:
          "Ya, seluruh bahan kaos (Polyester, Cotton Combed 30s/24s, Cotton Bamboo) maupun Polo Shirt dapat dipesan dalam varian lengan panjang sesuai kebutuhan peserta.",
      },
      {
        question: "Jika perusahaan kami memesan 100 kaos outing dan 100 polo raker sekaligus, apakah bisa?",
        answer:
          "Sangat bisa. Dengan masing-masing memenuhi minimal order 50 pcs per desain/model, kami dapat memproduksi paket kaos outdoor dan polo formal sekaligus agar seragam acara Anda selaras.",
      },
      {
        question: "Kapan sebaiknya mulai order untuk acara gathering bulan depan?",
        answer:
          "Sebaiknya hubungi kami minimal 2–3 minggu sebelum hari keberangkatan agar tersedia waktu ideal untuk persetujuan mockup, pendataan ukuran peserta, produksi, dan QC pengiriman.",
      },
    ],
  },
];

export const allSeoMoneyPages: SeoMoneyPage[] = [...seoServicePages, ...seoLocationPages];

export function getSeoPageBySlug(slug: string): SeoMoneyPage | undefined {
  return allSeoMoneyPages.find((page) => page.slug === slug);
}

export function getSeoPageMetadata(slug: SeoPageSlug): Metadata {
  const page = getSeoPageBySlug(slug);
  if (!page) {
    return {};
  }

  const canonicalUrl = `https://citilex.asia/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonicalUrl,
      siteName: "Citilex Asia",
      images: [
        {
          url: page.heroImage,
          width: 1200,
          height: 630,
          alt: page.heroImageAlt,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
