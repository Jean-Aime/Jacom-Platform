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

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutHero />
      <AboutContent />
      <VideoMaze />
      <FirmInfo />
      <GlassdoorBanner />
      <OurPeople />
      <TeamImage />
      <ResultsPartnerships />
      <BoldTransformation />
      <ClimateChange />
      <Footer />
    </>
  );
}
