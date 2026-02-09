export default function SocialImpactHero() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-light mb-6">Social Impact</h1>
            <p className="text-gray-700 text-lg">
              Catalyzing the social sector through groundbreaking partnerships.
            </p>
          </div>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <circle cx="50" cy="100" r="30" fill="#DC0032" opacity="0.8"/>
                <circle cx="150" cy="80" r="25" fill="#FF6B9D" opacity="0.6"/>
                <circle cx="250" cy="120" r="35" fill="#DC0032" opacity="0.7"/>
                <circle cx="350" cy="90" r="28" fill="#FF6B9D" opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
