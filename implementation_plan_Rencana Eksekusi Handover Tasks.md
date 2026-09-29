# Rencana Eksekusi Handover Tasks

Mengingat daftar pekerjaan yang harus dilakukan (*Poin 1 sampai 7*) sangat masif dan melibatkan banyak modul inti (Core CRM, Pipelines, Inventory, HRD, Finance, hingga Integrasi Eksternal), saya mengusulkan untuk membaginya menjadi **4 Fase Eksekusi** secara berurutan. Hal ini untuk memastikan tidak ada aplikasi yang rusak (breaking changes) selama proses migrasi.

## 🚀 Fase 1: Core CRM & Pipeline Connectivity (Fokus Poin 1, 2, & 3)
Fase ini akan memprioritaskan fungsi utama bisnis, yaitu mengubah data dummy pesanan menjadi data asli yang terhubung dari awal (Inbox) hingga akhir (Invoice).
* **Migrasi Dummy Data**: Menghubungkan halaman `/app/leads`, `/app/clients`, dan `/app/pipelines` agar membaca langsung tabel `Customer` dan `Project` dari Prisma.
* **Konektivitas Order Pipeline**: Memodifikasi aksi tombol *Add to Lead* di Inbox/Calculator agar otomatis membuat *record* baru di tabel `Project` dengan status `DEAL` atau `PRE_PROD`.
* **CRUD Quotation & Invoice**: Memastikan ketika SPH atau Invoice di-generate dalam bentuk PDF, sistem akan otomatis melakukan `prisma.invoice.create()` sehingga terekam di database dan muncul di tabel `/app/quotations` dan `/app/invoices`.

## 📦 Fase 2: Implementasi Real-time Inventory (Fokus Poin 4)
* **Backend Integration**: Membuat Server Actions di Next.js untuk membaca dan mengubah stok kain di tabel `Inventory`.
* **Kalkulasi Yield**: Mengganti *dummy view* di `/app/inventory` menjadi antarmuka fungsional yang memungkinkan admin menambah/mengurangi stok, di mana estimasi baju yang bisa diproduksi akan dihitung secara live berdasarkan *Yield Config*.

## 🏢 Fase 3: Skema Database & Backend HRD & Finance (Fokus Poin 5 & 6)
* **Prisma Schema Update**: Menambahkan tabel baru untuk operasional back-office, antara lain:
  - **HRD**: `Employee`, `Attendance`, `Payroll`, `Applicant`.
  - **Finance**: `CashFlow`, `Expense`, `TaxRecord`.
* **Sinkronisasi UI**: Menghubungkan ke-8 halaman *placeholder* HRD dan Finance yang baru saja kita buat dengan database-database tersebut.

## 🌐 Fase 4: Integrasi Google Ads & Meta Ads (Fokus Poin 7)
* Menyiapkan tabel/model `AdsLead` di Prisma untuk menyimpan data tangkapan dari iklan.
* Membangun rangka *API Routes* (Webhook endpoints) yang nantinya akan digunakan untuk menerima push data dari Google/Meta.
* Memperbarui UI di menu Marketing agar menampilkan visualisasi data perbandingan leads Inbox vs Leads Ads.

---

### User Review Required
> [!IMPORTANT]
> Karena cakupannya sangat besar, **apakah kamu setuju kita selesaikan secara berurutan mulai dari FASE 1 terlebih dahulu?**
> Jika setuju, silakan klik **Proceed** dan aku akan langsung mulai merombak sistem Inbox, Leads, dan Pipelines untuk Fase 1!
