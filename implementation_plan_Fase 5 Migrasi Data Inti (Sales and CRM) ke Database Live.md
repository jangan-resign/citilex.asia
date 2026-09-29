# Fase 4: Migrasi Data Inti (Sales & CRM) ke Database Live

Karena pondasi skema database sudah solid di Fase 1-3, untuk Fase 4 ini saya sangat menyarankan kita fokus membereskan **hutang teknis terbesar kita**: menghapus semua *dummy data* (data bohongan/statis) di modul operasional utama dan menyambungkannya ke *database live* (Neon PostgreSQL).

## Mengapa ini prioritas (Fase 4)?
Saat ini halaman-halaman kunci seperti Inbox, Leads, Pipeline, Quotation, dan Invoice masih menggunakan *hardcoded array* di *frontend*. Akibatnya, jika CS menambahkan lead baru atau membuat invoice, datanya akan hilang saat browser di-refresh. Dengan migrasi ini, seluruh siklus bisnis Citilex akan berjalan secara permanen dan saling terhubung (*end-to-end*).

---

## Proposed Changes (Rencana Eksekusi)

### 1. Modul Quotations & Invoices (CRUD Lengkap)
Saat ini sistem sudah bisa nge-generate PDF secara otomatis yang sangat rapi. Langkah selanjutnya:
- Mengubah fungsi tombol "Generate PDF" agar selain membuat file PDF, sistem juga melakukan aksi `prisma.quotation.create` / `prisma.invoice.create`.
- **Target File**: `src/actions/documents.ts` dan halaman UI terkait di `/app/quotations` & `/app/invoices`.

### 2. Modul Inbox & Leads
Data chat *customer* (bot vs customer vs CS) harus ditarik dari tabel `Message`, dan profil pelanggan ditarik dari tabel `Customer`.
- **Target File**: `src/actions/inbox.ts`, halaman UI `/app/inbox`, dan `/app/leads`.

### 3. Modul Order Pipeline (Kanban)
Ketika pesanan masuk dari Inbox atau Calculator dan di-klik "Add to Lead", sistem harus membuat entri baru di tabel `Project`. Halaman Pipeline (Kanban Board) akan melakukan *fetch* dari tabel `Project` berdasarkan status/stagenya (DEAL, PRE_PROD, PROD, DELIVERY).
- **Target File**: `src/actions/pipeline.ts` dan `/app/pipelines`.

### 4. Modul Inventory (Pabrik)
Menyambungkan halaman Inventory ke database (`Inventory` schema) untuk *input/update* stok bahan kain secara *real-time*.
- **Target File**: `src/actions/inventory.ts` dan `/app/inventory`.

---

## User Review Required
Apakah abang setuju dengan ruang lingkup **Fase 4** ini? 
Jika ya, silakan klik **Proceed/Approve**, dan saya akan langsung membuat *task list* serta mulai mengeksekusi migrasi kodingannya dari awal sampai akhir! 🚀
