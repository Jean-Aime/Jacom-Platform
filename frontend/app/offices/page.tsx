import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default async function OfficesPage() {
  const offices = await prisma.office.findMany({
    orderBy: { region: 'asc' }
  });
  
  const regions = [...new Set(offices.map(o => o.region))];
  const officesByRegion = regions.reduce((acc, region) => {
    acc[region] = offices.filter(o => o.region === region);
    return acc;
  }, {} as Record<string, typeof offices>);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Global Offices</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            With offices across the globe, we're positioned to serve clients wherever they operate and grow.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {regions.map((region) => (
            <div key={region} className="mb-12">
              <h2 className="text-3xl font-bold mb-8">{region}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {officesByRegion[region].map((office) => (
                  <a
                    key={office.id}
                    href={`/offices/${office.slug}`}
                    className="bg-white border rounded-lg p-6 hover:shadow-lg transition-all group"
                  >
                    {office.image ? (
                      <img src={office.image} alt={office.name} className="aspect-video object-cover rounded-lg mb-4" />
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-100 rounded-lg mb-4"></div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {office.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{office.address}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{office.country}</span>
                      <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                        View Details →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us Globally</h2>
          <p className="text-xl mb-8 opacity-90">
            Find the office nearest to you and get in touch with our local team
          </p>
          <a 
            href="/contact"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
