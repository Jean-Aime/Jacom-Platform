"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fadeUp, stagger, hoverScale, buttonTap } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";
import Image from "next/image";

export default function FeaturedStories() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCount1(prev => prev < 500 ? prev + 10 : 500);
    }, 20);
    const timer2 = setInterval(() => {
      setCount2(prev => prev < 7 ? prev + 1 : 7);
    }, 100);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={viewportConfig}
      >
        <motion.h2 className="text-3xl md:text-4xl font-light mb-2" variants={fadeUp}>Bold steps forward.</motion.h2>
        <motion.p className="text-sm text-gray-600 mb-12" variants={fadeUp}>Featured client success story</motion.p>

        <motion.div className="grid md:grid-cols-2 gap-12 items-center" variants={stagger}>
          <motion.div className="space-y-6" variants={stagger}>
            <motion.h3 className="text-2xl font-light mb-4 hover:text-primary transition-colors cursor-pointer" variants={fadeUp}>
              Banca Investis Transforms Customer Dialogue with a Generative AI Engine
            </motion.h3>
            <motion.p className="text-sm text-gray-600 mb-6" variants={fadeUp}>The impact</motion.p>
            
            <motion.div className="grid grid-cols-2 gap-6 mb-6" variants={stagger}>
              <motion.div 
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
                variants={fadeUp}
                {...hoverScale}
              >
                <div className="text-4xl font-light mb-2 text-primary">{count1}+</div>
                <p className="text-sm text-gray-600">internal employees using the tool</p>
              </motion.div>
              <motion.div 
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
                variants={fadeUp}
                {...hoverScale}
              >
                <div className="text-4xl font-light mb-2 text-primary">{count2}</div>
                <p className="text-sm text-gray-600">months from ideation to launch</p>
              </motion.div>
            </motion.div>

            <motion.a 
              href="#" 
              className="text-primary font-semibold text-sm inline-flex items-center gap-2 group"
              variants={fadeUp}
              whileHover={{ x: 4 }}
            >
              Read story <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          <motion.div 
            className="relative h-96 rounded-lg shadow-2xl overflow-hidden group"
            variants={fadeUp}
            {...hoverScale}
          >
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
              alt="Banca Investis"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-light tracking-widest">
              M BANCA INVESTIS
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="flex justify-center gap-2 mt-8" variants={stagger}>
          {[0, 1, 2, 3].map((i) => (
            <motion.button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSlide === i ? "bg-primary w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        <motion.div className="text-center mt-8" variants={fadeUp}>
          <motion.button 
            className="border-2 border-primary text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            {...buttonTap}
          >
            SEE ALL CLIENT RESULTS
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
