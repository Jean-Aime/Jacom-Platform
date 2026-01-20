export default function ConsultantsGrid() {
  const consultants = [
    { name: "Brooke Martin", title: "Partner", location: "Boston" },
    { name: "Vidya Sagar", title: "Partner", location: "New York" },
    { name: "Allison Hill", title: "Partner", location: "San Francisco" },
    { name: "James Chen", title: "Partner", location: "London" },
    { name: "Laura Manzione", title: "Partner", location: "Washington DC" },
    { name: "Jeffrey Hogue", title: "Partner", location: "Minneapolis" },
    { name: "Annie Longsworth", title: "Partner", location: "Boston" },
    { name: "Lucy LeBlanc", title: "Partner", location: "Boston" }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-12 text-center">Our Social Impact Consultants</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {consultants.map((consultant, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"></div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{consultant.name}</h3>
              <p className="text-sm text-gray-600">{consultant.title}</p>
              <p className="text-sm text-gray-500">{consultant.location}</p>
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
