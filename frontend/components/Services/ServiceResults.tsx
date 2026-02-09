export default function ServiceResults() {
  const items = [
    {
      title: "Measurable Impact",
      desc: "We deliver quantifiable results with clear ROI metrics, performance improvements, and cost reductions that drive business value."
    },
    {
      title: "Technology Ecosystem",
      desc: "Strategic partnerships with leading technology providers ensure access to cutting-edge solutions and industry best practices."
    },
    {
      title: "Industry Networks",
      desc: "Active participation in industry consortiums and standards bodies keeps us at the forefront of technological innovation."
    },
    {
      title: "Knowledge Transfer",
      desc: "We build internal capabilities through training and mentorship, ensuring sustainable success long after project completion."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
          Results & Ecosystem
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
