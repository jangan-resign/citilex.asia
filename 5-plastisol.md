// Kalkulator Plastisol Logic

// Data Harga Base Plastisol
const BASE_PRICE = {
    "A3+": 25000,
    "A2": 35000
};

let lokasiCounter = 0;

// Fungsi pembantu untuk menampilkan pesan error inline
function showError(message) {
    const errorEl = document.getElementById("error_message");
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove("d-none");

        // Hilangkan pesan otomatis setelah 8 detik
        setTimeout(() => {
            errorEl.classList.add("d-none");
        }, 8000);
    }
}

// Menyembunyikan pesan error inline
function hideError() {
    const errorEl = document.getElementById("error_message");
    if (errorEl) {
        errorEl.classList.add("d-none");
    }
}

// Menambahkan baris input desain baru
function tambahLokasi() {
    lokasiCounter++;
    const container = document.getElementById("design_inputs_container");

    const html = `
    <div class="card card-body bg-white shadow-sm border-0 mb-3 position-relative" id="lokasi_${lokasiCounter}">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold text-primary mb-0 lokasi-label"><i class="bi bi-aspect-ratio me-2"></i>Desain ${lokasiCounter}</h6>
        <button type="button" class="btn-close" aria-label="Close" onclick="hapusLokasi(${lokasiCounter})"></button>
      </div>
      <div class="row g-3">
        <div class="col-6">
          <label class="form-label small text-muted mb-1">Lebar (cm)</label>
          <input type="number" id="lebar_${lokasiCounter}" class="form-control form-control-sm dimension-input" min="1" placeholder="Contoh: 10" oninput="updateExtraFees()">
        </div>
        <div class="col-6">
          <label class="form-label small text-muted mb-1">Tinggi (cm)</label>
          <input type="number" id="tinggi_${lokasiCounter}" class="form-control form-control-sm dimension-input" min="1" placeholder="Contoh: 10" oninput="updateExtraFees()">
        </div>
      </div>
    </div>
  `;

    container.insertAdjacentHTML("beforeend", html);
    updateLabelsAndCount();
}

// Menghapus baris input desain
function hapusLokasi(id) {
    const el = document.getElementById(`lokasi_${id}`);
    if (el) {
        el.remove();
        updateLabelsAndCount();
        updateExtraFees();
    }
}

// Memperbarui label penomoran desain
function updateLabelsAndCount() {
    const labels = document.querySelectorAll(".lokasi-label");
    labels.forEach((label, index) => {
        label.innerHTML = `<i class="bi bi-aspect-ratio me-2"></i>Desain ${index + 1}`;
    });
}

// Menentukan area spesifik Plastisol (Max Width 37cm untuk A2 Plastisol)
function determinePlastisolArea(designs) {
    if (!designs || designs.length === 0) return { finalCode: "A3+", width: 0, height: 0, message: "" };

    // Panggil logika Bin Packing murni dengan Max Width Plastisol (37cm)
    const area = calculateCombinedArea(designs, 37);
    const finalW = area.width;
    const finalH = area.height;

    // Klasifikasi Plastisol
    // A3+ = 31 x 47
    // A2 = 37 x 54
    let finalCode = "A2";
    let isMaxExceeded = false;
    
    const checkFit = (w, h, maxW, maxH) => (w <= maxW && h <= maxH) || (w <= maxH && h <= maxW);

    if (checkFit(finalW, finalH, 31, 47)) {
        finalCode = "A3+";
    } else if (checkFit(finalW, finalH, 37, 54)) {
        finalCode = "A2";
    } else {
        isMaxExceeded = true;
    }

    return {
        finalCode,
        width: Math.ceil(finalW),
        height: Math.ceil(finalH),
        message: isMaxExceeded
            ? `Melebihi A2 Plastisol (${Math.ceil(finalW)}x${Math.ceil(finalH)}cm)`
            : `${finalCode} (${Math.ceil(finalW)}x${Math.ceil(finalH)}cm)`
    };
}

// Update dimensi gabungan saat user mengetik
function updateExtraFees() {
    const inputs = document.querySelectorAll(".dimension-input");
    const designs = [];

    for (let i = 0; i < inputs.length; i += 2) {
        const w = parseFloat(inputs[i].value) || 0;
        const h = parseFloat(inputs[i + 1].value) || 0;
        if (w > 0 && h > 0) {
            designs.push({ W: w, H: h });
        }
    }

    const areaInfo = determinePlastisolArea(designs);
    const dimensionDisplay = document.getElementById("final_dimension_display");

    if (dimensionDisplay) {
        dimensionDisplay.value = areaInfo.message;
        
        // Ganti warna teks merah jika error
        if (areaInfo.message.includes("Melebihi")) {
            dimensionDisplay.classList.remove("text-primary");
            dimensionDisplay.classList.add("text-danger");
        } else {
            dimensionDisplay.classList.remove("text-danger");
            dimensionDisplay.classList.add("text-primary");
        }
    }
}

// Fungsi Utama Perhitungan
function calculatePrice() {
    hideError();

    const emptyState = document.getElementById("plastisol_empty_state");
    const resultContainer = document.getElementById("plastisol_result_container");

    // 1. Ambil Input Dasar
    const qtyInput = document.getElementById("total_qty");
    const warnaInput = document.getElementById("jumlah_warna");

    const qty = parseInt(qtyInput.value);
    const warna = parseInt(warnaInput.value);

    // 2. Ambil Input Desain
    const inputs = document.querySelectorAll(".dimension-input");
    const designs = [];
    let isAllInputsValid = true;

    for (let i = 0; i < inputs.length; i += 2) {
        const w = parseFloat(inputs[i].value) || 0;
        const h = parseFloat(inputs[i + 1].value) || 0;
        if (w > 0 && h > 0) {
            designs.push({ W: w, H: h });
        } else {
            isAllInputsValid = false;
        }
    }

    // Validasi Desain Kosong
    if (designs.length === 0 || !isAllInputsValid) {
        Swal.fire({
            icon: 'warning',
            title: 'Desain Belum Lengkap',
            text: 'Harap pastikan semua dimensi desain (lebar dan tinggi) telah terisi dengan benar (minimal 1 cm).',
            confirmButtonColor: '#ffc107',
            iconColor: '#ffc107'
        });
        return;
    }

    // Validasi Input
    if (isNaN(qty) || isNaN(warna)) {
        Swal.fire({
            icon: 'warning',
            title: 'Data Belum Lengkap',
            text: 'Harap lengkapi Jumlah (pcs) dan Jumlah Warna terlebih dahulu.',
            confirmButtonColor: '#ffc107',
            iconColor: '#ffc107'
        });
        return;
    }

    if (qty < 0 || warna < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Input Tidak Valid',
            text: 'Jumlah dan Warna tidak boleh negatif.',
            confirmButtonColor: '#dc3545'
        });
        return;
    }

    // Validasi Min Order (Minimal 24 pcs)
    if (qty < 24) {
        if (emptyState) emptyState.classList.remove("d-none");
        if (resultContainer) resultContainer.classList.add("d-none");
        
        Swal.fire({
            icon: 'warning',
            title: 'Minimal Pemesanan',
            text: 'Minimal order untuk Sablon Plastisol adalah 24 pcs.',
            confirmButtonColor: '#ffc107',
            iconColor: '#ffc107'
        });
        showError("⚠️ Minimal pemesanan adalah 24 pcs");
        return;
    }

    // 3. Tentukan Area Sablon
    const areaInfo = determinePlastisolArea(designs);
    
    // Jika melebihi batas A2 Plastisol
    if (areaInfo.message.includes("Melebihi")) {
        if (emptyState) emptyState.classList.remove("d-none");
        if (resultContainer) resultContainer.classList.add("d-none");
        
        Swal.fire({
            icon: 'error',
            title: 'Ukuran Terlalu Besar',
            text: 'Total gabungan desain Anda melebihi ukuran maksimal yang didukung (A2 Plastisol: 37x54cm).',
            confirmButtonColor: '#dc3545'
        });
        showError("⚠️ Desain melebihi batas maksimal ukuran A2.");
        return;
    }

    // 4. Hitung Base Price
    const ukuran = areaInfo.finalCode;
    const hargaDasarPerPcs = BASE_PRICE[ukuran];

    // 5. Hitung Biaya Tambahan Warna
    // Harga dasar mencakup 1-5 warna. Lebih dari 5, +Rp2.000 per warna tambahan
    let biayaTambahanWarna = 0;
    if (warna > 5) {
        biayaTambahanWarna = (warna - 5) * 2000;
    }

    // 6. Hitung Harga Final
    const hargaFinalPerPcs = hargaDasarPerPcs + biayaTambahanWarna;
    const hargaTotalKeseluruhan = hargaFinalPerPcs * qty;

    // 7. Update UI Hasil
    // Update Badge Ukuran Area
    document.getElementById("area_result").textContent = ukuran;

    // Update Detail Harga
    document.getElementById("base_price_result").textContent = formatIDR(hargaDasarPerPcs);
    document.getElementById("additional_fee_warna_result").textContent = formatIDR(biayaTambahanWarna);
    document.getElementById("price_result").textContent = formatIDR(hargaFinalPerPcs);

    // Update Quantity Label (pcs)
    const qtyLabel = document.getElementById("total_qty_label");
    if (qtyLabel) {
        qtyLabel.textContent = `(${qty} pcs)`;
    }

    // Update Kotak Total Keseluruhan
    document.getElementById("total_price_result").textContent = formatIDR(hargaTotalKeseluruhan);

    // Update Kotak Biru (Harga Satuan Besar)
    const displayBox = document.getElementById("display_price_satuan");
    if (displayBox) displayBox.textContent = formatIDR(hargaFinalPerPcs);

    // Tampilkan Hasil (Sembunyikan Empty State)
    if (emptyState) emptyState.classList.add("d-none");
    if (resultContainer) resultContainer.classList.remove("d-none");
}

// Inisialisasi awal
document.addEventListener('DOMContentLoaded', () => {
    // Tampilkan 1 input desain default saat pertama kali dimuat
    tambahLokasi();

    const qtyInput = document.getElementById('total_qty');
    if (qtyInput) {
        qtyInput.addEventListener('input', () => {
            const qtyLabel = document.getElementById("total_qty_label");
            if (qtyLabel) {
                qtyLabel.textContent = qtyInput.value ? `(${qtyInput.value} pcs)` : "";
            }
        });
    }
});
