# Handoff Notes: Rekap Kerja & Rencana Selanjutnya

*(Catatan ini dibuat agar kita bisa langsung "in-sync" dan melanjutkan pekerjaan dengan lancar di sesi berikutnya).*

---

### 📝 Apa Saja yang Sudah Dikerjakan KEMARIN:
1. **Setup Skema Database Core**: Kita sudah mendefinisikan model `Customer`, `Project`, `Invoice`, dan `Delivery` di `schema.prisma` sebagai pondasi utama untuk migrasi data asli.
2. **Penyelesaian Bug Super Resek "Jumbo Size" & Kalkulator**: Kita berhasil membereskan masalah pecahnya logika perhitungan saat membedakan margin ukuran S-XL dengan Jumbo (beserta *addcost* Jumbo). Sempat ada *error* duplikasi *key* `2XL` dan form *Lead* yang gagal terpisah, tapi sekarang logika Kalkulator (baik mandiri maupun laci Inbox) **SUDAH 100% AKURAT**. Fitur *Copy Text*, *Add to Lead*, Bikin SPH, Bikin Invoice sekarang sukses memecah *item* menjadi dua baris terpisah (satu baris untuk S-XL, satu baris untuk Jumbo) ke dalam form/PDF secara otomatis tanpa meleset sepeser pun. Format Rupiah untuk *addcost* dan *qty* kosong juga sudah dirapikan.
3. **Integrasi CRM & UI Inbox**: Memasukkan peran "CRM Citilex" ke dalam sistem Chat. Memperbaiki *header banner* menjadi "Percakapan ini sedang ditangani oleh CS", memperbaiki filter tab chat, dan membetulkan isu *layout responsif* di dalam *Cards* kualifikasi *Leads*.
4. **Pembersihan Metadata (Judul Tab)**: Memperbaiki *bug* di mana semua tab browser menampilkan judul "Dashboard". Sekarang setiap halaman (`Clients`, `Leads`, `Settings`, `Assets`, dll) sudah punya *title* identitas uniknya masing-masing.
5. **Pemisahan Modul Quotations & Invoices**: Memecah halaman gabungan SPH/Invoice menjadi dua sistem mandiri yang jauh lebih profesional:
   - **`/app/quotations`**: Dilengkapi tabel riwayat SPH dan generator PDF SPH.
   - **`/app/invoices`**: Dilengkapi tabel riwayat tagihan (*PAID/UNPAID*) serta fitur **Pembayaran Parsial**. Generator PDF sekarang pintar dan bisa otomatis menghitung serta mencetak label **"DP 70%"** atau **"Pelunasan 30%"**.

---

### 🚀 Apa yang Harus Dikerjakan HARI INI:
1. **Migrasi Dummy Data ke Live Database**: Menghapus seluruh *hardcoded dummy data* (di halaman Inbox, Leads, Clients, Quotations, Invoices, dan Pipelines) lalu menyambungkannya dengan data dinamis dari Prisma (`Customer`, `Project`, dll).
2. **Implementasi CRUD Invoice & SPH**: Mengubah logika tombol "Generate PDF" agar selain mencetak dokumen, sistem juga **menyimpan rekam jejak** Quotation/Invoice tersebut ke dalam Database sungguhan agar muncul di tabel riwayat.
3. **Konektivitas Order Pipeline**: Menghubungkan fungsi *Add to Lead* dari Inbox/Calculator agar langsung membuat entri `Project` baru di database, sehingga progres pesanan klien bisa dilacak penuh dari awal sampai akhir.
4. **Implementasi Fitur Inventory**: Menyambungkan halaman Inventory ke database (`Inventory` schema) untuk input/update stok bahan kain secara real-time dan memastikan logic kalkulasi otomatis estimasi baju bekerja sesuai *yield* di sistem.
5. **Skema Database & Backend HRD**: Mendesain dan menambahkan model Prisma baru (`Employee`, `Attendance`, `Payroll`, dll) untuk mengakomodasi modul-modul HRD, serta menghubungkannya dengan UI yang baru saja dibuat.
6. **Skema Database & Backend Finance**: Mendesain dan menambahkan model Prisma baru (`CashFlow`, `Expense`, `TaxRecord`, dll) untuk mengakomodasi modul-modul Finance, serta menghubungkannya dengan UI.
7. **Integrasi Google Ads & Meta Ads**: Mengembangkan fitur backend untuk OAuth/koneksi API agar data *leads* dari ekosistem Ads dapat masuk dan dikomparasi secara real-time dengan data *Inbox*.

---
*Silakan salin teks ini dan berikan ke saya di sesi berikutnya agar saya langsung mengingat seluruh konteks proyek kita!*
