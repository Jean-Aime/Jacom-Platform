export default function ServiceCapabilities({ content }: { content: any }) {
  const items = content?.services_capabilities || [
    { title: "Digital Transformation", desc: "End-to-end digitalization strategies that modernize operations, enhance customer experiences, and unlock new revenue streams." },
    { title: "IoT Integration", desc: "Smart device connectivity and data analytics that enable real-time monitoring, predictive maintenance, and operational intelligence." },
    { title: "Strategic Consulting", desc: "Expert guidance on technology adoption, organizational change, and business model innovation to drive sustainable growth." }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">Our Capabilities</h2>
        
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
