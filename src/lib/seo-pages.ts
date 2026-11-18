import type { Metadata } from "next";

export type SeoPageSlug =
  | "kaos-custom"
  | "polo-shirt-custom"
  | "kaos-gathering-kantor"
  | "seragam-kerja-polo-shirt"
  | "kaos-event-promosi";

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

export function getSeoPageBySlug(slug: string): SeoMoneyPage | undefined {
  return seoServicePages.find((page) => page.slug === slug);
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
