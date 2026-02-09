export default function ResultsPartnerships() {
  const items = [
    {
      title: "IoT Platform Solutions",
      desc: "Standardized communication protocols turning all devices into social infrastructure with seamless connectivity and intelligent automation."
    },
    {
      title: "Strategic Partnerships",
      desc: "Collaborating with JICA, Nippon Foundation, universities, and technology providers to deliver comprehensive solutions globally."
    },
    {
      title: "Recruitment Services",
      desc: "Connecting Nepal and Japan for hospitality and IT professionals with comprehensive training and deployment support."
    },
    {
      title: "Training Programs",
      desc: "Specialized training in Japanese language, technical skills, and industry-specific expertise for career development."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
          Services & Partnerships
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <h3 className="text-lg font-semibold mb-3 flex items-center justify-between group-hover:text-primary transition-colors">
                {item.title}
                <span className="text-primary">→</span>
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
