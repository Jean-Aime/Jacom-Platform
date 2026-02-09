"use client";
import { useState } from "react";
import Image from "next/image";

export default function FeaturedStories({ content }: { content: any }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const title = content?.stories_title || 'Bold steps forward.';
  const subtitle = content?.stories_subtitle || 'Featured client success story';
  const storyTitle = content?.story_title || 'Banca Investis Transforms Customer Dialogue with a Generative AI Engine';
  const impactLabel = content?.story_impact_label || 'The impact';
  const stat1Value = content?.story_stat1_value || '500+';
  const stat1Text = content?.story_stat1_text || 'internal employees using the tool';
  const stat2Value = content?.story_stat2_value || '7';
  const stat2Text = content?.story_stat2_text || 'months from ideation to launch';
  const storyImage = content?.story_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
  const storyLogo = content?.story_logo || 'M BANCA INVESTIS';
  const buttonText = content?.stories_button || 'SEE ALL CLIENT RESULTS';

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-light mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-12">{subtitle}</p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-light mb-4 hover:text-primary transition-colors cursor-pointer">
              {storyTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-6">{impactLabel}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl font-light mb-2 text-primary">{stat1Value}</div>
                <p className="text-sm text-gray-600">{stat1Text}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl font-light mb-2 text-primary">{stat2Value}</div>
                <p className="text-sm text-gray-600">{stat2Text}</p>
              </div>
            </div>

            <a href="#" className="text-primary font-semibold text-sm inline-flex items-center gap-2 group">
              Read story <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="relative h-96 rounded-lg shadow-2xl overflow-hidden group hover-scale">
            <Image
              src={storyImage}
              alt={storyTitle}
              fill
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-light tracking-widest">
              {storyLogo}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2 h-2 rounded-full transition-all hover:scale-125 active:scale-90 ${
                activeSlide === i ? "bg-primary w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="border-2 border-primary text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
