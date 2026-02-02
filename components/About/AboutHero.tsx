export default function AboutHero({ content }: { content: any }) {
  const title = content?.about_hero_title || 'About Us';
  const subtitle = content?.about_hero_subtitle || 'This is where inspiration, candor, bold collaboration and responsible stewardship to outcomes, for clients and the world, combine to produce the extraordinary.';

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-32">
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 800">
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
              <line
                x1="400"
                y1="400"
                x2={400 + Math.cos((i * Math.PI) / 6) * 300}
                y2={400 + Math.sin((i * Math.PI) / 6) * 300}
                stroke={i % 3 === 0 ? "#DC0032" : "#666"}
                strokeWidth="1"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-md bg-white p-8 shadow-2xl animate-fade-in">
        <h1 className="text-2xl font-light mb-4">{title}</h1>
        <p className="text-sm text-gray-700 leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
