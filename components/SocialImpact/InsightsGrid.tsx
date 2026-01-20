export default function InsightsGrid() {
  const insights = [
    {
      title: "Unlocking a Degree of Difficulty: How to Write Your Impact Story",
      desc: "Learn how to craft compelling impact stories that resonate with stakeholders and drive change.",
      image: "from-pink-400 to-red-500"
    },
    {
      title: "How Nonprofits Can Expand Grassroots Learning to Implement",
      desc: "Discover strategies for scaling grassroots initiatives and creating sustainable impact.",
      image: "from-green-400 to-teal-500"
    },
    {
      title: "Solving Climate Challenges: Philanthropic Models for Financing Sustainability",
      desc: "Explore innovative funding models that accelerate climate action and environmental sustainability.",
      image: "from-blue-400 to-cyan-500"
    },
    {
      title: "Transforming Education: Unleashing Equitable Country Outcomes",
      desc: "Learn how education systems can be transformed to deliver equitable outcomes for all students.",
      image: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-12 text-center">Our Insights on Social Impact</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {insights.map((insight, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className={`h-48 bg-gradient-to-br ${insight.image}`}></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{insight.title}</h3>
                <p className="text-sm text-gray-600">{insight.desc}</p>
              </div>
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
