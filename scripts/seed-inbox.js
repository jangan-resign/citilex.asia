import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const dummyChats = [
  {
    id: "chat-1",
    customerName: "Budi Santoso",
    phoneNumber: "+62 812 3456 7890",
    lastMessage: "Iya mbak, mau nanya harga kaos sablon 100 pcs.",
    owner: "Karina",
    status: "active",
    qualification: {
      name: "Budi Santoso",
      domicile: "Jakarta Selatan",
      company: "PT Maju Bersama",
    },
    messages: [
      { id: "m1", sender: "bot", text: "Halo! Selamat datang di CITILEX ASIA. Ada yang bisa Karina bantu?" },
      { id: "m2", sender: "customer", text: "Halo" },
      { id: "m3", sender: "customer", text: "Iya mbak, mau nanya harga kaos sablon 100 pcs." },
    ],
  },
  {
    id: "chat-2",
    customerName: "Siti Aminah",
    phoneNumber: "+62 856 7890 1234",
    lastMessage: "Tolong kirimkan invoice-nya ya.",
    owner: "CS",
    status: "qualified",
    qualification: {
      name: "Siti Aminah",
      domicile: "Bandung",
      company: "Event Organizer Jabar",
    },
    messages: [
      { id: "m4", sender: "customer", text: "Tolong kirimkan invoice-nya ya." },
    ],
  }
];

async function main() {
  console.log("Seeding dummy data to Prisma...");

  for (const chat of dummyChats) {
    // 1. Upsert Customer
    const customer = await prisma.customer.upsert({
      where: { phone: chat.phoneNumber },
      update: {
        name: chat.customerName,
        owner: chat.owner,
        status: chat.status,
        company: chat.qualification.company,
        domicile: chat.qualification.domicile,
      },
      create: {
        name: chat.customerName,
        phone: chat.phoneNumber,
        owner: chat.owner,
        status: chat.status,
        company: chat.qualification.company,
        domicile: chat.qualification.domicile,
      }
    });

    console.log(`Created customer: ${customer.name}`);

    // 2. Create Messages
    for (const msg of chat.messages) {
      await prisma.message.create({
        data: {
          customerId: customer.id,
          sender: msg.sender,
          text: msg.text,
        }
      });
    }

    console.log(`Created messages for ${customer.name}`);

    // 3. (Optional) Create a dummy Project if status is qualified to show up in Pipeline and Leads
    if (chat.status === "qualified") {
      await prisma.project.create({
        data: {
          customerId: customer.id,
          title: "Pesanan Kemeja PDH",
          value: 7500000,
          pipeline: "DEAL",
          status: "deal",
        }
      });
      console.log(`Created project for ${customer.name}`);
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
