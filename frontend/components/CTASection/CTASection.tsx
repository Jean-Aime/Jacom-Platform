"use client";

export default function CTASection({ content }: { content: any }) {
  const title1 = content?.cta_title1 || 'What can we help you achieve?';
  const button1 = content?.cta_button1 || 'LET\'S GET STARTED';
  const title2 = content?.cta_title2 || 'Where will your career take you?';
  const button2 = content?.cta_button2 || 'COME WORK HERE';

  return (
    <section className="bg-primary py-20 px-6 md:px-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative grid md:grid-cols-2 gap-12 text-white max-w-6xl mx-auto animate-fade-up">
        <div className="text-center md:text-left hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl md:text-3xl font-light mb-6">
            {title1}
          </h3>
          <a 
            href="/contact"
            className="border-2 border-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-block active:scale-95"
          >
            {button1}
          </a>
        </div>

        <div className="text-center md:text-left hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl md:text-3xl font-light mb-6">
            {title2}
          </h3>
          <a 
            href="/careers"
            className="border-2 border-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-block active:scale-95"
          >
            {button2}
          </a>
        </div>
      </div>
    </section>
  );
}
