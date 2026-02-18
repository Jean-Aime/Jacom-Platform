import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@jacom.com';
  const password = 'admin123';
  
  const hash = await bcrypt.hash(password, 10);
  
  await prisma.user.updateMany({
    where: { email },
    data: { password: hash }
  });
  
  console.log('✓ Admin password updated:', email, '/', password);

  console.log('✓ Admin created:', email, '/', password);
  
  const user = await prisma.user.findUnique({ where: { email } });
  const valid = await bcrypt.compare(password, user!.password);
  console.log('✓ Password verification:', valid);
}

main()
  .then(() => prisma.$disconnect())
  .catch(console.error);
