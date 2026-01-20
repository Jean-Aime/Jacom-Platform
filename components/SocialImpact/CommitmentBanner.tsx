export default function CommitmentBanner() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-light mb-6">
              Bold Commitment, Extraordinary Impact
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We commit to providing pro bono and at significantly reduced fees to help organizations tackle the world's most pressing social, economic, and environmental challenges.
            </p>
            <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg">
              LEARN MORE
            </button>
          </div>
          
          <div className="relative h-64 bg-gradient-to-br from-purple-900 via-red-900 to-pink-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-12 bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{
                    top: `${i * 15}%`,
                    transform: `rotate(${i * 10}deg)`,
                    animation: `pulse ${2 + i * 0.3}s infinite`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
