import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pt-32 pb-56 min-h-[580px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs text-blue-200 mb-3 uppercase tracking-widest font-medium">WELCOME TO JACOM CONSULTING SOLUTIONS</p>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Comprehensive Solutions for Every <span className="text-blue-100">Business Challenge</span>
            </h1>
            <p className="text-blue-100 text-base mb-8 leading-relaxed">
              Driving global transformation through strategic consulting, technical innovation, and financial expertise. We bridge the gap between vision and execution.
            </p>
            <div className="flex gap-4">
              <a href="/contact" className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-md font-medium text-sm transition shadow-lg">
                Get Started Now
              </a>
              <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-md font-medium text-sm transition">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-medium">SERVICES</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Consulting Solutions</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Strategic guidance to shape sustainable and scalable organizational growth.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Strategy & Planning",
                items: ["Corporate strategy development", "Business model innovation", "Operational efficiency assessment"]
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Business IT Consulting",
                items: ["IT strategy & roadmap", "Digital transformation planning", "Technology assessment & selection"]
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Innovation & Digital Transformation",
                items: ["Digital transformation strategy", "Innovation workshops & ideation", "Technology adoption planning"]
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Investment Policy & Advisory",
                items: ["Policy analysis and design", "Investment strategy development", "Due diligence & feasibility studies"]
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
                title: "Program Management",
                items: ["Program planning & setup", "Stakeholder management", "Risk & issue management"]
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Leadership & Corporate Governance",
                items: ["Leadership development programs", "Board effectiveness reviews", "Governance framework design"]
              }
            ].map((service, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">{service.title}</h3>
                <ul className="space-y-2.5">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-medium">SPECIAL TECH</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Technical Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "IoT Platform & Integration",
                  desc: "Turn all devices into social infrastructure. Our IoT platform solutions enable seamless connectivity and data exchange across your ecosystem."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                  title: "Smart Factory Solutions",
                  desc: "Transform manufacturing operations with Industry 4.0 technologies, automation systems, and real-time operational intelligence."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Renewable Energy Systems",
                  desc: "Design and implement sustainable energy solutions including solar, wind, and EV charging infrastructure for a greener future."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: "Security & Access Control",
                  desc: "Protect your physical and digital assets with comprehensive security management platforms and access control systems."
                }
              ].map((tech, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{tech.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-xl h-full min-h-[500px]">
              <img 
                src="/images/hero-bg.jpg" 
                alt="Smart Factory" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-8 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm font-medium">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Solutions */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">Financial Solutions</h2>
          <p className="text-gray-300 mb-12 max-w-3xl">
            Providing a variety of our growth engine for intellectual and accurate capital through consulting, risk modeling, and banking services.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Financial Advisory",
                desc: "Navigate complex financial decisions with strategic guidance on capital structure, funding strategies, and financial planning."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Risk Management",
                desc: "Identify, assess, and mitigate business risks across credit, market, operational, and strategic domains with proven frameworks."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Asset Management",
                desc: "Maximize the value of your assets through strategic portfolio optimization, lifecycle management, and performance tracking."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Compliance",
                desc: "Navigate regulatory complexity with confidence through comprehensive compliance frameworks and audit readiness programs."
              }
            ].map((financial, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  {financial.icon}
                </div>
                <h3 className="font-bold mb-3 text-lg">{financial.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{financial.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Global Network</h2>
          <p className="text-gray-600 mb-12">Serving clients across 3 global offices</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/about-bg.jpg",
                title: "Tokyo, Japan",
                subtitle: "Headquarters & Asia Pacific",
                desc: "Our hub for advanced manufacturing & automation, renewable energy systems, and IoT platform development."
              },
              {
                img: "/images/contact-bg.jpg",
                title: "Addis Ababa, Ethiopia",
                subtitle: "Africa Regional Hub",
                desc: "Driving economic development, infrastructure projects, and community development across Africa."
              },
              {
                img: "/images/digital-bg.jpg",
                title: "Kathmandu, Nepal",
                subtitle: "Asia Recruitment Center",
                desc: "Implementing recruitment services, pre-departure training, and skills development programs."
              }
            ].map((office, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-56 bg-gray-200 overflow-hidden">
                  <img src={office.img} alt={office.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-xl mb-1">{office.title}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-3">{office.subtitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{office.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Proven Methodology */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our Proven Methodology</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "1",
                title: "Discovery",
                desc: "Understand business challenges, assess current state, identify opportunities, and define success criteria."
              },
              {
                num: "2",
                title: "Strategy",
                desc: "Develop solution strategy, design implementation approach, create detailed roadmap, and align stakeholders."
              },
              {
                num: "3",
                title: "Implementation",
                desc: "Execute planned activities, manage resources & timeline, monitor progress, and ensure quality delivery."
              },
              {
                num: "4",
                title: "Monitoring",
                desc: "Track performance metrics, gather feedback, optimize continuously, and drive sustainable improvement."
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose JACOM Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose JACOM Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[
                {
                  title: "Integrated Approach",
                  desc: "We don't just consult - we implement. Our team combines strategic thinking with hands-on technical execution and financial expertise."
                },
                {
                  title: "Proven Track Record",
                  desc: "3+ years of excellence delivering transformative solutions. Our portfolio spans consulting, technology implementation, and financial advisory."
                },
                {
                  title: "Global Perspective",
                  desc: "With offices in Asia and Africa, we bring deep understanding of both developed and emerging markets to every engagement."
                }
              ].map((why, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{why.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{why.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "500+", label: "Projects Completed" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "20+", label: "Industry Experts" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-bold text-blue-600 mb-3">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            Join hundreds of global enterprises that trust JACOM for their consulting, technology, and financial advisory needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-base">
              Book a Consultation
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-base">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
