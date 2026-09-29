/* =========================================
    DATABASE WARNA & HARGA KAOS (ZIPZAP)
========================================= */

// Database Warna Lengkap berdasarkan data yang kamu kirim
// Format: n = Nama Warna, k = Kategori, av = Available di Combed mana saja
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
  { n: "117 - Pine Green", k: "T", av: ["C16S", "C24S", "C30S"] },
];

const DATABASE_WARNA_BAMBOO = [
  { n: "1 - Merah Cabe", k: "T", av: ["B30S"] },
  { n: "2 - Putih Netral", k: "P", av: ["B24S", "B30S"] },
  { n: "4 - Hitam Reaktif Special", k: "TS", av: ["B24S", "B30S"] },
  { n: "6 - Maroon", k: "T", av: ["B24S", "B30S"] },
  { n: "7 - Abu Sedang", k: "S", av: ["B30S"] },
  { n: "8 - Kuning Kenari", k: "S", av: ["B30S"] },
  { n: "11 - Hijau Botol Special 2", k: "TS2", av: ["B30S"] },
  { n: "13 - Beige", k: "M", av: ["B30S"] },
  { n: "14 - Dusty Pink", k: "M", av: ["B30S"] },
  { n: "15 - Steel Blue", k: "S", av: ["B30S"] },
  { n: "17 - Abu Muda", k: "M", av: ["B30S"] },
  { n: "21 - Tosca Muda", k: "M", av: ["B30S"] },
  { n: "22 - Mineral Green", k: "S", av: ["B30S"] },
  { n: "23 - Olive Green", k: "S", av: ["B30S"] },
  { n: "26 - Almond Brown", k: "S", av: ["B30S"] },
  { n: "27 - Coklat Susu", k: "S", av: ["B30S"] },
  { n: "29 - Deep Blue", k: "T", av: ["B30S"] },
  { n: "30 - Abu Tua", k: "T", av: ["B30S"] },
  { n: "32 - Dark Navy", k: "T", av: ["B24S", "B30S"] },
  { n: "33 - Light Brown", k: "M", av: ["B30S"] },
  { n: "34 - Maple Brown", k: "S", av: ["B30S"] },
  { n: "35 - Woodrose", k: "M", av: ["B30S"] },
  { n: "36 - Khaki", k: "S", av: ["B30S"] },
  { n: "37 - Dusty Blue", k: "S", av: ["B30S"] },
];

const DATABASE_WARNA_CMBD = [
  { n: "Putih", k: "P", av: ["CM24S"] },
];

const DATABASE_WARNA_PE = [
  // Tier A: Ecer 64.000 / Roll 61.000/kg
  { n: "Broken White",   k: "A", av: ["PE30S"] },
  { n: "Coklat Susu",    k: "A", av: ["PE30S"] },
  { n: "Hijau Mint",     k: "A", av: ["PE30S"] },
  { n: "Kuning Muda",    k: "A", av: ["PE30S"] },
  { n: "Peach",          k: "A", av: ["PE30S"] },
  { n: "Pink Muda",      k: "A", av: ["PE30S"] },
  { n: "Salem",          k: "A", av: ["PE30S"] },
  { n: "Ungu Muda",      k: "A", av: ["PE30S"] },
  // Tier B: Ecer 66.000 / Roll 63.000/kg
  { n: "Abu Sedang",     k: "B", av: ["PE30S"] },
  { n: "Biru Langit",    k: "B", av: ["PE30S"] },
  { n: "Biru Muda",      k: "B", av: ["PE30S"] },
  { n: "Biru Sedang",    k: "B", av: ["PE30S"] },
  { n: "Hijau Lime",     k: "B", av: ["PE30S"] },
  { n: "Hijau Stabilo",  k: "B", av: ["PE30S"] },
  { n: "Kuning Busuk",   k: "B", av: ["PE30S"] },
  { n: "Kuning Emas",    k: "B", av: ["PE30S"] },
  { n: "Kuning Kenari",  k: "B", av: ["PE30S"] },
  { n: "Misty Abu Muda", k: "B", av: ["PE30S"] },
  { n: "Misty Putih",    k: "B", av: ["PE30S"] },
  { n: "Orange Sedang",  k: "B", av: ["PE30S"] },
  { n: "Pink Sedang",    k: "B", av: ["PE30S"] },
  { n: "Putih",          k: "B", av: ["PE30S"] },
  { n: "Stone Grey",     k: "B", av: ["PE30S"] },
  { n: "Tosca Sedang",   k: "B", av: ["PE30S"] },
  { n: "Ungu Sedang",    k: "B", av: ["PE30S"] },
  // Tier C: Ecer 65.000 / Roll 62.000/kg
  { n: "Abu Muda",       k: "C", av: ["PE30S"] },
  // Tier D: Ecer 68.000 / Roll 65.000/kg
  { n: "Abu Tua",        k: "D", av: ["PE30S"] },
  { n: "Biru Benhur",    k: "D", av: ["PE30S"] },
  { n: "Biru Navy",      k: "D", av: ["PE30S"] },
  { n: "Biru Turkis",    k: "D", av: ["PE30S"] },
  { n: "Coklat Kopi",    k: "D", av: ["PE30S"] },
  { n: "Hijau Army",     k: "D", av: ["PE30S"] },
  { n: "Hijau Botol",    k: "D", av: ["PE30S"] },
  { n: "Hijau Fuji",     k: "D", av: ["PE30S"] },
  { n: "Hijau Tosca",    k: "D", av: ["PE30S"] },
  { n: "Hitam",          k: "D", av: ["PE30S"] },
  { n: "Merah Cabe",     k: "D", av: ["PE30S"] },
  { n: "Merah Maroon",   k: "D", av: ["PE30S"] },
  { n: "Misty Abu Tua",  k: "D", av: ["PE30S"] },
  { n: "Orange Tua",     k: "D", av: ["PE30S"] },
];

const DATABASE_WARNA_PE24S = [
  // Tier A: Ecer 63.000 / Roll 63.000/kg (1.564.000 per roll 25kg)
  { n: "Abu Muda",        k: "A", av: ["PE24S"] },
  { n: "Abu Pastel",      k: "A", av: ["PE24S"] },
  { n: "Biru Muda",       k: "A", av: ["PE24S"] },
  { n: "Biru Muda Pastel",k: "A", av: ["PE24S"] },
  { n: "Biru Tua Pastel", k: "A", av: ["PE24S"] },
  { n: "Broken White",    k: "A", av: ["PE24S"] },
  { n: "Coklat Pastel",   k: "A", av: ["PE24S"] },
  { n: "Coklat Susu",     k: "A", av: ["PE24S"] },
  { n: "Cream",           k: "A", av: ["PE24S"] },
  { n: "Dusty Pink",      k: "A", av: ["PE24S"] },
  { n: "Hijau Mint",      k: "A", av: ["PE24S"] },
  { n: "Hijau Muda",      k: "A", av: ["PE24S"] },
  { n: "Ivory",           k: "A", av: ["PE24S"] },
  { n: "Jade Green",      k: "A", av: ["PE24S"] },
  { n: "Jean Blue Muda",  k: "A", av: ["PE24S"] },
  { n: "Khaki",           k: "A", av: ["PE24S"] },
  { n: "Kiwi",            k: "A", av: ["PE24S"] },
  { n: "Kuning Muda",     k: "A", av: ["PE24S"] },
  { n: "Kuning Pastel",   k: "A", av: ["PE24S"] },
  { n: "Lavender",        k: "A", av: ["PE24S"] },
  { n: "Lilac",           k: "A", av: ["PE24S"] },
  { n: "Orange Muda",     k: "A", av: ["PE24S"] },
  { n: "Peach",           k: "A", av: ["PE24S"] },
  { n: "Pink Muda",       k: "A", av: ["PE24S"] },
  { n: "Putih",           k: "A", av: ["PE24S"] },
  { n: "Salem",           k: "A", av: ["PE24S"] },
  { n: "Soft Yellow",     k: "A", av: ["PE24S"] },
  { n: "Stone Beige",     k: "A", av: ["PE24S"] },
  { n: "Tiffany Pastel",  k: "A", av: ["PE24S"] },
  { n: "Ungu Muda",       k: "A", av: ["PE24S"] },
  { n: "Ungu Pastel",     k: "A", av: ["PE24S"] },
  { n: "Yellow Green",    k: "A", av: ["PE24S"] },
  // Tier B: Ecer 65.000 / Roll 65.000/kg (1.616.000 per roll 25kg)
  { n: "Abu Sedang",      k: "B", av: ["PE24S"] },
  { n: "Amber",           k: "B", av: ["PE24S"] },
  { n: "Asparagus",       k: "B", av: ["PE24S"] },
  { n: "Biru Langit",     k: "B", av: ["PE24S"] },
  { n: "Biru Sedang",     k: "B", av: ["PE24S"] },
  { n: "Cinnamon",        k: "B", av: ["PE24S"] },
  { n: "Coklat Mocca",    k: "B", av: ["PE24S"] },
  { n: "Coklat Sedang",   k: "B", av: ["PE24S"] },
  { n: "Conver Green",    k: "B", av: ["PE24S"] },
  { n: "Fuchsia Pink",    k: "B", av: ["PE24S"] },
  { n: "HIjau Lime",      k: "B", av: ["PE24S"] },
  { n: "Hijau Sedang",    k: "B", av: ["PE24S"] },
  { n: "Hijau Stabilo",   k: "B", av: ["PE24S"] },
  { n: "Kuning Busuk",    k: "B", av: ["PE24S"] },
  { n: "Kuning Emas",     k: "B", av: ["PE24S"] },
  { n: "Kuning Kenari",   k: "B", av: ["PE24S"] },
  { n: "Misty Abu Muda",  k: "B", av: ["PE24S"] },
  { n: "Misty Putih",     k: "B", av: ["PE24S"] },
  { n: "Olive Sedang",    k: "B", av: ["PE24S"] },
  { n: "Orange Sedang",   k: "B", av: ["PE24S"] },
  { n: "Pale Violet",     k: "B", av: ["PE24S"] },
  { n: "Peach Sedang",    k: "B", av: ["PE24S"] },
  { n: "Pink Sedang",     k: "B", av: ["PE24S"] },
  { n: "Rosewood",        k: "B", av: ["PE24S"] },
  { n: "Rustic Red",      k: "B", av: ["PE24S"] },
  { n: "Sage Green",      k: "B", av: ["PE24S"] },
  { n: "Salem Sedang",    k: "B", av: ["PE24S"] },
  { n: "Salmon",          k: "B", av: ["PE24S"] },
  { n: "Steel Blue",      k: "B", av: ["PE24S"] },
  { n: "Stone Blue",      k: "B", av: ["PE24S"] },
  { n: "Stone Green",     k: "B", av: ["PE24S"] },
  { n: "Stone Grey",      k: "B", av: ["PE24S"] },
  { n: "Tosca Sedang",    k: "B", av: ["PE24S"] },
  { n: "Ungu Sedang",     k: "B", av: ["PE24S"] },
  // Tier C: Ecer 67.000 / Roll 67.000/kg (1.668.000 per roll 25kg)
  { n: "Abu Tua",         k: "C", av: ["PE24S"] },
  { n: "Admiral Blue",    k: "C", av: ["PE24S"] },
  { n: "Biru Benhur",     k: "C", av: ["PE24S"] },
  { n: "Biru Navy",       k: "C", av: ["PE24S"] },
  { n: "Biru Royal",      k: "C", av: ["PE24S"] },
  { n: "Biru Turkis",     k: "C", av: ["PE24S"] },
  { n: "Burgundy",        k: "C", av: ["PE24S"] },
  { n: "Coklat Kopi",     k: "C", av: ["PE24S"] },
  { n: "Coklat Polisi",   k: "C", av: ["PE24S"] },
  { n: "Dark Maroon",     k: "C", av: ["PE24S"] },
  { n: "Dark Olive",      k: "C", av: ["PE24S"] },
  { n: "Dark Plum",       k: "C", av: ["PE24S"] },
  { n: "Denim Blue",      k: "C", av: ["PE24S"] },
  { n: "Hijau Army",      k: "C", av: ["PE24S"] },
  { n: "Hijau Botol",     k: "C", av: ["PE24S"] },
  { n: "Hijau Fuji",      k: "C", av: ["PE24S"] },
  { n: "Hijau Rumput",    k: "C", av: ["PE24S"] },
  { n: "Hijau Tosca",     k: "C", av: ["PE24S"] },
  { n: "Hitam",           k: "C", av: ["PE24S"] },
  { n: "Magenta",         k: "C", av: ["PE24S"] },
  { n: "Merah Bata",      k: "C", av: ["PE24S"] },
  { n: "Merah Cabe",      k: "C", av: ["PE24S"] },
  { n: "Merah Maroon",    k: "C", av: ["PE24S"] },
  { n: "Mineral Blue",    k: "C", av: ["PE24S"] },
  { n: "Misty Abu Tua",   k: "C", av: ["PE24S"] },
  { n: "Orange Tua",      k: "C", av: ["PE24S"] },
  { n: "Toffee",          k: "C", av: ["PE24S"] },
  { n: "Ungu Royal",      k: "C", av: ["PE24S"] },
];

const HARGA_KAOS_NSA = {
  "NSA Softstyle 3600": { pendek: 40000 },
  "NSA Premium Cotton 7200": { pendek: 45000 },
  "NSA Heavyweight 5400": { pendek: 70000 },
  "NSA Premium Cotton LS 7280": { panjang: 60000 }
};

const DATABASE_WARNA_NSA = [
  { n: "Black", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "White", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "Sport Grey", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "Navy", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "Maroon", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "Red", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "Royal Blue", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "Gold", k: "NSA", av: ["3600", "5400", "7200", "7280"] },
  { n: "Irish Green", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Daisy", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Forest Green", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Charcoal", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Dark Chocolate", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Military Green", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Carolina Blue", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Orange", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Light Pink", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Sand", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Purple", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Chestnut", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Sapphire", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Heliconia", k: "NSA", av: ["3600", "7200", "7280"] },
  { n: "Lime", k: "NSA", av: ["3600", "7200"] },
  { n: "Mustard", k: "NSA", av: ["7200"] },
  { n: "Black Heather", k: "NSA", av: ["7200", "7280"] },
  { n: "Navy Heather", k: "NSA", av: ["7200", "7280"] },
  { n: "Red Heather", k: "NSA", av: ["7200", "7280"] },
  { n: "Dark Green Heather", k: "NSA", av: ["7200", "7280"] },
  { n: "Burgundy Heather", k: "NSA", av: ["7200", "7280"] },
  { n: "Aqua Sky", k: "NSA", av: ["7200", "7280"] },
  { n: "Butter", k: "NSA", av: ["7200", "7280"] },
  { n: "Green Ash", k: "NSA", av: ["7200", "7280"] },
  { n: "Lilac", k: "NSA", av: ["7200", "7280"] },
  { n: "Salmon", k: "NSA", av: ["7200", "7280"] },
];

const arrayWarna = [...DATABASE_WARNA_KAOS, ...DATABASE_WARNA_BAMBOO, ...DATABASE_WARNA_NSA, ...DATABASE_WARNA_CMBD, ...DATABASE_WARNA_PE, ...DATABASE_WARNA_PE24S];

const HARGA_KAIN = {
  "Cotton Combed 16S": { // Berdasarkan kategori gabungan Cotton Combed 16 & 20s 
    P: { roll: 108500, grosir: 121500, ecer: 124500 }, // Putih 
    M: { roll: 113500, grosir: 125500, ecer: 128500 }, // Muda 
    S: { roll: 116500, grosir: 128500, ecer: 131500 }, // Sedang 
    T: { roll: 119500, grosir: 131500, ecer: 134500 }, // Tua 
    JETBLACK: { roll: 122500, grosir: 135500, ecer: 138500 }, // Jet Black 
    MS: { roll: 129500, grosir: 145500, ecer: 148500 } // Misty Sedang 
  },
  "Cotton Combed 20S": { // Berdasarkan kategori gabungan Cotton Combed 16 & 20s 
    P: { roll: 108500, grosir: 121500, ecer: 124500 }, // Putih 
    M: { roll: 113500, grosir: 125500, ecer: 128500 }, // Muda 
    S: { roll: 116500, grosir: 128500, ecer: 131500 }, // Sedang 
    T: { roll: 119500, grosir: 131500, ecer: 134500 }, // Tua 
    JETBLACK: { roll: 122500, grosir: 135500, ecer: 138500 }, // Jet Black 
    MS: { roll: 129500, grosir: 145500, ecer: 148500 } // Misty Sedang 
  },
  "Cotton Combed 24S": { // Berdasarkan kategori Cotton Combed 24s Plain 
    P: { roll: 109500, grosir: 123500, ecer: 126500 }, // Putih 
    M: { roll: 114500, grosir: 126500, ecer: 129500 }, // Muda 
    SM: { roll: 103500, grosir: 114500, ecer: 117500 }, // Sedang Muda 
    HS: { roll: 117500, grosir: 129500, ecer: 132500 }, // Hitam Sulfur 
    S: { roll: 117500, grosir: 129500, ecer: 132500 }, // Sedang 
    ST: { roll: 106500, grosir: 117500, ecer: 120500 }, // Sedang Tua 
    T: { roll: 120500, grosir: 132500, ecer: 135500 }, // Tua 
    JETBLACK: { roll: 123500, grosir: 136500, ecer: 139500 }, // Jet Black 
    TUASPC: { roll: 126500, grosir: 139500, ecer: 142500 }, // Tua Special 
    MS: { roll: 131500, grosir: 147500, ecer: 150500 } // Misty Sedang 
  },
  "Cotton Combed 30S": { // Berdasarkan kategori Cotton Combed 28s & 30s 
    P: { roll: 111500, grosir: 125500, ecer: 128500 }, // Putih 
    M: { roll: 116500, grosir: 128500, ecer: 131500 }, // Muda 
    SM: { roll: 105500, grosir: 116500, ecer: 119500 }, // Sedang Muda 
    HS: { roll: 119500, grosir: 131500, ecer: 134500 }, // Hitam Sulfur 
    S: { roll: 120500, grosir: 132500, ecer: 135500 }, // Sedang 
    ST: { roll: 108500, grosir: 119500, ecer: 122500 }, // Sedang Tua 
    T: { roll: 123500, grosir: 136500, ecer: 139500 }, // Tua 
    JETBLACK: { roll: 125500, grosir: 138500, ecer: 141500 }, // Jet Black 
    TUASPC: { roll: 128500, grosir: 141500, ecer: 144500 }, // Tua Special 
    MS: { roll: 134500, grosir: 151500, ecer: 154500 } // Misty Sedang 
  },
  "Cotton Bamboo 24S": { // Berdasarkan kategori Cotton Bamboo 24s 
    P: { roll: 108500, grosir: 121500, ecer: 124500 }, // Putih 
    M: { roll: 113500, grosir: 125500, ecer: 128500 }, // Muda 
    S: { roll: 116500, grosir: 128500, ecer: 131500 }, // Sedang 
    T: { roll: 119500, grosir: 131500, ecer: 134500 }, // Tua 
    TUASPC: { roll: 122500, grosir: 135500, ecer: 138500 } // Tua Special 
  },
  "Cotton Bamboo 30S": { // Berdasarkan kategori Cotton Bamboo 30s 
    P: { roll: 111500, grosir: 125500, ecer: 128500 }, // Putih 
    M: { roll: 116500, grosir: 128500, ecer: 131500 }, // Muda 
    S: { roll: 119500, grosir: 131500, ecer: 134500 }, // Sedang 
    T: { roll: 122500, grosir: 135500, ecer: 138500 }, // Tua 
    TUASPC: { roll: 125500, grosir: 138500, ecer: 141500 }, // Tua Special 
    TUASPC2: { roll: 128500, grosir: 141500, ecer: 144500 } // Tua Special 2 
    // Catatan: Kategori Warna MS (Misty Sedang) tidak tersedia untuk Cotton Bamboo 30s di dokumen resmi.
  },
  "CMBD 24S": { // Tidak diubah karena jenis kain ini di luar cakupan dokumen pricelist resmi Knitto
    P: { roll: 69000, grosir: 72500, ecer: 78500 }
  },
  "PE Soft 30S": {
    A: { roll: 61000, grosir: 64000, ecer: 64000 }, // Broken White, Coklat Susu, Hijau Mint, dst
    B: { roll: 63000, grosir: 66000, ecer: 66000 }, // Abu Sedang, Biru Langit, Putih, dst
    C: { roll: 62000, grosir: 65000, ecer: 65000 }, // Abu Muda
    D: { roll: 65000, grosir: 68000, ecer: 68000 }, // Abu Tua, Hitam, Merah, Biru Navy, dst
  },
  "PE Soft 24S": {
    A: { roll: 62560, grosir: 63000, ecer: 63000 }, // 32 warna (1.564.000/roll)
    B: { roll: 64640, grosir: 65000, ecer: 65000 }, // 33 warna (1.616.000/roll)
    C: { roll: 66720, grosir: 67000, ecer: 67000 }, // 29 warna (1.668.000/roll)
  }
};

const YIELD = {
  "Cotton Combed 30S": {
    pendek: 5,
    panjang: 4,
    tigaperempat: 4.2,
    tujuhperlapan: 4,
    croptop: 8,
    tunik: 3,
    tunik_aline: 2.7,
    paud: 7,
    sd: 6,
    oversized: 3,
    boxy: 3,
    reglan: 5,
  },
  "Cotton Combed 24S": {
    pendek: 4,
    panjang: 3.4,
    tigaperempat: 3.2,
    tujuhperlapan: 3.4,
    croptop: 6,
    tunik: 2.8,
    tunik_aline: 2.5,
    paud: 6,
    sd: 5,
    oversized: 2.5,
    boxy: 2.5,
    reglan: 4,
  },
  "Cotton Combed 20S": { pendek: 3, panjang: 2.3, tigaperempat: 2.5, oversized: 2.5, boxy: 2.5 },
  "Cotton Combed 16S": { pendek: 2.7, panjang: 2.1, tigaperempat: 2.3, oversized: 2, boxy: 2 },
  "PE Soft 30S": {
    pendek: 4,
    panjang: 3,
    tigaperempat: 3.5,
    tujuhperlapan: 3,
    croptop: 6,
    tunik: 2.5,
    tunik_aline: 2,
    paud: 6,
    sd: 5,
    oversized: 3,
    boxy: 3,
    reglan: 4,
  },
  "PE Soft 24S": {
    pendek: 3,
    panjang: 2.5,
    tigaperempat: 2.7,
    tujuhperlapan: 2.5,
    croptop: 5,
    tunik: 2,
    tunik_aline: 1.8,
    paud: 5,
    sd: 4,
    oversized: 2.5,
    boxy: 2.5,
    reglan: 3,
  },
};

YIELD["CMBD 24S"] = YIELD["Cotton Combed 24S"];

const HARGA_RIB = {
  "Cotton Combed 30S": { leher: 1000, lengan: 5000, saku: 2500, kerah: 5000 },
  "Cotton Combed 24S": { leher: 1300, lengan: 6500, saku: 2500, kerah: 5000 },
  "Cotton Combed 20S": { leher: 1600, lengan: 8000, saku: 2500, kerah: 5000 },
  "Cotton Combed 16S": { leher: 2000, lengan: 10000, saku: 2500, kerah: 5000 },
};

HARGA_RIB["CMBD 24S"] = HARGA_RIB["Cotton Combed 24S"];

// Bamboo pakai data yang sama dengan Combed (yield & rib identik)
YIELD["Cotton Bamboo 30S"] = YIELD["Cotton Combed 30S"];
YIELD["Cotton Bamboo 24S"] = YIELD["Cotton Combed 24S"];
HARGA_RIB["Cotton Bamboo 30S"] = HARGA_RIB["Cotton Combed 30S"];
HARGA_RIB["Cotton Bamboo 24S"] = HARGA_RIB["Cotton Combed 24S"];

// PE Soft pakai rib yang sama dengan Cotton Combed 30S
HARGA_RIB["PE Soft 30S"] = HARGA_RIB["Cotton Combed 30S"];
HARGA_RIB["PE Soft 24S"] = HARGA_RIB["Cotton Combed 24S"];

const BIAYA_JAHIT = {
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
  reglan: 16000,
};

// Mapping Model ke Bahan yang Tersedia
const MODEL_BAHAN_MAPPING = {
  pendek: [
    "Cotton Combed 16S",
    "Cotton Combed 20S",
    "Cotton Combed 24S",
    "Cotton Combed 30S",
    "Cotton Bamboo 24S",
    "Cotton Bamboo 30S",
    "PE Soft 30S",
    "PE Soft 24S",
    "NSA Softstyle 3600",
    "NSA Premium Cotton 7200",
    "NSA Heavyweight 5400",
  ],
  panjang: [
    "Cotton Combed 16S",
    "Cotton Combed 20S",
    "Cotton Combed 24S",
    "Cotton Combed 30S",
    "Cotton Bamboo 24S",
    "Cotton Bamboo 30S",
    "PE Soft 30S",
    "NSA Premium Cotton LS 7280",
  ],
  tigaperempat: [
    "Cotton Combed 16S",
    "Cotton Combed 20S",
    "Cotton Combed 24S",
    "Cotton Combed 30S",
    "Cotton Bamboo 24S",
    "Cotton Bamboo 30S",
    "PE Soft 30S",
  ],
  tujuhperlapan: ["Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  croptop: ["Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  tunik: ["Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  tunik_aline: ["Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  paud: ["Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  sd: ["Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  oversized: ["Cotton Combed 16S", "Cotton Combed 20S", "Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  boxy: ["Cotton Combed 16S", "Cotton Combed 20S", "Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
  reglan: ["Cotton Combed 24S", "Cotton Combed 30S", "Cotton Bamboo 24S", "Cotton Bamboo 30S", "PE Soft 30S"],
};

for (let m in MODEL_BAHAN_MAPPING) {
  if (!MODEL_BAHAN_MAPPING[m].includes("CMBD 24S")) MODEL_BAHAN_MAPPING[m].push("CMBD 24S");
  if (!MODEL_BAHAN_MAPPING[m].includes("PE Soft 24S")) MODEL_BAHAN_MAPPING[m].push("PE Soft 24S");
}

/* =========================================
    LOGIKA PENGONTROL
========================================= */

function updateDropdownBahan() {
  const model = document.getElementById("model").value;
  const elBahan = document.getElementById("bahan");

  if (!model) {
    elBahan.innerHTML =
      '<option value="" disabled selected>Pilih Model dulu...</option>';
    return;
  }

  const bahanTersedia = MODEL_BAHAN_MAPPING[model] || [];

  elBahan.innerHTML = '<option value="" disabled selected>Pilih Bahan</option>';

  bahanTersedia.forEach((bahan) => {
    elBahan.innerHTML += `<option value="${bahan}">${bahan}</option>`;
  });
}

function updateDropdownRib() {
  const bahan = document.getElementById("bahan").value;
  const elRibLeher = document.getElementById("rib_leher");
  const elRibLengan = document.getElementById("rib_lengan");

  if (!bahan) {
    elRibLeher.innerHTML = '<option value="tidak">Pilih bahan dulu...</option>';
    elRibLengan.innerHTML =
      '<option value="tidak">Pilih bahan dulu...</option>';
    return;
  }

  if (bahan.startsWith("NSA")) {
    elRibLeher.innerHTML = '<option value="tidak">Tanpa Rib (Kaos Jadi)</option>';
    elRibLengan.innerHTML = '<option value="tidak">Tanpa Rib (Kaos Jadi)</option>';
    return;
  }

  const hargaLeher = HARGA_RIB[bahan].leher;
  const hargaLengan = HARGA_RIB[bahan].lengan;
}

function init() {
  const elBahan = document.getElementById("bahan");
  const elModel = document.getElementById("model");
  const elWarna = document.getElementById("warna");

  // 1. Isi Dropdown Model
  const modelNames = {
    pendek: "Lengan Pendek (Reguler)",
    panjang: "Lengan Panjang (Reguler)",
    tigaperempat: "Lengan 3/4 (Reguler)",
    tujuhperlapan: "Lengan 7/8 (Reguler)",
    croptop: "Crop Top",
    tunik: "Tunik (+10cm)",
    tunik_aline: "Tunik A-Line (+10cm)",
    paud: "Anak PAUD",
    sd: "Anak SD",
    oversized: "Oversized",
    boxy: "Boxy",
    reglan: "Reglan",
  };
  for (const m in modelNames) {
    elModel.innerHTML += `<option value="${m}">${modelNames[m]}</option>`;
  }

  // 2. EVENT: Saat Model berubah, Bahan harus disaring
  elModel.addEventListener("change", function () {
    updateDropdownBahan();
    // Reset warna ketika model berubah
    document.getElementById("warna_input").value = "";
    document.getElementById("warna_list").innerHTML = "";
  });

  // 3. EVENT: Saat Bahan berubah, Warna harus disaring
  elBahan.addEventListener("change", function () {
    const selectedBahanText = this.value;
    let kodeBahan = "";

    if (selectedBahanText.startsWith("NSA")) {
      kodeBahan = selectedBahanText.match(/\d+/)[0]; // "3600", "7200", dll.
    } else if (selectedBahanText === "CMBD 24S") {
      kodeBahan = "CM24S";
    } else if (selectedBahanText === "PE Soft 24S") {
      kodeBahan = "PE24S";
    } else if (selectedBahanText.startsWith("PE")) {
      kodeBahan = "PE30S"; // PE Soft 30S
    } else {
      const parts = selectedBahanText.split(" ");
      kodeBahan = parts[1].charAt(0) + parts[2]; // "C30S" atau "B30S"
    }

    const isKaosJadi = selectedBahanText.startsWith("NSA");
    ["rib_leher", "rib_lengan", "saku", "kerah"].forEach((id) => {
      const el = document.getElementById(id);
      el.disabled = isKaosJadi;
      if (isKaosJadi) el.value = "tidak";
    });

    const elWarnaList = document.getElementById("warna_list");
    const elWarnaInput = document.getElementById("warna_input");

    // Kosongkan input dan list setiap ganti bahan
    elWarnaInput.value = "";
    elWarnaList.innerHTML = "";

    const arrayWarnaLocal = [...DATABASE_WARNA_KAOS, ...DATABASE_WARNA_BAMBOO, ...DATABASE_WARNA_NSA, ...DATABASE_WARNA_CMBD, ...DATABASE_WARNA_PE, ...DATABASE_WARNA_PE24S];
    arrayWarnaLocal.forEach((w) => {
      if (w.av.includes(kodeBahan)) {
        // Gunakan <option> di dalam <datalist>
        // Value diisi Nama Warna, Data-Kategori disimpan agar bisa diambil nanti
        elWarnaList.innerHTML += `<option value="${w.n}" data-kategori="${w.k}">`;
      }
    });
    updateDropdownRib();
  });
}

function hitung() {
  const qty = parseInt(document.getElementById("qty").value) || 0;
  const bahan = document.getElementById("bahan").value;
  const model = document.getElementById("model").value;

  const namaWarnaInput = document.getElementById("warna_input").value;
  let kategoriWarna = "";
  let namaWarna = "";

  const elWarnaList = document.getElementById("warna_list");
  const options = elWarnaList.querySelectorAll("option");
  options.forEach(opt => {
    if (opt.value === namaWarnaInput) {
      kategoriWarna = opt.getAttribute("data-kategori");
      namaWarna = opt.value;
    }
  });

  if (qty <= 0 || !bahan || !model || !kategoriWarna) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Lengkapi data utama (Kuantitas, model, bahan, dan warna) terlebih dahulu.",
      confirmButtonColor: "#ffc107", // Warna kuning standar warning
      iconColor: "#ffc107", // Warna ikon tanda seru menjadi kuning
    });
    return;
  }

  const ribLeher = document.getElementById("rib_leher").value;
  const ribLengan = document.getElementById("rib_lengan").value;
  const saku = document.getElementById("saku").value;
  const kerah = document.getElementById("kerah").value;

  const jenisPrinting = document.getElementById("jenis_printing").value;
  const biayaPrinting =
    parseInt(document.getElementById("printing").value) || 0;

  const isKaosJadi = bahan.startsWith("NSA");

  let hppTotal = 0;
  let rincianHTML = "";

  if (isKaosJadi) {
    const hargaJadiPcs = HARGA_KAOS_NSA[bahan][model] || 0;
    const totalKaos = hargaJadiPcs * qty;
    hppTotal = hargaJadiPcs + biayaPrinting;

    rincianHTML = `
        <div class="text-start">
            <h6 class="fw-bold border-bottom pb-1 mb-2">Rincian Produksi NSA (${qty} Pcs):</h6>
            <div class="d-flex justify-content-between mb-1">
                <span>Model Base:</span>
                <span class="fw-medium text-dark">${bahan}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <span>Harga Satuan:</span>
                <span class="text-dark">${formatIDR(hargaJadiPcs)} / pcs</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <span>Total Biaya Kaos:</span>
                <span class="text-dark">${formatIDR(totalKaos)}</span>
            </div>
            <div class="d-flex justify-content-between border-bottom pb-1 mt-2">
                <span>Biaya Printing (${jenisPrinting}):</span>
                <span class="text-dark">${formatIDR(biayaPrinting)} / pcs</span>
            </div>
            
            <div class="d-flex justify-content-between fw-bold mt-2 text-primary fs-5">
                <span>TOTAL HPP:</span>
                <span>${formatIDR(hppTotal)} / pcs</span>
            </div>
        </div>
    `;
  } else {
    // 1. Ambil Harga Dasar (dari object {roll, grosir, ecer})
    let keyHarga = kategoriWarna;
    if (namaWarna.includes("JET BLACK")) keyHarga = "JETBLACK";
    if (namaWarna.includes("SPECIAL") || namaWarna.includes("SPC"))
      keyHarga = "TUASPC";

    const prices = HARGA_KAIN[bahan][keyHarga] || HARGA_KAIN[bahan]["T"];
    const hargaRoll = prices.roll;
    const yieldPcs = YIELD[bahan][model];
    const totalKg = qty / yieldPcs;

    // 2. Hitung Komposisi Roll (Dijabarkan per baris)
    let jmlRoll = Math.floor(totalKg / 25);
    let sisaKg = totalKg % 25;

    let htmlKainDetail = "";
    if (jmlRoll > 0) {
      htmlKainDetail += `
          <div class="d-flex justify-content-between w-100 mb-1">
              <span style="flex: 1;">- ${formatAngka(jmlRoll)} Kain Roll</span>
              <span style="flex: 1; text-align: center;">25 kg</span>
              <span style="flex: 1; text-align: right;" class="text-dark">${formatIDR(hargaRoll)}</span>
          </div>`;
    }
    // 3. Hitung Eceran
    let biayaEcerTotal = 0;
    if (sisaKg > 0) {
      // 1. Tentukan harga dan label berdasarkan berat sisa
      let hargaPakai = sisaKg > 5 ? prices.grosir : prices.ecer;
      let labelPakai = sisaKg > 5 ? "Kain Grosir" : "Kain Ecer";

      // 2. Hitung total biaya ecer/grosir
      biayaEcerTotal = sisaKg * hargaPakai;

      // 3. Tambahkan ke detail tampilan (HTML)
      htmlKainDetail += `
          <div class="d-flex justify-content-between w-100 mb-1">
              <span style="flex: 1;">- ${labelPakai}</span>
              <span style="flex: 1; text-align: center;">${sisaKg.toFixed(2)} kg</span>
              <span style="flex: 1; text-align: right;" class="text-dark">${formatIDR(hargaPakai)}</span>
          </div>`;
    }

    const biayaRollTotal = jmlRoll * 25 * hargaRoll;
    const hppKainPerPcs = (biayaRollTotal + biayaEcerTotal) / qty;

    // 3. Biaya Aksesoris Rib
    let biayaRibLeher = 0;
    let biayaRibLengan = 0;
    let biayaSaku = 0;
    let biayaKerah = 0;
    if (ribLeher === "ya") biayaRibLeher += HARGA_RIB[bahan].leher;
    if (ribLengan === "ya") biayaRibLengan += HARGA_RIB[bahan].lengan;
    if (saku === "ya") biayaSaku += HARGA_RIB[bahan].saku;
    if (kerah === "ya") biayaKerah += HARGA_RIB[bahan].kerah;

    // 4. Biaya Jahit
    const biayaJahit = BIAYA_JAHIT[model] || 4000;

    // TOTAL HPP
    hppTotal =
      hppKainPerPcs +
      biayaRibLeher +
      biayaRibLengan +
      biayaSaku +
      biayaKerah +
      biayaJahit +
      biayaPrinting;

    rincianHTML = `
        <div class="text-start">
            <h6 class="fw-bold border-bottom pb-1 mb-2">Rincian Produksi ${qty} Pcs:</h6>
            <div class="d-flex justify-content-between">
                <span>Total Kain:</span>
                <span class="fw-bold text-dark">${totalKg.toFixed(2)} kg</span>
            </div>
            <div class="text-muted mb-2" style="font-size: 0.75rem; line-height: 1.5; padding-left: 5px; border-left: 2px solid #dee2e6;">
                ${htmlKainDetail}
            </div>
            
            <div class="d-flex justify-content-between mt-2">
                <span>Total Harga Kain:</span>
                <span class="text-dark">${formatIDR(biayaRollTotal + biayaEcerTotal)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>HPP Kain/pcs:</span>
                <span class="text-dark">${formatIDR(hppKainPerPcs)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Jahit:</span>
                <span class="text-dark">${formatIDR(biayaJahit)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Rib Leher):</span>
                <span class="text-dark">${formatIDR(biayaRibLeher)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Rib Lengan):</span>
                <span class="text-dark">${formatIDR(biayaRibLengan)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Saku):</span>
                <span class="text-dark">${formatIDR(biayaSaku)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Biaya Aksesoris (Kerah):</span>
                <span class="text-dark">${formatIDR(biayaKerah)}</span>
            </div>
            <div class="d-flex justify-content-between border-bottom pb-1">
                <span>Biaya Printing (${jenisPrinting}):</span>
                <span class="text-dark">${formatIDR(biayaPrinting)}</span>
            </div>
            
            <div class="d-flex justify-content-between fw-bold mt-2 text-primary fs-5">
                <span>TOTAL HPP:</span>
                <span>${formatIDR(hppTotal)}</span>
            </div>
        </div>
    `;
  }

  // --- OUTPUT TIER HARGA ---
  document.getElementById("tertinggi").textContent =
    formatIDR(hppTotal / 0.53);
  document.getElementById("tertinggi1").textContent =
    formatIDR(hppTotal / 0.55);
  document.getElementById("tertinggi2").textContent =
    formatIDR(hppTotal / 0.57);
  document.getElementById("terendah2").textContent =
    formatIDR(hppTotal / 0.6);
  document.getElementById("terendah1").textContent =
    formatIDR(hppTotal / 0.63);
  document.getElementById("terendah").textContent =
    formatIDR(hppTotal / 0.65);

  // --- OUTPUT RINCIAN TRANSPARAN (Sama Seperti Polo) ---
  document.getElementById("rincianBiaya").innerHTML = rincianHTML;
}

init();
