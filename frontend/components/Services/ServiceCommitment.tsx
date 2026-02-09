export default function ServiceCommitment() {
  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-light mb-6">
            Sustainable Technology Solutions
          </h2>
          <p className="text-gray-700 mb-8">
            We're committed to delivering technology solutions that not only drive business value but also contribute to environmental sustainability through energy-efficient systems and green technology practices.
          </p>
          <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg">
            LEARN MORE
          </button>
        </div>
        
        <div className="relative h-96 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
        </div>
      </div>
    </section>
  );
}
