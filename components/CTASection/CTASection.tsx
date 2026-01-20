"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, buttonTap } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";

export default function CTASection() {
  return (
    <section className="bg-primary py-20 px-6 md:px-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <motion.div 
        className="relative grid md:grid-cols-2 gap-12 text-white max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={viewportConfig}
      >
        <motion.div 
          className="text-center md:text-left transform hover:scale-105 transition-transform duration-300"
          variants={fadeUp}
        >
          <motion.h3 className="text-2xl md:text-3xl font-light mb-6" variants={fadeUp}>
            What can we help you achieve?
          </motion.h3>
          <motion.button 
            className="border-2 border-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            {...buttonTap}
          >
            LET'S GET STARTED
          </motion.button>
        </motion.div>

        <motion.div 
          className="text-center md:text-left transform hover:scale-105 transition-transform duration-300"
          variants={fadeUp}
        >
          <motion.h3 className="text-2xl md:text-3xl font-light mb-6" variants={fadeUp}>
            Where will your career take you?
          </motion.h3>
          <motion.button 
            className="border-2 border-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            {...buttonTap}
          >
            COME WORK HERE
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
