import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

async function getSolutions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/solutions`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getOffices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/offices`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function SolutionsPage() {
  const solutions = await getSolutions();
  const offices = await getOffices();
  const featured = solutions.filter((s: any) => s.featured);
  const regular = solutions.filter((s: any) => !s.featured);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Business Solutions" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <p className="text-xs text-red-200 mb-3 uppercase tracking-widest font-medium animate-fade-in-up">WELCOME TO JACOM CONSULTING SOLUTIONS</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in-up animation-delay-300">
              Comprehensive Solutions for Every <span className="text-red-100">Business Challenge</span>
            </h1>
            <p className="text-sm sm:text-base text-red-100 mb-6 sm:mb-8 leading-relaxed animate-fade-in-up animation-delay-600">
              Driving global transformation through strategic consulting, technical innovation, and financial expertise. We bridge the gap between vision and execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-900">
              <a href="/contact" className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium text-sm transition shadow-lg">
                Get Started Now
              </a>
              <button className="border-2 border-white hover:bg-white hover:text-primary text-white px-6 py-3 rounded-md font-medium text-sm transition">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Solutions */}
      <section className="py-12 sm:py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-medium">SERVICES</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Consulting Solutions</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Strategic guidance to shape sustainable and scalable organizational growth.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((solution: any) => (
              <a key={solution.id} href={`/solutions/${solution.slug}`} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-primary transition">{solution.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{solution.description}</p>
                {solution.featured && (
                  <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded mb-3">Featured</span>
                )}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex gap-3 text-gray-500">
                    <span>{solution.industryIds?.length || 0} Industries</span>
                    <span>{solution.serviceIds?.length || 0} Services</span>
                  </div>
                  <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">Learn More →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-medium">SPECIAL TECH</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-12">Technical Solutions</h2>
              
              <div className="space-y-8">
                {regular.slice(0, 4).map((solution: any) => (
                  <a key={solution.id} href={`/solutions/${solution.slug}`} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition">{solution.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{solution.description}</p>
                      <span className="text-xs text-primary font-medium group-hover:underline">Learn More →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden h-full min-h-[500px] bg-gray-50 flex items-center justify-center">
              <video 
                src="/tech-company.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-contain mix-blend-multiply"
              />
              <div className="absolute bottom-8 left-8 bg-primary text-white px-6 py-4 rounded-lg shadow-lg">
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
          <h2 className="text-3xl font-bold mb-3 text-center">Financial Solutions</h2>
          <p className="text-gray-300 mb-12 max-w-3xl mx-auto text-center">
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
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-red-400">
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
          <p className="text-gray-600 mb-12">Serving clients across {offices.length} global offices</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offices.slice(0, 3).map((office: any) => (
              <div key={office.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-56 bg-gray-200 overflow-hidden">
                  <img src={office.image || '/images/about-bg.jpg'} alt={office.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-xl mb-1">{office.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{office.region || 'Global Office'}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{office.description}</p>
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
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
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
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm mt-1">
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
                <div key={i} className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-bold text-primary mb-3">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-red-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-red-100 text-lg mb-10 leading-relaxed">
            Join hundreds of global enterprises that trust JACOM for their consulting, technology, and financial advisory needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-base">
              Book a Consultation
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition text-base">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

