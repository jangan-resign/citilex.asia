import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Menghapus data transaksi Sales...");

  // Hapus semua data yang berhubungan dengan transaksi
  await prisma.invoice.deleteMany({});
  await prisma.quotation.deleteMany({});
  await prisma.delivery.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.orderQualification.deleteMany({});
  
  // Hapus semua customer KECUALI Budi Santoso dan Siti Rahmawati (data bawaan seed)
  await prisma.customer.deleteMany({
    where: {
      name: {
        notIn: ["Budi Santoso", "Siti Rahmawati"]
      }
    }
  });

  console.log("Pembersihan selesai! Lingkungan siap untuk uji coba End-to-End baru.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
