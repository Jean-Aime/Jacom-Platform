import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { CheckCircle } from "lucide-react";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-sm text-gray-600 mb-4 uppercase tracking-wide">WELCOME TO JACOM CONSULTING SOLUTIONS</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Comprehensive Solutions for Every <span className="text-blue-600">Business Challenge</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Driving global transformation through strategic consulting, technical innovation, and financial expertise. We bridge the gap between vision and execution.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition">
                Get Started Now
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded font-medium transition">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">SERVICES</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Consulting Solutions</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Strategic guidance to shape sustainable and scalable organizational growth.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Strategy & Planning",
                items: ["Corporate strategy development", "Business model innovation", "Market entry strategy"]
              },
              {
                icon: "💼",
                title: "Business IT Consulting",
                items: ["IT strategy & roadmap", "Digital transformation planning", "Technology assessment & selection"]
              },
              {
                icon: "💡",
                title: "Innovation & Digital Transformation",
                items: ["Digital transformation strategy", "Innovation workshops & ideation", "Technology adoption planning"]
              },
              {
                icon: "📋",
                title: "Investment Policy & Advisory",
                items: ["Investment strategy development", "Due diligence & feasibility studies", "Portfolio analysis & optimization"]
              },
              {
                icon: "🎯",
                title: "Program Management",
                items: ["Program planning & setup", "Stakeholder management", "Risk & issue management"]
              },
              {
                icon: "👔",
                title: "Leadership & Corporate Governance",
                items: ["Leadership development programs", "Board effectiveness reviews", "Governance framework design"]
              }
            ].map((service, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">SPECIAL TECH</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Technical Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                {
                  icon: "🔗",
                  title: "IoT Platform & Integration",
                  desc: "Turn all devices into social infrastructure. Our IoT platform solutions enable seamless connectivity."
                },
                {
                  icon: "🏭",
                  title: "Smart Factory Solutions",
                  desc: "Transform manufacturing operations with Industry 4.0 technologies and operational excellence."
                },
                {
                  icon: "⚡",
                  title: "Renewable Energy Systems",
                  desc: "Design and implement sustainable energy solutions for solar, wind, and EV charging infrastructure."
                },
                {
                  icon: "🔐",
                  title: "Security & Access Control",
                  desc: "Protect your physical and digital assets with comprehensive security management platforms."
                }
              ].map((tech, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{tech.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{tech.title}</h3>
                    <p className="text-sm text-gray-600">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/images/hero-bg.jpg" 
                alt="Smart Factory" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-blue-600 text-white px-6 py-3 rounded font-bold text-lg">
                15+ <span className="font-normal">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Solutions */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">Financial Solutions</h2>
          <p className="text-gray-300 mb-10 max-w-2xl">
            Providing a variety of our growth engine for intellectual and accurate capital through consulting, risk modeling, and banking services.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "💰",
                title: "Financial Advisory",
                desc: "Navigate complex financial decisions with strategic guidance on capital structure and funding."
              },
              {
                icon: "📊",
                title: "Risk Management",
                desc: "Identify, assess, and mitigate business risks across credit, market, and operational domains."
              },
              {
                icon: "💼",
                title: "Asset Management",
                desc: "Maximize the value of your assets through optimization and lifecycle management strategies."
              },
              {
                icon: "✅",
                title: "Compliance",
                desc: "Navigate regulatory complexity with confidence through comprehensive compliance frameworks."
              }
            ].map((financial, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition">
                <div className="text-3xl mb-3">{financial.icon}</div>
                <h3 className="font-bold mb-2">{financial.title}</h3>
                <p className="text-sm text-gray-300">{financial.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Global Network</h2>
          <p className="text-gray-600 mb-10">Serving clients across 3 global offices</p>
          
          <div className="grid md:grid-cols-3 gap-6">
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
              <div key={i} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="h-48 bg-gray-200">
                  <img src={office.img} alt={office.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{office.title}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">{office.subtitle}</p>
                  <p className="text-sm text-gray-600">{office.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Proven Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Proven Methodology</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "1",
                title: "Discovery",
                desc: "Understand business challenges, assess current state, and identify opportunities."
              },
              {
                num: "2",
                title: "Strategy",
                desc: "Develop solution strategy, design implementation approach, and create detailed roadmap."
              },
              {
                num: "3",
                title: "Implementation",
                desc: "Execute planned activities, manage resources & timeline, and monitor progress."
              },
              {
                num: "4",
                title: "Monitoring",
                desc: "Track performance metrics, gather feedback, and optimize continuously."
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose JACOM Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Choose JACOM Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                {
                  icon: "✓",
                  title: "Integrated Approach",
                  desc: "We don't just consult - we implement. Our team combines strategic thinking with technical execution."
                },
                {
                  icon: "✓",
                  title: "Proven Track Record",
                  desc: "3+ years of excellence, 50+ successful projects, 95% client satisfaction across all engagements."
                },
                {
                  icon: "✓",
                  title: "Global Perspective",
                  desc: "With offices in Asia and Africa, we understand both developed and developing markets."
                }
              ].map((why, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {why.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{why.title}</h3>
                    <p className="text-sm text-gray-600">{why.desc}</p>
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
                <div key={i} className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join hundreds of global enterprises that trust JACOM for their consulting, technology, and financial advisory needs.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
              Book a Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-blue-600 transition">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
