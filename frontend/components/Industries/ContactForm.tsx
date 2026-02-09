"use client";
import { useState } from "react";

export default function ContactForm() {
  const [industry, setIndustry] = useState("");

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-12 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-light mb-6">Ready to talk?</h2>
              <p className="text-sm text-gray-600 mb-8">
                I want to talk to your experts in:
              </p>
              
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select an industry</option>
                <option value="manufacturing">Advanced Manufacturing & Services</option>
                <option value="aerospace">Aerospace, Defense & Government</option>
                <option value="agribusiness">Agribusiness</option>
                <option value="automotive">Automotive & Mobility</option>
                <option value="chemicals">Chemicals</option>
                <option value="consumer">Consumer Products</option>
                <option value="energy">Energy & Natural Resources</option>
                <option value="financial">Financial Services</option>
                <option value="healthcare">Healthcare and Life Sciences</option>
                <option value="technology">Technology</option>
              </select>
              
              <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg">
                CONTACT US
              </button>
            </div>
            
            <div className="flex items-center">
              <p className="text-gray-700 leading-relaxed">
                We work with ambitious leaders who want to define the future, not hide from it. Together, we achieve extraordinary outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
