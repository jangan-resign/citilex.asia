/**
 * MOCKUP STUDIO LOGIC (DUAL VIEW)
 * Features: Dual Canvas, Blend Mode Coloring, Multi-Logo (Front/Back), Export PNG with Dimensions
 */

document.addEventListener('DOMContentLoaded', function () {
    // --- STATE VARIABLES ---
    const tshirtRefHeightCm = 72;
    const containerHeight = 500;
    const visualOccupancy = 0.9;
    const cmPerPixel = tshirtRefHeightCm / (containerHeight * visualOccupancy);

    let currentZoom = 1.0;
    let activeLogo = null;

    // --- DOM ELEMENTS ---
    const dualContainer = document.getElementById('dual-view-container');
    const colorPalette = document.getElementById('color-palette');
    const colorLayers = document.querySelectorAll('.mockup-layer-color');
    const logoInput = document.getElementById('logo-upload');
    const btnDelete = document.getElementById('btn-delete-logo');



    // --- INIT ---
    initPalette();
    loadBaseImages();
    updateZoom();

    // Setup Base Images from Global Vars (loaded from mockup-assets.js)
    // Setup Base Images from Global Vars (loaded from mockup-assets.js)
    function loadBaseImages() {
        const timestamp = new Date().getTime();
        const frontUrl = '../assets/img/mockup-depan.png?v=' + timestamp;
        const backUrl = '../assets/img/mockup-belakang.png?v=' + timestamp;

        // FRONT
        const imgFront = document.getElementById('img-front-base');
        const colorFront = document.getElementById('color-front');

        // imgFront.src = frontUrl; // Disabled to use HTML src
        // imgBack.src = backUrl;   // Disabled to use HTML src
    }

    // --- 1. COLORING SYSTEM ---
    function initPalette() {
        const colors = [
            '#ffffff', '#212529', '#dc3545', '#0d6efd',
            '#198754', '#ffc107', '#6610f2', '#fd7e14',
            '#6c757d'
        ];
        colorPalette.innerHTML = '';
        colors.forEach(c => {
            const el = document.createElement('div');
            el.className = 'color-swatch shadow-sm';
            el.style.backgroundColor = c;
            el.onclick = () => updateColor(c);
            colorPalette.appendChild(el);
        });
    }

    window.updateColor = function (color) {
        colorLayers.forEach(layer => layer.style.backgroundColor = color);
        document.getElementById('custom-color').value = color;
    }

    // --- 2. LOGO MANAGEMENT ---
    logoInput.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const targetValue = document.querySelector('input[name="targetSide"]:checked').value;
                const targetLayerId = targetValue === 'back' ? 'logo-layer-back' : 'logo-layer-front';
                addLogoToLayer(targetLayerId, ev.target.result);
                logoInput.value = '';
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    function addLogoToLayer(layerId, src) {
        const wrapper = document.createElement('div');
        wrapper.className = 'logo-item';
        // Center initial position
        wrapper.style.left = '150px';
        wrapper.style.top = '150px';
        wrapper.style.width = '100px';

        const img = document.createElement('img');
        img.src = src;

        const handle = document.createElement('div');
        handle.className = 'resize-handle';

        wrapper.appendChild(img);
        wrapper.appendChild(handle);

        document.getElementById(layerId).appendChild(wrapper);
        selectLogo(wrapper);
        updateAllLabels();
    }

    // Selection Logic
    document.addEventListener('mousedown', function (e) {
        if (e.target.closest('.workspace-area') && !e.target.closest('.logo-item') && !e.target.closest('.color-swatch') && !e.target.closest('input') && !e.target.closest('button')) {
            deselectAll();
        }
        const logoItem = e.target.closest('.logo-item');
        if (logoItem) selectLogo(logoItem);
    });

    function selectLogo(el) {
        deselectAll();
        activeLogo = el;
        activeLogo.classList.add('active-edit');
        btnDelete.disabled = false;
        updateInfo();
    }

    function deselectAll() {
        if (activeLogo) activeLogo.classList.remove('active-edit');
        activeLogo = null;
        btnDelete.disabled = true;
    }

    window.deleteActiveLogo = function () {
        if (activeLogo) {
            activeLogo.remove();
            deselectAll();
            updateAllLabels();
        }
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (activeLogo) deleteActiveLogo();
        }
    });

    // --- 3. DRAG AND RESIZE ---
    let isDragging = false, isResizing = false;
    let startX, startY;
    let startL, startT, startW;

    document.addEventListener('mousedown', function (e) {
        if (!activeLogo) return;

        if (e.target.classList.contains('resize-handle') && e.target.closest('.logo-item') === activeLogo) {
            isResizing = true;
            startX = e.clientX;
            startW = activeLogo.getBoundingClientRect().width / currentZoom;
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if (e.target.closest('.logo-item') === activeLogo) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startL = parseFloat(activeLogo.style.left) || 0;
            startT = parseFloat(activeLogo.style.top) || 0;
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (!activeLogo) return;

        const dx = (e.clientX - startX) / currentZoom;
        const dy = (e.clientY - startY) / currentZoom;

        if (isDragging) {
            activeLogo.style.left = (startL + dx) + 'px';
            activeLogo.style.top = (startT + dy) + 'px';
        } else if (isResizing) {
            const newW = startW + dx;
            if (newW > 10) {
                activeLogo.style.width = newW + 'px';
                updateInfo();
            }
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        isResizing = false;
    });

    function updateInfo() {
        if (!activeLogo) return;
        updateAllLabels();
    }

    function updateAllLabels() {
        const listContainer = document.getElementById('design-list-container');
        if (!listContainer) return;

        listContainer.innerHTML = ''; // Clear list

        const logos = document.querySelectorAll('.logo-item');

        if (logos.length === 0) {
            listContainer.innerHTML = '<div class="text-muted small fst-italic">Belum ada desain.</div>';
            return;
        }

        logos.forEach((logo, index) => {
            const dims = getRealDimensions(logo);
            const isFront = logo.closest('#mockup-front') !== null;
            const sideText = isFront ? 'Depan' : 'Belakang';

            // Check if this logo is currently active
            const isActive = logo.classList.contains('active-edit');
            const activeClass = isActive ? 'bg-light border-primary' : 'border-light';
            const iconClass = isActive ? 'text-primary' : 'text-muted';

            const item = document.createElement('div');
            item.className = `p-2 mb-2 rounded border small ${activeClass}`;
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <strong class="${isActive ? 'text-primary' : 'text-dark'}">Desain ${index + 1} (${sideText})</strong>
                    <i class="bi bi-circle-fill ${iconClass}" style="font-size: 8px;"></i>
                </div>
                <div class="text-muted mt-1">
                    Dimensi: <strong>${dims.w} x ${dims.h} cm</strong>
                </div>
             `;

            // Optional: Click list item to select logo
            item.style.cursor = 'pointer';
            item.onclick = () => selectLogo(logo);

            listContainer.appendChild(item);
        });
    }

    function getRealDimensions(element) {
        const pxW = parseFloat(element.style.width);
        const img = element.querySelector('img');
        const aspect = (img.naturalHeight && img.naturalWidth) ? (img.naturalHeight / img.naturalWidth) : 1;
        const pxH = pxW * aspect;
        return {
            w: (pxW * cmPerPixel).toFixed(1),
            h: (pxH * cmPerPixel).toFixed(1)
        };
    }


    // --- 4. ZOOM & EXPORT ---
    window.zoom = function (delta) {
        currentZoom += delta;
        if (currentZoom < 0.2) currentZoom = 0.2;
        updateZoom();
    }
    window.resetZoom = function () {
        currentZoom = 1.0;
        updateZoom();
    }
    function updateZoom() {
        dualContainer.style.transform = `scale(${currentZoom})`;
    }

    window.downloadMockup = function () {
        const prevActive = activeLogo;
        deselectAll();

        // 1. Reset Zoom for clear render
        const oldZoom = currentZoom;
        dualContainer.style.transform = 'scale(1)';

        // 2. Labels are already permanent (handled by design-label)

        // 3. Export with HTML2CANVAS
        // useCORS & allowTaint might not be needed if images are base64, but good to keep.
        html2canvas(dualContainer, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            // Restore State
            labels.forEach(l => l.remove());
            currentZoom = oldZoom;
            updateZoom();
            if (prevActive) selectLogo(prevActive);

            try {
                const link = document.createElement('a');
                link.download = 'ZipZap-Mockup-Full.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (err) {
                console.error(err);
                alert('Gagal menyimpan gambar (Browser Restriction). Coba gunakan Chrome/Edge terbaru.');
            }
        }).catch(err => {
            console.error(err);
            labels.forEach(l => l.remove());
            currentZoom = oldZoom;
            updateZoom();
            alert('Gagal export gambar. Lihat Console.');
        });
    }

    // Force Trigger layout calc
    setTimeout(() => {
        updateZoom();
    }, 100);
});
