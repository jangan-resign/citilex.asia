// 1. DATA HARGA (Gunakan struktur objek seperti contohmu)
const PRICE_LIST_DATA = [
  {
    jenis: "RUBBER",
    warna: 1,
    min: 10,
    max: 30,
    hargaDasar: 10000,
    ukuran: "A4",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 31,
    max: 50,
    hargaDasar: 8000,
    ukuran: "A4",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 51,
    max: 199,
    hargaDasar: 7000,
    ukuran: "A4",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 100,
    max: 9999,
    hargaDasar: 5000,
    ukuran: "A4",
  },
  // A3
  {
    jenis: "RUBBER",
    warna: 1,
    min: 10,
    max: 30,
    hargaDasar: 10000,
    ukuran: "A3",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 31,
    max: 50,
    hargaDasar: 8000,
    ukuran: "A3",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 51,
    max: 199,
    hargaDasar: 7000,
    ukuran: "A3",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 100,
    max: 9999,
    hargaDasar: 6000,
    ukuran: "A3",
  },
  // A2
  {
    jenis: "RUBBER",
    warna: 1,
    min: 10,
    max: 30,
    hargaDasar: 15000,
    ukuran: "A2",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 31,
    max: 50,
    hargaDasar: 12000,
    ukuran: "A2",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 51,
    max: 199,
    hargaDasar: 11000,
    ukuran: "A2",
  },
  {
    jenis: "RUBBER",
    warna: 1,
    min: 100,
    max: 9999,
    hargaDasar: 10000,
    ukuran: "A2",
  },
  // Warna 2-5
  {
    jenis: "RUBBER",
    warna: 2,
    min: 10,
    max: 30,
    hargaDasar: 12000,
    ukuran: "A4",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 31,
    max: 50,
    hargaDasar: 9000,
    ukuran: "A4",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 51,
    max: 199,
    hargaDasar: 8000,
    ukuran: "A4",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 100,
    max: 9999,
    hargaDasar: 7000,
    ukuran: "A4",
  },
  // A3
  {
    jenis: "RUBBER",
    warna: 2,
    min: 10,
    max: 30,
    hargaDasar: 13000,
    ukuran: "A3",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 31,
    max: 50,
    hargaDasar: 11000,
    ukuran: "A3",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 51,
    max: 199,
    hargaDasar: 9000,
    ukuran: "A3",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 100,
    max: 9999,
    hargaDasar: 8000,
    ukuran: "A3",
  },
  // A2
  {
    jenis: "RUBBER",
    warna: 2,
    min: 10,
    max: 30,
    hargaDasar: 18000,
    ukuran: "A2",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 31,
    max: 50,
    hargaDasar: 16000,
    ukuran: "A2",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 51,
    max: 199,
    hargaDasar: 15000,
    ukuran: "A2",
  },
  {
    jenis: "RUBBER",
    warna: 2,
    min: 100,
    max: 9999,
    hargaDasar: 13000,
    ukuran: "A2",
  },
];

const PAPER_SIZES = {
  A4: { W: 21, H: 29 },
  A3: { W: 29, H: 42 },
  A2: { W: 42, H: 59 },
};


// 2. LOGIKA PENENTUAN AREA (Identik)
function determinePrintArea(designs) {
  if (!designs || designs.length === 0) return { finalCode: "A4", width: 0, height: 0 };

  // Hitung area dengan Max Paper Width 42cm (Kertas A2 Rubber)
  const area = calculateCombinedArea(designs, 42);
  const finalW = area.width;
  const finalH = area.height;

  // 6. Tentukan Kategori Kertas
  let finalCode = "A2";
  let isMaxExceeded = false;
  const checkFit = (w, h, p) =>
    (w <= p.W && h <= p.H) || (w <= p.H && h <= p.W);

  if (checkFit(finalW, finalH, PAPER_SIZES.A4)) finalCode = "A4";
  else if (checkFit(finalW, finalH, PAPER_SIZES.A3)) finalCode = "A3";
  else if (checkFit(finalW, finalH, PAPER_SIZES.A2)) finalCode = "A2";
  else isMaxExceeded = true;

  return {
    finalCode,
    width: Math.ceil(finalW),
    height: Math.ceil(finalH),
    message: isMaxExceeded
      ? `Melebihi A2 (${Math.ceil(finalW)}x${Math.ceil(finalH)}cm)`
      : `${finalCode} (${Math.ceil(finalW)}x${Math.ceil(finalH)}cm)`,
  };
}

// 3. LOGIKA CARI HARGA (Identik)
function getHargaSablon(jenisSablon, jumlahWarna, ukuranArea, qty) {
  const searchWarna = Math.min(jumlahWarna, 5) > 1 ? 2 : 1;

  const match = PRICE_LIST_DATA.find(
    (d) =>
      d.jenis === jenisSablon &&
      d.warna === searchWarna &&
      d.ukuran === ukuranArea &&
      qty >= d.min &&
      qty <= d.max
  );

  return match ? match.hargaDasar : 0;
}

// 4. FUNGSI UTAMA HITUNG (Identik dengan perbaikan proteksi NaN)
// FUNGSI 1: Update Biaya Tambahan (OTOMATIS)
// FUNGSI 1: Update Biaya Tambahan & Dimensi (OTOMATIS)
function updateExtraFees() {
  const jumlahWarna =
    parseInt(document.getElementById("jumlah_warna").value) || 0;

  // Ambil jumlah baris lokasi yang ada saat ini
  const currentRows = document.querySelectorAll(".design-row");
  const jumlahLokasi = currentRows.length;

  // Biaya Tambahan
  let biayaTambahanLokasi = jumlahLokasi > 2 ? (jumlahLokasi - 2) * 500 : 0;
  let biayaTambahanWarna = jumlahWarna > 5 ? (jumlahWarna - 5) * 1000 : 0;

  // Update Tampilan Biaya di Tabel Rincian
  document.getElementById("additional_fee_lokasi_result").textContent =
    formatIDR(biayaTambahanLokasi);
  document.getElementById("additional_fee_warna_result").textContent =
    formatIDR(biayaTambahanWarna);

  // Update Label Qty
  const qtyLabel = document.getElementById("total_qty_label");
  const totalQty = parseInt(document.getElementById("total_qty").value) || 0;
  if (qtyLabel) {
    qtyLabel.textContent = `(${totalQty} pcs)`;
  }

  // Hitung Dimensi Gabungan
  const widths = Array.from(document.querySelectorAll(".design-w")).map(
    (el) => parseFloat(el.value) || 0
  );
  const heights = Array.from(document.querySelectorAll(".design-h")).map(
    (el) => parseFloat(el.value) || 0
  );
  const designDimensions = widths.map((w, i) => ({ W: w, H: heights[i] }));

  if (designDimensions.length > 0) {
    const areaData = determinePrintArea(designDimensions);

    // UBAH BAGIAN INI:
    // Jika ingin di Tabel Rincian juga muncul LxT, gunakan areaData.message
    document.getElementById("area_result").textContent = areaData.message;

    // Jika ingin di Kotak Input juga muncul format yang sama
    document.getElementById("final_dimension_display").value = areaData.message;

    return areaData; // Kembalikan data untuk dipakai calculatePrice
  }
  return null;
}

// FUNGSI 2: Hitung Harga Total (VIA TOMBOL)
// Fungsi pembantu untuk menampilkan pesan error tanpa pop-up
function showError(message) {
  const errorEl = document.getElementById("error_message");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove("d-none");

    // Opsional: Hilangkan pesan otomatis setelah 5 detik
    setTimeout(() => {
      errorEl.classList.add("d-none");
    }, 8000);
  }
}

// FUNGSI 2: Hitung Harga Total
function calculatePrice() {
  // 1. Ambil Input Dasar
    
    // Ambil semua input dimensi untuk dicek apakah ada yang kosong/0
    const qtyInput = document.getElementById("total_qty");
    const warnaInput = document.getElementById("jumlah_warna");
  const checkQty = parseInt(qtyInput.value) || 0;
  const checkhWarna = parseInt(warnaInput.value) || 0;

  // Ambil semua input lebar & tinggi untuk dicek isinya
  const checkWidths = Array.from(document.querySelectorAll(".design-w")).map(el => parseFloat(el.value) || 0);
  const checkHeights = Array.from(document.querySelectorAll(".design-h")).map(el => parseFloat(el.value) || 0);

  // Cek kondisi: Jika Qty 0 ATAU ada Desain yang ukurannya 0
  const isDataKosong = checkQty < 10 || checkhWarna === 0 || checkWidths.some(w => w === 0) || checkHeights.some(h => h === 0);

  if (isDataKosong) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Lengkapi data Qty (Min 10 pcs), Warna dan Dimensi Desain terlebih dahulu.',
      confirmButtonColor: '#ffc107',
      iconColor: '#ffc107'
    });
    return; // STOP! Jangan lanjut ke bawah
  }

  

  const errorEl = document.getElementById("error_message");
  if (errorEl) errorEl.classList.add("d-none");

  const emptyState = document.getElementById("rubber_empty_state");
  const resultContainer = document.getElementById("rubber_result_container");

  // Jalankan update biaya tambahan dulu
  const areaData = updateExtraFees();

  // 1. Cek Kelengkapan Data (Dimensi)
  // Jika dimensi 0 atau tidak ada area, tampilkan hasil 0 (User Request)
  if (!areaData || areaData.width === 0 || areaData.height === 0) {
    document.getElementById("base_price_result").textContent = formatIDR(0);
    document.getElementById("price_result").textContent = formatIDR(0);
    const displayBox = document.getElementById("display_price_satuan");
    if (displayBox) displayBox.textContent = formatIDR(0);
    document.getElementById("total_price_result").textContent = formatIDR(0);

    if (emptyState) emptyState.classList.add("d-none");
    if (resultContainer) resultContainer.classList.remove("d-none");
    return;
  }

  // 2. Ambil Input Lain
  const totalQty = parseInt(document.getElementById("total_qty").value) || 0;
  const jumlahWarna = parseInt(document.getElementById("jumlah_warna").value) || 0;
  const currentRows = document.querySelectorAll(".design-row");
  const jumlahLokasi = currentRows.length;

  // 3. Validasi Min Order
  if (totalQty < 10) {
    if (emptyState) emptyState.classList.remove("d-none");
    if (resultContainer) resultContainer.classList.add("d-none");
    if (totalQty > 0) showError("⚠️ Minimal pemesanan adalah 10 pcs");
    return;
  }

  // 4. Hitung Harga
  const hargaDasarPerPcs = getHargaSablon(
    "RUBBER",
    jumlahWarna,
    areaData.finalCode,
    totalQty
  );

  if (hargaDasarPerPcs === 0) {
    showError("⚠️ Harga tidak ditemukan untuk Qty/Warna ini.");
    if (emptyState) emptyState.classList.remove("d-none");
    if (resultContainer) resultContainer.classList.add("d-none");
    return;
  }

  let biayaTambahanLokasi = jumlahLokasi > 2 ? (jumlahLokasi - 2) * 500 : 0;
  let biayaTambahanWarna = jumlahWarna > 5 ? (jumlahWarna - 5) * 1000 : 0;

  const hargaFinalPerPcs =
    hargaDasarPerPcs + biayaTambahanLokasi + biayaTambahanWarna;
  const hargaTotalKeseluruhan = hargaFinalPerPcs * totalQty;

  // 5. Update UI
  document.getElementById("base_price_result").textContent =
    formatIDR(hargaDasarPerPcs);
  document.getElementById("price_result").textContent =
    formatIDR(hargaFinalPerPcs);

  // Update Display Blue Box
  const displayBox = document.getElementById("display_price_satuan");
  if (displayBox) displayBox.textContent = formatIDR(hargaFinalPerPcs);

  document.getElementById("total_price_result").textContent = formatIDR(
    hargaTotalKeseluruhan
  );

  // Show Result
  if (emptyState) emptyState.classList.add("d-none");
  if (resultContainer) resultContainer.classList.remove("d-none");
}

// 5. GENERATE INPUT
// Global variable untuk melacak jumlah lokasi
let lokasiCounter = 0;

// Fungsi untuk menambah lokasi baru (Tombol +)
function tambahLokasi() {
  lokasiCounter++;
  const container = document.getElementById("design_inputs_container");

  const div = document.createElement("div");
  div.className = "design-row card border-0 bg-light shadow-sm mb-2";
  div.innerHTML = `
    <div class="card-body p-2">
        <div class="row align-items-end g-2">
            <div class="col-md-auto col-12 mb-1 mb-md-1">
                <strong class="text-primary small text-uppercase">DESAIN <span class="nomer-urut"></span></strong>
            </div>
            <div class="col">
                <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Lebar (cm)</label>
                <input type="number" class="form-control form-control-sm design-w" placeholder="0" min="0" step="0.1">
            </div>
            <div class="col">
                <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Tinggi (cm)</label>
                <input type="number" class="form-control form-control-sm design-h" placeholder="0" min="0" step="0.1">
            </div>
            <div class="col-auto">
                ${lokasiCounter > 1
      ? `<button type="button" onclick="hapusLokasi(this)" class="btn btn-link text-danger p-0 pb-1" title="Hapus"><i class="bi bi-trash"></i></button>`
      : `<div style="width: 24px;"></div>`
    }
            </div>
        </div>
    </div>
        </div>
    </div>`;

  container.appendChild(div);
  updateLabelsAndCount();
}

// Fungsi untuk menghapus lokasi
function hapusLokasi(btn) {
  btn.closest(".design-row").remove();
  updateLabelsAndCount();
}

// Fungsi merapikan nomor urut dan update jumlah lokasi untuk biaya tambahan
function updateLabelsAndCount() {
  const rows = document.querySelectorAll(".design-row");
  lokasiCounter = rows.length;

  // Update teks angka Lokasi 1, 2, 3 dst
  rows.forEach((row, index) => {
    row.querySelector(".nomer-urut").textContent = index + 1;
  });

  // Update 'hidden' value atau variable jika sistem calculatePrice lama butuh id num_designs
  // Tapi karena kita akan update calculatePrice, kita ambil langsung dari jumlah .design-row
}

// Tambahkan inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Jalankan sekali untuk memunculkan Lokasi 1 secara default
  tambahLokasi();
  renderPriceTable();
});

// Fungsi untuk memuat data ke tabel saat halaman dibuka (Matrix Style)
function renderPriceTable() {
  const tableContainer = document.querySelector("#price_table_container table");
  if (!tableContainer) return;

  // 1. Extract Unique Ranges and Sort
  const ranges = [];
  const rangeSet = new Set();

  PRICE_LIST_DATA.forEach(item => {
    const key = `${item.min}-${item.max}`;
    if (!rangeSet.has(key)) {
      rangeSet.add(key);
      ranges.push({ min: item.min, max: item.max });
    }
  });

  // Sort ranges by min value
  ranges.sort((a, b) => a.min - b.min);

  // 2. Group by Product (Ukuran + Warna)
  const products = {};
  PRICE_LIST_DATA.forEach(item => {
    // Create a key for the product type
    const prodKey = `${item.ukuran} - ${item.warna} Warna`;
    if (!products[prodKey]) {
      products[prodKey] = {};
    }
    // Store price for this specific range
    const rangeKey = `${item.min}-${item.max}`;
    products[prodKey][rangeKey] = item.hargaDasar;
  });

  // 3. Build Header
  let theadHTML = '<tr class="table-light"><th class="text-start">Spesifikasi</th>';
  ranges.forEach(r => {
    const maxLabel = r.max === 9999 ? ">" : `-${r.max}`;
    theadHTML += `<th style="min-width: 100px;">${r.min}${maxLabel} pcs</th>`;
  });
  theadHTML += '</tr>';

  const thead = tableContainer.querySelector('thead');
  if (thead) thead.innerHTML = theadHTML;

  // 4. Build Body
  let tbodyHTML = "";
  for (const [prodName, priceMap] of Object.entries(products)) {
    tbodyHTML += `<tr>
        <td class="text-start fw-bold small">${prodName}</td>`;

    ranges.forEach(r => {
      const rangeKey = `${r.min}-${r.max}`;
      const price = priceMap[rangeKey];
      const displayPrice = price ? formatIDR(price) : "-";
      tbodyHTML += `<td class="small">${displayPrice}</td>`;
    });

    tbodyHTML += `</tr>`;
  }

  const tbody = document.getElementById("price_table_body");
  if (tbody) tbody.innerHTML = tbodyHTML;
}

// Fungsi Buka-Tutup Accordion
function togglePriceTable() {
  const container = document.getElementById("price_table_container");
  const btn = document.querySelector(".btn-accordion");

  if (container.classList.contains("d-none")) {
    container.classList.remove("d-none");
    btn.innerHTML = '<i class="bi bi-x-lg me-2"></i> Tutup Daftar Harga';
    btn.classList.remove("btn-outline-danger");
    btn.classList.add("btn-danger");

    // Auto scroll to table
    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

  } else {
    container.classList.add("d-none");
    btn.innerHTML = '<i class="bi bi-table me-2"></i> Lihat Daftar Harga';
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-outline-danger");
  }
}

// Panggil render saat script dimuat
renderPriceTable();
