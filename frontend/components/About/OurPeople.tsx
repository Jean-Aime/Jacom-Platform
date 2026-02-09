export default function OurPeople({ content }: { content: any }) {
  const items = content?.about_people || [
    { title: "Technical Excellence", desc: "Our team combines expertise in sensors, actuators, IoT, robotics, communications, electronics, and computer architecture to deliver innovative solutions." },
    { title: "Innovation Driven", desc: "We focus on research and development of embedded information systems, AI integration, and digital transformation technologies." },
    { title: "Global Impact", desc: "Supporting digitalization across Asia, Africa, and beyond with solutions for smart factories, renewable energy, and sustainable technology." }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">Our Expertise</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item: any, i: number) => (
            <div key={i} className="group cursor-pointer p-6 hover:bg-gray-50 rounded-lg transition-all">
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
