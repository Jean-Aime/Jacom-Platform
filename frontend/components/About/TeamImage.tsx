"use client";
import Image from "next/image";

export default function TeamImage() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-96 bg-gradient-to-br from-orange-200 to-yellow-100 rounded-lg overflow-hidden shadow-2xl group hover-scale">
          <Image
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Black African professionals collaborating on bold ideas"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-light">Bold ideas. Extraordinary teams.</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
