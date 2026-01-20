"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger, hoverScale } from "@/motion/presets";
import { viewportConfig } from "@/motion/viewport";

export default function ExpertiseGrid() {
  const expertise = [
    {
      title: "Climate & Energy Transition",
      desc: "Accelerate the energy transition and avoid climate tipping points through sustainable and scalable solutions.",
      image: "https://images.unsplash.com/photo-1497435334941-0fa4dd4a9537?w=600&h=400&fit=crop"
    },
    {
      title: "Food Systems & Nature",
      desc: "Transform food systems, end hunger, and restore nature through innovative approaches and partnerships.",
      image: "https://images.unsplash.com/photo-1488459716781-6f3ee1e28e54?w=600&h=400&fit=crop"
    },
    {
      title: "Education",
      desc: "We empower education leaders to improve outcomes and create equitable access for every student.",
      image: "https://images.unsplash.com/photo-1427504494785-cdba58dadff0?w=600&h=400&fit=crop"
    },
    {
      title: "Racial Equity & Social Justice",
      desc: "Address structural racism and other systemic barriers to opportunity.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    {
      title: "Economic Development",
      desc: "We advise economic opportunity leaders and build the capacity of organizations to drive inclusive growth.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    }
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
        <motion.h2 className="text-3xl font-light mb-6 text-center" variants={fadeUp}>Social Impact Expertise</motion.h2>
        <motion.p className="text-center text-gray-600 mb-12" variants={fadeUp}>
          We're proud to partner with organizations across the social sector, working hand-in-hand to help address the world's most urgent social issues.
        </motion.p>
        
        <motion.div className="grid md:grid-cols-3 gap-8" variants={stagger}>
          {expertise.map((item, i) => (
            <motion.div key={i} className="group cursor-pointer" variants={fadeUp}>
              <div className="relative h-48 rounded-lg mb-4 overflow-hidden" {...hoverScale}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
