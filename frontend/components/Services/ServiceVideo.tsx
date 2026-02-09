"use client";
import Image from "next/image";

export default function ServiceVideo() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg overflow-hidden shadow-2xl group cursor-pointer h-96">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop"
            alt="Service video"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-6">
            <div className="bg-black px-4 py-2 inline-block rounded text-white text-sm mb-2">
              [MUSIC PLAYING]
            </div>
            <p className="text-white text-sm">
              We deliver transformative solutions that drive measurable results. Watch how we help organizations unlock their full potential through innovative technology and strategic expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
