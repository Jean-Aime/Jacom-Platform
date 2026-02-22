import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-red-700 to-red-800 pt-32 pb-56 min-h-[580px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              About JACOM - Energizing Business Growth Through Innovation
            </h1>
            <p className="text-red-100 text-base mb-8 leading-relaxed">
              Driving global technology gaps and empowering businesses through strategic consulting, technical innovation, and financial expertise. We bridge the gap between vision and execution.
            </p>
            <div className="flex gap-4">
              <a href="#story" className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium text-sm transition shadow-lg">
                Explore Our Work
              </a>
              <a href="/contact" className="border-2 border-white hover:bg-white hover:text-primary text-white px-6 py-3 rounded-md font-medium text-sm transition">
                Download Brochure
              </a>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-red-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-4 gap-8">
              {[
                { value: "15+", label: "COUNTRIES" },
                { value: "50+", label: "EXPERT TEAM" },
                { value: "500+", label: "PROJECTS DELIVERED" },
                { value: "1000+", label: "SATISFIED CLIENTS" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-red-200 font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Heritage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm text-primary font-semibold mb-3 uppercase tracking-wider">OUR HERITAGE</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Founded in 2019 to Revolutionize Global Connectivity
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                JACOM was established with a clear vision: to bridge the technology gap and empower businesses through innovative IoT solutions, strategic consulting, and comprehensive digital transformation services. Today, we work in Tokyo and rapidly expanding our reach across Asia and Africa, helping organizations navigate complex technological landscapes and achieve sustainable growth.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our journey began with a commitment to excellence and a passion for innovation. We've evolved from a startup into a trusted partner for global businesses seeking to leverage cutting-edge technology and strategic insights.
              </p>
              <a href="#" className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                View Full Company Timeline →
              </a>
            </div>
            <div className="relative">
              <img src="/images/about-bg.jpg" alt="Team" className="rounded-xl shadow-xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold mb-3 uppercase tracking-wider">OUR CORE VALUES</p>
            <h2 className="text-4xl font-bold text-gray-900">The J-A-C-O-M-E Values</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our core values guide every decision we make and every solution we deliver.
            </p>
          </div>
          
          <div className="grid md:grid-cols-6 gap-6">
            {[
              { letter: "J", title: "Justice", desc: "Fair and ethical practices" },
              { letter: "A", title: "Accountability", desc: "Taking ownership" },
              { letter: "C", title: "Commitment", desc: "Dedicated to excellence" },
              { letter: "O", title: "Originality", desc: "Innovative thinking" },
              { letter: "M", title: "Motivation", desc: "Driving success" },
              { letter: "E", title: "Excellence", desc: "Uncompromising quality" }
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {value.letter}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to SDGs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-900">Commitment to SDGs</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We align our operations with the UN's 17 Sustainable Development Goals, focusing on quality education, decent work, industry innovation, and sustainable cities. Through our projects, we contribute to global efforts in reducing inequality and promoting responsible consumption.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {["SDG 4", "SDG 8", "SDG 9", "SDG 10", "SDG 11", "SDG 12"].map((sdg, i) => (
                  <div key={i} className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-primary font-bold">{sdg}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-900">Society 5.0</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                In partnership with Society 5.0, we are committed to a human-centered society that balances economic advancement with the resolution of social problems through a system that highly integrates cyberspace and physical space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold mb-3 uppercase tracking-wider">OUR MINDS BEHIND JACOM</p>
            <h2 className="text-4xl font-bold text-gray-900">Leadership & Team</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "AKIHIRO EKUALE TESFAMICHAEL", role: "CEO & Founder", image: "/images/team1.jpg" },
              { name: "Amanuel", role: "Chief Operations Officer", image: "/images/team2.jpg" },
              { name: "Lynn", role: "Business Strategy Lead", image: "/images/team3.jpg" }
            ].map((member, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-96 bg-gray-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-1 uppercase tracking-wide text-sm">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Global Presence</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Tokyo, Japan",
                desc: "Our main R&D and strategic planning hub, driving technological innovation.",
                details: "Specializing in IoT platform development, smart factory solutions, and advanced technology integration."
              },
              {
                title: "Addis Ababa, Ethiopia",
                desc: "Our gateway for African operations, focusing on infrastructure and economic development.",
                details: "Leading renewable energy projects, digital training centers, and community development initiatives."
              },
              {
                title: "Kathmandu, Nepal",
                desc: "Recruiting top talent and delivering specialized training programs.",
                details: "Providing comprehensive pre-departure training, skills development, and technology education."
              }
            ].map((office, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition">
                <h3 className="font-bold text-xl mb-3">{office.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{office.desc}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{office.details}</p>
              </div>
            ))}
          </div>

          <div className="relative h-96 bg-slate-800 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Live Headquarters on the Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold mb-3 uppercase tracking-wider">FULL-SPECTRUM ECOSYSTEM</p>
            <h2 className="text-4xl font-bold text-gray-900">Trusted Partners</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {["AWS", "Microsoft Azure", "Google Cloud", "IBM"].map((partner, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition">
                <div className="text-gray-400 font-bold text-xl">{partner}</div>
              </div>
            ))}
          </div>

          <div className="bg-red-50 rounded-xl p-8 text-center">
            <p className="text-gray-700 italic max-w-3xl mx-auto">
              "Our partnership with JACOM has been transformative. Their deep technical expertise and strategic vision have helped us navigate complex digital transformation challenges with confidence."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-red-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Shape the Future with Us?
          </h2>
          <p className="text-red-100 text-lg mb-10 leading-relaxed">
            We are always looking for visionary partners and talented individuals who share our passion for innovation and excellence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/careers" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
              Join Our Team
            </a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
              Contact Us Now
            </a>
          </div>
          <p className="text-red-200 text-sm mt-6">
            Have a specific inquiry or project in mind? Let's discuss your needs.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
