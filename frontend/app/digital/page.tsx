import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { getContent } from "@/lib/content";

export default async function DigitalPage() {
  const content = await getContent('digital');
  
  const heroTitle = content?.digital_hero_title || 'Digital & AI Transformation';
  const heroSubtitle = content?.digital_hero_subtitle || 'We help organizations harness cutting-edge technologies to reimagine their business models, optimize operations, and create competitive advantages in the digital age.';
  const solutionsTitle = content?.digital_solutions_title || 'Digital Solutions';
  const solutions = content?.digital_solutions_data || [
    { title: "AI & Machine Learning", description: "Harness the power of artificial intelligence to automate processes and unlock insights", features: ["Predictive Analytics", "Process Automation", "Natural Language Processing", "Computer Vision"] },
    { title: "Cloud Transformation", description: "Migrate and optimize your infrastructure for scalability and performance", features: ["Cloud Migration", "Multi-cloud Strategy", "DevOps Implementation", "Security & Compliance"] },
    { title: "Data & Analytics", description: "Transform raw data into actionable business intelligence and strategic insights", features: ["Data Architecture", "Real-time Analytics", "Business Intelligence", "Data Governance"] },
    { title: "Digital Experience", description: "Create seamless, personalized experiences across all customer touchpoints", features: ["UX/UI Design", "Mobile Applications", "Web Platforms", "Customer Portals"] }
  ];
  const ctaTitle = content?.digital_cta_title || 'Ready to Transform Digitally?';
  const ctaSubtitle = content?.digital_cta_subtitle || 'Let\'s discuss how digital transformation can accelerate your business growth';

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-gray-600 mb-8">{heroSubtitle}</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">Explore Solutions</button>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">Watch Demo</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">{solutionsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution: any) => (
              <div key={solution.title} className="bg-white border rounded-lg p-8 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-xl mb-8 opacity-90">{ctaSubtitle}</p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">Start Your Digital Journey</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
