const fs = require('fs');
const path = require('path');

const factoryDataPath = path.join(__dirname, '../src/lib/factoryData.ts');
const kaosDataPath = path.join(__dirname, '../1-kaos.md');

let factoryData = fs.readFileSync(factoryDataPath, 'utf8');
const kaosData = fs.readFileSync(kaosDataPath, 'utf8');

function extractRegex(content, regex) {
  const match = content.match(regex);
  if (!match) throw new Error("Regex not found: " + regex);
  return match[0];
}

// Extract from 1-kaos.md
const colorsKaos = extractRegex(kaosData, /const DATABASE_WARNA_KAOS = \[([\s\S]*?)\];/);
const colorsBamboo = extractRegex(kaosData, /const DATABASE_WARNA_BAMBOO = \[([\s\S]*?)\];/);
const colorsPE = extractRegex(kaosData, /const DATABASE_WARNA_PE = \[([\s\S]*?)\];/);
const colorsPE24S = extractRegex(kaosData, /const DATABASE_WARNA_PE24S = \[([\s\S]*?)\];/);
const colorsCMBD = extractRegex(kaosData, /const DATABASE_WARNA_CMBD = \[([\s\S]*?)\];/);
const colorsNSA = extractRegex(kaosData, /const DATABASE_WARNA_NSA = \[([\s\S]*?)\];/);

// Build new blocks
const newColors = `
export ${colorsKaos}
export ${colorsBamboo}
export ${colorsPE}
export ${colorsPE24S}
export ${colorsCMBD}
export ${colorsNSA}
`;

const newFabricPrices = `export const FABRIC_PRICES: Record<string, Record<string, { roll: number, grosir: number, ecer: number }>> = {
  "Cotton Combed 16S": { 
    P: { roll: 108500, grosir: 121500, ecer: 124500 }, 
    M: { roll: 113500, grosir: 125500, ecer: 128500 }, 
    S: { roll: 116500, grosir: 128500, ecer: 131500 }, 
    T: { roll: 119500, grosir: 131500, ecer: 134500 }, 
    JETBLACK: { roll: 122500, grosir: 135500, ecer: 138500 }, 
    MS: { roll: 129500, grosir: 145500, ecer: 148500 }
  },
  "Cotton Combed 20S": { 
    P: { roll: 108500, grosir: 121500, ecer: 124500 }, 
    M: { roll: 113500, grosir: 125500, ecer: 128500 }, 
    S: { roll: 116500, grosir: 128500, ecer: 131500 }, 
    T: { roll: 119500, grosir: 131500, ecer: 134500 }, 
    JETBLACK: { roll: 122500, grosir: 135500, ecer: 138500 }, 
    MS: { roll: 129500, grosir: 145500, ecer: 148500 }
  },
  "Cotton Combed 24S": { 
    P: { roll: 109500, grosir: 123500, ecer: 126500 }, 
    M: { roll: 114500, grosir: 126500, ecer: 129500 }, 
    SM: { roll: 103500, grosir: 114500, ecer: 117500 }, 
    HS: { roll: 117500, grosir: 129500, ecer: 132500 }, 
    S: { roll: 117500, grosir: 129500, ecer: 132500 }, 
    ST: { roll: 106500, grosir: 117500, ecer: 120500 }, 
    T: { roll: 120500, grosir: 132500, ecer: 135500 }, 
    JETBLACK: { roll: 123500, grosir: 136500, ecer: 139500 }, 
    TUASPC: { roll: 126500, grosir: 139500, ecer: 142500 }, 
    MS: { roll: 131500, grosir: 147500, ecer: 150500 }
  },
  "Cotton Combed 30S": { 
    P: { roll: 111500, grosir: 125500, ecer: 128500 }, 
    M: { roll: 116500, grosir: 128500, ecer: 131500 }, 
    SM: { roll: 105500, grosir: 116500, ecer: 119500 }, 
    HS: { roll: 119500, grosir: 131500, ecer: 134500 }, 
    S: { roll: 120500, grosir: 132500, ecer: 135500 }, 
    ST: { roll: 108500, grosir: 119500, ecer: 122500 }, 
    T: { roll: 123500, grosir: 136500, ecer: 139500 }, 
    JETBLACK: { roll: 125500, grosir: 138500, ecer: 141500 }, 
    TUASPC: { roll: 128500, grosir: 141500, ecer: 144500 }, 
    MS: { roll: 134500, grosir: 151500, ecer: 154500 }
  },
  "Cotton Bamboo 24S": { 
    P: { roll: 108500, grosir: 121500, ecer: 124500 }, 
    M: { roll: 113500, grosir: 125500, ecer: 128500 }, 
    S: { roll: 116500, grosir: 128500, ecer: 131500 }, 
    T: { roll: 119500, grosir: 131500, ecer: 134500 }, 
    TUASPC: { roll: 122500, grosir: 135500, ecer: 138500 } 
  },
  "Cotton Bamboo 30S": { 
    P: { roll: 111500, grosir: 125500, ecer: 128500 }, 
    M: { roll: 116500, grosir: 128500, ecer: 131500 }, 
    S: { roll: 119500, grosir: 131500, ecer: 134500 }, 
    T: { roll: 122500, grosir: 135500, ecer: 138500 }, 
    TUASPC: { roll: 125500, grosir: 138500, ecer: 141500 }, 
    TUASPC2: { roll: 128500, grosir: 141500, ecer: 144500 } 
  },
  "PE Soft 30S": {
    A: { roll: 61000, grosir: 64000, ecer: 64000 }, 
    B: { roll: 63000, grosir: 66000, ecer: 66000 }, 
    C: { roll: 62000, grosir: 65000, ecer: 65000 }, 
    D: { roll: 65000, grosir: 68000, ecer: 68000 }, 
  },
  "PE Soft 24S": {
    A: { roll: 62560, grosir: 63000, ecer: 63000 }, 
    B: { roll: 64640, grosir: 65000, ecer: 65000 }, 
    C: { roll: 66720, grosir: 67000, ecer: 67000 }, 
  },
  "CMBD 24S": { 
    P: { roll: 69000, grosir: 72500, ecer: 78500 }
  },
  "Lacoste Pique 24s": {
    P: { roll: 97500, grosir: 109500, ecer: 112500 },
    M: { roll: 102500, grosir: 113500, ecer: 116500 },
    S: { roll: 105500, grosir: 116500, ecer: 119500 },
    T: { roll: 108500, grosir: 119500, ecer: 122500 },
    TS: { roll: 111500, grosir: 123500, ecer: 126500 },
    TS2: { roll: 120500, grosir: 132500, ecer: 135500 },
    MS: { roll: 117000, grosir: 131500, ecer: 134500 }
  },
  "Lacoste Diamond 30s": {
    P: { roll: 117000, grosir: 131500, ecer: 134500 },
    M: { roll: 122000, grosir: 134500, ecer: 137500 },
    S: { roll: 125000, grosir: 137500, ecer: 140500 },
    T: { roll: 128000, grosir: 141500, ecer: 144500 },
    TS: { roll: 131000, grosir: 144500, ecer: 147500 },
    MS: { roll: 139000, grosir: 156500, ecer: 159500 }
  }
};`;

const newFabricYield = `export const FABRIC_YIELD: Record<string, Record<string, number>> = {
  "Cotton Combed 30S": { pendek: 5, panjang: 4, tigaperempat: 4.2, tujuhperlapan: 4, croptop: 8, tunik: 3, tunik_aline: 2.7, paud: 7, sd: 6, oversized: 3, boxy: 3, raglan: 5 },
  "Cotton Combed 24S": { pendek: 4, panjang: 3.4, tigaperempat: 3.2, tujuhperlapan: 3.4, croptop: 6, tunik: 2.8, tunik_aline: 2.5, paud: 6, sd: 5, oversized: 2.5, boxy: 2.5, raglan: 4 },
  "Cotton Combed 20S": { pendek: 3, panjang: 2.3, tigaperempat: 2.5, oversized: 2.5, boxy: 2.5 },
  "Cotton Combed 16S": { pendek: 2.7, panjang: 2.1, tigaperempat: 2.3, oversized: 2, boxy: 2 },
  "Cotton Bamboo 30S": { pendek: 5, panjang: 4, tigaperempat: 4.2, tujuhperlapan: 4, croptop: 8, tunik: 3, tunik_aline: 2.7, paud: 7, sd: 6, oversized: 3, boxy: 3, raglan: 5 },
  "Cotton Bamboo 24S": { pendek: 4, panjang: 3.4, tigaperempat: 3.2, tujuhperlapan: 3.4, croptop: 6, tunik: 2.8, tunik_aline: 2.5, paud: 6, sd: 5, oversized: 2.5, boxy: 2.5, raglan: 4 },
  "PE Soft 30S": { pendek: 4, panjang: 3, tigaperempat: 3.5, tujuhperlapan: 3, croptop: 6, tunik: 2.5, tunik_aline: 2, paud: 6, sd: 5, oversized: 3, boxy: 3, raglan: 4 },
  "PE Soft 24S": { pendek: 3, panjang: 2.5, tigaperempat: 2.7, tujuhperlapan: 2.5, croptop: 5, tunik: 2, tunik_aline: 1.8, paud: 5, sd: 4, oversized: 2.5, boxy: 2.5, raglan: 3 },
  "CMBD 24S": { pendek: 4, panjang: 3.4, tigaperempat: 3.2, tujuhperlapan: 3.4, croptop: 6, tunik: 2.8, tunik_aline: 2.5, paud: 6, sd: 5, oversized: 2.5, boxy: 2.5, raglan: 4 },
  "Lacoste Pique 24s": { pendek: 3, panjang: 2.6, tigaperempat: 2.4, tujuhperlapan: 2.5, croptop: 6, tunik: 2.5, tunik_aline: 2, paud: 6, sd: 3.5, oversized: 2.5, boxy: 2.5, raglan: 3 },
  "Lacoste Diamond 30s": { pendek: 4, panjang: 3.6, tigaperempat: 3.4, tujuhperlapan: 3.5, croptop: 8, tunik: 3, tunik_aline: 2.5, paud: 8, sd: 4.5, oversized: 3, boxy: 3, raglan: 4 },
};`;

const newColorMap = `export const FABRIC_COLORS_MAP: Record<string, { n: string, k: string }[]> = {
  "Cotton Combed 30S": DATABASE_WARNA_KAOS,
  "Cotton Combed 24S": DATABASE_WARNA_KAOS,
  "Cotton Combed 20S": DATABASE_WARNA_KAOS,
  "Cotton Combed 16S": DATABASE_WARNA_KAOS,
  "Cotton Bamboo 30S": DATABASE_WARNA_BAMBOO,
  "Cotton Bamboo 24S": DATABASE_WARNA_BAMBOO,
  "PE Soft 30S": DATABASE_WARNA_PE,
  "PE Soft 24S": DATABASE_WARNA_PE24S,
  "CMBD 24S": DATABASE_WARNA_CMBD,
  "NSA Softstyle 3600": DATABASE_WARNA_NSA,
  "NSA Premium Cotton 7200": DATABASE_WARNA_NSA,
  "NSA Heavyweight 5400": DATABASE_WARNA_NSA,
  "NSA Premium Cotton LS 7280": DATABASE_WARNA_NSA,
  "NSA Premium Cotton Polo 8100": DATABASE_WARNA_NSA
};`;

const newHargaRib = `export const HARGA_RIB: Record<string, { leher: number, lengan: number, saku: number, kerah: number }> = {
  "Cotton Combed 30S": { leher: 1000, lengan: 5000, saku: 2500, kerah: 5000 },
  "Cotton Combed 24S": { leher: 1300, lengan: 6500, saku: 2500, kerah: 5000 },
  "Cotton Combed 20S": { leher: 1600, lengan: 8000, saku: 2500, kerah: 5000 },
  "Cotton Combed 16S": { leher: 2000, lengan: 10000, saku: 2500, kerah: 5000 },
  "Cotton Bamboo 30S": { leher: 1000, lengan: 5000, saku: 2500, kerah: 5000 },
  "Cotton Bamboo 24S": { leher: 1300, lengan: 6500, saku: 2500, kerah: 5000 },
  "PE Soft 30S": { leher: 1000, lengan: 5000, saku: 2500, kerah: 5000 },
  "PE Soft 24S": { leher: 1300, lengan: 6500, saku: 2500, kerah: 5000 },
  "CMBD 24S": { leher: 1300, lengan: 6500, saku: 2500, kerah: 5000 },
};`;

const newBajuJadi = `export const HARGA_BAJU_JADI: Record<string, number> = {
  "NSA Softstyle 3600": 40000,
  "NSA Premium Cotton 7200": 45000,
  "NSA Heavyweight 5400": 70000,
  "NSA Premium Cotton LS 7280": 60000,
  "NSA Premium Cotton Polo 8100": 85000
};`;

const newSewingCost = `export const SEWING_COST: Record<string, Record<string, number>> = {
  KAOS: {
    pendek: 4000,
    panjang: 5000,
    tigaperempat: 4500,
    tujuhperlapan: 4500,
    croptop: 4000,
    tunik: 5000,
    tunik_aline: 6000,
    paud: 3000,
    sd: 3000,
    oversized: 4000,
    boxy: 4000,
    raglan: 16000,
  },
  POLO: {
    pendek: 10000,
    panjang: 11000,
    tigaperempat: 10000,
    tujuhperlapan: 11000,
    croptop: 10000,
    tunik: 12000,
    tunik_aline: 13000,
    paud: 9000,
    sd: 9500,
    oversized: 10000,
    boxy: 10000,
    raglan: 22000,
  }
};`;

// Substitute in factoryData
factoryData = factoryData.replace(/export const FABRIC_PRICES[\s\S]*?export const FABRIC_YIELD/g, newFabricPrices + '\n\nexport const FABRIC_YIELD');
factoryData = factoryData.replace(/export const FABRIC_YIELD[\s\S]*?export const SEWING_COST/g, newFabricYield + '\n\nexport const SEWING_COST');
factoryData = factoryData.replace(/export const SEWING_COST[\s\S]*?export const DTF_TIERS/g, newSewingCost + '\n\nexport const DTF_TIERS');
factoryData = factoryData.replace(/export const DATABASE_WARNA_KAOS[\s\S]*?export const FABRIC_COLORS_MAP/g, newColors.trim() + '\n\nexport const FABRIC_COLORS_MAP');
factoryData = factoryData.replace(/export const FABRIC_COLORS_MAP[\s\S]*?export const HARGA_RIB/g, newColorMap + '\n\nexport const HARGA_RIB');
factoryData = factoryData.replace(/export const HARGA_RIB[\s\S]*?export const DTF_CONFIG/g, newHargaRib + '\n\nexport const DTF_CONFIG');
factoryData = factoryData.replace(/export const HARGA_POLO_NSA[\s\S]*?export const HARGA_AKSESORIS_POLO/g, newBajuJadi + '\n\nexport const HARGA_AKSESORIS_POLO');



fs.writeFileSync(factoryDataPath, factoryData, 'utf8');
console.log('Update success!');
