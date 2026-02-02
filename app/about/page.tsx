import Header from "@/components/Header/Header";
import AboutHero from "@/components/About/AboutHero";
import AboutContent from "@/components/About/AboutContent";
import VideoMaze from "@/components/About/VideoMaze";
import FirmInfo from "@/components/About/FirmInfo";
import GlassdoorBanner from "@/components/About/GlassdoorBanner";
import OurPeople from "@/components/About/OurPeople";
import TeamImage from "@/components/About/TeamImage";
import ResultsPartnerships from "@/components/About/ResultsPartnerships";
import BoldTransformation from "@/components/About/BoldTransformation";
import ClimateChange from "@/components/About/ClimateChange";
import Footer from "@/components/Footer/Footer";
import { getContent } from "@/lib/content";

export default async function AboutPage() {
  const content = await getContent('about');
  
  return (
    <>
      <Header />
      <AboutHero content={content} />
      <AboutContent content={content} />
      <VideoMaze />
      <FirmInfo content={content} />
      <GlassdoorBanner />
      <OurPeople content={content} />
      <TeamImage />
      <ResultsPartnerships />
      <BoldTransformation />
      <ClimateChange />
      <Footer />
    </>
  );
}
