-- Create Community Categories Table
USE jas_consulting;

CREATE TABLE IF NOT EXISTS communitycategory (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    content LONGTEXT,
    articles JSON,
    featured BOOLEAN DEFAULT 0,
    `order` INT DEFAULT 0,
    status ENUM('draft', 'published') DEFAULT 'published',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Community Categories from MD file
INSERT INTO CommunityCategory (id, name, slug, description, icon, content, articles, featured, `order`, status) VALUES
('cc1', 'Job Market & Career Development', 'job-market', 'Navigate your career journey with expert guidance on job markets, visa processes, and professional development', 'briefcase', 
'Expert insights on navigating the Japanese job market, visa processes, and career development strategies. Our comprehensive guides cover everything from J-Find visa applications to interview preparation and understanding Japanese corporate culture.',
'[
  {"title": "The Evolving Japanese Consulting Market and Digital Transformation", "description": "Industry overview and trends, essential skills for consultants, career paths and compensation, impact of AI on consulting"},
  {"title": "Ultimate Guide to Job Searching with J-Find Visa", "description": "J-Find visa overview and application, job search strategies, interview preparation, life in Japan"},
  {"title": "Navigating the Interview Process in Japanese Companies for Sogo-Shoku Positions", "description": "Interview etiquette, common questions, cultural considerations, success strategies"},
  {"title": "Employment Opportunities in Specific Industries", "description": "IT industry opportunities, manufacturing sector, education industry, trade and logistics, financial services"},
  {"title": "Understanding Japanese Corporate Culture", "description": "Workplace etiquette, communication styles, Hō-Ren-Sō (Reporting, Contacting, Consulting), teamwork and individual roles"}
]', 1, 1, 'published'),

('cc2', 'Technology & Innovation', 'technology-innovation', 'Explore cutting-edge technologies and innovation strategies transforming industries', 'cpu', 
'Discover the latest in IoT, AI, smart factories, and renewable energy systems. Our technology insights help you stay ahead of digital transformation trends and implement cutting-edge solutions.',
'[
  {"title": "IoT Platform Integration: Best Practices and Implementation", "description": "Platform architecture, device integration, security frameworks, case studies"},
  {"title": "Smart Factory Implementation: A Complete Guide", "description": "Industry 4.0 technologies, automation strategies, ROI calculation, implementation roadmap"},
  {"title": "Renewable Energy Systems: Design and Integration", "description": "Solar power systems, wind energy solutions, energy storage, grid integration"},
  {"title": "Embedded Systems Development for IoT Applications", "description": "Hardware design, firmware development, communication protocols, security considerations"},
  {"title": "AI and Machine Learning in Business Applications", "description": "Use cases across industries, implementation strategies, data requirements, ROI expectations"}
]', 1, 2, 'published'),

('cc3', 'Business Strategy & Consulting', 'business-strategy', 'Strategic insights for business growth, transformation, and competitive advantage', 'chart-bar', 
'Comprehensive business strategy frameworks, digital transformation methodologies, and consulting best practices. Learn how to develop winning strategies and drive organizational change.',
'[
  {"title": "Digital Transformation Strategy: A Practical Framework", "description": "Assessment and planning, technology selection, change management, measuring success"},
  {"title": "Economic Development and Physical Regeneration", "description": "Regional development strategies, infrastructure planning, investment attraction, impact measurement"},
  {"title": "Business Case Development: From Concept to Approval", "description": "Market research methods, financial modeling, risk assessment, stakeholder engagement"},
  {"title": "Monitoring and Evaluation: Demonstrating Impact", "description": "Evaluation frameworks, data collection methods, impact assessment, continuous improvement"},
  {"title": "Securing Funding in a Competitive Environment", "description": "Funding sources, proposal development, bid writing strategies, success factors"}
]', 1, 3, 'published'),

('cc4', 'Financial Management & Risk', 'financial-management', 'Expert guidance on financial strategy, risk management, and compliance', 'currency-dollar', 
'Master financial advisory, risk management, and tax optimization strategies. Our expert insights help you navigate complex financial landscapes and ensure compliance.',
'[
  {"title": "Risk Management Framework: Credit, Market, and Operational Risk", "description": "Risk identification, assessment methodologies, mitigation strategies, monitoring and reporting"},
  {"title": "Tax Management and Optimization Strategies", "description": "Tax planning approaches, compliance requirements, international considerations, case studies"},
  {"title": "Financial Advisory for Growth Companies", "description": "Capital structure optimization, funding strategies, M&A considerations, valuation methods"},
  {"title": "Asset Management Best Practices", "description": "Portfolio optimization, performance management, lifecycle management, technology enablement"}
]', 0, 4, 'published'),

('cc5', 'Recruitment & Training', 'recruitment-training', 'Insights on talent acquisition, training programs, and workforce development', 'users', 
'Comprehensive recruitment strategies and training programs connecting talent across borders. From Nepal to Japan recruitment to professional development programs.',
'[
  {"title": "Nepal to Japan Recruitment: Complete Guide", "description": "Recruitment process, training programs, visa processing, success stories"},
  {"title": "Japanese Language Training for Professionals", "description": "JLPT preparation (N3/N4), business Japanese, cultural communication, learning resources"},
  {"title": "Cooking Training Program: From Nepal to Japanese Kitchens", "description": "Program overview, curriculum details, success metrics, career opportunities"},
  {"title": "Web Development Bootcamp: Career Transformation", "description": "Program structure, technologies covered, portfolio development, job placement support"},
  {"title": "Executive Coaching: Leadership Development", "description": "Coaching methodologies, leadership competencies, team effectiveness, measuring impact"}
]', 0, 5, 'published'),

('cc6', 'Sustainability & Social Impact', 'sustainability', 'Driving positive change through sustainable practices and social innovation', 'globe', 
'Explore SDGs, Society 5.0, renewable energy, and social innovation strategies. Learn how to create sustainable business models and drive positive social impact.',
'[
  {"title": "SDGs and Society 5.0: Building a Sustainable Future", "description": "SDG framework, Society 5.0 vision, technology enablers, implementation strategies"},
  {"title": "Renewable Energy: Path to Carbon Neutrality", "description": "Technology options, economic viability, policy frameworks, case studies"},
  {"title": "Social Innovation and Economic Development", "description": "Community development, inclusive growth, impact measurement, success stories"},
  {"title": "Equalities and Inclusion in the Workplace", "description": "Diversity strategies, inclusion practices, measuring progress, business benefits"}
]', 0, 6, 'published');

SELECT 'Community Categories table created and seeded successfully!' as status;
