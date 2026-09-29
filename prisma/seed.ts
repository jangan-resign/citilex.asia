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
  console.log("Seeding Database...");

  const customer1 = await prisma.customer.create({
    data: {
      name: "Budi Santoso",
      phone: "+62 812 3456 7890",
      company: "PT Maju Bersama",
      domicile: "Jakarta Selatan",
      owner: "Karina",
      status: "active",
      messages: {
        create: [
          { sender: "customer", text: "Halo min, mau tanya harga sablon." },
          { sender: "bot", text: "Halo Budi! Selamat datang di Citilex. Untuk harga sablon, mau jumlah berapa pcs?" },
          { sender: "customer", text: "Iya mbak, mau nanya harga kaos sablon 100 pcs." }
        ]
      }
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: "Siti Rahmawati",
      phone: "+62 856 1234 5678",
      company: "Event Organizer Ceria",
      domicile: "Bandung",
      owner: "CS",
      status: "qualified",
      messages: {
        create: [
          { sender: "customer", text: "Siang, bisa bikin kaos event?" },
          { sender: "bot", text: "Tentu bisa Kak! Boleh diinfokan detailnya?" },
          { sender: "customer", text: "Udah fix desainnya, mau diskusi sama admin aja." },
          { sender: "cs", text: "Halo Kak Siti, saya Rio dari CS Citilex. Boleh kirimkan desainnya Kak?" }
        ]
      }
    }
  });

  console.log("Seeding Finished.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
