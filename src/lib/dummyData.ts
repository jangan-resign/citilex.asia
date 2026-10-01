export type Owner = "Karina" | "CS";

export interface Message {
  id: string;
  sender: "customer" | "bot" | "cs";
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface Qualification {
  name: string;
  domicile: string;
  company: string;
  product: string;
  quantity: string;
  size: string;
  deadline: string;
  designDetails: string;
  material: string;
  color: string;
  productionTechnique: string;
  pattern: string;
  shippingAddress: string;
}

export interface ChatSession {
  id: string;
  customerName: string;
  phoneNumber: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  owner: Owner;
  status: "active" | "qualified" | "won" | "lost";
  qualification: Qualification;
  internalNotes: string;
  messages: Message[];
}

export const dummyChats: ChatSession[] = [
  {
    id: "chat-1",
    customerName: "Budi Santoso",
    phoneNumber: "+62 812 3456 7890",
    lastMessage: "Iya mbak, mau nanya harga kaos sablon 100 pcs.",
    lastMessageTime: "10:42 AM",
    unreadCount: 2,
    owner: "Karina",
    status: "active",
    qualification: {
      name: "Budi Santoso",
      domicile: "Jakarta Selatan",
      company: "PT Maju Bersama",
      product: "Kaos Sablon",
      quantity: "100 pcs",
      size: "L, XL",
      deadline: "20 Agustus 2026",
      designDetails: "",
      material: "",
      color: "Hitam",
      productionTechnique: "",
      pattern: "",
      shippingAddress: "",
    },
    internalNotes: "Customer terlihat buru-buru, follow up segera.",
    messages: [
      { id: "m1", sender: "bot", text: "Halo! Selamat datang di CITILEX ASIA. Ada yang bisa Karina bantu?", timestamp: "10:40 AM" },
      { id: "m2", sender: "customer", text: "Halo", timestamp: "10:41 AM" },
      { id: "m3", sender: "customer", text: "Iya mbak, mau nanya harga kaos sablon 100 pcs.", timestamp: "10:42 AM" },
    ],
  },
  {
    id: "chat-2",
    customerName: "Siti Aminah",
    phoneNumber: "+62 856 7890 1234",
    lastMessage: "Tolong kirimkan invoice-nya ya.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    owner: "CS",
    status: "qualified",
    qualification: {
      name: "Siti Aminah",
      domicile: "Bandung",
      company: "Event Organizer Jabar",
      product: "Kemeja PDH",
      quantity: "50 pcs",
      size: "M, L",
      deadline: "1 September 2026",
      designDetails: "Logo di dada kiri",
      material: "American Drill",
      color: "Navy",
      productionTechnique: "Bordir",
      pattern: "Standar",
      shippingAddress: "Jl. Braga No. 10, Bandung",
    },
    internalNotes: "Sudah deal, menunggu pembayaran DP.",
    messages: [
      { id: "m1", sender: "customer", text: "Tolong kirimkan invoice-nya ya.", timestamp: "Yesterday" },
    ],
  }
];

// --- ACADEMY DUMMY DATA ---
// Data dipindahkan ke Database (Tabel SOP, Knowledge, Persona, Asset)


// --- PRODUCTS (MASTER DATA) DUMMY DATA ---

export interface PackageProduct {
  id: string;
  name: string;
  basePrice: number;
  minOrder: number;
  description: string;
  isActive: boolean;
}

export const dummyPackages: PackageProduct[] = [
  { id: "pkg-1", name: "Kaos Polyester", basePrice: 55000, minOrder: 100, description: "Bahan PE, Sablon DTF/Rubber standar, Ukuran XS-XL.", isActive: true },
  { id: "pkg-2", name: "Kaos Cotton Combed", basePrice: 79000, minOrder: 100, description: "Bahan Combed 30s/24s, Sablon DTF/Rubber standar, Ukuran XS-XL.", isActive: true },
  { id: "pkg-3", name: "Kaos Cotton Bamboo", basePrice: 89000, minOrder: 100, description: "Bahan Premium Bamboo 30s, Sablon DTF/Rubber standar, Ukuran XS-XL.", isActive: true },
];

export interface PrintUpgrade {
  id: string;
  name: string;
  category: "Sablon" | "Bordir";
  additionalPrice: number;
}

export const dummyPrintUpgrades: PrintUpgrade[] = [
  { id: "prt-1", name: "Tambah Sisi Belakang A4", category: "Sablon", additionalPrice: 15000 },
  { id: "prt-2", name: "Upgrade Ukuran Sablon ke A3", category: "Sablon", additionalPrice: 10000 },
  { id: "prt-3", name: "Sablon Lengan (Kanan/Kiri)", category: "Sablon", additionalPrice: 5000 },
  { id: "prt-4", name: "Bordir Dada (Kecil)", category: "Bordir", additionalPrice: 5000 },
];

export interface VolumeTier {
  id: string;
  minQty: number;
  maxQty: number | null; // null means unlimited/upwards
  discountPerPcs: number;
}

export const dummyVolumeTiers: VolumeTier[] = [
  { id: "vol-1", minQty: 100, maxQty: 299, discountPerPcs: 0 },
  { id: "vol-2", minQty: 300, maxQty: 999, discountPerPcs: 2000 },
  { id: "vol-3", minQty: 1000, maxQty: null, discountPerPcs: 4000 },
];

export interface Addon {
  id: string;
  name: string;
  category: "Size" | "Pola" | "Lainnya";
  additionalPrice: number;
}

export const dummyAddons: Addon[] = [
  { id: "add-1", name: "Upgrade Size XXL", category: "Size", additionalPrice: 10000 },
  { id: "add-2", name: "Upgrade Size XXXL", category: "Size", additionalPrice: 15000 },
  { id: "add-3", name: "Lengan Panjang", category: "Pola", additionalPrice: 10000 },
  { id: "add-4", name: "Pecah Pola (Kombinasi Warna)", category: "Pola", additionalPrice: 10000 },
];
