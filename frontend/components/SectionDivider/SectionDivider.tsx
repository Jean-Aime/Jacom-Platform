"use client";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function SectionDivider() {
  const ref = useScrollAnimation();
  
  return (
    <div ref={ref} className="section-divider animate-on-scroll my-16"></div>
  );
}
