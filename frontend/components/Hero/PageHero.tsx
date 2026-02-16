export default function PageHero({ title, subtitle, backgroundImage }: { title: string; subtitle?: string; backgroundImage?: string }) {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700">
        {backgroundImage && (
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}></div>
        )}
      </div>
      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
          {subtitle && <p className="text-xl text-gray-200">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
