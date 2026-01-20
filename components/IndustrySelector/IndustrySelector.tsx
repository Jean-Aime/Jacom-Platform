"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, hoverScale } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";
import Image from "next/image";

export default function IndustrySelector() {
  const industries = [
    "Retail", "Private Equity", "Advanced Manufacturing & Services",
    "Technology", "Oil & Gas", "Healthcare & Life Sciences",
    "Chemicals", "Consumer Products", "Mining", "Financial Services"
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <motion.div 
        className="grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={viewportConfig}
      >
        <motion.div 
          className="relative h-96 rounded-lg shadow-xl overflow-hidden"
          variants={fadeUp}
          {...hoverScale}
        >
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
            alt="Business team collaboration"
            fill
            className="object-cover"
          />
        </motion.div>
        
        <motion.div className="space-y-6" variants={stagger}>
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-6"
            variants={fadeUp}
          >
            We champion the bold to achieve the extraordinary.
          </motion.h2>
          <motion.p className="text-gray-600 mb-6" variants={fadeUp}>
            Around two questions we help our clients win: one on your challenges.
          </motion.p>
          
          <motion.div className="mb-4" variants={fadeUp}>
            <label className="block text-sm font-semibold mb-2">
              What is your industry? <span className="text-primary">*</span>
            </label>
            <select className="w-full border border-gray-300 px-4 py-3 rounded hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Select one</option>
            </select>
          </motion.div>

          <motion.div className="flex flex-wrap gap-2 mb-4" variants={stagger}>
            {industries.map((industry) => (
              <motion.span
                key={industry}
                className="px-4 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                variants={fadeUp}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {industry}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.a 
            href="#" 
            className="text-primary text-sm font-semibold inline-flex items-center gap-2 group"
            variants={fadeUp}
            whileHover={{ x: 4 }}
          >
            See all <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
