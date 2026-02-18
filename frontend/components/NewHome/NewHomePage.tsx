"use client";
import { useState } from "react";
import { Target, Users, Handshake, Award, TrendingUp, Star, Factory, Zap, Link2, Building2, Heart, Hotel, Laptop, DollarSign, MapPin, Play } from "lucide-react";

export default function NewHomePage({ insights }: { insights: any[] }) {
  const [activeTab, setActiveTab] = useState("SmartFactory");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[680px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700">
        </div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Transform Your Business with <span className="text-blue-400">Innovative Consulting</span>
            </h1>
            <p className="text-gray-200 text-lg mb-8">
              Empowering your growth through strategic insights and tailored solutions that drive measurable results
            </p>
            <div className="flex gap-4 mb-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-semibold transition">
                Get Started Today
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded font-semibold transition flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Overview
              </button>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-6 grid grid-cols-4 gap-6">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "50+", label: "Expert Consultants" },
                { value: "15+", label: "Industries Served" },
                { value: "9+", label: "Global Offices" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Growth Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg" style={{
            backgroundImage: 'url(/images/about-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Energizing Business Growth Through Innovation
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover a world where JACOM is a dynamic growth consultancy that empowers businesses to unlock their full potential through innovative strategies and cutting-edge solutions.
            </p>
            <div className="space-y-3 mb-6">
              {[
                "Full-Scale Startup Integration",
                "Comprehensive Financial Planning",
                "Strategic Market Positioning"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="#" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-2">
              Learn more about our services →
            </a>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-center text-gray-600 mb-12">Guiding principles that drive our success</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { Icon: Target, title: "Innovation", desc: "Pioneering new solutions" },
              { Icon: Users, title: "Teamwork", desc: "Collaborative excellence" },
              { Icon: Handshake, title: "Trust", desc: "Building lasting relationships" },
              { Icon: Award, title: "Standards", desc: "Uncompromising quality" },
              { Icon: TrendingUp, title: "Results", desc: "Measurable outcomes" },
              { Icon: Star, title: "Excellence", desc: "Exceeding expectations" }
            ].map((value, i) => (
              <div key={i} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <value.Icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Industry-Leading Solutions</h2>
            <div className="flex gap-2">
              {["SmartFactory", "Financial", "General"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    activeTab === tab ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Factory, title: "SmartFactory", desc: "Revolutionize manufacturing with IoT and AI-driven automation solutions" },
              { Icon: Link2, title: "IoT Integration", desc: "Seamlessly connect devices and systems for real-time data insights" },
              { Icon: Zap, title: "Renewable Energy", desc: "Sustainable energy solutions for a greener future" }
            ].map((solution, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow hover:shadow-xl transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <solution.Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.desc}</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
                  Explore →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Sectors We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { Icon: Factory, label: "Manufacturing" },
              { Icon: Heart, label: "Healthcare" },
              { Icon: Hotel, label: "Hospitality" },
              { Icon: Laptop, label: "IT & Tech" },
              { Icon: DollarSign, label: "Finance" },
              { Icon: Zap, label: "Energy" }
            ].map((sector, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3 hover:bg-white/20 transition">
                  <sector.Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-semibold">{sector.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Tax Management Enhancement", metric: "40% Cost Reduction", chart: "bar" },
              { title: "Smart Factory Implementation", metric: "60% Efficiency Gain", chart: "pie" },
              { title: "Renewable Energy Savings", metric: "50% Energy Saved", chart: "line" }
            ].map((story, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Transforming operations through strategic consulting and innovative solutions
                </p>
                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">{story.metric}</div>
                </div>
                <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                  View Case Study →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridging Continents */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Bridging Continents</h2>
            <p className="text-gray-600 mb-6">
              With offices across the globe, we bring local expertise and global perspective to every engagement
            </p>
            <div className="space-y-3">
              {[
                { location: "Tokyo, Japan", desc: "Asia Pacific Headquarters" },
                { location: "Dubai, UAE", desc: "Middle East Operations" },
                { location: "Kathmandu, Nepal", desc: "South Asia Hub" }
              ].map((office, i) => (
                <div key={i} className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">{office.location}</div>
                    <div className="text-sm text-gray-600">{office.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[400px] bg-gray-200 rounded-lg relative overflow-hidden shadow-lg">
            <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
              <rect width="800" height="400" fill="#e5e7eb"/>
              <path d="M100 150 L200 140 L250 160 L280 150 L300 170 L280 190 L250 180 L200 200 L150 190 Z" fill="#9ca3af" opacity="0.5"/>
              <path d="M350 120 L450 110 L500 130 L520 150 L500 170 L450 160 L400 180 L350 170 Z" fill="#9ca3af" opacity="0.5"/>
              <path d="M550 180 L620 170 L650 190 L640 220 L600 230 L560 210 Z" fill="#9ca3af" opacity="0.5"/>
              <path d="M200 250 L280 240 L320 260 L300 290 L250 280 L220 270 Z" fill="#9ca3af" opacity="0.5"/>
              <path d="M100 280 L150 270 L180 290 L160 310 L120 300 Z" fill="#9ca3af" opacity="0.5"/>
            </svg>
            <div className="absolute inset-0">
              <div className="absolute" style={{left: '25%', top: '35%'}}>
                <MapPin className="w-8 h-8 text-blue-600 drop-shadow-lg" />
              </div>
              <div className="absolute" style={{left: '62%', top: '42%'}}>
                <MapPin className="w-8 h-8 text-blue-600 drop-shadow-lg" />
              </div>
              <div className="absolute" style={{left: '55%', top: '48%'}}>
                <MapPin className="w-8 h-8 text-blue-600 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {[
            { title: "Why Our Bootcamp", subtitle: "Accelerate your career with industry-leading training", img: "/images/contact-bg.jpg" },
            { title: "Nepal-to-Japan Pipeline", subtitle: "Seamless recruitment and placement services", img: "/images/digital-bg.jpg" }
          ].map((card, i) => (
            <div key={i} className="relative h-[300px] rounded-lg overflow-hidden group">
              <div className="absolute inset-0" style={{
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s'
              }} className="group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-200 mb-4">{card.subtitle}</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Latest Insights</h2>
              <p className="text-gray-600 mt-2">Stay informed with our latest thinking</p>
            </div>
            <a href="/insights" className="text-blue-600 font-semibold hover:underline">
              View all Insights →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {insights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition">
                <div className="relative h-48 bg-gray-200">
                  {insight.image ? (
                    <div className="w-full h-full" style={{
                      backgroundImage: `url(${insight.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs text-blue-600 font-semibold mb-2 uppercase">{insight.type}</div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{insight.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{insight.readTime} min read</span>
                    <span>{new Date(insight.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded ${
                  currentPage === page ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                } font-semibold transition`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
