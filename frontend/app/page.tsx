import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Hero from "@/components/Hero/Hero";
import DynamicIndustrySelector from "@/components/IndustrySelector/DynamicIndustrySelector";
import FeaturedStories from "@/components/FeaturedStories/FeaturedStories";
import VideoSection from "@/components/VideoSection/VideoSection";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import LatestInsights from "@/components/LatestInsights/LatestInsights";
import CTASection from "@/components/CTASection/CTASection";
import Footer from "@/components/Footer/Footer";
import { getContent } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const hero = await getContent('home', 'hero');
  const industry = await getContent('home', 'industry');
  const stories = await getContent('home', 'stories');
  const video = await getContent('home', 'video');
  const banner = await getContent('home', 'banner');
  const cta = await getContent('home', 'cta');
  
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
      take: 2
    });
  } catch (error) {
    console.error('Failed to fetch insights:', error);
    insights = [];
  }
  
  return (
    <>
      <MegaMenuHeader />
      <main id="main-content">
        <Hero content={hero} />
        <DynamicIndustrySelector content={industry} />
        <FeaturedStories content={stories} />
        <ImageBanner content={banner} />
        <VideoSection content={video} />
        <LatestInsights insights={insights} />
        <CTASection content={cta} />
      </main>
      <Footer />
    </>
  );
}