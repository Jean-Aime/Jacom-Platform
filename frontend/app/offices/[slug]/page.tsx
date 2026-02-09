import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import OfficeMap from "@/components/Map/OfficeMap";

interface OfficePageProps {
  params: Promise<{ slug: string }>;
}

export default async function OfficePage({ params }: OfficePageProps) {
  const { slug } = await params;
  const office = await prisma.office.findUnique({
    where: { slug }
  });

  if (!office) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">{office.name}</h1>
              <p className="text-xl text-gray-600 mb-6">
                Our {office.city} office serves as a key hub for {office.region}, delivering world-class consulting services to clients across the region.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">{office.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-primary">{office.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-primary">{office.email}</a>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <OfficeMap
                address={office.address}
                coordinates={{ lat: office.lat, lng: office.lng }}
                officeName={office.name}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">About Our {office.city} Office</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Established as a cornerstone of our {office.region} operations, our {office.city} office brings together top-tier consultants and industry experts to serve clients across diverse sectors. We combine global expertise with deep local market knowledge to deliver transformative results.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Industries</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <a href="/industries/financial-services" className="text-gray-600 hover:text-primary">Financial Services</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <a href="/industries/healthcare-life-sciences" className="text-gray-600 hover:text-primary">Healthcare & Life Sciences</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span className="text-gray-600">Technology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span className="text-gray-600">Manufacturing</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Core Services</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <a href="/services/strategy-operations" className="text-gray-600 hover:text-primary">Strategy Consulting</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <a href="/services/digital-transformation" className="text-gray-600 hover:text-primary">Digital Transformation</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span className="text-gray-600">Operations Excellence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span className="text-gray-600">M&A Advisory</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Visit Our Office</h3>
                <p className="mb-4 opacity-90">
                  Schedule a meeting with our {office.city} team to discuss your business challenges.
                </p>
                <a 
                  href="/contact"
                  className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block"
                >
                  Schedule Meeting
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Career Opportunities in {office.city}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/careers" className="bg-white border rounded-lg p-6 hover:shadow-md transition-all group">
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Join Our {office.city} Team
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Explore current openings and discover opportunities to grow your career with us.
              </p>
              <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                View Opportunities →
              </span>
            </a>
            
            <a href="/about" className="bg-white border rounded-lg p-6 hover:shadow-md transition-all group">
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Life at JAS.COM {office.city}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Learn about our culture, values, and what makes our {office.city} office special.
              </p>
              <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                Learn More →
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
