import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import NewHomePage from "@/components/NewHome/NewHomePage";

export default async function Home() {
  let insights = [];
  try {
    insights = await prisma.insight.findMany({
      where: {
        OR: [
          { status: 'published' },
          { status: 'scheduled', scheduledAt: { lte: new Date() } }
        ]
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        type: true,
        readTime: true,
        publishedAt: true,
        author: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: { publishedAt: 'desc' },
      take: 3
    });
  } catch (error) {
    console.error('Failed to fetch insights:', error);
    insights = [];
  }
  
  return (
    <>
      <MegaMenuHeader />
      <main id="main-content">
        <NewHomePage insights={insights} />
      </main>
      <Footer />
    </>
  );
}