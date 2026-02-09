import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import ApplicationForm from "@/components/FileUpload/ApplicationForm";

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = await prisma.career.findUnique({
    where: { slug }
  });

  if (!career) {
    notFound();
  }

  const requirements = JSON.parse(career.requirements || '[]');
  const benefits = JSON.parse(career.benefits || '[]');

  const relatedCareers = await prisma.career.findMany({
    where: {
      AND: [
        { id: { not: career.id } },
        {
          OR: [
            { department: career.department },
            { location: career.location }
          ]
        }
      ]
    },
    take: 3
  });

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded uppercase">
                    {career.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                    {career.experience} level
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{career.title}</h1>
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span>{career.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    <span>{career.department}</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Role</h2>
                <p className="text-gray-600 leading-relaxed">{career.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {requirements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {requirements.map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {benefits.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Application Deadline</h3>
                <p className="text-gray-600">
                  Applications close on {new Date(career.expiresAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white border rounded-lg p-6 sticky top-32">
                <h3 className="text-xl font-semibold mb-4">Apply for This Position</h3>
                <ApplicationForm jobTitle={career.title} jobId={career.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedCareers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Similar Opportunities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCareers.map((related) => (
                <a
                  key={related.id}
                  href={`/careers/${related.slug}`}
                  className="bg-white border rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                      {related.type}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <div className="text-sm text-gray-600 mb-2">
                    {related.location} • {related.department}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
