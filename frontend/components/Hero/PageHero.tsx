"use client";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  illustrationContent?: React.ReactNode;
}

export default function PageHero({ title, subtitle, description, image, illustrationContent }: PageHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 min-h-screen flex items-center overflow-hidden">
      {/* Circular patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 border border-blue-400/20 rounded-full"></div>
        <div className="absolute top-20 right-1/3 w-[500px] h-[500px] border border-blue-400/10 rounded-full"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 border border-blue-400/20 rounded-full"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 border border-blue-400/10 rounded-full -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {subtitle && (
              <p className="text-blue-300 text-sm font-medium mb-4 uppercase tracking-wider animate-fade-in-up">
                {subtitle}
              </p>
            )}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-400">
                {description}
              </p>
            )}
          </div>
          
          <div className="hidden lg:block animate-fade-in-up animation-delay-400">
            {illustrationContent || (image ? (
              <img src={image} alt="Illustration" className="w-full h-auto rounded-2xl shadow-2xl" />
            ) : null)}
          </div>
        </div>
      </div>
    </section>
  );
}
