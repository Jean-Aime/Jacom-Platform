"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, hoverScale } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";
import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <motion.div 
        className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={viewportConfig}
      >
        <motion.div className="bg-gray-900 p-12 rounded relative" variants={fadeUp}>
          <motion.div 
            className="absolute top-8 left-8 bg-white px-4 py-3 rounded-lg text-sm max-w-xs"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-600">💬</span>
            <p className="mt-2 text-gray-800">
              What 'no regret' actions should CEOs take to win with generative AI
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative bg-gray-200 h-96 rounded flex items-center justify-center overflow-hidden"
          variants={fadeUp}
          {...hoverScale}
        >
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
            alt="Executive video"
            fill
            className="object-cover"
          />
          <motion.button 
            className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-primary text-2xl ml-1">▶</span>
          </motion.button>
          
          <motion.div 
            className="absolute bottom-8 left-8 right-8 text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs mb-2">Chuck Whitten, Global Head of Bain Digital</p>
            <h3 className="text-2xl font-light mb-4">
              How executives can win with AI
            </h3>
            <motion.a 
              href="#" 
              className="text-sm underline"
              whileHover={{ x: 4 }}
            >
              HEAR HOW WE'RE HELPING TOP COMPANIES ACROSS INDUSTRIES
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
