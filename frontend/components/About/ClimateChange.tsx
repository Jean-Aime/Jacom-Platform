export default function ClimateChange() {
  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-light mb-6">
            Sustainable Technology Solutions
          </h2>
          <p className="text-gray-700 mb-8">
            JACOM is committed to renewable energy systems and sustainable technology. We design and develop solar power, wind power, and energy management systems that contribute to environmental protection and efficient resource utilization.
          </p>
          <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg">
            LEARN MORE
          </button>
        </div>
        
        <div className="relative h-96 bg-gradient-to-br from-teal-400 to-green-600 rounded-lg overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
        </div>
      </div>
    </section>
  );
}
