export default function Partnerships() {
  const partners = [
    { name: "Bridgespan", logo: "B" },
    { name: "Ark", logo: "Ark" },
    { name: "Teach For All", logo: "TFA" },
    { name: "BLACKSMITH", logo: "⚒" }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-6 text-center">Partnerships & Alliances</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We collaborate with leading foundations, social enterprises, academic institutions, nonprofits, and other changemakers to enhance their effectiveness, achieve their goals more efficiently, and create a greater positive impact in their communities.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center p-8 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="text-3xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                {partner.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
