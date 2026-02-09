"use client";
import { useState, useEffect } from "react";

export default function StatsSection() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCount1(prev => prev < 4000 ? prev + 100 : 4000);
    }, 20);
    const timer2 = setInterval(() => {
      setCount2(prev => prev < 1000 ? prev + 25 : 1000);
    }, 20);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-semibold text-gray-600 mb-8">Our Experience</h2>
        
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="text-5xl font-light text-primary mb-2">{count1.toLocaleString()}+</div>
            <p className="text-sm text-gray-600">Social impact hours donated on social impact cases since 2000</p>
          </div>
          <div>
            <div className="text-5xl font-light text-primary mb-2">{count2.toLocaleString()}+</div>
            <p className="text-sm text-gray-600">Pro bono cases since 2015</p>
          </div>
          <div>
            <div className="text-5xl font-light text-primary mb-2">$2B</div>
            <p className="text-sm text-gray-600">Invested in diversity and scale transformation initiatives since 2020</p>
          </div>
        </div>

        <div className="max-w-4xl">
          <p className="text-gray-700 leading-relaxed mb-6">
            Our mission is to partner with the most innovative and high-impact organizations to address the world's most urgent challenges. We bring the same analytical rigor, operational efficiency, and drive systemic change. Through our experience with nonprofits, social enterprises, nonprofits, and public private coalitions, we strive to have a lasting impact on the communities and causes we serve.
          </p>
        </div>
      </div>
    </section>
  );
}
