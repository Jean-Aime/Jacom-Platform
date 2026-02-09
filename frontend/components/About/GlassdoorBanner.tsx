export default function GlassdoorBanner() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-light mb-6">
            Industry 4.0 & IoT Innovation
          </h2>
          <p className="text-gray-700 mb-8">
            JACOM provides cutting-edge IoT platform solutions and system integration services. We specialize in industrial standardization of communication protocols, turning all devices into social infrastructure for seamless connectivity and intelligent automation.
          </p>
          <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg">
            LEARN MORE
          </button>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-green-400 to-teal-500 p-12 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="bg-black text-white px-4 py-2 inline-block text-2xl font-bold mb-4">2019</div>
            <h3 className="text-3xl font-bold text-white leading-tight">
              "IoT PLATFORM<br/>INNOVATION<br/>LEADER"
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
