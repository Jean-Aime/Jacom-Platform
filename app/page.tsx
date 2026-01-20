import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import IndustrySelector from "@/components/IndustrySelector/IndustrySelector";
import FeaturedStories from "@/components/FeaturedStories/FeaturedStories";
import VideoSection from "@/components/VideoSection/VideoSection";
import LatestInsights from "@/components/LatestInsights/LatestInsights";
import CTASection from "@/components/CTASection/CTASection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IndustrySelector />
      <FeaturedStories />
      <VideoSection />
      <LatestInsights />
      <CTASection />
      <Footer />
    </>
  );
}
