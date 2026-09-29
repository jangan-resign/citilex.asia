/* =========================================
   DATA MASTER POLO SHIRT
========================================= */

// DOM Elements
const elModel = document.getElementById("model");
const elBahan = document.getElementById("bahan");
const elWarna = document.getElementById("warna");
const elKrah = document.getElementById("kerah");
const elManset = document.getElementById("manset");
const elSaku = document.getElementById("saku");
const elMelet = document.getElementById("melet");

const elPrinting = document.getElementById("printing");

// Elements Output
const outTertinggi = document.getElementById("tertinggi");
const outTertinggi1 = document.getElementById("tertinggi1");
const outTertinggi2 = document.getElementById("tertinggi2");
const outTerendah2 = document.getElementById("terendah2");
const outTerendah1 = document.getElementById("terendah1");
const outTerendah = document.getElementById("terendah");
const outRincian = document.getElementById("rincianBiaya");

/* --- 1. DATA WARNA & KATEGORI --- 
   Format: "Nama Warna": "Kode Kategori"
*/
const DATABASE_WARNA_KAOS = [
  { n: "1 - Burgundy", k: "T", av: ["C20S", "C24S", "C30S"] },
  { n: "2 - Maroon", k: "T", av: ["C20S", "C24S", "C30S"] },
  { n: "3 - Merah Cabe", k: "T", av: ["C20S", "C24S", "C30S"] },
  { n: "4 - Fuchsia", k: "T", av: ["C20S", "C24S", "C30S"] },
  { n: "28 - Bubblegum Pink", k: "M", av: ["C24S", "C30S"] },
  { n: "110 - Pastel Pink", k: "M", av: ["C24S"] },
  { n: "6 - Pink", k: "M", av: ["C24S", "C30S"] },
  { n: "111 - Muted Pink", k: "M", av: ["C24S"] },
  { n: "78 - Baby Pink", k: "M", av: ["C30S"] },
  { n: "27 - Dusty Pink", k: "M", av: ["C24S", "C30S"] },
  { n: "76 - Woodrose", k: "M", av: ["C24S", "C30S"] },
  { n: "105 - Peony Pink", k: "M", av: ["C24S", "C30S"] },
  { n: "65 - Dusty Rose", k: "S", av: ["C20S", "C24S", "C30S"] },
  { n: "55 - Blush Red", k: "S", av: ["C24S", "C30S"] },
  { n: "66 - Red Plum", k: "T", av: ["C24S", "C30S"] },
  { n: "81 - Rustic Orchid", k: "S", av: ["C30S"] },
  { n: "79 - Terracotta", k: "S", av: ["C20S", "C24S", "C30S"] },
  { n: "64 - Dusty Peach", k: "M", av: ["C24S", "C30S"] },
  { n: "5 - Salem", k: "M", av: ["C24S", "C30S"] },
  { n: "56 - Salmon Red", k: "S", av: ["C24S", "C30S"] },
  { n: "60 - Autumn Orange", k: "T", av: ["C24S", "C30S"] },
  { n: "44 - Orange Bata", k: "T", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "7 - Orange", k: "S", av: ["C24S", "C30S"] },
  { n: "59 - Bright Orange", k: "S", av: ["C30S"] },
  { n: "57 - Kuning Mas", k: "S", av: ["C24S", "C30S"] },
  { n: "8 - Kuning Kenari", k: "S", av: ["C24S", "C30S"] },
  { n: "41 - Kuning Lemon", k: "S", av: ["C24S", "C30S"] },
  { n: "58 - Baby Yellow", k: "M", av: ["C24S", "C30S"] },
  { n: "108 - Butter", k: "M", av: ["C30S"] },
  { n: "40 - Honey", k: "S", av: ["C24S", "C30S"] },
  { n: "45 - Mustard", k: "S", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "94 - Dijon Yellow", k: "S", av: ["C24S", "C30S"] },
  { n: "114 - Old Gold", k: "S", av: ["C24S"] },
  { n: "61 - Dark Mustard", k: "T", av: ["C20S", "C24S", "C30S"] },
  { n: "63 - Almond Brown", k: "S", av: ["C20S", "C24S", "C30S"] },
  { n: "80 - Cinnamon", k: "T", av: ["C24S", "C30S"] },
  { n: "82 - Toffe", k: "T", av: ["C24S", "C30S"] },
  { n: "38 - Coklat Kopi", k: "T", av: ["C24S", "C30S"] },
  { n: "93 - Maple Brown", k: "S", av: ["C24S", "C30S"] },
  { n: "31 - Coklat Susu", k: "S", av: ["C20S", "C24S", "C30S"] },
  { n: "62 - Light Brown", k: "M", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "30 - Beige", k: "M", av: ["C20S", "C24S", "C30S"] },
  { n: "29 - Cream", k: "M", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "112 - Light Latte", k: "M", av: ["C24S"] },
  { n: "95 - Safari", k: "M", av: ["C30S"] },
  { n: "83 - Dark Olive", k: "T", av: ["C24S", "C30S"] },
  { n: "39 - Hijau TNI", k: "T", av: ["C24S", "C30S"] },
  { n: "49 - Army Green", k: "T", av: ["C16S", "C24S", "C30S"] },
  { n: "51 - Cactus Green", k: "T", av: ["C24S", "C30S"] },
  { n: "70 - Stone Green", k: "T", av: ["C24S", "C30S"] },
  { n: "69 - Mineral Green", k: "S", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "68 - Olive Green", k: "S", av: ["C20S", "C24S", "C30S"] },
  { n: "84 - Sage Green", k: "S", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "86 - Seafoam Green", k: "M", av: ["C24S", "C30S"] },
  { n: "109 - Golden Lime", k: "S", av: ["C24S", "C30S"] },
  { n: "43 - Electric Lime", k: "S", av: ["C24S", "C30S"] },
  { n: "9 - Hijau Pucuk", k: "S", av: ["C24S", "C30S"] },
  { n: "10 - Hijau Fuji", k: "T", av: ["C20S", "C24S", "C30S"] },
  { n: "50 - Hijau Botol Special", k: "T", av: ["C24S", "C30S"] },
  { n: "11 - Hijau Botol", k: "T", av: ["C20S", "C24S", "C30S"] },
  { n: "67 - Atlantic Sea", k: "T", av: ["C24S", "C30S"] },
  { n: "12 - Tosca Tua", k: "T", av: ["C24S", "C30S"] },
  { n: "14 - Tosca", k: "T", av: ["C24S", "C30S"] },
  { n: "15 - Tosca Muda", k: "M", av: ["C24S", "C30S"] },
  { n: "16 - Hijau Mint", k: "M", av: ["C24S", "C30S"] },
  { n: "106 - Hargor Green", k: "M", av: ["C24S", "C30S"] },
  { n: "90 - Aqua Haze", k: "M", av: ["C24S", "C30S"] },
  { n: "102 - Cameo Blue", k: "S", av: ["C24S", "C30S"] },
  { n: "107 - Ash Blue", k: "S", av: ["C24S", "C30S"] },
  { n: "52 - Mineral Blue", k: "S", av: ["C24S", "C30S"] },
  { n: "13 - Biru Tosca", k: "T", av: ["C24S", "C30S"] },
  { n: "22 - Deep Blue", k: "T", av: ["C24S", "C30S"] },
  { n: "91 - Ocean Blue", k: "T", av: ["C24S", "C30S"] },
  { n: "92 - Denim Blue", k: "S", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "32 - Steel Blue", k: "S", av: ["C20S", "C24S", "C30S"] },
  { n: "113 - Smoke Blue", k: "S", av: ["C24S"] },
  { n: "87 - Dusty Blue", k: "S", av: ["C24S", "C30S"] },
  { n: "85 - Palladian Blue", k: "M", av: ["C24S", "C30S"] },
  { n: "108 - Pastel Blue", k: "M", av: ["C24S"] },
  { n: "53 - Sky Blue", k: "M", av: ["C16S", "C24S", "C30S"] },
  { n: "20 - Biru Muda", k: "M", av: ["C24S", "C30S"] },
  { n: "17 - Turkis Muda", k: "M", av: ["C24S", "C30S"] },
  { n: "18 - Turkis", k: "S", av: ["C20S", "C24S", "C30S"] },
  { n: "19 - Turkis Tua", k: "T", av: ["C24S", "C30S"] },
  { n: "104 - Benhur Special", k: "TS", av: ["C24S", "C30S"] },
  { n: "101 - Light Navy", k: "T", av: ["C30S"] },
  { n: "23 - Navy", k: "T", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "24 - Ungu Tua", k: "T", av: ["C24S", "C30S"] },
  { n: "72 - Royal Purple", k: "T", av: ["C24S", "C30S"] },
  { n: "71 - Lavender", k: "M", av: ["C24S", "C30S"] },
  { n: "26 - Lilac", k: "M", av: ["C20S", "C24S", "C30S"] },
  { n: "77 - Dusty Lilac", k: "M", av: ["C24S", "C30S"] },
  { n: "73 - Twilight Mauve", k: "S", av: ["C24S", "C30S"] },
  { n: "74 - Dusty Violet", k: "S", av: ["C24S", "C30S"] },
  { n: "75 - Vintage Violet", k: "S", av: ["C24S", "C30S"] },
  { n: "25 - Magenta", k: "T", av: ["C24S", "C30S"] },
  { n: "46 - Hitam Reaktif", k: "T", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "47 - Hitam Sulfur", k: "T", av: ["C24S", "C30S"] },
  { n: "48 - Jet Black", k: "T", av: ["C16S", "C24S", "C30S"] },
  { n: "115 - Black Evo", k: "T", av: ["C24S", "C30S"] },
  { n: "116 - Jet Black Evo", k: "T", av: ["C24S", "C30S"] },
  { n: "37 - Abu Tua", k: "T", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "88 - Stone Grey", k: "S", av: ["C24S", "C30S"] },
  { n: "54 - Abu Sedang", k: "S", av: ["C24S", "C30S"] },
  { n: "35 - Misty M71 Putih Bluish", k: "MS", av: ["C20S", "C24S", "C30S"] },
  { n: "42 - Light Grey", k: "M", av: ["C24S", "C30S"] },
  { n: "36 - Abu Muda", k: "M", av: ["C16S", "C24S", "C30S"] },
  { n: "100 - Broken White", k: "M", av: ["C20S", "C24S", "C30S"] },
  { n: "33 - Putih Netral", k: "P", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "34 - Putih Bluish", k: "P", av: ["C16S", "C20S", "C24S", "C30S"] },
  { n: "117 - Pine Green", k: "T", av: ["C16S", "C24S", "C30S"] }
];

const DATABASE_WARNA = {
  "Lacoste Pique 24s": [
    { n: "1 - Putih Netral", k: "P" },
    { n: "2 - Merah Cabe", k: "T" },
    { n: "3 - Orange", k: "S" },
    { n: "4 - Kuning Kenari", k: "S" },
    { n: "5 - Hijau TNI", k: "T" },
    { n: "6 - Benhur Special 2", k: "TS2" },
    { n: "7 - Navy", k: "T" },
    { n: "8 - Coklat Kopi", k: "T" },
    { n: "9 - Twotone Hitam", k: "T" },
    { n: "10 - Hitam Reaktif Special", k: "TS" },
    { n: "11 - Maroon", k: "T" },
    { n: "12 - Turkis", k: "T" },
    { n: "13 - Hijau Fuji", k: "T" },
    { n: "14 - Hijau Pucuk", k: "S" },
    { n: "16 - Ungu tua", k: "T" },
    { n: "17 - Fuchsia", k: "T" },
    { n: "18 - Abu Tua", k: "T" },
    { n: "19 - Misty M71 Putih Bluish", k: "MS" },
    { n: "20 - Tosca", k: "T" },
    { n: "21 - Ruby Red", k: "T" },
    { n: "22 - Hijau Botol", k: "T" },
    { n: "23 - Mustard", k: "T" },
    { n: "24 - Biru Muda", k: "M" },
    { n: "25 - Abu Muda", k: "M" },
    { n: "26 - Putih Bluish", k: "P" },
    { n: "27 - Turkis Muda", k: "M" },
    { n: "28 - Beige", k: "M" },
    { n: "29 - Steel Blue Tua", k: "T" },
    { n: "30 - Orange Bata", k: "T" },
    { n: "31 - Lilac", k: "M" },
    { n: "32 - Dusty Rose", k: "S" },
    { n: "33 - Burgundy", k: "T" },
    { n: "34 - Dark Mustard", k: "T" },
    { n: "35 - Almond Brown", k: "S" },
    { n: "36 - Seafoam Green", k: "M" },
    { n: "37 - Olive Green", k: "S" },
    { n: "38 - Light Brown", k: "M" },
    { n: "39 - Mineral Green", k: "S" },
    { n: "40 - Sky Blue", k: "M" },
    { n: "41 - Ocean Blue", k: "T" },
    { n: "42 - Mineral Blue Tua", k: "T" },
    { n: "43 - Autumn Orange", k: "T" },
    { n: "44 - Toffe", k: "T" },
  ],
  "Lacoste Diamond 30s": [
    { n: "1 - Putih Netral", k: "P" },
    { n: "2 - Navy", k: "T" },
    { n: "3 - Hitam Reaktif Special", k: "TS" },
    { n: "4 - Misty M71 Putih Bluish", k: "MS" },
    { n: "5 - Maroon", k: "T" },
    { n: "6 - Army Green Special", k: "TS" },
    { n: "7 - Dusty Blue", k: "S" },
    { n: "8 - Beige", k: "M" },
    { n: "9 - Dark Mustard", k: "T" },
  ],
  "NSA Premium Cotton Polo 8100": [
    { n: "Black", k: "NSA" },
    { n: "White", k: "NSA" },
    { n: "Sport Grey", k: "NSA" },
    { n: "Navy", k: "NSA" },
    { n: "Maroon", k: "NSA" },
    { n: "Royal Blue", k: "NSA" },
    { n: "Red", k: "NSA" },
    { n: "Irish Green", k: "NSA" },
    { n: "Orange", k: "NSA" },
    { n: "Daisy", k: "NSA" },
    { n: "Forest Green", k: "NSA" },
    { n: "Light Pink", k: "NSA" },
    { n: "Charcoal", k: "NSA" },
    { n: "Carolina Blue", k: "NSA" }
  ]
};

DATABASE_WARNA["Cotton Combed 16S"] = DATABASE_WARNA_KAOS.filter(w => w.av.includes("C16S")).map(w => ({ n: w.n, k: w.k }));
DATABASE_WARNA["Cotton Combed 20S"] = DATABASE_WARNA_KAOS.filter(w => w.av.includes("C20S")).map(w => ({ n: w.n, k: w.k }));
DATABASE_WARNA["Cotton Combed 24S"] = DATABASE_WARNA_KAOS.filter(w => w.av.includes("C24S")).map(w => ({ n: w.n, k: w.k }));
DATABASE_WARNA["Cotton Combed 30S"] = DATABASE_WARNA_KAOS.filter(w => w.av.includes("C30S")).map(w => ({ n: w.n, k: w.k }));

DATABASE_WARNA["PE Pique Soft 30S"] = [
  // Tier A: Ecer 67.000 / Roll 64.000/kg
  { n: "Abu Muda",      k: "A" },
  { n: "Broken White",  k: "A" },
  // Tier B: Ecer 69.000 / Roll 66.000/kg
  { n: "Kuning Emas",   k: "B" },
  { n: "Kuning Kenari", k: "B" },
  { n: "Orange Sedang", k: "B" },
  { n: "Putih",         k: "B" },
  // Tier C: Ecer 71.000 / Roll 68.000/kg
  { n: "Biru Benhur",   k: "C" },
  { n: "Biru Navy",     k: "C" },
  { n: "Biru Turkis",   k: "C" },
  { n: "Hijau Botol",   k: "C" },
  { n: "Hijau Fuji",    k: "C" },
  { n: "Hijau Tosca",   k: "C" },
  { n: "Hitam",         k: "C" },
  { n: "Merah Cabe",    k: "C" },
  { n: "Merah Maroon",  k: "C" },
];

DATABASE_WARNA["PE Pique Soft 20S"] = [
  // Tier A: Ecer 65.000 (Roll 1.550.000)
  { n: "Abu Muda",       k: "A" },
  { n: "Broken White",   k: "A" },
  { n: "Biru Muda",      k: "A" },
  { n: "Coklat Susu",    k: "A" },
  { n: "Cream",          k: "A" },
  { n: "Dusty Pink",     k: "A" },
  { n: "Khaki",          k: "A" },
  { n: "Kuning Muda",    k: "A" },
  { n: "Pink Muda",      k: "A" },
  { n: "Putih",          k: "A" },
  { n: "Ungu Muda",      k: "A" },
  // Tier B: Ecer 67.000 (Roll 1.600.000)
  { n: "Coklat Mocca",   k: "B" },
  { n: "Hijau Sampoerna",k: "B" },
  { n: "Hijau Stabilo",  k: "B" },
  { n: "Kuning Busuk",   k: "B" },
  { n: "Kuning Emas",    k: "B" },
  { n: "Kuning Kenari",  k: "B" },
  { n: "Mauve",          k: "B" },
  { n: "Orange Sedang",  k: "B" },
  { n: "Peppermint",     k: "B" },
  { n: "Sage Green",     k: "B" },
  { n: "Stone Green",    k: "B" },
  { n: "Stone Grey",     k: "B" },
  { n: "Tosca Sedang",   k: "B" },
  // Tier C: Ecer 69.000 (Roll 1.650.000)
  { n: "Abu Sedang",     k: "C" },
  { n: "Abu Tua",        k: "C" },
  { n: "Biru Benhur",    k: "C" },
  { n: "Biru Botol",     k: "C" },
  { n: "Biru Navy",      k: "C" },
  { n: "Biru Royal",     k: "C" },
  { n: "Biru Turkis",    k: "C" },
  { n: "Burgundy",       k: "C" },
  { n: "Coklat Kopi",    k: "C" },
  { n: "Dark Steel Blue",k: "C" },
  { n: "Hijau Army",     k: "C" },
  { n: "Hijau Botol",    k: "C" },
  { n: "Hijau Fuji",     k: "C" },
  { n: "Hijau Tosca",    k: "C" },
  { n: "Hitam",          k: "C" },
  { n: "Magenta",        k: "C" },
  { n: "Merah Bata",     k: "C" },
  { n: "Merah Cabe",     k: "C" },
  { n: "Merah Maroon",   k: "C" },
  { n: "Midnight Blue",  k: "C" },
  { n: "Misty Abu Muda", k: "C" },
  { n: "Toffee",         k: "C" },
  { n: "Ungu Tua",       k: "C" },
  // Tier D: Ecer 71.000 (Roll 1.700.000)
  { n: "Misty Abu Tua",  k: "D" },
];

const HARGA_POLO_NSA = {
  "NSA Premium Cotton Polo 8100": 85000
};

/* --- 2. DATA HARGA KAIN (Per Kg - Menggunakan Harga > 5Kg) --- */
const HARGA_KAIN = {
  "Lacoste Pique 24s": {
    P: { roll: 97500, grosir: 109500, ecer: 112500 },  // Putih
    M: { roll: 102500, grosir: 113500, ecer: 116500 }, // Muda
    S: { roll: 105500, grosir: 116500, ecer: 119500 }, // Sedang
    T: { roll: 108500, grosir: 119500, ecer: 122500 }, // Tua
    TS: { roll: 111500, grosir: 123500, ecer: 126500 }, // Tua Special
    TS2: { roll: 120500, grosir: 132500, ecer: 135500 }, // Tua Special 2
    MS: { roll: 117000, grosir: 131500, ecer: 134500 }  // Misty Sedang
  },
  "Lacoste Diamond 30s": {
    P: { roll: 117000, grosir: 131500, ecer: 134500 }, // Putih
    M: { roll: 122000, grosir: 134500, ecer: 137500 }, // Muda
    S: { roll: 125000, grosir: 137500, ecer: 140500 }, // Sedang
    T: { roll: 128000, grosir: 141500, ecer: 144500 }, // Tua
    TS: { roll: 131000, grosir: 144500, ecer: 147500 }, // Tua Special
    MS: { roll: 139000, grosir: 156500, ecer: 159500 }  // Misty Sedang
  },
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
  "PE Pique Soft 30S": {
    A: { roll: 63000, grosir: 66000, ecer: 66000 }, // Abu Muda, Broken White
    B: { roll: 65000, grosir: 68000, ecer: 68000 }, // Kuning Emas, Kuning Kenari, Orange Sedang, Putih
    C: { roll: 67000, grosir: 70000, ecer: 70000 }, // Biru, Hijau, Hitam, Merah (9 warna)
  },
  "PE Pique Soft 20S": {
    A: { roll: 62000, grosir: 65000, ecer: 65000 }, // 11 warna (1.550.000/roll)
    B: { roll: 64000, grosir: 67000, ecer: 67000 }, // 13 warna (1.600.000/roll)
    C: { roll: 66000, grosir: 69000, ecer: 69000 }, // 23 warna (1.650.000/roll)
    D: { roll: 68000, grosir: 71000, ecer: 71000 }, // 1 warna  (1.700.000/roll)
  }
};

/* --- 3. YIELD (Jumlah Kaos Jadi per 1 Kg Kain) --- */
/* Note: Untuk Tunik tidak ada data yield di prompt, 
   saya menggunakan estimasi (Lengan Panjang - 0.5) agar aman */
const YIELD_KAIN = {
  "Lacoste Pique 24s": {
    pendek: 3,
    panjang: 2.6,
    tigaperempat: 2.4,
    tujuhperdelapan: 2.5,
    tunik: 2.5, // Estimasi
    tunik_aline: 2, // Estimasi
    paud: 6,
    sd: 3.5,
    reglan: 3,
  },
  "Lacoste Diamond 30s": {
    pendek: 4,
    panjang: 3.6,
    tigaperempat: 3.4,
    tujuhperdelapan: 3.5,
    tunik: 3, // Estimasi
    tunik_aline: 2.5, // Estimasi
    paud: 8,
    sd: 4.5,
    reglan: 4,
  },
  "Cotton Combed 30S": {
    pendek: 5,
    panjang: 4,
    tigaperempat: 4.2,
    tujuhperdelapan: 4,
    tunik: 3,
    tunik_aline: 2.7,
    paud: 7,
    sd: 6,
    reglan: 5,
  },
  "Cotton Combed 24S": {
    pendek: 4,
    panjang: 3.4,
    tigaperempat: 3.2,
    tujuhperdelapan: 3.4,
    tunik: 2.8,
    tunik_aline: 2.5,
    paud: 6,
    sd: 5,
    reglan: 4,
  },
  "Cotton Combed 20S": {
    pendek: 3,
    panjang: 2.3,
    tigaperempat: 2.5,
    tujuhperdelapan: 2.3,
    tunik: 2.0,
    tunik_aline: 1.8,
    paud: 4.5,
    sd: 3.5,
    reglan: 2.5,
  },
  "Cotton Combed 16S": {
    pendek: 2.7,
    panjang: 2.1,
    tigaperempat: 2.3,
    tujuhperdelapan: 2.1,
    tunik: 1.8,
    tunik_aline: 1.6,
    paud: 4.0,
    sd: 3.1,
    reglan: 2.2,
  },
  "PE Pique Soft 30S": {
    pendek: 4,
    panjang: 3,
    tigaperempat: 3.5,
    tujuhperdelapan: 3,
    tunik: 2.5,
    tunik_aline: 2,
    paud: 6,
    sd: 5,
    reglan: 4,
  },
  "PE Pique Soft 20S": {
    pendek: 2.5,
    panjang: 2,
    tigaperempat: 2.2,
    tujuhperdelapan: 2,
    tunik: 1.8,
    tunik_aline: 1.5,
    paud: 5,
    sd: 3.5,
    reglan: 2.5,
  },
};

/* --- 4. BIAYA JAHIT --- */
const BIAYA_JAHIT = {
  pendek: 10000,
  panjang: 11000,
  tigaperempat: 10000,
  tujuhperdelapan: 11000,
  tunik: 12000,
  tunik_aline: 13000,
  paud: 9000,
  sd: 9500,
  reglan: 22000,
};

/* =========================================
   INITIALIZATION
========================================= */

/* =========================================
   INITIALIZATION
========================================= */

function init() {
  // 1. Dropdown Bahan akan diisi dinamis berdasarkan model
  elBahan.innerHTML = '<option value="" disabled selected>Pilih Model dulu...</option>';

  // 2. Isi Dropdown Model
  const modelLabels = {
    pendek: "Reguler Lengan Pendek (Reguler)",
    panjang: "Reguler Lengan Panjang (Reguler)",
    tigaperempat: "Reguler Lengan 3/4 (Reguler)",
    tujuhperdelapan: "Reguler Lengan 7/8 (Reguler)",
    tunik: "Tunik (+10cm)",
    tunik_aline: "Tunik A Line (+10cm)",
    paud: "Anak PAUD",
    sd: "Anak SD",
    reglan: "Reglan",
  };

  elModel.innerHTML = '<option value="" disabled selected>Pilih Model</option>';
  for (const key in BIAYA_JAHIT) {
    elModel.innerHTML += `<option value="${key}">${modelLabels[key]}</option>`;
  }

  // --- EVENT LISTENERS ---

  // 2a. Event Listener untuk Model (Filter Bahan)
  elModel.addEventListener("change", function () {
    const selectedModel = this.value;
    const currentBahan = elBahan.value;

    elBahan.innerHTML = '<option value="" disabled selected>Pilih Bahan</option>';

    // Semua model mendapatkan kain Lacoste
    for (const key in HARGA_KAIN) {
      elBahan.innerHTML += `<option value="${key}">${key}</option>`;
    }

    // Hanya lengan pendek yang mendapatkan opsi Polo NSA
    if (selectedModel === "pendek") {
      for (const key in HARGA_POLO_NSA) {
        elBahan.innerHTML += `<option value="${key}">${key}</option>`;
      }
    }

    // Reset bahan dan list warna jika pemilihan model menyebabkan bahan jadi tidak valid
    if (currentBahan) {
      const optionExists = Array.from(elBahan.options).some(opt => opt.value === currentBahan);
      if (optionExists) {
        elBahan.value = currentBahan;
      } else {
        elBahan.value = "";
        updateWarnaList(""); // Kosongkan warna
      }
    }
  });

  // --- TAMBAHAN PENTING ---
  // 3. Event Listener agar saat Bahan berubah, daftar warna diperbarui
  elBahan.addEventListener("change", function () {
    const isPoloJadi = this.value.startsWith("NSA");

    // Auto disable aksesoris
    ["kerah", "manset", "saku", "melet"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = isPoloJadi;
        if (isPoloJadi) el.value = "0"; // Reset ke harga 0
      }
    });

    updateWarnaList(this.value);
  });

  // Catatan: manajemen slot metode printing sekarang ditangani oleh
  // js/kalkulator/printing-embed/printing-manager.js (di-load di HTML).
}

/**
 * Fungsi untuk mengupdate daftar warna berdasarkan bahan
 * @param {string} jenisBahan - Value dari dropdown bahan
 */
function updateWarnaList(jenisBahan) {
  const datalist = document.getElementById("warna_list");
  const inputWarna = document.getElementById("warna_input");

  // Kosongkan input dan list setiap ganti bahan
  inputWarna.value = "";
  datalist.innerHTML = "";

  // Mapping nama bahan ke key DATABASE_WARNA
  const daftarWarna = DATABASE_WARNA[jenisBahan];

  if (daftarWarna) {
    let htmlOptions = "";
    daftarWarna.forEach((item) => {
      // Masukkan Nama Warna ke 'value' agar muncul saat diketik
      // Simpan Kategori ke 'data-kat' agar bisa dihitung harganya
      htmlOptions += `<option value="${item.n}" data-kat="${item.k}"></option>`;
    });
    datalist.innerHTML = htmlOptions;
  }
}

// Jalankan Init
init();
/* =========================================
   FUNGSI HITUNG UTAMA
========================================= */

function hitung() {
  const elWarnaInput = document.getElementById("warna_input");
  const elWarnaList = document.getElementById("warna_list");
  const printingBreakdown = window.__printingBreakdown || [];
  function buildPrintingRincianHTML(withPerPcsSuffix) {
    const suffix = withPerPcsSuffix ? " / pcs" : "";
    if (printingBreakdown.length === 0) {
      return `
            <div class="d-flex justify-content-between">
                <span>Biaya Printing:</span>
                <span class="text-dark">${formatIDR(0)}${suffix}</span>
            </div>`;
    }
    return printingBreakdown
      .map(
        (p) => `
            <div class="d-flex justify-content-between">
                <span>Biaya Printing (${p.label}):</span>
                <span class="text-dark">${formatIDR(p.harga)}${suffix}</span>
            </div>`
      )
      .join("");
  }

  // 1. Validasi Input
  if (!elBahan.value || !elModel.value || !elWarnaInput.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Lengkapi data utama (Bahan, Model, dan Warna) terlebih dahulu.',
      confirmButtonColor: '#ffc107', // Warna kuning standar warning
      iconColor: '#ffc107'          // Warna ikon tanda seru menjadi kuning
    });
    return;
  }

  // --- LOGIKA MENCARI KATEGORI WARNA ---
  let kategoriWarna = "";
  const options = elWarnaList.querySelectorAll("option");

  options.forEach(opt => {
    // Mencocokkan nama warna yang diketik dengan list
    if (opt.value === elWarnaInput.value) {
      kategoriWarna = opt.getAttribute("data-kat");
    }
  });

  if (!kategoriWarna) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Warna tidak ditemukan. Silakan pilih warna dari daftar.',
      confirmButtonColor: '#ffc107', // Warna kuning standar warning
      iconColor: '#ffc107'          // Warna ikon tanda seru menjadi kuning
    });
    return;
  }

  // Ambil Qty
  const elQty = document.getElementById("qty");
  const qty = elQty ? parseInt(elQty.value) || 0 : 0;

  if (qty <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Masukkan jumlah pesanan (Qty) terlebih dahulu.',
      confirmButtonColor: '#ffc107', // Warna kuning standar warning
      iconColor: '#ffc107'          // Warna ikon tanda seru menjadi kuning
    });
    return;
  }

  // 2. Ambil Data Dasar
  const jenisBahan = elBahan.value;
  const jenisModel = elModel.value;

  const isPoloJadi = jenisBahan.startsWith("NSA");

  let totalHPP = 0;
  let rincianHTML = "";

  if (isPoloJadi) {
    const hargaJadiPcs = HARGA_POLO_NSA[jenisBahan] || 0;
    const totalPolo = hargaJadiPcs * qty;

    // Disable aksesoris (dianggap 0 karena polo jadi)
    const biayaPrint = parseInt(elPrinting.value) || 0;
    totalHPP = hargaJadiPcs + biayaPrint;

    rincianHTML = `
        <div class="text-start">
            <h6 class="fw-bold border-bottom pb-1 mb-2 text-dark">Rincian Produksi NSA (${qty} Pcs):</h6>
            <div class="d-flex justify-content-between mb-1">
                <span>Model Base:</span>
                <span class="fw-medium text-dark">${jenisBahan}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <span>Harga Satuan:</span>
                <span class="text-dark">${formatIDR(hargaJadiPcs)} / pcs</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <span>Total Biaya Polo:</span>
                <span class="text-dark">${formatIDR(totalPolo)}</span>
            </div>
            ${buildPrintingRincianHTML(true)}

            <div class="d-flex justify-content-between fw-bold mt-2 text-primary fs-5">
                <span>TOTAL HPP:</span>
                <span>${formatIDR(totalHPP)} / pcs</span>
            </div>
        </div>
    `;

  } else {
    // === Skema Biasa (Kain Kiloan CMT) ===
    const yieldKaos = YIELD_KAIN[jenisBahan][jenisModel] || 1;
    const totalKgDibutuhkan = qty / yieldKaos;

    // Tentukan kategori harga khusus Combed (seperti JETBLACK/TUASPC)
    let keyHarga = kategoriWarna;
    if (jenisBahan.startsWith("Cotton Combed")) {
      const namaWarnaU = elWarnaInput.value.toUpperCase();
      if (namaWarnaU.includes("JET BLACK")) keyHarga = "JETBLACK";
      if (namaWarnaU.includes("SPECIAL") || namaWarnaU.includes("SPC")) keyHarga = "TUASPC";
    }

    const prices = HARGA_KAIN[jenisBahan][keyHarga] || HARGA_KAIN[jenisBahan]["T"];

    // 3. Logika Harga Progresif & Detail Kain (Gaya List Transparan)
    let biayaKainTotal = 0;
    let sisaKg = totalKgDibutuhkan;
    let htmlKainDetail = "";
    let jumlahRoll = 0;

    // 1. Hitung berapa roll utuh (25kg) yang ada
    while (sisaKg >= 25) {
      biayaKainTotal += 25 * prices.roll;
      sisaKg -= 25;
      jumlahRoll++;
    }

    // 2. Jika ada roll utuh, tampilkan baris roll (digabung jika lebih dari 1 roll)
    if (jumlahRoll > 0) {
      htmlKainDetail += `
          <div class="d-flex justify-content-between w-100 mb-1">
              <span style="flex: 1;">- ${jumlahRoll} Kain Roll</span>
              <span style="flex: 1; text-align: center;">25 kg</span>
              <span style="flex: 1; text-align: right;" class="text-dark">${formatIDR(prices.roll)}</span>
          </div>`;
    }

    // 3. Logika Sisa (Hanya tampil jika sisaKg > 0 dan tidak menumpuk)
    if (sisaKg > 0) {
      let hargaPakai = sisaKg > 5 ? prices.grosir : prices.ecer;
      let labelPakai = sisaKg > 5 ? "Kain Grosir" : "Kain Ecer";

      biayaKainTotal += sisaKg * hargaPakai;

      htmlKainDetail += `
          <div class="d-flex justify-content-between w-100 mb-1">
              <span style="flex: 1;">- ${labelPakai}</span>
              <span style="flex: 1; text-align: center;">${sisaKg.toFixed(2)} kg</span>
              <span style="flex: 1; text-align: right;" class="text-dark">${formatIDR(hargaPakai)}</span>
          </div>`;
    }

    // 4. Hitung HPP
    const hargaBahanPerPcs = biayaKainTotal / qty;
    const biayaJahit = BIAYA_JAHIT[jenisModel] || 0;
    const biayaKrah = parseInt(elKrah.value) || 0;
    const biayaManset = parseInt(elManset.value) || 0;
    const biayaSaku = parseInt(elSaku.value) || 0;
    const biayaMelet = parseInt(elMelet.value) || 0;
    const biayaPrint = parseInt(elPrinting.value) || 0;

    totalHPP = hargaBahanPerPcs + biayaJahit + biayaKrah + biayaManset + biayaSaku + biayaMelet + biayaPrint;

    rincianHTML = `
        <div class="text-start">
            <h6 class="fw-bold border-bottom pb-1 mb-2 text-dark">Rincian Produksi ${qty} Pcs:</h6>
            <div class="d-flex justify-content-between">
                <span>Total Kain:</span>
                <span class="fw-bold text-dark">${totalKgDibutuhkan.toFixed(2)} kg</span>
            </div>
            <div class="text-muted mb-2" style="font-size: 0.75rem; line-height: 1.5; padding-left: 5px; border-left: 2px solid #dee2e6;">
                ${htmlKainDetail}
            </div>
            
            <div class="d-flex justify-content-between mt-2">
                  <span>Total Harga Kain:</span>
                  <span class="text-dark">${formatIDR(biayaKainTotal)}</span>
            </div>

            <div class="d-flex justify-content-between">
                <span>HPP Kain/pcs:</span>
                <span class="text-dark">${formatIDR(hargaBahanPerPcs)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Jahit (${jenisModel}):</span>
                <span class="text-dark">${formatIDR(biayaJahit)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Kerah):</span>
                <span class="text-dark">${formatIDR((biayaKrah))}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Manset):</span>
                <span class="text-dark">${formatIDR((biayaManset))}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Saku):</span>
                <span class="text-dark">${formatIDR((biayaSaku))}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Melet):</span>
                <span class="text-dark">${formatIDR((biayaMelet))}</span>
            </div>
            ${buildPrintingRincianHTML(false)}
            
            <div class="d-flex justify-content-between fw-bold mt-2 text-primary fs-5">
                <span>TOTAL HPP:</span>
                <span>${formatIDR(totalHPP)}</span>
            </div>
        </div>
    `;
  }

  // --- OUTPUT RINCIAN (Gaya Polo) ---
  document.getElementById("rincianBiaya").innerHTML = rincianHTML;

  // 5. Update Tier Harga (Gaya Kaos)
  document.getElementById("tertinggi").textContent = "Rp " + formatAngka(totalHPP / 0.53);
  document.getElementById("tertinggi1").textContent = "Rp " + formatAngka(totalHPP / 0.55);
  document.getElementById("tertinggi2").textContent = "Rp " + formatAngka(totalHPP / 0.57);
  document.getElementById("terendah2").textContent = "Rp " + formatAngka(totalHPP / 0.60);
  document.getElementById("terendah1").textContent = "Rp " + formatAngka(totalHPP / 0.63);
  document.getElementById("terendah").textContent = "Rp " + formatAngka(totalHPP / 0.65);
}

function formatAngka(angka) {
  return Math.round(angka).toLocaleString("id-ID");
}
