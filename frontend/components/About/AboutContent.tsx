export default function AboutContent({ content }: { content: any }) {
  const mainTitle = content?.about_main_title || 'Creating a convenient society by designing an environment using smart technology.';
  const paragraph1 = content?.about_paragraph_1 || 'We are a social innovation and economic development consultancy committed to improving lives, communities and economies across Asia and Africa. For over 3 years we have delivered research, consultancy and development support to strengthen and improve the public sector, communities and businesses. We provide IoT platform solutions, system integration services, and comprehensive consulting that turns all devices into social infrastructure through industrial standardization.';
  const paragraph2 = content?.about_paragraph_2 || 'Our expertise includes IoT and embedded systems, digital transformation, smart factory automation, renewable energy systems, recruitment services connecting Nepal and Japan, and specialized training programs. JACOM stands for Judicious decision making, Attested achievement with integrity, Care and mutual benefit for all, Objective opportunity creation, Motivate and inspire for sustainable growth, and Excellence at its best. Since our founding in 2019, we have measured our success by the success of our clients.';

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
