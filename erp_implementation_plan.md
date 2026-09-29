# Blueprint: Citilex ERP Scaling & Implementation Plan

Dokumen ini adalah cetak biru (blueprint) untuk mengembangkan sistem Citilex dari sekadar CRM/Sales pipeline menjadi sistem ERP (Enterprise Resource Planning) & MES (Manufacturing Execution System) yang komprehensif.

> [!WARNING]
> **PENEKANAN PENTING (ATURAN MAIN):**
> Hei, ini **BUKAN** untuk merombak aplikasi-aplikasi yang sudah ada dan sudah matang (seperti Inbox, Quotation, Invoice, dll)! 
> 
> Tujuan cetak biru ini murni untuk **MENAMBAHKAN** aplikasi-aplikasi baru. Kita menggunakan *Pipelines Kanban* yang sudah ada sebagai **tulang punggung (backbone)** semata-mata untuk mendeteksi "lubang" (gap) area mana di pabrik yang belum punya aplikasinya sendiri. Sekali lagi: **Jangan sentuh/rombak aplikasi inti yang sudah berjalan baik!**

---

## Menjawab Pertanyaan: DB Dulu atau UI Dulu?
**Jawabannya: Selalu mulai dari DB (Database) dulu.**
Mengapa? Karena database adalah pondasi (kontrak data). Jika UI dibuat lebih dulu tanpa struktur tabel yang jelas, ujung-ujungnya UI harus dibongkar ulang untuk menyesuaikan *form* atau tipe data (misal: mana yang *string*, mana yang *array of objects* untuk daftar ukuran kaos). 

Alur kerjanya nanti selalu: 
`Desain Skema DB` -> `Bikin Backend Action (Prisma)` -> `Bikin UI/Form` -> `Testing`.

---

## FASE IMPLEMENTASI (ROADMAP)

### FASE 1: Ekosistem Pre-Production (Approval & Kesiapan)
Fokus: Memastikan apa yang disetujui klien adalah apa yang diproduksi, dan bahan baku siap.

**A. Pembaruan Database (Kabel DB):**
- Buat tabel `ClientApproval` (URL desain vector, detail spesifikasi, TTD digital/status).
- Buat tabel `ProductionApproval` (Catatan PM, status *feasibility*, estimasi waktu).
- Buat tabel `PurchaseOrder` (opsional, jika butuh beli bahan kain dari vendor).

**B. Pembaruan Aplikasi (Sidebar):**
- **App: Client Approval (Portal)**: Halaman khusus klien untuk melihat *mockup* dan klik "Setuju".
- **App: Pre-Prod Dashboard**: Untuk PM memantau desain mana yang sudah di-ACC klien dan mengecek stok bahan di Inventory (Gudang).

### FASE 2: Ekosistem Production (Eksekusi & SPK)
Fokus: Menerbitkan perintah kerja resmi dan memanajemen antrean produksi pabrik.

**A. Pembaruan Database (Kabel DB):**
- Buat tabel `SPK` (Surat Perintah Kerja) yang berelasi dengan tabel `Project` dan `Inventory` (pemotongan stok kain).
- Tambahkan field `priorityLevel`, `deadline`, dan `assignedTo` (vendor/internal).

**B. Pembaruan Aplikasi (Sidebar):**
- **App: SPK Management**: Aplikasi untuk membuat dan mencetak dokumen SPK (PDF) berisi *size chart*, warna benang, jenis sablon, dll.
- **App: Production Board (Kanban)**: Papan pantauan khusus PM/Kepala Produksi (Kolom: Antrean Potong -> Antrean Sablon -> Antrean Jahit). Bisa tarik/geser kartu untuk mengatur prioritas (misal order VIP dinaikkan ke atas).

### FASE 3: Quality Control (QC) & Packing
Fokus: Menekan angka *reject* (cacat) dan memastikan barang di-packing sesuai pesanan.

**A. Pembaruan Database (Kabel DB):**
- Buat tabel `QCReport` (jumlah lulus, cacat jahit, cacat sablon, catatan perbaikan).
- Buat tabel `PackingList` (detail koli/dus, berat, dimensi).

**B. Pembaruan Aplikasi (Sidebar):**
- **App: QC Inspector**: Aplikasi untuk tim QC memasukkan angka cacat (jika cacat melebihi toleransi, SPK otomatis ditandai merah).
- **App: Packing List Generator**: Jika QC hijau, tim *packing* bisa generate PDF label tempelan dus berserta rincian ukuran di dalamnya.

### FASE 4: Delivery & Logistik Terpadu
Fokus: Memastikan barang sampai tepat waktu dan *update* resi gampang.

**A. Pembaruan Database (Kabel DB):**
- *Tabel `Delivery` sudah ada*, cukup diperluas dengan kolom `packingListId`, `deliveryMethod`, `trackingStatus`.

**B. Pembaruan Aplikasi (Sidebar):**
- **App: Delivery / Dispatch Board**: Diletakkan di **Sales Area**. CS atau tim Ekspedisi bisa mencetak Surat Jalan (DO) dan input nomor resi.
- **App: Tracking Center**: Aplikasi yang mungkin terintegrasi dengan API RajaOngkir / logistik lain untuk memantau apakah paket nyangkut di kurir atau sudah sampai.

---
*Blueprint ini dapat disimpan dan diakses kapan saja saat tim Citilex sudah siap untuk skala yang lebih besar.*
