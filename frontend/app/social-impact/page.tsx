import Header from "@/components/Header/Header";
import SocialImpactHero from "@/components/SocialImpact/SocialImpactHero";
import StatsSection from "@/components/SocialImpact/StatsSection";
import CommitmentBanner from "@/components/SocialImpact/CommitmentBanner";
import ExpertiseGrid from "@/components/SocialImpact/ExpertiseGrid";
import ClientResults from "@/components/SocialImpact/ClientResults";
import Partnerships from "@/components/SocialImpact/Partnerships";
import InsightsGrid from "@/components/SocialImpact/InsightsGrid";
import ConsultantsGrid from "@/components/SocialImpact/ConsultantsGrid";
import RelatedOfferings from "@/components/SocialImpact/RelatedOfferings";
import Footer from "@/components/Footer/Footer";

export default function SocialImpactPage() {
  return (
    <>
      <Header />
      <SocialImpactHero />
      <StatsSection />
      <CommitmentBanner />
      <ExpertiseGrid />
      <ClientResults />
      <Partnerships />
      <InsightsGrid />
      <ConsultantsGrid />
      <RelatedOfferings />
      <Footer />
    </>
  );
}
