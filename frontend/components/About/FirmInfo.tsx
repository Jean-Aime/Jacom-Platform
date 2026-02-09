export default function FirmInfo({ content }: { content: any }) {
  const firmInfo = content?.about_firm_info || [
    { title: "What We Believe", desc: "We believe those who challenge themselves to be exceptional should always find a way to make a difference." },
    { title: "What We Do", desc: "Global leaders come to us to solve industry-defining challenges. Our unique approach to change management delivers results." },
    { title: "Worldwide Offices", desc: "Templete is located in 40 countries. We work as one global firm to deliver the best results for our clients." },
    { title: "Media Center", desc: "Our experts are available for media interviews and thought leadership on the global challenges our clients face." }
  ];
  const awards = content?.about_awards || "We're proud to be consistently recognized as one of the world's best places to work, best consulting firms, and best companies for diversity and inclusion.";

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
            Awards & Recognition
            <span className="text-primary">→</span>
          </h3>
          <p className="text-sm text-gray-600">{awards}</p>
        </div>
      </div>
    </section>
  );
}
