# Rangkuman Progres CITILEX ASIA (Knowledge Base)

> [!NOTE]
> Dokumen ini dirancang sebagai catatan (*checkpoint*) untuk dibaca oleh agen AI sebelum memulai *coding* di sesi berikutnya.

## ✅ Apa Saja yang Sudah Diselesaikan (Kemarin)

1. **Integrasi "Jalan Tol" (Manual Flow ke Kanban)**
   - Saat CS membuat SPH atau Invoice melalui fitur Kalkulator Manual, sistem otomatis mendaftarkan profil pelanggan (sebagai *dummy/manual client* dengan awalan nomor `manual-`) ke dalam *database* (Leads/Client).
   - Aksi `SENT` pada SPH dan aksi `PAID` pada Invoice kini sudah otomatis memicu pembuatan kartu (Project) baru di papan Kanban.

2. **Perbaikan Tampilan & Integrasi Kanban**
   - **Rincian Harga (Subtotal):** Kanban sudah bisa membaca *key* `subtotal` (bawaan dari Kalkulator Manual) maupun `totalPrice` sehingga rincian item tidak lagi bernilai "Rp 0".
   - **Informasi Klien Lengkap:** Label klien di seluruh sistem dan menu *dropdown* Kanban kini diformat menampilkan Domisili dan Instansi: `Nama Klien (Perusahaan - Domisili)`.
   - **Tambah Klien dari Kanban:** Fitur `+ Add Card` di Kanban kini memiliki opsi `-- Input Manual (Client Baru) --` yang otomatis memunculkan kolom Nama, Instansi, dan Domisili, lalu mendaftarkannya ke database saat disimpan.

3. **Pembersihan Panel Inbox**
   - *Query* `getCustomers` untuk panel Inbox kini difilter secara ketat menggunakan `where: { messages: { some: {} } }`.
   - Hal ini memastikan klien-klien "fosil" atau *dummy* yang didaftarkan manual dari *Leads Database*, *Client Database*, maupun Kalkulator SPH/Invoice **TIDAK AKAN** merusak atau muncul di panel Inbox. Inbox murni hanya untuk pelanggan yang memiliki riwayat pesan WhatsApp.

4. **Pembersihan TypeScript Errors**
   - Menyelaraskan ulang definisi *type* `customerCompany`, `tierLabel`, `totalPrice`, dan tipe data *database* Prisma yang sempat *out-of-sync*. Terminal VS Code kini sudah bersih (Problems: 0).

---

## 🚀 Apa yang Harus Dikerjakan (Hari Ini)

> [!IMPORTANT]
> Mengacu pada pertanyaan *"Apakah masih perlu tes satu persatu bagian apa lagi?"*, jawabannya adalah **IYA**. Sistem CRM ini saling bertautan antara Inbox, Dokumen, Leads, dan Kanban. 

Berikut adalah **Fokus Pengujian (QA & Testing) dan Penyempurnaan** untuk Hari Ini:

### 1. Uji Coba Alur Normal (End-to-End Inbox)
Kita harus menguji skenario ideal bagaimana CS menggunakan aplikasi ini dari ujung ke ujung:
- **Pesan Masuk:** Anggap ada pesan WA baru di Inbox.
- **Kalkulasi & SPH:** Buat SPH dari Inbox (otomatis mengekstrak data dari `items` yang terdeteksi). Klik aksi `SENT` atau `APPROVED`.
- **Invoice & DP:** Buat Invoice untuk klien tersebut, lalu ubah statusnya menjadi `PAID` atau `DP ISSUED`.
- **Validasi:** Pastikan di setiap langkah di atas, apakah kartu Kanban berpindah lajur dengan benar tanpa membuat data duplikat?

### 2. Validasi Sinkronisasi Database Leads vs Clients
- Aturan emas: **Leads** adalah mereka yang belum bayar DP. **Clients** adalah mereka yang sudah punya Invoice lunas (Minimal DP).
- Kita perlu memastikan bahwa ketika sebuah Lead naik kasta menjadi Client (via aksi `PAID`), mereka tidak lagi muncul (atau statusnya ter- *update* dengan benar) di *Leads Database*.

### 3. Edge Cases (Skenario Ekstrem)
- Apa yang terjadi jika CS menghapus kartu Project dari Kanban secara manual? Apakah Invoice/SPH-nya ikut terhapus atau kembali ke `Draft`?
- Apa yang terjadi jika dokumen Invoice ditolak (`REJECTED`) setelah kartu Kanban-nya terbuat?
- Memastikan tidak ada *error* ketika mengedit SPH/Invoice manual yang item-nya berjumlah ratusan (uji coba performa/UI responsif).

### 4. Finalisasi UI / UX
- Merapikan animasi, *loading state* (tombol berputar saat proses *save*), dan menambahkan *toast notifications* (pesan sukses hijau di pojok layar) untuk menggantikan fungsi `alert()` bawaan *browser* agar UI terasa lebih premium.
