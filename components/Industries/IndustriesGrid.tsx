"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";

export default function IndustriesGrid() {
  const industries = [
    { title: "Advanced Manufacturing & Services", desc: "We are focused on helping our industrial clients, across all sectors, mobilize their organizations to capture growth and enhance productivity.", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop" },
    { title: "Aerospace, Defense & Government Services", desc: "Bain has helped clients navigate to more than 100 different subsectors of the aerospace, defense and government services industries.", image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop" },
    { title: "Agribusiness", desc: "From agriculture centers to distribution enabled grocery game changers, again, a differentiated point of view on agricultural trends.", image: "https://images.unsplash.com/photo-1488459716781-6f3ee1e28e54?w=600&h=400&fit=crop" },
    { title: "Aviation", desc: "Our aviation and airport consulting expertise can help you navigate the complexity in your operations, commercial strategy and talent needs.", image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop" },
    { title: "Automotive & Mobility", desc: "We help our automotive clients transform their businesses and operating models to compete through improved cost positions.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" },
    { title: "Chemicals", desc: "We work closely alongside leading players in the chemicals industry, helping them drive returns and value transformation.", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop" }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={viewportConfig}
      >
        <motion.h2 className="text-3xl font-light mb-12" variants={fadeUp}>Explore Our Expertise</motion.h2>
        
        <motion.div className="grid md:grid-cols-3 gap-8" variants={stagger}>
          {industries.map((industry, i) => (
            <motion.div 
              key={i} 
              className="group cursor-pointer border-b hover:bg-gray-50 transition-all duration-300 pb-6"
              variants={fadeUp}
            >
              <div className="relative h-40 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-semibold mb-3 flex items-center justify-between group-hover:text-primary transition-colors">
                {industry.title}
                <svg className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{industry.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
