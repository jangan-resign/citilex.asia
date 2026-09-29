# 📋 Daily Development Handover

Dokumen ini berisi rangkuman pekerjaan yang telah diselesaikan dan rencana pekerjaan selanjutnya. **WAJIB dibaca oleh AI sebelum mulai menulis kode pada sesi baru.**

---

## ✅ KEMARIN (Selesai Dikerjakan)

- **Sistem Autentikasi & Proteksi Rute (Next.js 16)**
  Berhasil mengimplementasikan sistem *login* menggunakan mekanisme *quote* pendek (password: `"behumble"`, `"nevergiveup"`, dll.) yang aman dan praktis. Memanfaatkan `src/proxy.ts` sebagai sistem penengah (*middleware*) untuk memproteksi seluruh direktori `/app`.

- **Role-Based Access Control (RBAC) pada UI dan Logika**
  Telah mengatur hak akses dengan sempurna berdasarkan peran (*role*):
  - **Super-Admin & Business-Partner**: Akses penuh. Khusus Business Partner, tombol *Edit* di Area Factory telah disembunyikan (*View-Only*).
  - **Tim Spesifik (Sales, Materials, Marketing, HRD, Finance)**: Hanya bisa membuka area masing-masing.
  - **CRM**: Hanya bisa membuka area CRM dan akses spesifik ke kotak masuk (Inbox).
  - Merapikan UI *Sidebar* sehingga divisi yang tidak relevan akan disembunyikan, dan garis pembatas UI (*top border*) disesuaikan secara dinamis agar terlihat bersih dan rapi.

- **Manajemen Environment Variables**
  Pemisahan *password quotes* yang aman antara `.env` (template) dan `.env.local` (rahasia) yang tidak akan diunggah ke GitHub.

---

## 🎯 HARI INI (Target Pekerjaan)

Fokus utama hari ini adalah **Menghidupkan Modul Inbox** menjadi platform perpesanan interaktif (Live WhatsApp) dan mengintegrasikan **AI Karina** (menggunakan mesin Google Gemini) sebagai asisten pembalas otomatis.

### Rencana Arsitektur & Implementasi Inbox "Live":

1. **WhatsApp API / Provider**
   - **Tugas:** Menghubungkan sistem dengan nomor WhatsApp.
   - **Pendekatan AI:** Untuk skala produksi (*Enterprise*), sangat disarankan menggunakan **Meta Cloud API (Resmi)**. Namun, jika ini masih fase MVP internal dan butuh implementasi sangat cepat hari ini, kita bisa memanfaatkan *library unofficial* (seperti Baileys/WWebJS) yang berjalan di *background*, atau layanan pihak ketiga.
   - **CEK .env dan .env.local, apa yg kurang**

2. **Webhook Endpoint (Next.js Route Handlers)**
   - **Tugas:** Membuat rute API (`/api/webhook`) untuk menangkap pesan masuk (dari klien/pelanggan) secara *real-time*.
   - **Pendekatan AI:** Pesan ini akan langsung diurai dan disimpan ke dalam database menggunakan model `Message` via Prisma ORM agar riwayat obrolan tidak hilang.

3. **Koneksi Real-time ke Frontend (UI Update)**
   - **Tugas:** Membuat layar Inbox (UI chat) ter-update otomatis saat ada pesan baru tanpa perlu *refresh* halaman.
   - **Pendekatan AI:** Karena kita menggunakan arsitektur Next.js, opsi paling stabil adalah menggunakan **Pusher** (pihak ketiga) atau **Server-Sent Events (SSE)**. Mengingat kita menekan kompleksitas, pendekatan *SSE* sangat cocok untuk *environment* saat ini.

4. **Integrasi AI Karina (Google Gemini)**
   - **Tugas:** Menggunakan `GOOGLE_API_KEY` (di `.env.local`) untuk "menghidupkan" bot Karina.
   - **Pendekatan AI:** Saat *webhook* menerima pesan dari prospek/klien, rute API tidak hanya menyimpan pesan ke database, tetapi juga mem- *forward* konteks obrolan ke Gemini. Gemini akan bertindak berdasarkan *prompt* (instruksi khusus) sebagai CS Citilex bernama Karina, lalu mengirimkan respons tersebut kembali melalui WhatsApp API.

> **💡 Catatan & Pandangan AI:**
> Rencana ini **sangat solid dan komprehensif!** Arsitektur 4 pilar di atas (WA API -> Webhook -> Realtime UI -> Gemini) adalah standar emas untuk aplikasi CRM cerdas masa kini. Pastikan variabel `GOOGLE_API_KEY` sudah terisi dengan benar di `.env.local` sebelum kita memulai fase pemrograman Gemini.
