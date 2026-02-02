"use client";
import { useState } from "react";

export default function Hero({ content }: { content: any }) {
  const title = content?.home_hero_title || 'Global Healthcare Private Equity Report 2026';
  const tabs = content?.home_hero_tabs || ['Paper & Packaging', 'Healthcare Private Equity Report', 'M&A Healthcare', 'AI Executive Guide'];
  const bgImage = content?.home_hero_bg || '/images/hero-bg.jpg';
  const [activeTab, setActiveTab] = useState(tabs[1]);

  const titleLines = title.split(' ');

  return (
    <section className="relative h-screen bg-gradient-to-br from-purple-900 via-red-900 to-black pt-20 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center px-6 md:px-20 animate-fade-in">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4">
              {titleLines.map((line, i) => (
                <span key={i} className="inline-block animate-slide-in-left" style={{animationDelay: `${i * 0.1}s`}}>{line}<br /></span>
              ))}
            </h1>
            <button className="mt-8 text-white text-sm flex items-center gap-2 group hover:gap-4 transition-all duration-300">
              EXPLORE <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        <div className="glass-effect animate-slide-in-up">
          <div className="flex overflow-x-auto px-6 md:px-20">
            {tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                  activeTab === tab ? "text-white border-b-2 border-primary" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
