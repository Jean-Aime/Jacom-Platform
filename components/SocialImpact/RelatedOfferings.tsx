export default function RelatedOfferings() {
  const offerings = [
    { title: "Sustainability", desc: "We help companies build sustainable business models that deliver both financial and social returns." },
    { title: "Food Systems Transformation", desc: "Transform food systems to be more sustainable, equitable, and resilient." },
    { title: "Circular Economy", desc: "Design circular business models that eliminate waste and create value." },
    { title: "Climate Change & Decarbonization", desc: "Develop strategies to reduce carbon emissions and build climate resilience." },
    { title: "Energy Transition", desc: "Navigate the transition to clean energy and sustainable power systems." },
    { title: "Sustainable Finance & Investing", desc: "Integrate ESG factors into investment decisions and financial strategies." }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-12">Related Offerings</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {offerings.map((offering, i) => (
            <div key={i} className="flex items-start justify-between p-6 bg-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{offering.title}</h3>
                <p className="text-sm text-gray-600">{offering.desc}</p>
              </div>
              <svg className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-primary font-semibold text-sm border-b-2 border-primary hover:scale-105 transition-transform">
            SEE MORE →
          </button>
        </div>
      </div>
    </section>
  );
}
