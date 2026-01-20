export default function GlassdoorBanner() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-light mb-6">
            Glassdoor's Best Place to Work in 2025
          </h2>
          <p className="text-gray-700 mb-8">
            Our people have spoken and we're on Glassdoor's Best Places to Work list for the 13th time in a row (seriously) in 2025, once again earning this top tier recognition for our commitment to our people.
          </p>
          <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg">
            LEARN MORE
          </button>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-green-400 to-teal-500 p-12 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="bg-black text-white px-4 py-2 inline-block text-2xl font-bold mb-4">2025</div>
            <h3 className="text-3xl font-bold text-white leading-tight">
              "GLASSDOOR'S<br/>BEST PLACES<br/>TO WORK"
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
