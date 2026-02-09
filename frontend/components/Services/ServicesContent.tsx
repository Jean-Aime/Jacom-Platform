export default function ServicesContent({ content }: { content: any }) {
  const mainTitle = content?.services_main_title || 'Creating a convenient society by designing an environment using smart technology and IoT innovation.';
  const paragraph1 = content?.services_paragraph_1 || 'JACOM is an IoT e-commerce platform and consulting company providing digital transformation, system integration, smart factory solutions, renewable energy systems, and comprehensive training services. We turn all devices into social infrastructure through industrial standardization of communication protocols, enabling seamless connectivity and intelligent automation across industries.';
  const paragraph2 = content?.services_paragraph_2 || 'Our services span IoT platform development, electromechanical system integration, engineering consulting for consumers and device manufacturers, recruitment services connecting Nepal and Japan for hospitality and IT professionals, and specialized training programs. We support digitalization and industrialization globally with expertise in embedded systems, AI, robotics, and sustainable technology solutions.';

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
