import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
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
      <MegaMenuHeader />
      <PageHero 
        title="About JACOM"
        description="JACOM is an IoT e-commerce platform and consulting company providing digital transformation, system integration, and comprehensive solutions across Asia and Africa."
        illustrationContent={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-lg px-6 py-8">
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="w-40 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl py-3 px-4 text-center shadow-xl border-2 border-white diagram-node animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <div className="text-sm font-bold">Vision</div>
                  <div className="text-[10px] opacity-90">IoT Platform • Smart Tech</div>
                </div>
                <div className="text-blue-400 text-2xl">↓</div>
                <div className="w-56 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl py-3 px-4 text-center shadow-xl border-2 border-white diagram-node animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <div className="text-sm font-bold">Services</div>
                  <div className="text-[10px] opacity-90">IoT • System Integration • Training</div>
                </div>
                <div className="text-green-400 text-2xl">↓</div>
                <div className="w-72 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl py-3 px-4 text-center shadow-xl border-2 border-white diagram-node animate-slide-up" style={{animationDelay: '0.6s'}}>
                  <div className="text-sm font-bold">Industries</div>
                  <div className="text-[10px] opacity-90">Manufacturing • Energy • Hospitality • IT</div>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 text-xs font-bold text-white flex items-center gap-2 border border-white/20 diagram-node animate-bounce-in" style={{animationDelay: '0.8s'}}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
                  </svg> Asia-Africa
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 text-xs font-bold text-white flex items-center gap-2 border border-white/20 diagram-node animate-bounce-in" style={{animationDelay: '0.95s'}}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg> Partnerships
                </div>
              </div>
            </div>
          </div>
        }
      />
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
