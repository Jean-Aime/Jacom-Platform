export default function FirmInfo({ content }: { content: any }) {
  const firmInfo = content?.about_firm_info || [
    { title: "Our Mission", desc: "Create a convenient society by designing an environment using smart technology and turning all devices into social infrastructure." },
    { title: "What We Do", desc: "IoT platform solutions, system integration, embedded systems development, smart factory automation, and renewable energy systems." },
    { title: "Global Presence", desc: "JACOM operates across Asia, Africa, Europe, and America, supporting digitalization and industrialization worldwide." },
    { title: "Innovation Hub", desc: "Research and development in AI, IoT, robotics, and digital transformation to solve complex technical challenges." }
  ];
  const awards = content?.about_awards || "JACOM specializes in industrial standardization of IoT communication protocols, providing low-cost system integration solutions and comprehensive engineering consulting services for consumers and smart device manufacturers.";

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {firmInfo.map((item: any, i: number) => (
            <div key={i} className="group cursor-pointer">
              <h3 className="text-lg font-semibold mb-3 flex items-center justify-between group-hover:text-primary transition-colors">
                {item.title}
                <span className="text-primary">→</span>
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center justify-between cursor-pointer hover:text-primary transition-colors">
            Expertise & Certifications
            <span className="text-primary">→</span>
          </h3>
          <p className="text-sm text-gray-600">{awards}</p>
        </div>
      </div>
    </section>
  );
}
