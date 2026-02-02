export default function AboutContent({ content }: { content: any }) {
  const mainTitle = content?.about_main_title || 'Making a positive contribution that helps the world\'s most ambitious change makers define the future.';
  const paragraph1 = content?.about_paragraph_1 || 'Across 67 cities in 40 countries, we work alongside our clients as one team with a shared ambition to achieve extraordinary results, outperform the competition, and redefine industries.';
  const paragraph2 = content?.about_paragraph_2 || 'Our 10 years of experience making maps of campaigns, our results, and per Bain alum brings our talent, expertise, and insight to organizations tackling today\'s urgent challenges.';

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-8 leading-tight">{mainTitle}</h2>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
        </div>
      </div>
    </section>
  );
}
