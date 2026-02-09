import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
import Footer from "@/components/Footer/Footer";
import CareersClient from "./CareersClient";

export default async function CareersPage() {
  const careers = await prisma.career.findMany({
    orderBy: { featured: 'desc' }
  });

  const careersWithParsedData = careers.map(career => ({
    ...career,
    requirements: JSON.parse(career.requirements || '[]'),
    benefits: JSON.parse(career.benefits || '[]')
  }));

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <PageHero 
        title="Build Your Career With Us"
        description="Join a global team of exceptional professionals who are passionate about solving complex business challenges and driving meaningful change."
        illustrationContent={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-lg px-6 py-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white diagram-node animate-bounce-in" style={{animationDelay: '0.2s'}}>1</div>
                  <div className="mt-2 text-[10px] font-bold text-gray-700">Entry</div>
                  <div className="text-[9px] text-gray-500">Junior</div>
                </div>
                <div className="text-blue-400 text-2xl font-bold">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-18 h-18 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white diagram-node animate-bounce-in" style={{width: '4.5rem', height: '4.5rem', animationDelay: '0.35s'}}>2</div>
                  <div className="mt-2 text-[10px] font-bold text-gray-700">Mid</div>
                  <div className="text-[9px] text-gray-500">Associate</div>
                </div>
                <div className="text-blue-500 text-2xl font-bold">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl border-2 border-white diagram-node animate-bounce-in" style={{animationDelay: '0.5s'}}>3</div>
                  <div className="mt-2 text-[10px] font-bold text-gray-700">Senior</div>
                  <div className="text-[9px] text-gray-500">Expert</div>
                </div>
                <div className="text-blue-600 text-2xl font-bold">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white diagram-node animate-bounce-in animate-pulse-glow" style={{animationDelay: '0.65s'}}>
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-gray-700">Leader</div>
                  <div className="text-[9px] text-gray-500">Executive</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-3 text-center border-t-4 border-blue-500 animate-slide-up" style={{animationDelay: '0.8s'}}>
                  <div className="text-lg font-bold text-white">50+</div>
                  <div className="text-[10px] text-blue-200 font-semibold">Positions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-3 text-center border-t-4 border-green-500 animate-slide-up" style={{animationDelay: '0.95s'}}>
                  <div className="text-lg font-bold text-white">15+</div>
                  <div className="text-[10px] text-blue-200 font-semibold">Countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-3 text-center border-t-4 border-purple-500 animate-slide-up" style={{animationDelay: '1.1s'}}>
                  <div className="text-lg font-bold text-white">1K+</div>
                  <div className="text-[10px] text-blue-200 font-semibold">Team</div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Career Tracks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Students & Graduates", description: "Launch your consulting career with our comprehensive development programs", icon: "🎓" },
              { title: "Experienced Professionals", description: "Bring your expertise to solve complex business challenges", icon: "💼" },
              { title: "Internships", description: "Gain hands-on experience with real client projects", icon: "🚀" }
            ].map((track) => (
              <div key={track.title} className="bg-white border rounded-lg p-8 text-center hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">{track.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{track.title}</h3>
                <p className="text-gray-600">{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="positions">
        <CareersClient careers={careersWithParsedData} />
      </div>

      <Footer />
    </div>
  );
}
