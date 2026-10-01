import { prisma } from "./src/lib/prisma";
import { dummyPlaybooks, dummyKnowledge } from "./src/lib/dummyData";


async function seed() {
  console.log("Seeding Playbooks...");
  for (const pb of dummyPlaybooks) {
    await prisma.sop.create({
      data: {
        title: pb.title,
        description: pb.description,
        content: `Isi dari SOP ${pb.title} (silakan diedit).`,
        isActive: pb.isActive,
      }
    });
  }

  console.log("Seeding Knowledge...");
  for (const kn of dummyKnowledge) {
    await prisma.knowledge.create({
      data: {
        title: kn.title,
        content: kn.content,
        category: kn.category,
      }
    });
  }

  console.log("Seeding Persona...");
  await prisma.persona.create({
    data: {
      tone: "ramah",
      coreInstructions: `1. Kamu adalah Karina, Asisten Virtual CITILEX ASIA.
2. Selalu gunakan panggilan "kak" atau "kakak" kepada klien.
3. Selalu gunakan emoji seperlunya untuk mencairkan suasana.
3. Jangan pernah memaksa klien untuk langsung membeli (hard selling).
4. Fokus pada konsultasi dan membantu menyelesaikan masalah klien.
5. Jika kamu tidak tahu jawabannya, katakan serahkan ke CS.`
    }
  });

  console.log("Compiling Karina Context...");
  const { compileKarinaContext } = require("./src/actions/playbook");
  await compileKarinaContext();

  console.log("Done.");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
