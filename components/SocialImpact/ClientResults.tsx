"use client";
import { useState } from "react";

export default function ClientResults() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const results = [
    {
      title: "Sea Change: A Bold Partnership to Advance Sustainable Fishing",
      desc: "We played a key behind-the-scenes role in ambitious plans to transform the fishing industry worldwide.",
      image: "from-blue-600 to-teal-600"
    },
    {
      title: "Helping Career Connect Washington enroll and inspire 15,000 students",
      desc: "Learn how we helped Washington State accelerate its goals around career-connected learning for students.",
      image: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-12 text-center">Client Results</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
          <div className={`h-96 bg-gradient-to-br ${results[activeSlide].image} rounded-lg`}></div>
          
          <div>
            <h3 className="text-2xl font-light mb-4">{results[activeSlide].title}</h3>
            <p className="text-gray-700 mb-6">{results[activeSlide].desc}</p>
            <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105">
              READ MORE
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {results.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSlide === i ? "bg-primary w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="text-center">
          <button className="text-primary font-semibold text-sm border-b-2 border-primary hover:scale-105 transition-transform">
            SEE MORE →
          </button>
        </div>
      </div>
    </section>
  );
}
