import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.systemConfig.deleteMany();
  console.log('SystemConfig deleted successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
