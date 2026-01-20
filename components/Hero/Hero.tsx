"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fadeUp, stagger, hoverScale, buttonTap } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Healthcare Private Equity Report");
  const [scrollY, setScrollY] = useState(0);
  
  const tabs = [
    "Paper & Packaging",
    "Healthcare Private Equity Report",
    "M&A Healthcare",
    "AI Executive Guide"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-br from-purple-900 via-red-900 to-black pt-20 overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-40 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
        style={{ y: scrollY * 0.5 }}
      ></motion.div>
      
      <div className="relative h-full flex flex-col justify-between">
        <motion.div 
          className="flex-1 flex items-center px-6 md:px-20"
          initial="hidden"
          animate="visible"
          variants={stagger}
          viewport={viewportConfig}
        >
          <div className="max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-light text-white leading-tight mb-4"
              variants={fadeUp}
            >
              <motion.span className="inline-block" variants={fadeUp}>Global</motion.span><br />
              <motion.span className="inline-block" variants={fadeUp}>Healthcare</motion.span><br />
              <motion.span className="inline-block" variants={fadeUp}>Private Equity</motion.span><br />
              <motion.span className="inline-block" variants={fadeUp}>Report 2026</motion.span>
            </motion.h1>
            <motion.button 
              className="mt-8 text-white text-sm flex items-center gap-2 group hover:gap-4 transition-all duration-300"
              variants={fadeUp}
              {...buttonTap}
            >
              EXPLORE <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="glass-effect"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex overflow-x-auto px-6 md:px-20">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? "text-white border-b-2 border-primary"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
