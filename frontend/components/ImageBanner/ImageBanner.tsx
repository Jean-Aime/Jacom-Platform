"use client";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function ImageBanner({ content }: { content: any }) {
  const image = content?.banner_image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop';
  const title = content?.banner_title || 'JACOM Platform';
  const subtitle = content?.banner_subtitle || 'New IoT E-commerce Platform for Product and Services - Special Electromechanical System Integration Service';
  
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="relative w-full h-[500px] md:h-[600px] overflow-hidden animate-on-scroll">
      <Image
        src={image}
        alt={title || "Banner"}
        fill
        className="object-cover"
        sizes="100vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in-up">{title}</h2>
        <p className="text-lg md:text-xl text-center max-w-3xl animate-fade-in-up animation-delay-200">{subtitle}</p>
      </div>
    </section>
  );
}
