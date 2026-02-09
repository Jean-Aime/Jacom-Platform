import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
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
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Build Your Career With Us</h1>
            <p className="text-xl text-gray-600 mb-8">
              Join a global team of exceptional professionals who are passionate about solving complex business challenges and driving meaningful change.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#positions" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View Open Positions
              </a>
              <a href="/about" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                Life at JAS.COM
              </a>
            </div>
          </div>
        </div>
      </section>

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
