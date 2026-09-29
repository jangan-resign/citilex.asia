(function () {
    const cv = document.getElementById('cv');
    const ctx = cv.getContext('2d');

    // ---- Pengaturan Hi-DPI (tajam di layar retina/4K) ----
    function setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const cssW = 1200, cssH = 900; // ukuran tampilan
        cv.width = Math.round(cssW * dpr);
        cv.height = Math.round(cssH * dpr);
        cv.style.width = cssW + 'px';
        cv.style.height = cssH + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 1 unit = 1 CSS px
    }
    setupCanvas();

    const file = document.getElementById('file');
    const list = document.getElementById('list');
    const realHeight = document.getElementById('realHeight');
    const hRealEl = document.getElementById('hReal');
    const resetMeasures = document.getElementById('resetMeasures');
    const exportBtn = document.getElementById('export');
    const zoomInput = document.getElementById('zoom');
    const zoomLabel = document.getElementById('zoomLabel');
    const fitBtn = document.getElementById('fit');
    const recalibBtn = document.getElementById('recalib');

    let img = null, baseScale = 1, viewZoom = 1, offX = 0, offY = 0;
    let phase = 'idle', pxPerCm = 0; // phase: 'idle' | 'calib' | 'measure'
    let rects = [], active = null, dragging = null, dragStart = null, handle = null;
    let idSeq = 1, spaceDown = false, panning = false, panStart = { x: 0, y: 0 };

    // === Indikator pegangan dan utilitas ===
    const HANDLE = 10; // piksel layar
    function pointInRect(p, r) {
        const x1 = Math.min(r.x, r.x + r.w), x2 = Math.max(r.x, r.x + r.w);
        const y1 = Math.min(r.y, r.y + r.h), y2 = Math.max(r.y, r.y + r.h);
        return p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2;
    }
    function cursorForHandle(h) {
        if (h === 'n' || h === 's') return 'ns-resize';
        if (h === 'e' || h === 'w') return 'ew-resize';
        if (h === 'nw' || h === 'se') return 'nwse-resize';
        if (h === 'ne' || h === 'sw') return 'nesw-resize';
        return 'default';
    }
    const isCalibLocked = () => phase === 'measure';

    function imgScale() { return baseScale * viewZoom; }
    function toCanvas(x, y) { const s = imgScale(); return { x: x * s + offX, y: y * s + offY }; }
    function toImage(x, y) { const s = imgScale(); return { x: (x - offX) / s, y: (y - offY) / s }; }

    function fitImage() {
        if (!img) return;
        const pad = 40, sx = (parseFloat(cv.style.width) - pad * 2) / img.width, sy = (parseFloat(cv.style.height) - pad * 2) / img.height;
        baseScale = Math.min(sx, sy); viewZoom = 1;
        zoomInput.value = 100; zoomLabel.textContent = '100%';
        const s = imgScale(); const dw = img.width * s, dh = img.height * s;
        const cw = parseFloat(cv.style.width), ch = parseFloat(cv.style.height);
        offX = (cw - dw) / 2; offY = (ch - dh) / 2;
    }

    function draw() {
        const cw = parseFloat(cv.style.width), ch = parseFloat(cv.style.height);
        ctx.clearRect(0, 0, cw, ch);

        if (img) { const s = imgScale(); ctx.drawImage(img, offX, offY, img.width * s, img.height * s); }
        rects.forEach(r => {
            const p = toCanvas(r.x, r.y), w = r.w * imgScale(), h = r.h * imgScale();
            const isCalib = r.type === 'calib';

            // Isi Warna
            ctx.fillStyle = isCalib ? 'rgba(245,197,66,.12)' : 'rgba(74,163,255,.12)';
            ctx.fillRect(p.x, p.y, w, h);

            // Garis Tepi: kalibrasi menggunakan garis putus-putus saat terkunci
            ctx.save();
            ctx.strokeStyle = isCalib ? '#f5c542' : (r === active ? '#7bdc8b' : '#4aa3ff');
            ctx.lineWidth = isCalib ? 2 : (r === active ? 2 : 1.5);
            if (isCalib && isCalibLocked()) ctx.setLineDash([6, 4]);
            ctx.strokeRect(p.x + .5, p.y + .5, w - 1, h - 1);
            ctx.restore();

            // Label Teks
            ctx.fillStyle = '#e9e9ee'; ctx.font = '12px system-ui';
            if (isCalib) {
                const locked = isCalibLocked() ? ' (terkunci)' : '';
                ctx.fillText(`Kalibrasi: ${realHeight.value} cm${locked}`, p.x + 6, p.y + 16);
            } else {
                const cm = pxToCm(r.w, r.h);
                ctx.fillText(`${cm.w.toFixed(2)}×${cm.h.toFixed(2)} cm`, p.x + 6, p.y + 16);
            }

            // Pegangan: hanya untuk kotak aktif & bukan kalibrasi terkunci
            if (r === active && !(r.type === 'calib' && isCalibLocked())) {
                const hs = HANDLE;
                const pts = [
                    { x: p.x, y: p.y }, // nw
                    { x: p.x + w / 2, y: p.y }, // n
                    { x: p.x + w, y: p.y }, // ne
                    { x: p.x + w, y: p.y + h / 2 }, // e
                    { x: p.x + w, y: p.y + h }, // se
                    { x: p.x + w / 2, y: p.y + h }, // s
                    { x: p.x, y: p.y + h }, // sw
                    { x: p.x, y: p.y + h / 2 }  // w
                ];
                ctx.save();
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#2a2a31';
                pts.forEach(pt => {
                    ctx.fillRect(pt.x - hs / 2, pt.y - hs / 2, hs, hs);
                    ctx.strokeRect(pt.x - hs / 2 + .5, pt.y - hs / 2 + .5, hs - 1, hs - 1);
                });
                ctx.restore();
            }
        });
    }

    function pxToCm(wpx, hpx) { if (pxPerCm <= 0) return { w: 0, h: 0 }; return { w: Math.abs(wpx) / pxPerCm, h: Math.abs(hpx) / pxPerCm }; }
    function updateList() {
        list.innerHTML = '';
        const measures = rects.filter(r => r.type === 'measure');
        if (measures.length === 0) {
            list.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-rulers d-block display-6 mb-2"></i>Belum ada pengukuran</div>';
            return;
        }
        measures.forEach((r, i) => {
            const cm = pxToCm(r.w, r.h);
            const div = document.createElement('div');
            div.className = `list-group-item list-group-item-action d-flex justify-content-between align-items-center ${active === r ? 'active' : ''}`;
            div.innerHTML = `
                <div>
                    <span class="fw-bold me-2">#${i + 1}</span>
                    <span class="font-monospace">${cm.w.toFixed(2)} × ${cm.h.toFixed(2)} cm</span>
                </div>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-light border" data-act="sel" data-id="${r.id}" title="Pilih"><i class="bi bi-bullseye"></i></button>
                    <button class="btn btn-light border text-danger" data-act="del" data-id="${r.id}" title="Hapus"><i class="bi bi-trash"></i></button>
                </div>`;
            list.appendChild(div);
        });
    }
    list.addEventListener('click', e => {
        const btn = e.target.closest('button'); if (!btn) return;
        const id = +btn.dataset.id; const r = rects.find(x => x.id === id && x.type === 'measure'); if (!r) return;
        if (btn.dataset.act === 'del') { rects = rects.filter(x => x !== r); if (active === r) active = null; updateList(); draw(); }
        else { active = r; draw(); }
    });

    // Unggah Gambar
    file.addEventListener('change', () => {
        const f = file.files?.[0]; if (!f) return;
        const url = URL.createObjectURL(f); const im = new Image();
        im.onload = () => { img = im; fitImage(); rects = []; active = null; pxPerCm = 0; phase = 'calib'; draw(); URL.revokeObjectURL(url); };
        im.src = url;
    });

    // Perbarui tinggi sebenarnya
    realHeight.addEventListener('input', () => {
        if (hRealEl) hRealEl.textContent = (+realHeight.value || 72).toString(); // Check if hRealEl exists
        const c = rects.find(r => r.type === 'calib'); if (c) { const hpx = Math.abs(c.h); pxPerCm = hpx / (+realHeight.value || 72); updateList(); draw(); }
    });

    // Reset kotak ukur
    resetMeasures.addEventListener('click', () => { rects = rects.filter(r => r.type !== 'measure'); active = null; updateList(); draw(); });

    // Ekspor (ambil langsung dari kanvas agar sesuai tampilan)
    exportBtn.addEventListener('click', () => {
        if (!img) { alert('Upload gambar dulu.'); return; }
        const a = document.createElement('a');
        a.download = 'mockup.png';
        a.href = cv.toDataURL('image/png'); // kualitas mengikuti DPR saat ini
        a.click();
    });

    // Ulangi kalibrasi (buka kunci dengan kembali ke fase 'calib')
    recalibBtn.addEventListener('click', () => {
        rects = rects.filter(r => r.type !== 'calib'); // hapus kotak kalibrasi lama
        pxPerCm = 0;
        phase = 'calib';
        active = null;
        draw();
    });

    // ===== Interaksi Geser/Zoom/Pan =====
    function resizeRect(r, p, h) {
        let x = r.x, y = r.y, w = r.w, hv = r.h, x2 = p.x, y2 = p.y; const min = 5;
        switch (h) {
            case 'nw': w = (r.x + r.w) - x2; hv = (r.y + r.h) - y2; x = x2; y = y2; break; case 'n': hv = (r.y + r.h) - y2; y = y2; break;
            case 'ne': w = x2 - r.x; hv = (r.y + r.h) - y2; y = y2; break; case 'e': w = x2 - r.x; break; case 'se': w = x2 - r.x; hv = y2 - r.y; break;
            case 's': hv = y2 - r.y; break; case 'sw': w = (r.x + r.w) - x2; hv = y2 - r.y; x = x2; break; case 'w': w = (r.x + r.w) - x2; x = x2; break;
        }
        w = w >= 0 ? Math.max(w, min) : -Math.max(-w, min); hv = hv >= 0 ? Math.max(hv, min) : -Math.max(-hv, min); r.x = x; r.y = y; r.w = w; r.h = hv;
    }
    function hitHandle(ev, r) {
        const p = toCanvas(r.x, r.y), w = r.w * imgScale(), h = r.h * imgScale();
        const hs = HANDLE + 4; // Area deteksi diperbesar
        const pts = [
            { n: 'nw', x: p.x, y: p.y }, { n: 'n', x: p.x + w / 2, y: p.y }, { n: 'ne', x: p.x + w, y: p.y },
            { n: 'e', x: p.x + w, y: p.y + h / 2 }, { n: 'se', x: p.x + w, y: p.y + h }, { n: 's', x: p.x + w / 2, y: p.y + h },
            { n: 'sw', x: p.x, y: p.y + h }, { n: 'w', x: p.x, y: p.y + h / 2 }
        ];
        const sx = ev.offsetX, sy = ev.offsetY;
        for (const h of pts) { if (Math.abs(sx - h.x) <= hs && Math.abs(sy - h.y) <= hs) return h.n; } return null;
    }

    cv.addEventListener('mousedown', e => {
        if (spaceDown) { panning = true; panStart = { x: e.clientX - offX, y: e.clientY - offY }; return; }
        if (!img) return;
        const p = toImage(e.offsetX, e.offsetY);

        // Ambil kotak paling atas di posisi kursor
        let hit = rects.slice().reverse().find(r => pointInRect(p, r));
        // Jika kalibrasi dan terkunci, abaikan (anggap area kosong)
        if (hit && hit.type === 'calib' && isCalibLocked()) {
            hit = null;
        }

        if (hit) {
            active = hit;
            const hd = hitHandle(e, hit);
            // Jika kalibrasi terkunci, tidak boleh diubah/dipindah
            if (hit.type === 'calib' && isCalibLocked()) {
                dragging = null; handle = null; return;
            }
            if (hd) {
                dragging = 'resize';
                handle = hd;
                dragStart = p;
                draw();
                return;
            } else {
                dragging = 'move';
                dragStart = p;
                draw();
                return;
            }
        }

        // Area kosong -> buat kotak baru
        if (phase === 'calib' && !rects.some(r => r.type === 'calib')) {
            active = { id: idSeq++, x: p.x, y: p.y, w: 0, h: 0, type: 'calib' };
            rects.push(active); dragging = 'new'; dragStart = p; draw(); return;
        }
        if (phase === 'measure') {
            active = { id: idSeq++, x: p.x, y: p.y, w: 0, h: 0, type: 'measure' };
            rects.push(active); dragging = 'new'; dragStart = p; updateList(); draw(); return;
        }
    });

    cv.addEventListener('mousemove', e => {
        if (panning) { offX = e.clientX - panStart.x; offY = e.clientY - panStart.y; draw(); return; }

        // --- Perbarui kursor saat tidak menggeser ---
        if (!dragging) {
            let cursor = 'default';
            if (img) {
                const p = toImage(e.offsetX, e.offsetY);
                let top = rects.slice().reverse().find(r => pointInRect(p, r));
                if (top && top.type === 'calib' && isCalibLocked()) {
                    top = null; // Kalibrasi terkunci: abaikan interaksi & kursor
                }
                if (top) {
                    const hd = hitHandle(e, top);
                    if (hd) cursor = cursorForHandle(hd);
                    else cursor = 'move';
                }
            }
            if (spaceDown) cursor = 'grab';
            cv.style.cursor = cursor;
        }

        if (!dragging || !active) return;
        const p = toImage(e.offsetX, e.offsetY);

        if (dragging === 'new') {
            // Saat kalibrasi + Shift: kunci vertikal (lebar 0)
            if (active.type === 'calib' && e.shiftKey) {
                active.w = 0;
                active.h = p.y - dragStart.y;
            } else {
                active.w = p.x - dragStart.x; active.h = p.y - dragStart.y;
            }
            draw(); return;
        }
        if (dragging === 'move') {
            // Pengaman: cegah geser kalibrasi jika terkunci
            if (active.type === 'calib' && isCalibLocked()) { dragging = null; return; }
            const dx = p.x - dragStart.x, dy = p.y - dragStart.y; active.x += dx; active.y += dy; dragStart = p; draw(); return;
        }
        if (dragging === 'resize') {
            // Pengaman: cegah ubah ukuran kalibrasi jika terkunci
            if (active.type === 'calib' && isCalibLocked()) { dragging = null; return; }
            // Saat kalibrasi + Shift: hanya ubah tinggi
            if (active.type === 'calib' && e.shiftKey) {
                const np = { x: active.x + active.w, y: p.y }; // Kunci sumbu X
                resizeRect(active, np, 's');
            } else {
                resizeRect(active, p, handle);
            }
            draw(); return;
        }
    });

    window.addEventListener('mouseup', () => {
        if (panning) { panning = false; return; }
        if (!dragging || !active) return;
        if (active.type === 'calib' && phase === 'calib') {
            const hpx = Math.abs(active.h), hcm = +realHeight.value || 72;
            if (hpx > 0) { pxPerCm = hpx / hcm; phase = 'measure'; } // -> Otomatis terkunci
        }
        if (active.type === 'measure') updateList();
        dragging = null; handle = null; draw();
    });

    // Spasi: geser tanpa scroll halaman
    window.addEventListener('keydown', e => {
        if (e.code === 'Space') { e.preventDefault(); spaceDown = true; cv.style.cursor = 'grab'; }
        if (e.key === 'Escape') { dragging = null; handle = null; draw(); }
        if ((e.key === 'Delete' || e.key === 'Backspace') && active) {
            if (active.type === 'measure') {
                rects = rects.filter(r => r !== active);
            } else if (active.type === 'calib') {
                // Hanya boleh hapus kalibrasi saat fase 'calib' (belum terkunci)
                if (phase === 'calib') {
                    rects = rects.filter(r => r !== active);
                    pxPerCm = 0;
                } else {
                    // Terkunci: abaikan tombol Hapus
                }
            }
            active = null; updateList(); draw();
        }
    }, { passive: false });
    window.addEventListener('keyup', e => {
        if (e.code === 'Space') { e.preventDefault(); spaceDown = false; cv.style.cursor = 'default'; }
    }, { passive: false });

    // Zoom (jangkar presisi)
    function setZoom(percent, anchor) {
        percent = Math.max(10, Math.min(400, percent));
        const newZoom = percent / 100;
        if (img && anchor) {
            const sOld = imgScale();
            const imgX = (anchor.x - offX) / sOld;
            const imgY = (anchor.y - offY) / sOld;
            viewZoom = newZoom;
            const sNew = imgScale();
            offX = anchor.x - imgX * sNew;
            offY = anchor.y - imgY * sNew;
        } else {
            viewZoom = newZoom;
        }
        zoomInput.value = Math.round(percent);
        zoomLabel.textContent = `${Math.round(percent)}%`;
        draw();
    }
    zoomInput.addEventListener('input', () => setZoom(parseInt(zoomInput.value, 10), null));
    cv.addEventListener('wheel', e => {
        if (!img) return; e.preventDefault();
        const anchor = { x: e.offsetX, y: e.offsetY };
        const factor = (e.deltaY < 0) ? 1.1 : 0.9;
        const percent = Math.round((viewZoom * factor) * 100);
        setZoom(percent, anchor);
    }, { passive: false });
    cv.addEventListener('dblclick', () => { fitImage(); setZoom(100, null); draw(); });
    fitBtn.addEventListener('click', () => { fitImage(); setZoom(100, null); draw(); });

    // Mulai Eksekusi
})();
