/* ===== Utilitas ===== */
const fmt = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })
const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const el = s => document.querySelector(s)
const els = s => [...document.querySelectorAll(s)]
const num = (i, d = 0) => { const v = parseFloat(i?.value); return Number.isFinite(v) ? v : d }

/* ===== Konfigurasi standar (AC, JH, JV, JA) ===== */
const CFG_DEFAULT = Object.freeze({ AC: 57, JH: 1.5, JV: 1, JA: 3 })
function getCfg() { return CFG_DEFAULT }

/* ===== Tarif dasar & tarif aktif ===== */
const DEFAULT_TARIF = [
    { max: 50, harga: 520 },
    { max: 100, harga: 450 },
    { max: 400, harga: 370 },
    { max: 1000, harga: 350 },
    { max: 2000, harga: 330 },
    { max: 5000, harga: 300 },
    { max: 999999, harga: 280 },
]
let activeTarif = DEFAULT_TARIF.slice()

/* ===== Tampilkan Tabel Harga (dua baris: batas & harga) ===== */
function renderTarifRows(arr) {
    const rowMax = el('#rowMax')
    const rowHarga = el('#rowHarga')
    rowMax.innerHTML = '<th class="bg-light sticky-start border-end">Batas ≤ cm</th>'
    rowHarga.innerHTML = '<th class="bg-light sticky-start border-end">Harga/cm</th>'

    for (const r of arr) {
        rowMax.insertAdjacentHTML('beforeend', `<td><input type="number" class="form-control form-control-sm text-center bg-white" value="${r.max}" readonly></td>`)
        rowHarga.insertAdjacentHTML('beforeend', `<td><input type="number" class="form-control form-control-sm text-center bg-white" value="${r.harga}" readonly></td>`)
    }
}

/* Membaca draft -> array tarif aktif (tidak disimpan) */
function readTarifDraft() {
    const maxInputs = els('#rowMax td input')
    const hargaInputs = els('#rowHarga td input')
    const n = Math.min(maxInputs.length, hargaInputs.length)
    const out = []
    for (let i = 0; i < n; i++) {
        const m = parseFloat(maxInputs[i].value)
        const h = Math.round(parseFloat(hargaInputs[i].value))
        out.push({ max: Number.isFinite(m) ? m : 999999, harga: Number.isFinite(h) ? h : 0 })
    }
    return out.sort((a, b) => a.max - b.max)
}
function getActiveTarif() { return activeTarif.slice().sort((a, b) => a.max - b.max) }

/* ===== Pembantu Antarmuka ===== */
function showNotice(msg = 'Kalibrasi diterapkan (sementara).') {
    const n = el('#kalibrasiNotice')
    if (!n) return
    n.textContent = msg
    n.classList.remove('d-none')
    clearTimeout(showNotice._t)
    showNotice._t = setTimeout(() => { n.classList.add('d-none'); }, 3000)
}
function toggleResetButton(show) {
    const btn = el('#resetTarifDefault')
    if (btn) {
        if (show) btn.classList.remove('d-none');
        else btn.classList.add('d-none');
    }
}

/* ===== Kalibrasi & Atur Ulang ===== */
function applyCalibration() {
    activeTarif = readTarifDraft()
    toggleResetButton(JSON.stringify(activeTarif) !== JSON.stringify(DEFAULT_TARIF))
    showNotice('Kalibrasi diterapkan (sementara).')
    scheduleCalc()
}
function resetTarifToDefault() {
    renderTarifRows(DEFAULT_TARIF)
    activeTarif = DEFAULT_TARIF.slice()
    toggleResetButton(false)
    showNotice('Tarif dikembalikan ke harga default.')
    scheduleCalc()
}

/* ===== Penghitung Baris ===== */
function renderCount() {
    const c = els('.dtf-row').length
    if (c === 0 && els('#resultTable td[colspan]').length === 0) { setPlaceholderOutput() }
}

/* ===== Operasi Baris ===== */
function addRow(p = { nama: 'Desain', lebar: '', tinggi: '' }) {
    const container = el('#dtf_inputs_container')
    const div = document.createElement('div')
    div.className = "dtf-row card border-0 bg-light shadow-sm"

    // Logic penomoran sederhana
    const idx = els('.dtf-row').length + 1
    const displayName = `Desain ${idx}`

    div.innerHTML = `
        <div class="card-body p-2">
            <div class="row align-items-end g-2">
                <div class="col-md-auto col-12 mb-1 mb-md-1">
                    <strong class="text-primary small text-uppercase dtf-name-label">${displayName}</strong>
                    <input type="hidden" class="dtf-name" value="${displayName}">
                </div>
                <div class="col">
                    <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Lebar (cm)</label>
                    <input type="number" class="form-control form-control-sm dtf-w" step="0.1" min="0.1" inputmode="decimal" value="${p.lebar}" placeholder="0">
                </div>
                <div class="col">
                    <label class="form-label x-small text-muted mb-0" style="font-size: 0.7rem;">Tinggi (cm)</label>
                    <input type="number" class="form-control form-control-sm dtf-h" step="0.1" min="0.1" inputmode="decimal" value="${p.tinggi}" placeholder="0">
                </div>
                <div class="col-auto">
                    ${idx > 1 ? `<button type="button" class="btn btn-link link-danger p-0 pb-1" data-action="delRow" title="Hapus"><i class="bi bi-trash"></i></button>` : ''}
                </div>
            </div>
        </div>
    `
    container.appendChild(div)
    renderCount()
}

function applyDefaultInputRow() {
    el('#dtf_inputs_container').innerHTML = ''
    addRow({ nama: 'Desain 1', lebar: '', tinggi: '' })
}
function setPlaceholderOutput() {
    el('#dtf_empty_state').classList.remove('d-none')
    el('#dtf_result_container').classList.add('d-none')

    el('#resultBody').innerHTML = `
        <tr>
            <td colspan="6" class="text-center text-muted py-4">
                <i class="bi bi-info-circle display-6 d-block mb-2"></i>
                Isi input lalu klik Hitung
            </td>
        </tr>`
    el('#totalPanjang').textContent = '0'
    el('#tarifPerCm').textContent = '0'
    el('#totalHarga').textContent = '0'
    el('#hargaPerPcs').textContent = '0'
}
function clearRows() { applyDefaultInputRow(); setPlaceholderOutput() }

/* ===== Aturan Bisnis ===== */
function qtyCad(q) { if (q <= 0) return 0; if (q <= 30) return q + 2; if (q <= 50) return q + 3; if (q <= 100) return q + 5; return q + 7 }
function pilihTarif(t, T) { return (T.find(x => t <= x.max) || T.at(-1)).harga }

/* ===== Evaluasi orientasi & perhitungan ===== */
function evalOrientation(lebar, tinggi, qty, cfg) {
    const within = (lebar >= 27 && lebar <= 28) || (tinggi >= 27 && tinggi <= 28)
    const JH_eff = within ? 1 : cfg.JH
    const qtyPlus = qtyCad(qty)
    const samp = Math.max(1, Math.floor((cfg.AC + JH_eff) / (lebar + JH_eff)))
    const bar = Math.ceil(qtyPlus / samp)
    const pj = bar * tinggi + (bar - 1) * (cfg.JV + cfg.JA) // JA aktif di vertikal
    return { qtyPlus, JH_eff, samp, bar, pj }
}

function renderZeroOutput() {
    el('#dtf_empty_state').classList.add('d-none')
    el('#dtf_result_container').classList.remove('d-none')

    el('#resultBody').innerHTML = `
        <tr>
            <td colspan="6" class="text-center text-muted py-4">
                <i class="bi bi-exclamation-circle display-6 d-block mb-2"></i>
                Data belum lengkap
            </td>
        </tr>`
    el('#totalPanjang').textContent = '0'
    el('#tarifPerCm').textContent = '0'
    el('#totalHarga').textContent = '0'
    el('#hargaPerPcs').textContent = '0'
}

function calculate() {
    const globalQty = Math.max(0, parseInt(el('#qty_dtf').value) || 0)
    const inputs = els('.dtf-row')

    // Validasi Kelengkapan
    let dataLengkap = inputs.length > 0 && globalQty > 0;
    inputs.forEach(div => {
        const w = parseFloat(div.querySelector('.dtf-w').value) || 0;
        const h = parseFloat(div.querySelector('.dtf-h').value) || 0;
        if (w <= 0 || h <= 0) dataLengkap = false;
    });

    if (!dataLengkap) {
        renderZeroOutput();
        return;
    }

    const rowsRaw = inputs.map(div => {
        return {
            nama: div.querySelector('.dtf-name').value,
            lebar: num(div.querySelector('.dtf-w')),
            tinggi: num(div.querySelector('.dtf-h')),
            qty: globalQty
        }
    })

    const cfg = getCfg()
    const det = []
    for (const r of rowsRaw) {
        const normal = evalOrientation(r.lebar, r.tinggi, r.qty, cfg)
        const rotasi = evalOrientation(r.tinggi, r.lebar, r.qty, cfg)
        const pick = (rotasi.pj < normal.pj)
            ? { mode: 'Rotasi', lebar: r.tinggi, tinggi: r.lebar, ...rotasi }
            : { mode: 'Normal', lebar: r.lebar, tinggi: r.tinggi, ...normal }
        det.push({ nama: r.nama, qty: r.qty, ...pick })
    }

    const totalP = det.reduce((s, v) => s + v.pj, 0)
    const tarif = pilihTarif(totalP, getActiveTarif())
    const harga = Math.round(totalP * tarif)
    const totalQtyAsli = det.reduce((s, r) => s + r.qty, 0)
    const totalQtyPlus = det.reduce((s, r) => s + r.qtyPlus, 0)
    const hargaPerPcsAsli = Math.round(harga / (globalQty || 1))
    const hargaPerPcsPlus = Math.round(harga / (det[0]?.qtyPlus || 1)) // Estimasi per set basis plus

    const tbody = el('#resultBody'); tbody.innerHTML = ''
    for (const r of det) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${r.nama}</td>
            <td class="text-center font-monospace">${fmt.format(r.qtyPlus)}</td>
            <td><span class="badge bg-secondary">${r.mode}</span></td>
            <td class="text-center font-monospace">${fmt.format(r.samp)}</td>
            <td class="text-center font-monospace">${fmt.format(r.bar)}</td>
            <td class="text-end fw-bold font-monospace">${fmt.format(r.pj)}</td>
        `;
        tbody.appendChild(tr)
    }

    el('#totalPanjang').textContent = fmt.format(totalP)
    el('#tarifPerCm').textContent = rupiah.format(tarif)
    el('#totalHarga').textContent = rupiah.format(harga)
    const hpp = el('#hargaPerPcs')
    hpp.textContent = rupiah.format(hargaPerPcsAsli)
    hpp.title = `Harga per Set (berbasis input qty: ${fmt.format(globalQty)})`

    // Update Label Qty
    const qtyLabel = el('#dtf_total_qty_label');
    if (qtyLabel && globalQty > 0) qtyLabel.textContent = `(${fmt.format(globalQty)} pcs)`;

    el('#dtf_empty_state').classList.add('d-none')
    el('#dtf_result_container').classList.remove('d-none')
}

/* ===== Perhitungan Tertunda (Debounce) ===== */
let tmr = null
function scheduleCalc() { clearTimeout(tmr); tmr = setTimeout(calculate, 120) }

/* ===== Sinkronisasi tarif dari draft (hitung otomatis) ===== */
function syncActiveTarifFromDraft() {
    activeTarif = readTarifDraft()
    toggleResetButton(JSON.stringify(activeTarif) !== JSON.stringify(DEFAULT_TARIF))
    scheduleCalc()
}

/* ===== Toggle Price Table ===== */
function togglePriceTable() {
    const container = el('#price_table_container')
    const btn = el('.btn-accordion')
    if (container.classList.contains('d-none')) {
        container.classList.remove('d-none')
        btn.innerHTML = '<i class="bi bi-x-lg me-2"></i> Tutup Daftar Harga'
        btn.classList.remove('btn-outline-danger')
        btn.classList.add('btn-danger')
    } else {
        container.classList.add('d-none')
        btn.innerHTML = '<i class="bi bi-table me-2"></i> Lihat Daftar Harga'
        btn.classList.remove('btn-danger')
        btn.classList.add('btn-outline-danger')
    }
}

/* ===== Penanganan Event ===== */
document.addEventListener('click', e => {
    // Handling tooltips/popovers or modals if any
    const btn = e.target.closest('button');
    const act = btn?.dataset?.action || e.target?.dataset?.action || e.target.id

    if (act === 'togglePriceTable') togglePriceTable()
    if (act === 'addTarif') {
        const rowMax = el('#rowMax')
        const rowHarga = el('#rowHarga')
        const tdMax = document.createElement('td')
        tdMax.innerHTML = `<input type="number" class="form-control form-control-sm text-center" value="0" step="1" min="1" inputmode="numeric">`
        rowMax.appendChild(tdMax)
        rowHarga.insertAdjacentHTML('beforeend', '<td><input type="number" class="form-control form-control-sm text-center" value="0" step="1" min="0" inputmode="numeric"></td>')
        syncActiveTarifFromDraft()
    }
    if (act === 'applyCalib') applyCalibration()
    if (act === 'resetTarifDefault') resetTarifToDefault()
    if (act === 'resetTop') clearRows()
    if (act === 'exportTop') window.print()
    if (act === 'calc') calculate()
    if (act === 'addRow') addRow({ nama: `Desain ${els('.dtf-row').length + 1}` })

    // Khusus tombol delete item
    if (act === 'delRow' || e.target.closest('[data-action="delRow"]')) {
        const row = e.target.closest('.dtf-row');
        if (row) {
            row.remove()
            renderCount()
            scheduleCalc()
        }
    }
})

document.addEventListener('input', e => {
    if (e.target.closest('#rowMax') || e.target.closest('#rowHarga')) {
        syncActiveTarifFromDraft()
    }
})

/* Tekan Enter untuk memicu perhitungan */
document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !(e.target instanceof HTMLButtonElement)) {
        // e.preventDefault() // Jangan prevent default agar input number bisa submit valuenya jika perlu
        calculate()
    }
})

/* ===== Inisialisasi ===== */
applyDefaultInputRow()
renderTarifRows(DEFAULT_TARIF)
activeTarif = DEFAULT_TARIF.slice()
toggleResetButton(false)
setPlaceholderOutput()
