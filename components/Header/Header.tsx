"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const industries = [
    ["Aerospace & Defense", "Agribusiness", "Chemicals", "Construction & Infrastructure", "Consumer Products", "Financial Services"],
    ["Healthcare & Life Sciences", "Industrial Machinery & Equipment", "Media & Entertainment", "Metals", "Mining"],
    ["Oil & Gas", "Paper & Packaging", "Private Equity", "Social Impact", "Retail"],
    ["Technology", "Telecommunications", "Transportation", "Travel & Leisure", "Utilities & Renewables"]
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-white border-b text-xs">
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              OFFICES ▼
            </button>
            <a href="#" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>
              ALUMNI
            </a>
            <a href="#" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/></svg>
              MEDIA CENTER
            </a>
            <a href="#" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              SUBSCRIBE
            </a>
            <a href="#" className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              CONTACT
            </a>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/></svg>
              GLOBAL | ENGLISH ▼
            </button>
            <button className="hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
              SAVED ITEMS ▼
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
              className="text-2xl hover:text-primary transition-all hover:rotate-90 duration-300"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-red-700 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  T
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-base font-bold tracking-wider bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">
                TEMPLETE
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <div
                onMouseEnter={() => setActiveDropdown("industries")}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative"
              >
                <a href="/industries" className="text-sm font-semibold hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
                  Industries ▲
                </a>
                {activeDropdown === "industries" && (
                  <div className="absolute top-full left-0 mt-4 bg-white shadow-2xl border rounded-lg w-screen max-w-5xl p-8 grid grid-cols-4 gap-8 animate-fade-in">
                    {industries.map((col, i) => (
                      <div key={i} className="space-y-3">
                        {col.map((item) => (
                          <a 
                            key={item} 
                            href={item === "Social Impact" ? "/social-impact" : "/industries"} 
                            className="block text-sm text-gray-700 hover:text-primary hover:translate-x-2 transition-all duration-300"
                          >
                            → {item}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="text-sm hover:text-primary transition-all hover:scale-105">Consulting Services ▼</button>
              <a href="#" className="text-sm hover:text-primary transition-all hover:scale-105">Digital</a>
              <button className="text-sm hover:text-primary transition-all hover:scale-105">Insights ▼</button>
              <a href="/about" className="text-sm hover:text-primary transition-all hover:scale-105">About</a>
              <a href="#" className="text-sm hover:text-primary transition-all hover:scale-105">Careers</a>
            </nav>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <button className="text-sm hover:text-primary transition-all hover:scale-105 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
              Explore
            </button>
            <button className="text-xl hover:text-primary transition-all hover:scale-125 hover:rotate-12">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
            </button>
            <button className="text-xl hover:text-primary transition-all hover:scale-125">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-gradient-to-br from-white to-gray-50 z-40 overflow-y-auto pt-20 transition-all duration-500 ${
        menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}>
        <nav className="px-6 py-8">
          <ul className="space-y-6">
            {["Industries", "Consulting Services ▼", "Digital", "Insights ▼", "About", "Careers"].map((item, i) => (
              <li 
                key={item}
                className="text-sm font-semibold hover:text-primary transition-all hover:translate-x-4 duration-300 cursor-pointer animate-slide-in-left"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => {
                  if (item === "About") window.location.href = "/about";
                  if (item === "Industries") window.location.href = "/industries";
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
