import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Hero from "@/components/Hero/Hero";
import IndustrySelector from "@/components/IndustrySelector/IndustrySelector";
import FeaturedStories from "@/components/FeaturedStories/FeaturedStories";
import VideoSection from "@/components/VideoSection/VideoSection";
import LatestInsights from "@/components/LatestInsights/LatestInsights";
import CTASection from "@/components/CTASection/CTASection";
import Footer from "@/components/Footer/Footer";
import { getContent } from "@/lib/content";

export default async function Home() {
  const hero = await getContent('home', 'hero');
  const industry = await getContent('home', 'industry');
  const stories = await getContent('home', 'stories');
  const video = await getContent('home', 'video');
  const insights = await getContent('home', 'insights');
  const cta = await getContent('home', 'cta');
  
  return (
    <>
      <MegaMenuHeader />
      <Hero content={hero} />
      <IndustrySelector content={industry} />
      <FeaturedStories content={stories} />
      <VideoSection content={video} />
      <LatestInsights content={insights} />
      <CTASection content={cta} />
      <Footer />
    </>
  );
}
