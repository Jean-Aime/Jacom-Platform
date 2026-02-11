import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
import Footer from "@/components/Footer/Footer";
import InsightsGrid from "./InsightsGrid";

export const revalidate = 60;

interface InsightsPageProps {
  searchParams: {
    type?: string;
    featured?: string;
  };
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const { type, featured } = searchParams;
  
  const where: any = {
    OR: [
      { status: 'published' },
      { status: 'scheduled', scheduledAt: { lte: new Date() } }
    ]
  };
  
  if (type) {
    where.type = type;
  }
  
  if (featured === 'true') {
    where.featured = true;
  }
  
  const insights = await prisma.insight.findMany({
    where,
    include: {
      author: {
        select: {
          name: true,
          role: true,
          image: true
        }
      }
    },
    orderBy: { publishedAt: 'desc' }
  });
  
  const pageTitle = type ? `${type}s` : 'Insights & Thought Leadership';
  const pageDescription = type === 'Case Study' 
    ? 'Explore our client success stories and transformational projects.'
    : 'Explore our latest research, industry perspectives, and innovative solutions.';

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <PageHero 
        title={pageTitle}
        description={pageDescription}
        illustrationContent={
          <div className="w-full h-full p-4 flex items-center justify-center">
            <div className="w-full">
              {/* Content Types Diagram */}
              <div className="space-y-2">
                {/* Article Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-sm border-l-4 border-blue-500 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-white">Articles</span>
                  </div>
                  <div className="text-[10px] text-blue-200">Industry analysis & trends</div>
                </div>
                
                {/* Research Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-sm border-l-4 border-green-500 animate-slide-up" style={{animationDelay: '0.35s'}}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-white">Research</span>
                  </div>
                  <div className="text-[10px] text-blue-200">Data-driven insights</div>
                </div>
                
                {/* Case Study Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-sm border-l-4 border-purple-500 animate-slide-up" style={{animationDelay: '0.5s'}}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-white">Case Studies</span>
                  </div>
                  <div className="text-[10px] text-blue-200">Success stories</div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {insights.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">No insights available yet</h2>
              <p className="text-gray-600">Check back soon for our latest content.</p>
            </div>
          ) : (
            <InsightsGrid insights={insights} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
