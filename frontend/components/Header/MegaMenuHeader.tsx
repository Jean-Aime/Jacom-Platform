"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/lib/data";
import { Industry, Service, Insight } from "@/lib/types";

export default function MegaMenuHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [featuredInsights, setFeaturedInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const [industriesData, servicesData, insightsData] = await Promise.all([
        DataService.getIndustries(),
        DataService.getServices(),
        DataService.getInsights()
      ]);
      setIndustries(industriesData);
      setServices(servicesData);
      setFeaturedInsights(insightsData.filter(i => i.featured).slice(0, 3));
    };
    loadData();
  }, []);

  const industriesColumns = [
    industries.slice(0, Math.ceil(industries.length / 3)),
    industries.slice(Math.ceil(industries.length / 3), Math.ceil(industries.length * 2 / 3)),
    industries.slice(Math.ceil(industries.length * 2 / 3))
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-white border-b text-xs">
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/offices" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              OFFICES ▼
            </a>
            <a href="/media" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/></svg>
              MEDIA CENTER
            </a>
            <a href="/insights" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              SUBSCRIBE
            </a>
            <a href="/contact" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              CONTACT
            </a>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/></svg>
              GLOBAL | ENGLISH ▼
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed top-0 lg:top-8 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? "shadow-2xl" : "shadow-md"
      }`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-2xl hover:text-primary transition-all hover:rotate-90 duration-300 lg:hidden"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-red-700 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  J
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-base font-bold tracking-wider bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">
                JAS.COM
              </span>
            </div>
            
            {/* Desktop Mega Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Industries Mega Menu */}
              <div
                onMouseEnter={() => setActiveDropdown("industries")}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative"
              >
                <a href="/industries" className="text-sm font-semibold hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
                  Industries ▼
                </a>
                {activeDropdown === "industries" && (
                  <div className="absolute top-full left-0 mt-4 bg-white shadow-2xl border rounded-lg w-screen max-w-6xl p-8 animate-fade-in">
                    <div className="grid grid-cols-4 gap-8">
                      <div className="col-span-3 grid grid-cols-3 gap-6">
                        {industriesColumns.map((col, i) => (
                          <div key={i} className="space-y-3">
                            {col.map((industry) => (
                              <a 
                                key={industry.id} 
                                href={`/industries/${industry.slug}`}
                                className="block text-sm text-gray-700 hover:text-primary hover:translate-x-2 transition-all duration-300"
                              >
                                → {industry.name}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="border-l pl-6">
                        <h4 className="font-semibold text-sm mb-4">Featured Insights</h4>
                        {featuredInsights.map((insight) => (
                          <a 
                            key={insight.id}
                            href={`/insights/${insight.slug}`}
                            className="block mb-3 p-2 hover:bg-gray-50 rounded transition-all"
                          >
                            <div className="text-xs font-medium text-primary">{insight.type.toUpperCase()}</div>
                            <div className="text-sm font-medium">{insight.title}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Mega Menu */}
              <div
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative"
              >
                <a href="/services" className="text-sm font-semibold hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
                  Services ▼
                </a>
                {activeDropdown === "services" && (
                  <div className="absolute top-full left-0 mt-4 bg-white shadow-2xl border rounded-lg w-screen max-w-4xl p-8 animate-fade-in">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-sm mb-4">Core Services</h4>
                        {services.map((service) => (
                          <a 
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="block mb-3 p-3 hover:bg-gray-50 rounded transition-all"
                          >
                            <div className="text-sm font-medium">{service.name}</div>
                            <div className="text-xs text-gray-600">{service.description}</div>
                          </a>
                        ))}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-4">Capabilities</h4>
                        <div className="space-y-2">
                          <a href="/digital" className="block text-sm text-gray-700 hover:text-primary transition-all">→ Digital & AI</a>
                          <a href="/innovation" className="block text-sm text-gray-700 hover:text-primary transition-all">→ Innovation</a>
                          <a href="/sustainability" className="block text-sm text-gray-700 hover:text-primary transition-all">→ Sustainability</a>
                          <a href="/operations" className="block text-sm text-gray-700 hover:text-primary transition-all">→ Operations</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="/digital" className="text-sm hover:text-primary transition-all hover:scale-105">Digital & AI</a>
              <a href="/insights" className="text-sm hover:text-primary transition-all hover:scale-105">Insights</a>
              <a href="/about" className="text-sm hover:text-primary transition-all hover:scale-105">About</a>
              <a href="/careers" className="text-sm hover:text-primary transition-all hover:scale-105">Careers</a>
              <a href="/offices" className="text-sm hover:text-primary transition-all hover:scale-105">Offices</a>
            </nav>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <a href="/search" className="text-sm hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
              Search
            </a>
            <a href="/contact" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105">
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-gradient-to-br from-white to-gray-50 z-40 overflow-y-auto pt-20 transition-all duration-500 ${
        menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}>
        <nav className="px-6 py-8">
          <ul className="space-y-6">
            {["Industries", "Services", "Digital & AI", "Insights", "About", "Careers", "Offices", "Contact"].map((item, i) => (
              <li 
                key={item}
                className="text-sm font-semibold hover:text-primary transition-all hover:translate-x-4 duration-300 cursor-pointer animate-slide-in-left"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => {
                  if (item === "About") window.location.href = "/about";
                  else if (item === "Industries") window.location.href = "/industries";
                  else if (item === "Services") window.location.href = "/services";
                  else if (item === "Digital & AI") window.location.href = "/digital";
                  else if (item === "Insights") window.location.href = "/insights";
                  else if (item === "Careers") window.location.href = "/careers";
                  else if (item === "Offices") window.location.href = "/offices";
                  else if (item === "Contact") window.location.href = "/contact";
                }}
              >
                → {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}