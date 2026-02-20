import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const insights = await prisma.insight.findMany({
    where: {
      OR: [
        { status: 'published' },
        { status: 'scheduled', scheduledAt: { lte: new Date() } }
      ]
    },
    include: {
      author: {
        select: {
          name: true,
          role: true,
          image: true
        }
      }
    },
    orderBy: { publishedAt: 'desc' },
    take: 20
  });

  const featuredInsights = insights.filter(i => i.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pt-32 pb-56 min-h-[580px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs text-blue-200 mb-3 uppercase tracking-widest font-medium">KNOWLEDGE CENTER</p>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Stay Informed with <span className="text-blue-100">Industry Insights</span> & Thought Leadership
            </h1>
            <p className="text-blue-100 text-base mb-8 leading-relaxed">
              Navigate the complexities of the Japanese market with JAS360's expert analysis, data-driven research, and strategic community insights.
            </p>
            <div className="flex gap-4">
              <a href="#newsletter" className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-md font-medium text-sm transition shadow-lg">
                Subscribe to Newsletter
              </a>
              <a href="#insights" className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-md font-medium text-sm transition">
                Latest Insights
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Insights</h2>
              <p className="text-gray-600 mt-2">In-depth analysis and expert perspectives on key industry trends</p>
            </div>
            <a href="#all" className="text-blue-600 font-semibold hover:underline text-sm">View Archive →</a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-48 bg-gray-200">
                  {insight.image && (
                    <img src={insight.image} alt={insight.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{insight.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{insight.excerpt}</p>
                  <a href={`/insights/${insight.slug}`} className="text-blue-600 text-sm font-semibold hover:underline">Read More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact: Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Global Impact: Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: "SmartFactory Optimization",
                location: "Tokyo, Japan",
                challenge: "Legacy systems hindering production efficiency",
                solution: "Implemented IoT sensors and real-time analytics",
                result: "40% increase in operational efficiency",
                metric: "40%",
                chart: "bar"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Renewable Energy Expansion",
                location: "Addis Ababa, Ethiopia",
                challenge: "Limited access to sustainable energy infrastructure",
                solution: "Deployed solar microgrids across rural communities",
                result: "Powered 15,000+ homes with clean energy",
                metric: "15K+",
                chart: "donut"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Nepal-Japan Recruitment",
                location: "Kathmandu, Nepal",
                challenge: "Skills gap for Japanese market entry",
                solution: "Comprehensive training and placement program",
                result: "500+ successful placements in 2 years",
                metric: "500+",
                chart: "line"
              }
            ].map((story, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {story.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{story.title}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">{story.location}</p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Challenge</p>
                    <p className="text-sm text-gray-700">{story.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Solution</p>
                    <p className="text-sm text-gray-700">{story.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Result</p>
                    <p className="text-sm text-gray-700">{story.result}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{story.metric}</div>
                    <div className="text-xs text-gray-500">Impact Metric</div>
                  </div>
                  {story.chart === "bar" && (
                    <div className="flex items-end gap-1 h-16">
                      <div className="w-3 bg-blue-200 rounded-t" style={{height: "40%"}}></div>
                      <div className="w-3 bg-blue-300 rounded-t" style={{height: "60%"}}></div>
                      <div className="w-3 bg-blue-400 rounded-t" style={{height: "80%"}}></div>
                      <div className="w-3 bg-blue-600 rounded-t" style={{height: "100%"}}></div>
                    </div>
                  )}
                  {story.chart === "donut" && (
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#2563eb" strokeWidth="8" strokeDasharray="176" strokeDashoffset="44"/>
                      </svg>
                    </div>
                  )}
                  {story.chart === "line" && (
                    <div className="flex items-end gap-1 h-16">
                      <div className="w-3 bg-blue-600 rounded-t" style={{height: "50%"}}></div>
                      <div className="w-3 bg-blue-600 rounded-t" style={{height: "70%"}}></div>
                      <div className="w-3 bg-blue-600 rounded-t" style={{height: "60%"}}></div>
                      <div className="w-3 bg-blue-600 rounded-t" style={{height: "90%"}}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-Dive Research & Strategic Whitepapers */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Deep-Dive Research & Strategic Whitepapers</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our analysts spend hundreds of hours researching market shifts on the ground in Japan, to deliver our library of whitepapers and reports.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "2024 Tech Investment Annual Report", subtitle: "Market trends and forecasts" },
                  { title: "Japan's ICT Regulatory Framework", subtitle: "Compliance and policy analysis" }
                ].map((paper, i) => (
                  <div key={i} className="bg-slate-800 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700 transition">
                    <div>
                      <h4 className="font-bold mb-1">{paper.title}</h4>
                      <p className="text-sm text-gray-400">{paper.subtitle}</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[400px] bg-slate-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
                  <polyline points="50,250 100,200 150,220 200,150 250,180 300,100 350,120" fill="none" stroke="#3b82f6" strokeWidth="3"/>
                  <polyline points="50,250 100,230 150,240 200,200 250,210 300,180 350,190" fill="none" stroke="#10b981" strokeWidth="3"/>
                  {[50,100,150,200,250,300,350].map((x, i) => (
                    <rect key={i} x={x-10} y={260} width="20" height={30 + i * 10} fill="#3b82f6" opacity="0.6"/>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights by Category */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Insights by Category</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💼",
                title: "Job Market",
                items: ["Japan Work Visa Types", "Salary Expectations in Tokyo", "Job Interview Preparation"]
              },
              {
                icon: "💻",
                title: "Technology",
                items: ["AI in Japanese Healthcare", "5G Network Rollout in Japan", "Cybersecurity Best Practices"]
              },
              {
                icon: "📊",
                title: "Business Strategy",
                items: ["M&A Trends in APAC", "ESG Investing Strategies", "B2B Consulting Playbook"]
              }
            ].map((category, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Expert Contributors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Expert Contributors</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Akihiro Tanaka", role: "Tech Consultant", image: "/images/expert1.jpg", articles: 45, linkedin: "#" },
              { name: "Sarah Chen", role: "Senior Economist", image: "/images/expert2.jpg", articles: 38, linkedin: "#" },
              { name: "Yuki Yamamoto", role: "Strategy Director", image: "/images/expert3.jpg", articles: 52, linkedin: "#" }
            ].map((expert, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{expert.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">{expert.role}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Specializing in {expert.role.toLowerCase()} with deep expertise in Japanese market dynamics and global business strategy.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{expert.articles} Articles</span>
                </div>
                <a href={expert.linkedin} className="text-blue-600 hover:underline text-sm font-semibold">
                  View Profile →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars & Virtual Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Upcoming Webinars & Virtual Events</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { date: "24", month: "JAN", title: "Mastering AI-Prep: Step-by-Step for Japan", time: "2:00 PM JST", register: "#" },
              { date: "08", month: "FEB", title: "2025 Manufacturing Tech Roundtable", time: "10:00 AM JST", register: "#" }
            ].map((event, i) => (
              <div key={i} className="flex gap-6 bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-20 h-20 bg-blue-600 text-white rounded-lg flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">{event.date}</div>
                  <div className="text-xs uppercase">{event.month}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{event.time}</p>
                  <a href={event.register} className="text-blue-600 text-sm font-semibold hover:underline">
                    Register Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultant Toolkits & Guides */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Consultant Toolkits & Guides</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "📚", title: "Strategy Materials" },
              { icon: "📊", title: "Data Templates" },
              { icon: "⚖️", title: "Legal Templates" },
              { icon: "🌍", title: "Market Entry Guides" }
            ].map((toolkit, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{toolkit.icon}</div>
                <h3 className="font-bold text-gray-900">{toolkit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Never Miss a Strategic Update</h2>
          <p className="text-gray-600 mb-8">
            Get the latest insights, research reports, and event invitations delivered to your inbox weekly. Join 10,000+ industry leaders.
          </p>
          <form className="flex gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
