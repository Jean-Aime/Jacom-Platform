import { prisma } from './prisma';

export async function getContent(page: string, section?: string) {
  const where: any = { page, active: true };
  if (section) where.section = section;

  const blocks = await prisma.contentBlock.findMany({
    where,
    orderBy: { order: 'asc' }
  });

  const content: Record<string, any> = {};
  blocks.forEach(block => {
    const value = block.type === 'json' ? JSON.parse(block.content) : block.content;
    content[block.key] = value;
  });

  return content;
}

export async function getContentByKey(key: string) {
  const block = await prisma.contentBlock.findUnique({ where: { key } });
  if (!block) return null;
  return block.type === 'json' ? JSON.parse(block.content) : block.content;
}
