const PRICELIST_BORDIR = [
  { minS: 100, maxS: 2999, prices: [6000, 5000, 3500, 3000, 2500, 2000] },
  { minS: 3000, maxS: 5000, prices: [8000, 6000, 4500, 4000, 3000, 2500] },
  { minS: 5001, maxS: 8000, prices: [10000, 7000, 6000, 5000, 3500, 3000] },
  { minS: 8001, maxS: 10000, prices: [12000, 8000, 7000, 6000, 4000, 3500] },
];

function getQtyColIndex(qty) {
  if (qty <= 6) return 0;
  if (qty <= 12) return 1;
  if (qty <= 24) return 2;
  if (qty <= 48) return 3;
  if (qty <= 100) return 4;
  return 5; // > 100
}

let titikCounter = 0;

function tambahTitikBordir() {
  titikCounter++;
  const container = document.getElementById("bordir_inputs_container");

  const div = document.createElement("div");
  div.className = "bordir-item card border-0 bg-light shadow-sm mb-2";

  div.innerHTML = `
    <div class="card-body p-2">
        <div class="row align-items-end g-2">
            <div class="col-md-auto col-12 mb-1 mb-md-1">
                <strong class="text-primary small text-uppercase bordir-name">DESAIN ${titikCounter}</strong>
            </div>
            <div class="col">
                <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Lebar (cm)</label>
                <input type="number" class="form-control form-control-sm b-lebar" placeholder="0">
            </div>
            <div class="col">
                <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Tinggi (cm)</label>
                <input type="number" class="form-control form-control-sm b-tinggi" placeholder="0">
            </div>
            <div class="col">
                <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Kerapatan</label>
                <select class="form-select form-select-sm b-density">
                    <option value="210">High Density (210)</option>
                    <option value="200">Medium Density (200)</option>
                    <option value="190">Low Density (190)</option>
                </select>
            </div>
            <div class="col">
                <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Kepadatan (%)</label>
                <input type="number" class="form-control form-control-sm b-kepadatan" placeholder="100" min="0" value="100">
            </div>
            <div class="col-auto">
                ${
                  titikCounter > 1
                    ? `<button onclick="hapusTitik(this)" class="btn btn-link text-danger p-0 pb-1" title="Hapus"><i class="bi bi-trash"></i></button>`
                    : `<div style="width: 24px;"></div>`
                }
            </div>
        </div>
    </div>
  `;
  container.appendChild(div);
}

function hapusTitik(btn) {
  btn.closest(".bordir-item").remove();
  reorderTitik();
}

function reorderTitik() {
  const items = document.querySelectorAll(".bordir-item .bordir-name");
  items.forEach((item, i) => (item.textContent = `DESAIN ${i + 1}`));
}

function hitungBordir() {
  const qtyInput = document.getElementById("qty_bordir");
  const qty = parseInt(qtyInput.value) || 0;
  const items = document.querySelectorAll(".bordir-item");
  const rincianDiv = document.getElementById("rincian_per_titik");

  const resultCard = document.getElementById("hasil_kalkulasi");
  const emptyState = document.getElementById("bordir_empty_state");

  if (qty === 0) {
    Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Lengkapi data utama Kuantitas terlebih dahulu.',
        confirmButtonColor: '#ffc107',
        iconColor: '#ffc107'
    });
    return;
  }

  let totalPerPcs = 0;
  let htmlRincian = "";
  const colIdx = getQtyColIndex(qty);

  // Faktor pengali berdasarkan kolom qty
  const faktorCustom = [1.2, 0.8, 0.7, 0.5, 0.38, 0.35];

  let valid = true;
  items.forEach((item, i) => {
    const w = parseFloat(item.querySelector(".b-lebar").value) || 0;
    const h = parseFloat(item.querySelector(".b-tinggi").value) || 0;
    const dens = parseInt(item.querySelector(".b-density").value);
    const kepadatan = parseFloat(item.querySelector(".b-kepadatan").value) || 100;

    if (w <= 0 || h <= 0) {
      valid = false;
      return;
    }

    const totalStitch = Math.ceil(w * h * dens * kepadatan/100);
    let hargaTitik = 0;

    // Kalkulasi harga dasar
    if (totalStitch > 10000) {
      const multiplier = faktorCustom[colIdx];
      hargaTitik = totalStitch * multiplier;
    } else {
      const range = PRICELIST_BORDIR.find(
        (r) => totalStitch >= r.minS && totalStitch <= r.maxS
      );
      if (range) {
        hargaTitik = range.prices[colIdx];
      } else {
        hargaTitik = PRICELIST_BORDIR[0].prices[colIdx];
      }
    }

    // Aplikasi kepadatan: (harga × kepadatan) / 100
    const hargaAkhir = hargaTitik;

    totalPerPcs += hargaAkhir;
    htmlRincian += `
            <div class="d-flex justify-content-between mb-1 small">
                <span>Desain ${i + 1} (${formatAngka(totalStitch)} st, ${kepadatan}%)</span>
                <span class="fw-bold">${formatIDR(
                  hargaTitik
                )}</span>
            </div>`;
  });

  if (!valid) {
    Swal.fire({
        icon: 'warning',
        title: 'Input Tidak Lengkap',
        text: 'Mohon isi ukuran Lebar dan Tinggi untuk semua desain bordir.',
        confirmButtonColor: '#ffc107'
    });
    return;
  }

  const totalFinal = totalPerPcs * qty;

  // Update UI
  rincianDiv.innerHTML = htmlRincian;
  document.getElementById("total_per_pcs").textContent =
    formatIDR(totalPerPcs);
  document.getElementById("total_keseluruhan").textContent =
    formatIDR(totalFinal);
  document.getElementById("display_qty").textContent =
    qty.toLocaleString("id-ID");

  if (emptyState) emptyState.classList.add("d-none");
  resultCard.classList.remove("d-none");
}

function renderPriceTable() {
  const theadRow = document.getElementById("table_header_row");
  const tbody = document.getElementById("price_table_body");

  const headers = [
    "< 7pcs",
    "7-12pcs",
    "13-24pcs",
    "25-48pcs",
    "49-100pcs",
    "> 100pcs",
  ];
  let headerHTML = "<th>Stitches Range</th>";
  headers.forEach((h) => (headerHTML += `<th>${h}</th>`));
  theadRow.innerHTML = headerHTML;

  let bodyHTML = "";
  PRICELIST_BORDIR.forEach((row) => {
    bodyHTML += `<tr>
            <td>${row.minS} - ${row.maxS}</td>
            ${row.prices
              .map((p) => `<td>${formatIDR(p)}</td>`)
              .join("")}
        </tr>`;
  });
  tbody.innerHTML = bodyHTML;
}

function togglePriceTable() {
  const container = document.getElementById("price_table_container");
  const btn = document.querySelector(".btn-accordion");

  if (container.classList.contains("d-none")) {
    container.classList.remove("d-none");
    btn.innerHTML = '<i class="bi bi-x-lg me-2"></i> Tutup Daftar Harga';
    btn.classList.remove("btn-outline-danger");
    btn.classList.add("btn-danger");
    setTimeout(() => {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  } else {
    container.classList.add("d-none");
    btn.innerHTML = '<i class="bi bi-table me-2"></i> Lihat Daftar Harga';
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-outline-danger");
  }
}

// Inisialisasi awal
document.addEventListener("DOMContentLoaded", () => {
  tambahTitikBordir();
  renderPriceTable();
});
