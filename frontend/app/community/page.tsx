"use client";
import { useState, useEffect } from "react";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import EventsList from "@/components/EventsList";

export default function CommunityPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [insights, setInsights] = useState([]);
  const [experts, setExperts] = useState([]);
  const [categories, setCategories] = useState([]);

  const heroImages = [
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const insightsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/insights?status=published`);
        if (insightsRes.ok) setInsights(await insightsRes.json());
        
        const expertsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/experts?type=expert`);
        if (expertsRes.ok) setExperts(await expertsRes.json());
        
        const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/community-categories?status=published`);
        if (categoriesRes.ok) setCategories(await categoriesRes.json());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  const featuredInsights = insights.filter((i: any) => i.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: index === currentImageIndex ? 'scale(1.15)' : 'scale(1.0)',
              transition: 'transform 4s ease-out, opacity 1s ease-in-out'
            }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs text-red-200 mb-3 uppercase tracking-widest font-medium animate-fade-in-up">KNOWLEDGE CENTER</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in-up animation-delay-300">
              Stay Informed with <span className="text-red-100">Industry Insights</span> & Thought Leadership
            </h1>
            <p className="text-sm sm:text-base text-red-100 mb-6 sm:mb-8 leading-relaxed animate-fade-in-up animation-delay-600">
              Navigate the complexities of the Japanese market with JAS360's expert analysis, data-driven research, and strategic community insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-900">
              <a href="#newsletter" className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium text-sm transition shadow-lg text-center">
                Subscribe to Newsletter
              </a>
              <a href="#insights" className="border-2 border-white hover:bg-white hover:text-primary text-white px-6 py-3 rounded-md font-medium text-sm transition text-center">
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
            <a href="#all" className="text-primary font-semibold hover:underline text-sm">View Archive →</a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-48 bg-gray-200">
                  {insight.image && (
                    <img src={insight.image} alt={insight.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{insight.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{insight.excerpt}</p>
                  <a href={`/insights/${insight.slug}`} className="text-primary text-sm font-semibold hover:underline">Read More</a>
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
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                  {story.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{story.title}</h3>
                <p className="text-sm text-primary font-semibold mb-4">{story.location}</p>
                
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
                    <div className="text-3xl font-bold text-primary">{story.metric}</div>
                    <div className="text-xs text-gray-500">Impact Metric</div>
                  </div>
                  {story.chart === "bar" && (
                    <div className="flex items-end gap-1 h-16">
                      <div className="w-3 bg-red-200 rounded-t" style={{height: "40%"}}></div>
                      <div className="w-3 bg-red-300 rounded-t" style={{height: "60%"}}></div>
                      <div className="w-3 bg-red-400 rounded-t" style={{height: "80%"}}></div>
                      <div className="w-3 bg-primary rounded-t" style={{height: "100%"}}></div>
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
                      <div className="w-3 bg-primary rounded-t" style={{height: "50%"}}></div>
                      <div className="w-3 bg-primary rounded-t" style={{height: "70%"}}></div>
                      <div className="w-3 bg-primary rounded-t" style={{height: "60%"}}></div>
                      <div className="w-3 bg-primary rounded-t" style={{height: "90%"}}></div>
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
                    <button className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition">
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
            {categories.map((category: any) => {
              const imageUrl = category.image?.startsWith('http') ? category.image : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${category.image}`;
              return (
              <a key={category.id} href={`/community/${category.slug}`} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                {category.image && (
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={imageUrl}
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                </div>
              </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Expert Contributors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Expert Contributors</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  {expert.image ? (
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-400 to-primary"></div>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{expert.name}</h3>
                <p className="text-sm text-primary font-semibold mb-4">{expert.role}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{expert.bio}</p>
                {expert.linkedin && (
                  <a href={expert.linkedin} className="text-primary hover:underline text-sm font-semibold">
                    View Profile →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars & Virtual Events */}
      <EventsList />

      {/* Consultant Toolkits & Guides */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Consultant Toolkits & Guides</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Strategy Materials" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Data Templates" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                title: "Legal Templates" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Market Entry Guides" 
              }
            ].map((toolkit, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3">{toolkit.icon}</div>
                <h3 className="font-bold text-gray-900">{toolkit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="py-20 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Never Miss a Strategic Update</h2>
          <p className="text-gray-600 mb-8">
            Get the latest insights, research reports, and event invitations delivered to your inbox weekly. Join 10,000+ industry leaders.
          </p>
          <form className="flex gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
            />
            <button className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition">
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
