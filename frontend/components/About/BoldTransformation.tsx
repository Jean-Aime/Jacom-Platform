export default function BoldTransformation() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-primary p-16 rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-20 bg-white transform rotate-45"
                style={{
                  left: `${i * 5}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="relative z-10">
            <p className="text-white text-sm mb-4">Where your ambition?</p>
            <h2 className="text-4xl font-light text-white mb-8">
              Behold the Bold: Stories of bold digital transformation
            </h2>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-8">
            Get in touch and see how our team can help you achieve it.
          </p>
        </div>
      </div>
    </section>
  );
}
