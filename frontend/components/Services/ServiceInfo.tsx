export default function ServiceInfo({ content }: { content: any }) {
  const serviceInfo = content?.services_info || [
    { title: "Our Approach", desc: "We combine proven methodologies with innovative thinking to deliver solutions that create lasting competitive advantage." },
    { title: "Industry Expertise", desc: "Deep domain knowledge across technology, manufacturing, energy, and finance enables us to address sector-specific challenges." },
    { title: "Global Delivery", desc: "Our distributed team model ensures seamless execution across time zones with consistent quality and rapid deployment." },
    { title: "Technology Partners", desc: "Strategic alliances with leading technology providers give our clients access to cutting-edge solutions and best practices." }
  ];
  const certifications = content?.services_certifications || "We maintain industry-leading certifications and partnerships with major technology platforms including AWS, Microsoft Azure, Google Cloud, and leading IoT solution providers.";

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceInfo.map((item: any, i: number) => (
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
            Certifications & Partnerships
            <span className="text-primary">→</span>
          </h3>
          <p className="text-sm text-gray-600">{certifications}</p>
        </div>
      </div>
    </section>
  );
}
