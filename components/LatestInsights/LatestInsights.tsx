"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, hoverScale, buttonTap } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";
import Image from "next/image";

export default function LatestInsights() {
  const insights = [
    {
      title: "Five of the Most Insightful Podcast Episodes On AI",
      description: "A curated series what leaders across many about agentic systems, how with them, and becoming a critical AI moment in 2025.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    {
      title: "Reimagining Merchandising in the Era of Agentic AI",
      description: "The future of merchandising is not simply AI, but rather, agentic automation—and agents for AI that makes retail possible.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={viewportConfig}
      >
        <motion.h2 className="text-3xl md:text-4xl font-light mb-12 text-center" variants={fadeUp}>
          Our Latest Insights
        </motion.h2>

        <motion.div className="grid md:grid-cols-2 gap-8 mb-8" variants={stagger}>
          {insights.map((insight, i) => (
            <motion.a 
              key={i} 
              href="/insights"
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer block"
              variants={fadeUp}
              {...hoverScale}
            >
              <div className="relative h-64 overflow-hidden">
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              loading="lazy"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500"></div>
              </div>
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-light mb-3 group-hover:text-primary transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {insight.title}
                </motion.h3>
                <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                <motion.span 
                  className="text-primary text-sm font-semibold inline-flex items-center gap-2 group"
                  whileHover={{ x: 4 }}
                >
                  Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </motion.span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div className="text-center" variants={fadeUp}>
          <motion.a 
            href="/insights"
            className="border-2 border-primary text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
            {...buttonTap}
          >
            SEE ALL INSIGHTS
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
