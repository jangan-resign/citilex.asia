import { prisma } from './src/lib/prisma';

async function main() {
  const msgs = await prisma.message.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });
  console.log(msgs.map(m => ({ id: m.id, text: m.text.substring(0, 30), wamid: m.wamid })));
}

main();
