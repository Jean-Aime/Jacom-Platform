"use client";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function VideoSection({ content }: { content: any }) {
  const bubbleText = content?.video_bubble_text || "What 'no regret' actions should CEOs take to win with generative AI";
  const personName = content?.video_person_name || 'Chuck Whitten, Global Head of Bain Digital';
  const videoTitle = content?.video_title || 'How executives can win with AI';
  const videoLink = content?.video_link_text || 'HEAR HOW WE\'RE HELPING TOP COMPANIES ACROSS INDUSTRIES';
  const videoImage = content?.video_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';

  const ref = useScrollAnimation();

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto animate-on-scroll">
        <div className="bg-gray-900 p-12 rounded relative">
          <div className="absolute top-8 left-8 bg-white px-4 py-3 rounded-lg text-sm max-w-xs">
            <span className="text-gray-600">💬</span>
            <p className="mt-2 text-gray-800">
              {bubbleText}
            </p>
          </div>
        </div>

        <div className="relative bg-gray-200 h-96 rounded flex items-center justify-center overflow-hidden group">
          <Image
            src={videoImage}
            alt="Executive video"
            fill
            loading="lazy"
            className="object-cover image-reveal"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
          <button className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-scale hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50">
            <span className="text-primary text-2xl ml-1">▶</span>
          </button>
          
          <div className="absolute bottom-8 left-8 right-8 text-white z-10">
            <p className="text-xs mb-2">{personName}</p>
            <h3 className="text-2xl font-semibold mb-4">{videoTitle}</h3>
            <a href="#" className="text-sm underline hover:translate-x-1 inline-block transition-transform cursor-scale focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
              {videoLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
