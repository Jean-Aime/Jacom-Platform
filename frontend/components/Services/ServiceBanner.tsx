export default function ServiceBanner() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-light mb-6">
            Industry 4.0 Certified Solutions
          </h2>
          <p className="text-gray-700 mb-8">
            Our IoT and smart factory solutions are certified to meet Industry 4.0 standards, ensuring seamless integration, security, and scalability for modern manufacturing environments.
          </p>
          <button className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg">
            LEARN MORE
          </button>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="bg-black text-white px-4 py-2 inline-block text-2xl font-bold mb-4">2025</div>
            <h3 className="text-3xl font-bold text-white leading-tight">
              "INDUSTRY 4.0<br/>CERTIFIED<br/>PARTNER"
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
