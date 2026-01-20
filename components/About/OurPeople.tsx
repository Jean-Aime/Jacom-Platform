export default function OurPeople() {
  const items = [
    {
      title: "Culture of Collaboration",
      desc: "We help each other and our clients achieve the extraordinary through teamwork and a commitment to excellence."
    },
    {
      title: "Sustainability",
      desc: "We believe in building companies, our careers in a way that creates lasting value and makes a positive impact on the world."
    },
    {
      title: "Social Impact",
      desc: "We're dedicated to using our skills to address the world's most pressing challenges through pro bono work and strategic partnerships."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">Our People</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
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
