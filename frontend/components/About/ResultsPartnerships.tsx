export default function ResultsPartnerships() {
  const items = [
    {
      title: "Enduring Results",
      desc: "We work with ambitious leaders and teams to deliver sustainable results that last long after we leave."
    },
    {
      title: "Bain Alliance Ecosystem",
      desc: "We develop partnerships with leading companies and organizations from around the globe to deliver better outcomes."
    },
    {
      title: "Global Affiliations",
      desc: "We have long-standing partnerships and affiliations with leading organizations and business schools around the world."
    },
    {
      title: "World Economic Forum",
      desc: "We're proud to be a strategic partner of the World Economic Forum and help facilitate discussions on the most pressing global issues."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
          Results & Partnerships
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
