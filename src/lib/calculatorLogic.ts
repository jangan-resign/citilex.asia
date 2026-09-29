// src/lib/calculatorLogic.ts

export function qtyCad(q: number) {
  if (q <= 0) return 0;
  if (q <= 30) return q + 2;
  if (q <= 50) return q + 3;
  if (q <= 100) return q + 5;
  return q + 7;
}

export function evalOrientationDTF(lebar: number, tinggi: number, qty: number, cfg: { AC: number, JH: number, JV: number, JA: number }) {
  const within = (lebar >= 27 && lebar <= 28) || (tinggi >= 27 && tinggi <= 28);
  const JH_eff = within ? 1 : cfg.JH;
  const qtyPlus = qtyCad(qty);
  const samp = Math.max(1, Math.floor((cfg.AC + JH_eff) / (lebar + JH_eff)));
  const bar = Math.ceil(qtyPlus / samp);
  const pj = bar * tinggi + (bar - 1) * (cfg.JV + cfg.JA);
  return { qtyPlus, JH_eff, samp, bar, pj };
}

export function getQtyColIndex(qty: number) {
  if (qty <= 6) return 0;
  if (qty <= 12) return 1;
  if (qty <= 24) return 2;
  if (qty <= 48) return 3;
  if (qty <= 100) return 4;
  return 5;
}

// Implementasi sederhana Bin Packing (Shelf Packing) 
// untuk menggabungkan luas beberapa desain sablon manual.
export function calculateCombinedArea(designs: { W: number, H: number }[], maxWidth: number) {
  if (!designs || designs.length === 0) return { width: 0, height: 0 };
  
  // Urutkan berdasarkan dimensi terpanjang agar optimal
  const sorted = [...designs].sort((a, b) => Math.max(b.W, b.H) - Math.max(a.W, a.H));
  
  let currentY = 0;
  let currentX = 0;
  let rowHeight = 0;
  let maxWUsed = 0;

  for (const d of sorted) {
    let w = d.W;
    let h = d.H;
    
    // Coba orientasi terbaik agar muat di sisa width
    if (w > h && currentX + w > maxWidth && currentX + h <= maxWidth) {
        w = d.H;
        h = d.W;
    } else if (h > w && currentX + h <= maxWidth && currentX + w > maxWidth) {
        w = d.H;
        h = d.W;
    }

    // Jika tetap tidak muat, turun ke baris baru
    if (currentX + w > maxWidth) {
      currentY += rowHeight;
      currentX = 0;
      rowHeight = 0;
      
      // Rotasi jika melebih maxWidth murni
      if (w > maxWidth && h <= maxWidth) {
          w = d.H;
          h = d.W;
      }
    }

    currentX += w;
    maxWUsed = Math.max(maxWUsed, currentX);
    rowHeight = Math.max(rowHeight, h);
  }

  const finalHeight = currentY + rowHeight;
  return { width: maxWUsed, height: finalHeight };
}
