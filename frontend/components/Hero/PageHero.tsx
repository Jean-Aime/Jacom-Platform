export default function PageHero({ title, subtitle, backgroundImage }: { title: string; subtitle?: string; backgroundImage?: string }) {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-700">
        {backgroundImage && (
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.4
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-red-700/60" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">{title}</h1>
          {subtitle && <p className="text-xl text-gray-100 drop-shadow">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
