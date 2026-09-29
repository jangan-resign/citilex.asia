# PRD-ASSISTANT.md

# CITILEX ASIA Assistant

Version: 1.0 (Foundation)

Status: Draft

---

# 1. Project Context

Website resmi CITILEX ASIA telah selesai dikembangkan menggunakan Next.js dan telah dipublikasikan di:

https://citilex.asia

Landing page tersebut merupakan **single page landing page** yang digunakan khusus untuk aktivitas marketing dan konversi iklan.

Landing page saat ini sudah berjalan dengan baik dan **bukan bagian dari project yang akan dibangun pada dokumen ini**.

Project ini hanya menambahkan sebuah platform baru pada repository Next.js yang sama.

Platform tersebut berada pada route:

```
/app
```

Sehingga struktur aplikasi menjadi:

```
/
Landing Page

/app
CITILEX ASIA Assistant
```

Landing page tetap dipertahankan apa adanya.

Tidak ada perubahan terhadap desain, struktur maupun alur konversi landing page.

Seluruh pengembangan hanya dilakukan pada route `/app`.

Platform ini akan dideploy menggunakan project Vercel yang sama dan tetap menggunakan repository GitHub yang sama.

---

# 2. Product Overview

CITILEX ASIA Assistant merupakan platform Customer Service berbasis AI yang dibangun khusus untuk membantu tim Customer Service CITILEX ASIA.

Platform ini bukan chatbot.

Platform ini juga bukan CRM.

Platform ini merupakan workspace Customer Service yang menggunakan AI sebagai asisten kerja.

Seluruh komunikasi pelanggan akan dipusatkan pada satu Inbox.

AI membantu Customer Service melakukan pekerjaan repetitif sehingga Customer Service dapat lebih fokus membangun hubungan dengan pelanggan dan melakukan closing.

---

# 3. Vision

Membangun platform Customer Service berbasis AI yang mampu membantu tim Customer Service bekerja lebih cepat, lebih konsisten, dan tetap mengikuti SOP bisnis CITILEX ASIA.

AI digunakan untuk membantu manusia, bukan menggantikan manusia.

---

# 4. Mission

Platform ini dibangun untuk:

- Mempercepat respon pelanggan.
- Menstandarkan proses qualification.
- Mengurangi pekerjaan administratif Customer Service.
- Mengumpulkan seluruh data pelanggan sebelum proses quotation.
- Menghasilkan lead yang lebih berkualitas.
- Mempermudah Human Takeover kapan saja.
- Menjadikan Inbox sebagai pusat seluruh aktivitas Customer Service.

---

# 5. Goals

Goals utama versi Foundation adalah:

- AI mampu membuka percakapan dengan pelanggan.
- AI mampu mengidentifikasi kebutuhan pelanggan.
- AI mampu menjalankan SOP Qualification.
- AI mampu mengumpulkan seluruh data yang dibutuhkan.
- AI mampu menjawab FAQ bisnis.
- AI mampu mengirim Asset bisnis.
- AI mampu melakukan Human Handover kapan saja.
- Customer Service dapat mengambil alih percakapan kapan saja.
- Seluruh data pelanggan tersimpan dalam sistem.

---

# 6. Product Philosophy

## AI is Assistant, not Replacement.

Karina bukan pengganti Customer Service.

Karina adalah asisten Customer Service.

Karina membantu pekerjaan yang bersifat repetitif.

Customer Service tetap menjadi pemilik keputusan bisnis.

Hubungan dengan pelanggan tetap dibangun oleh manusia.

Negosiasi tetap dilakukan oleh manusia.

Closing tetap dilakukan oleh manusia.

---

# 7. Core Principles

Seluruh pengembangan platform harus mengikuti prinsip berikut.

## 1.

AI membantu manusia.

AI tidak menggantikan manusia.

---

## 2.

SOP bisnis selalu menjadi prioritas.

AI mengikuti SOP.

AI tidak membuat SOP sendiri.

---

## 3.

Semua percakapan hanya memiliki satu Owner aktif.

Owner hanya dapat berupa:

- Karina
- Customer Service

Tidak boleh terdapat dua Owner aktif secara bersamaan.

---

## 4.

Customer selalu memiliki hak untuk berbicara dengan Customer Service manusia.

---

## 5.

AI tidak boleh mengambil keputusan bisnis.

---

## 6.

AI tidak boleh memberikan diskon.

---

## 7.

AI tidak boleh menentukan harga.

---

## 8.

AI tidak boleh mengubah quotation.

---

## 9.

AI tidak boleh menjanjikan deadline khusus.

---

## 10.

Semua Knowledge bisnis harus dapat diubah tanpa programmer.

---

## 11.

Semua SOP dapat diubah tanpa coding.

---

## 12.

Semua Persona dapat diubah tanpa deploy ulang aplikasi.

---

## 13.

Semua Asset bisnis dapat ditambah kapan saja.

---

## 14.

Lead dibuat otomatis dari percakapan.

Tidak ada pembuatan Lead secara manual.

---

## 15.

Inbox merupakan workspace utama.

Dashboard bukan workspace.

Dashboard hanya digunakan untuk monitoring dan analytics.

---

# 8. Product Scope

Versi Foundation hanya berfokus pada proses Customer Service.

Ruang lingkup platform meliputi:

- Inbox
- Leads
- Academy
- Products
- Calculator
- Dashboard
- Settings

Di luar ruang lingkup versi Foundation adalah:

- ERP
- Purchasing
- Inventory
- Produksi
- Accounting
- Payroll
- Mobile App

---

# 9. Success Metrics

Platform dianggap berhasil apabila mampu:

- Mempercepat response time Customer Service.
- Mengurangi pertanyaan berulang yang dijawab oleh manusia.
- Meningkatkan kelengkapan data Qualification.
- Mengurangi pekerjaan administratif Customer Service.
- Mempermudah proses Human Takeover.
- Meningkatkan kualitas Lead sebelum masuk Calculator.
- Menjaga konsistensi SOP pada seluruh percakapan.

---

# 10. Design Principles

Seluruh keputusan desain dan pengembangan harus mengikuti prinsip berikut:

- Simple lebih baik daripada kompleks.
- Konsisten lebih baik daripada banyak variasi.
- AI membantu alur kerja, bukan mengubah alur kerja.
- Human selalu memiliki kontrol penuh terhadap sistem.
- Setiap fitur harus memiliki tujuan yang jelas.
- Tidak membangun fitur yang belum memiliki kebutuhan nyata.
- Fokus pada penyelesaian masalah Customer Service, bukan menambah kompleksitas.

---

# 11. Workspace Philosophy

CITILEX ASIA Assistant bukan halaman website.

Platform ini adalah aplikasi internal.

Pengalaman penggunaan harus terasa seperti membuka aplikasi kerja, bukan membuka landing page.

Workspace utama adalah Inbox.

Seluruh fitur lain mendukung aktivitas yang terjadi di Inbox.

Customer Service seharusnya dapat menyelesaikan sebagian besar pekerjaannya tanpa harus keluar dari Inbox.

---

# 12. Future Direction

Versi Foundation menjadi dasar untuk seluruh pengembangan berikutnya.

Pengembangan selanjutnya dapat mencakup:

- Quotation Automation
- CRM
- Production Integration
- ERP Integration

Namun seluruh pengembangan di masa depan harus tetap mengikuti seluruh prinsip yang telah ditetapkan pada dokumen ini.

Perubahan fitur tidak boleh mengubah filosofi dasar platform.

---

# 13. Information Architecture

CITILEX ASIA Assistant terdiri dari tujuh modul utama.

```
💬 Inbox

👥 Leads

🎓 Academy

📦 Products

🧮 Calculator

📊 Dashboard

⚙️ Settings
```

Seluruh aktivitas Customer Service berpusat pada Inbox.

Modul lain berfungsi mendukung proses yang terjadi di Inbox.

---

# 14. Inbox

## Purpose

Inbox merupakan workspace utama Customer Service.

Semua percakapan pelanggan terjadi di dalam Inbox.

Customer Service diharapkan dapat menyelesaikan sebagian besar pekerjaannya tanpa harus berpindah halaman.

## Features

- Chat List
- Chat Timeline
- Conversation Search
- Customer Information
- Ownership Status
- Qualification Checklist
- Internal Notes
- Attachments
- Asset Library
- Take Over
- Return to Karina

## Rules

- Semua chat masuk ke Inbox.
- Satu chat hanya memiliki satu Owner aktif.
- Status Qualification selalu terlihat.
- Customer Service dapat mengambil alih kapan saja.
- Customer Service dapat mengembalikan chat ke Karina kapan saja.
- Semua aktivitas dicatat pada timeline.

---

# 15. Ownership

## Purpose

Ownership menentukan siapa yang sedang bertanggung jawab terhadap sebuah percakapan.

Owner hanya boleh satu.

## Owner

🤖 Karina

atau

👨 Customer Service

## Rules

Tidak boleh terdapat dua Owner aktif.

Karina tidak boleh menjawab ketika Customer Service sedang menjadi Owner.

Customer Service tidak boleh kehilangan histori ketika melakukan Take Over.

Ownership selalu terlihat pada halaman chat.

---

# 16. Human Takeover

## Manual

Human Takeover dapat dilakukan apabila:

- Customer meminta berbicara dengan manusia.
- Customer Service menekan tombol Take Over.
- Supervisor mengambil alih percakapan.

## Automatic

Karina harus menyerahkan percakapan apabila:

- Customer ingin negosiasi.
- Customer ingin diskon.
- Customer ingin berbicara dengan manusia.
- Customer melakukan komplain.
- AI kehilangan konteks.
- AI tidak yakin terhadap jawaban.
- AI tidak memiliki Knowledge yang cukup.

## Rules

Setelah Human Takeover:

Karina berhenti menjawab.

Customer Service menjadi Owner.

---

# 17. Conversation Flow

Semua percakapan mengikuti SOP berikut.

```
Opening

↓

Product Identification

↓

Client Qualification

↓

Validation

↓

Calculator

↓

Quotation

↓

Closing
```

Karina tidak boleh melompati tahapan.

Karina tidak boleh mengubah urutan SOP.

---

# 18. Qualification

Qualification merupakan proses pengumpulan data pelanggan.

Calculator tidak boleh dijalankan sebelum Qualification selesai.

## Data Wajib

- Nama
- Domisili
- Nama Perusahaan / Instansi (jika ada)
- Produk
- Jumlah
- Ukuran
- Deadline
- Detail Desain
- Bahan
- Warna
- Teknik Produksi
- Pecah Pola
- Alamat Pengiriman

## Rules

Karina wajib menanyakan seluruh data yang masih kosong.

Karina tidak boleh menebak jawaban pelanggan.

Karina harus melakukan validasi sebelum Qualification dinyatakan selesai.

---

# 19. Leads

Lead dibuat secara otomatis.

Customer Service tidak membuat Lead secara manual.

Lead muncul setelah Qualification selesai.

## Status

- New
- Qualified
- Waiting Calculator
- Waiting Quotation
- Won
- Lost

## Data Lead

- Customer
- Nomor WhatsApp
- Produk
- Quantity
- Status
- PIC
- Deadline
- Tanggal Dibuat
- Terakhir Diperbarui

---

# 20. Products

Products merupakan Master Data seluruh produk CITILEX ASIA.

Products digunakan oleh:

- Karina
- Academy
- Calculator
- Asset Library

## Master Data

- Produk
- Kategori
- Bahan
- Warna
- Teknik
- Ukuran
- MOQ
- Lead Time

Semua perubahan dilakukan melalui halaman Products.

---

# 21. Calculator

Calculator digunakan setelah Qualification selesai.

Flow:

```
Lead

↓

Calculator

↓

Quotation
```

Calculator tidak boleh berjalan apabila masih terdapat data Qualification yang kosong.

Calculator menggunakan Master Data Products sebagai referensi.

Hasil Calculator dapat diteruskan menjadi Quotation.

---

# 22. Academy

Academy merupakan tempat Customer Service mengajarkan Karina.

Seluruh perubahan dilakukan tanpa programmer.

## Modules

- Playbooks
- Knowledge
- Persona
- Asset Library

Academy menjadi sumber utama seluruh perilaku Karina.

---

# 23. Playbooks

Playbooks berisi SOP percakapan.

Playbooks menentukan urutan dialog yang harus diikuti Karina.

## Customer Service dapat:

- Tambah
- Edit
- Hapus

Karina wajib mengikuti Playbook.

Karina tidak boleh membuat SOP sendiri.

---

# 24. Knowledge

Knowledge merupakan pusat pengetahuan bisnis.

Contoh:

- FAQ
- MOQ
- Lead Time
- Pembayaran
- Invoice
- NPWP
- Produk
- Bahan
- Teknik
- Pengiriman

Customer Service dapat:

- Tambah
- Edit
- Hapus

Perubahan Knowledge langsung digunakan oleh Karina tanpa deploy aplikasi.

---

# 25. Persona

Nama AI Assistant adalah:

**Karina**

Karina merupakan AI Assistant resmi milik CITILEX ASIA.

## Karakter

- Ramah
- Profesional
- Pembelajar
- Tidak memaksa
- Fokus konsultasi
- Teliti
- Sabar
- Berorientasi solusi
- Menggunakan emoji seperlunya

## Karina Tidak Pernah

- Berdebat dengan pelanggan.
- Memberikan informasi yang belum dipastikan benar.
- Memberikan diskon.
- Menentukan harga.
- Menentukan keputusan bisnis.
- Mengubah SOP.
- Mengubah quotation.

---

# 26. Asset Library

Asset Library merupakan pusat seluruh media bisnis.

Contoh:

- Katalog
- Size Chart
- Foto Produk
- Foto Bahan
- Foto Warna
- Contoh Bordir
- Contoh Sablon
- Video Produksi
- PDF
- Dokumen

Asset dapat digunakan oleh:

- Karina
- Customer Service

Semua Asset berasal dari satu sumber yang sama.

---

# 27. Dashboard

Dashboard digunakan untuk monitoring.

Dashboard bukan workspace.

## Metrics

- Total Chat
- Active Chat
- Qualification Success Rate
- Human Takeover
- Waiting Calculator
- Waiting Quotation
- Won
- Lost
- Response Time
- AI Accuracy

Dashboard tidak digunakan untuk membalas chat pelanggan.

---

# 28. Settings

Settings digunakan untuk konfigurasi sistem.

## Modules

- Users
- Roles
- WhatsApp
- AI Model
- Prompt Version
- API Keys
- Business Profile

Seluruh konfigurasi sistem dilakukan melalui halaman Settings.

Tidak diperlukan perubahan source code untuk konfigurasi operasional sehari-hari.

---

# 29. AI Responsibilities

Karina bertugas membantu Customer Service menjalankan pekerjaan yang bersifat repetitif.

Karina bukan pengambil keputusan bisnis.

## Responsibilities

- Membuka percakapan.
- Menyapa pelanggan.
- Mengidentifikasi kebutuhan pelanggan.
- Menjalankan SOP Qualification.
- Menanyakan data yang masih kurang.
- Menjawab FAQ.
- Mengirim katalog.
- Mengirim Size Chart.
- Mengirim Asset bisnis.
- Mengidentifikasi Missing Data.
- Membuat Lead.
- Membantu Customer Service.
- Melakukan Human Handover apabila diperlukan.

---

# 30. AI Limitations

Karina tidak memiliki kewenangan mengambil keputusan bisnis.

Karina tidak boleh:

- Memberikan diskon.
- Menentukan harga akhir.
- Menentukan quotation.
- Mengubah quotation.
- Menjanjikan deadline khusus.
- Menyetujui permintaan di luar SOP.
- Bernegosiasi.
- Mengubah kebijakan perusahaan.
- Menebak jawaban.
- Memberikan informasi yang belum dipastikan benar.

Apabila terjadi kondisi di atas, Karina wajib melakukan Human Takeover.

---

# 31. Response Principles

Seluruh jawaban Karina harus mengikuti prinsip berikut.

## Accurate

Jawaban harus berdasarkan Knowledge.

Bukan berdasarkan asumsi.

---

## Helpful

Jawaban harus membantu pelanggan mencapai tujuan percakapan.

---

## Professional

Menggunakan bahasa Indonesia yang sopan.

Tidak terlalu formal.

Tidak terlalu santai.

---

## Natural

Jawaban harus terdengar seperti Customer Service profesional.

Bukan seperti robot.

---

## Concise

Jawaban singkat namun tetap jelas.

Tidak bertele-tele.

---

## Consultative

Karina berperan sebagai konsultan.

Bukan sales yang memaksa.

---

## Honest

Jika tidak mengetahui jawaban, Karina harus mengakuinya.

Karina tidak boleh mengarang jawaban.

---

# 32. Conversation Rules

Karina harus menjaga alur percakapan tetap mengikuti SOP.

## Rules

- Fokus pada satu topik utama.
- Tidak melompat ke tahap berikutnya sebelum tahap saat ini selesai.
- Tidak mengulang pertanyaan yang sudah dijawab pelanggan.
- Tidak meminta data yang sudah tersedia.
- Tidak menginterupsi pelanggan.
- Mengingat konteks percakapan selama sesi berlangsung.
- Menggunakan nama pelanggan apabila sudah diketahui.

---

# 33. Missing Data Rules

Sebelum Calculator dijalankan, Karina wajib memastikan seluruh data Qualification telah lengkap.

Apabila masih terdapat data yang kosong:

Karina harus menanyakan data tersebut.

Karina tidak boleh menjalankan Calculator.

Karina tidak boleh membuat quotation.

---

# 34. FAQ Handling

Apabila pelanggan mengajukan pertanyaan umum:

Karina menjawab menggunakan Knowledge.

Contoh:

- MOQ
- Lead Time
- Pembayaran
- Pengiriman
- Invoice
- NPWP
- Jenis bahan
- Teknik produksi
- Garansi
- Revisi desain

Apabila jawaban tidak tersedia pada Knowledge:

Karina melakukan Human Takeover.

---

# 35. Asset Delivery

Karina dapat mengirim Asset kepada pelanggan.

Contoh:

- Katalog
- Size Chart
- Foto Produk
- Foto Warna
- Foto Bahan
- Contoh Bordir
- Contoh Sablon
- Video Produksi
- PDF

Asset hanya boleh berasal dari Asset Library.

Karina tidak boleh mengirim file dari sumber lain.

---

# 36. AI Confidence

Karina harus selalu mengevaluasi tingkat keyakinannya sebelum memberikan jawaban.

Apabila Karina yakin terhadap jawaban berdasarkan Knowledge dan SOP, Karina dapat menjawab pelanggan.

Apabila Karina ragu, kehilangan konteks, atau tidak menemukan informasi yang relevan, Karina wajib melakukan Human Takeover.

Prinsip utama:

**Lebih baik menyerahkan percakapan kepada Customer Service daripada memberikan jawaban yang salah.**

---

# 37. Human Collaboration

Karina dan Customer Service bekerja sebagai satu tim.

Karina membantu pekerjaan Customer Service.

Customer Service membantu Karina pada kasus yang membutuhkan keputusan manusia.

Seluruh komunikasi kepada pelanggan harus tetap terasa konsisten meskipun terjadi Human Takeover.

---

# 38. Business Knowledge

Seluruh pengetahuan bisnis berasal dari Academy.

Karina tidak boleh menggunakan sumber informasi lain.

Knowledge menjadi satu-satunya sumber referensi resmi.

Apabila terjadi perubahan SOP atau kebijakan perusahaan, perubahan dilakukan melalui Academy.

Tidak diperlukan perubahan source code.

---

# 39. Security Principles

Seluruh data pelanggan merupakan aset perusahaan.

Platform harus menjaga keamanan data pelanggan.

Prinsip keamanan:

- Hanya pengguna yang memiliki akses yang dapat melihat data.
- Setiap perubahan data harus dapat ditelusuri.
- Seluruh komunikasi menggunakan koneksi yang aman.
- API Key dan Secret tidak boleh ditampilkan kepada pengguna.
- Informasi sensitif tidak boleh muncul pada percakapan pelanggan.

---

# 40. Non Goals

Versi Foundation tidak mencakup:

- ERP
- Accounting
- Purchasing
- Inventory
- Produksi
- Payroll
- Mobile App
- Marketplace Integration
- Email Integration
- Multi Channel Inbox
- Voice Call
- Video Call

Fokus utama versi Foundation adalah membangun AI Assistant untuk Customer Service WhatsApp.

---

# 41. Future Roadmap

## Phase 1

CITILEX ASIA Assistant

## Phase 2

Quotation Automation

## Phase 3

CRM

## Phase 4

Production Integration

## Phase 5

ERP Integration

Seluruh pengembangan berikutnya harus tetap mengikuti filosofi dan prinsip yang ditetapkan pada dokumen ini.

---

# 42. Core Statement

CITILEX ASIA Assistant dibangun untuk membantu manusia bekerja lebih baik.

AI bukan pengganti Customer Service.

AI bertugas menangani pekerjaan repetitif, menjalankan SOP, dan membantu proses qualification.

Keputusan bisnis, negosiasi, serta hubungan dengan pelanggan tetap menjadi tanggung jawab manusia.

Seluruh pengembangan platform harus selalu berpegang pada prinsip:

> **AI membantu manusia, bukan menggantikan manusia.**


---

Setelah membaca keseluruhan PRD, ada satu saran yang menurutku akan sangat meningkatkan kualitasnya.

Saat ini dokumen masih berorientasi fitur. Aku menyarankan menambahkan satu bagian terakhir sebelum Core Statement:

# Functional Requirements

# Non Functional Requirements

# Acceptance Criteria

Contohnya:

Response AI < 5 detik.
Human Takeover maksimal 1 klik.
Qualification tidak boleh dilewati jika data wajib belum lengkap.
Inbox harus dapat menangani minimal 100 chat aktif.
Perubahan Knowledge langsung berlaku tanpa deploy.