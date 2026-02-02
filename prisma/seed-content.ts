import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding content blocks...');

  const blocks = [
    // HOME PAGE - HERO
    { key: 'home_hero_title', page: 'home', section: 'hero', type: 'text', content: 'Global Healthcare Private Equity Report 2026', order: 1 },
    { key: 'home_hero_tabs', page: 'home', section: 'hero', type: 'json', content: JSON.stringify(['Paper & Packaging', 'Healthcare Private Equity Report', 'M&A Healthcare', 'AI Executive Guide']), order: 2 },
    { key: 'home_hero_bg', page: 'home', section: 'hero', type: 'text', content: '/images/hero-bg.jpg', image: '/images/hero-bg.jpg', order: 3 },
    
    // HOME PAGE - INDUSTRY
    { key: 'industry_title', page: 'home', section: 'industry', type: 'text', content: 'We champion the bold to achieve the extraordinary.', order: 1 },
    { key: 'industry_subtitle', page: 'home', section: 'industry', type: 'text', content: 'Around two questions we help our clients win: one on your challenges.', order: 2 },
    { key: 'industry_image', page: 'home', section: 'industry', type: 'text', content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', order: 3 },
    { key: 'industry_tags', page: 'home', section: 'industry', type: 'json', content: JSON.stringify(['Retail', 'Private Equity', 'Advanced Manufacturing & Services', 'Technology', 'Oil & Gas', 'Healthcare & Life Sciences', 'Chemicals', 'Consumer Products', 'Mining', 'Financial Services']), order: 4 },
    
    // HOME PAGE - STORIES
    { key: 'stories_title', page: 'home', section: 'stories', type: 'text', content: 'Bold steps forward.', order: 1 },
    { key: 'stories_subtitle', page: 'home', section: 'stories', type: 'text', content: 'Featured client success story', order: 2 },
    { key: 'story_title', page: 'home', section: 'stories', type: 'text', content: 'Banca Investis Transforms Customer Dialogue with a Generative AI Engine', order: 3 },
    { key: 'story_impact_label', page: 'home', section: 'stories', type: 'text', content: 'The impact', order: 4 },
    { key: 'story_stat1_value', page: 'home', section: 'stories', type: 'text', content: '500+', order: 5 },
    { key: 'story_stat1_text', page: 'home', section: 'stories', type: 'text', content: 'internal employees using the tool', order: 6 },
    { key: 'story_stat2_value', page: 'home', section: 'stories', type: 'text', content: '7', order: 7 },
    { key: 'story_stat2_text', page: 'home', section: 'stories', type: 'text', content: 'months from ideation to launch', order: 8 },
    { key: 'story_image', page: 'home', section: 'stories', type: 'text', content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', order: 9 },
    { key: 'story_logo', page: 'home', section: 'stories', type: 'text', content: 'M BANCA INVESTIS', order: 10 },
    { key: 'stories_button', page: 'home', section: 'stories', type: 'text', content: 'SEE ALL CLIENT RESULTS', order: 11 },
    
    // HOME PAGE - VIDEO
    { key: 'video_bubble_text', page: 'home', section: 'video', type: 'text', content: "What 'no regret' actions should CEOs take to win with generative AI", order: 1 },
    { key: 'video_person_name', page: 'home', section: 'video', type: 'text', content: 'Chuck Whitten, Global Head of Bain Digital', order: 2 },
    { key: 'video_title', page: 'home', section: 'video', type: 'text', content: 'How executives can win with AI', order: 3 },
    { key: 'video_link_text', page: 'home', section: 'video', type: 'text', content: "HEAR HOW WE'RE HELPING TOP COMPANIES ACROSS INDUSTRIES", order: 4 },
    { key: 'video_image', page: 'home', section: 'video', type: 'text', content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', order: 5 },
    
    // HOME PAGE - INSIGHTS
    { key: 'insights_title', page: 'home', section: 'insights', type: 'text', content: 'Our Latest Insights', order: 1 },
    { key: 'insights_button', page: 'home', section: 'insights', type: 'text', content: 'SEE ALL INSIGHTS', order: 2 },
    { key: 'insights_items', page: 'home', section: 'insights', type: 'json', content: JSON.stringify([
      { title: 'Five of the Most Insightful Podcast Episodes On AI', description: 'A curated series what leaders across many about agentic systems, how with them, and becoming a critical AI moment in 2025.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop' },
      { title: 'Reimagining Merchandising in the Era of Agentic AI', description: 'The future of merchandising is not simply AI, but rather, agentic automation—and agents for AI that makes retail possible.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop' }
    ]), order: 3 },
    
    // HOME PAGE - CTA
    { key: 'cta_title1', page: 'home', section: 'cta', type: 'text', content: 'What can we help you achieve?', order: 1 },
    { key: 'cta_button1', page: 'home', section: 'cta', type: 'text', content: "LET'S GET STARTED", order: 2 },
    { key: 'cta_title2', page: 'home', section: 'cta', type: 'text', content: 'Where will your career take you?', order: 3 },
    { key: 'cta_button2', page: 'home', section: 'cta', type: 'text', content: 'COME WORK HERE', order: 4 },
    
    // ABOUT PAGE
    { key: 'about_hero_title', page: 'about', section: 'hero', type: 'text', content: 'About Us', order: 1 },
    { key: 'about_hero_subtitle', page: 'about', section: 'hero', type: 'text', content: 'This is where inspiration, candor, bold collaboration and responsible stewardship to outcomes, for clients and the world, combine to produce the extraordinary.', order: 2 },
    { key: 'about_main_title', page: 'about', section: 'content', type: 'text', content: 'Making a positive contribution that helps the world\'s most ambitious change makers define the future.', order: 1 },
    { key: 'about_paragraph_1', page: 'about', section: 'content', type: 'text', content: 'Across 67 cities in 40 countries, we work alongside our clients as one team with a shared ambition to achieve extraordinary results, outperform the competition, and redefine industries. We complement our tailored, integrated expertise with a vibrant ecosystem of digital innovators to deliver better, faster, and more enduring outcomes.', order: 2 },
    { key: 'about_paragraph_2', page: 'about', section: 'content', type: 'text', content: 'Our 10 years of experience making maps of campaigns, our results, and per Bain alum brings our talent, expertise, and insight to organizations tackling today\'s urgent challenges in education, racial equity, social justice, economic development, and the environment. Since our founding in 1973, we have measured our success by the success of our clients, and we proudly maintain the highest level of client advocacy in the industry.', order: 3 },
    { key: 'about_firm_info', page: 'about', section: 'firm', type: 'json', content: JSON.stringify([
      { title: 'What We Believe', desc: 'We believe those who challenge themselves to be exceptional should always find a way to make a difference.' },
      { title: 'What We Do', desc: 'Global leaders come to us to solve industry-defining challenges. Our unique approach to change management delivers results.' },
      { title: 'Worldwide Offices', desc: 'Templete is located in 40 countries. We work as one global firm to deliver the best results for our clients.' },
      { title: 'Media Center', desc: 'Our experts are available for media interviews and thought leadership on the global challenges our clients face.' }
    ]), order: 1 },
    { key: 'about_awards', page: 'about', section: 'firm', type: 'text', content: 'We\'re proud to be consistently recognized as one of the world\'s best places to work, best consulting firms, and best companies for diversity and inclusion.', order: 2 },
    { key: 'about_people', page: 'about', section: 'people', type: 'json', content: JSON.stringify([
      { title: 'Culture of Collaboration', desc: 'We help each other and our clients achieve the extraordinary through teamwork and a commitment to excellence.' },
      { title: 'Sustainability', desc: 'We believe in building companies, our careers in a way that creates lasting value and makes a positive impact on the world.' },
      { title: 'Social Impact', desc: 'We\'re dedicated to using our skills to address the world\'s most pressing challenges through pro bono work and strategic partnerships.' }
    ]), order: 1 },
    
    // CONTACT PAGE
    { key: 'contact_hero_title', page: 'contact', section: 'hero', type: 'text', content: 'Contact Us', order: 1 },
    { key: 'contact_hero_subtitle', page: 'contact', section: 'hero', type: 'text', content: 'Ready to transform your business? Get in touch with our experts to discuss your challenges and explore solutions.', order: 2 },
    { key: 'contact_form_title', page: 'contact', section: 'form', type: 'text', content: 'Get in Touch', order: 1 },
    { key: 'contact_offices_title', page: 'contact', section: 'offices', type: 'text', content: 'Our Offices', order: 1 },
    { key: 'contact_offices_data', page: 'contact', section: 'offices', type: 'json', content: JSON.stringify([
      { city: 'New York', address: '200 West Street, New York, NY 10013', phone: '+1 212 555 0100', email: 'newyork@jas.com' },
      { city: 'London', address: '1 Poultry, London EC2R 8EJ, UK', phone: '+44 20 7556 1000', email: 'london@jas.com' },
      { city: 'Singapore', address: '8 Marina Boulevard, Singapore 018981', phone: '+65 6212 5000', email: 'singapore@jas.com' }
    ]), order: 2 },
    
    // DIGITAL PAGE
    { key: 'digital_hero_title', page: 'digital', section: 'hero', type: 'text', content: 'Digital & AI Transformation', order: 1 },
    { key: 'digital_hero_subtitle', page: 'digital', section: 'hero', type: 'text', content: 'We help organizations harness cutting-edge technologies to reimagine their business models, optimize operations, and create competitive advantages in the digital age.', order: 2 },
    { key: 'digital_solutions_title', page: 'digital', section: 'solutions', type: 'text', content: 'Digital Solutions', order: 1 },
    { key: 'digital_solutions_data', page: 'digital', section: 'solutions', type: 'json', content: JSON.stringify([
      { title: 'AI & Machine Learning', description: 'Harness the power of artificial intelligence to automate processes and unlock insights', features: ['Predictive Analytics', 'Process Automation', 'Natural Language Processing', 'Computer Vision'] },
      { title: 'Cloud Transformation', description: 'Migrate and optimize your infrastructure for scalability and performance', features: ['Cloud Migration', 'Multi-cloud Strategy', 'DevOps Implementation', 'Security & Compliance'] },
      { title: 'Data & Analytics', description: 'Transform raw data into actionable business intelligence and strategic insights', features: ['Data Architecture', 'Real-time Analytics', 'Business Intelligence', 'Data Governance'] },
      { title: 'Digital Experience', description: 'Create seamless, personalized experiences across all customer touchpoints', features: ['UX/UI Design', 'Mobile Applications', 'Web Platforms', 'Customer Portals'] }
    ]), order: 2 },
    { key: 'digital_cta_title', page: 'digital', section: 'cta', type: 'text', content: 'Ready to Transform Digitally?', order: 1 },
    { key: 'digital_cta_subtitle', page: 'digital', section: 'cta', type: 'text', content: 'Let\'s discuss how digital transformation can accelerate your business growth', order: 2 },
    
    // FOOTER
    { key: 'footer_tagline', page: 'global', section: 'footer', type: 'text', content: 'JAS.COM', order: 1 },
    { key: 'footer_newsletter_title', page: 'global', section: 'footer', type: 'text', content: 'Stay Connected', order: 2 },
    { key: 'footer_newsletter_subtitle', page: 'global', section: 'footer', type: 'text', content: 'Get the latest insights delivered to your inbox', order: 3 },
    { key: 'footer_copyright', page: 'global', section: 'footer', type: 'text', content: '© 2025 JAS.COM Consulting, Inc.', order: 4 },
    { key: 'footer_social_links', page: 'global', section: 'footer', type: 'json', content: JSON.stringify([
      { platform: 'LinkedIn', url: '#', icon: 'in' },
      { platform: 'Twitter', url: '#', icon: '𝕏' },
      { platform: 'Facebook', url: '#', icon: 'f' },
      { platform: 'Instagram', url: '#', icon: '📷' },
      { platform: 'YouTube', url: '#', icon: '▶' }
    ]), order: 5 }
  ];

  for (const block of blocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: block,
      create: block
    });
  }

  console.log('✅ Content blocks seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
