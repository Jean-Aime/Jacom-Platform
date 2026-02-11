-- Complete Database Setup for JACOM Platform
-- Run this in phpMyAdmin SQL tab after creating jas_consulting database

-- ========================================
-- 1. Add ContentBlock and Session tables
-- ========================================

CREATE TABLE IF NOT EXISTS `contentblock` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `page` varchar(191) NOT NULL,
  `section` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'text',
  `content` text NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ContentBlock_key_key` (`key`),
  KEY `ContentBlock_page_section_idx` (`page`, `section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `session` (
  `id` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_token_key` (`token`),
  KEY `Session_token_idx` (`token`),
  KEY `Session_userId_idx` (`userId`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 2. Seed ContentBlock data for homepage
-- ========================================

INSERT IGNORE INTO `contentblock` (`id`, `key`, `page`, `section`, `type`, `content`, `image`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('cb1', 'hero.title', 'home', 'hero', 'text', 'Transform Your Business with Expert Consulting', NULL, 1, 1, NOW(), NOW()),
('cb2', 'hero.subtitle', 'home', 'hero', 'text', 'Strategic solutions that drive growth and innovation', NULL, 2, 1, NOW(), NOW()),
('cb3', 'industry.title', 'home', 'industry', 'text', 'Industries We Serve', NULL, 1, 1, NOW(), NOW()),
('cb4', 'stories.title', 'home', 'stories', 'text', 'Success Stories', NULL, 1, 1, NOW(), NOW()),
('cb5', 'video.title', 'home', 'video', 'text', 'See How We Work', NULL, 1, 1, NOW(), NOW()),
('cb6', 'cta.title', 'home', 'cta', 'text', 'Ready to Transform Your Business?', NULL, 1, 1, NOW(), NOW()),
('cb7', 'cta.description', 'home', 'cta', 'text', 'Let us help you achieve your goals', NULL, 2, 1, NOW(), NOW());

-- ========================================
-- 3. Seed Expert data
-- ========================================

INSERT IGNORE INTO `expert` (`id`, `name`, `slug`, `role`, `bio`, `expertise`, `locations`, `image`, `email`, `linkedin`, `featured`, `createdAt`, `updatedAt`) VALUES
('exp1', 'John Smith', 'john-smith', 'Senior Partner', 'Leading expert in digital transformation with 20+ years of experience', 'Digital Transformation, AI, Cloud', 'New York, London', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'john.smith@example.com', 'https://linkedin.com/in/johnsmith', 1, NOW(), NOW()),
('exp2', 'Sarah Johnson', 'sarah-johnson', 'Managing Director', 'Specializes in healthcare and life sciences consulting', 'Healthcare, Life Sciences, Strategy', 'Boston, San Francisco', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'sarah.johnson@example.com', 'https://linkedin.com/in/sarahjohnson', 1, NOW(), NOW());

-- ========================================
-- 4. Seed Insight data
-- ========================================

INSERT IGNORE INTO `insight` (`id`, `title`, `slug`, `type`, `content`, `excerpt`, `featured`, `trending`, `gated`, `downloadUrl`, `image`, `readTime`, `status`, `scheduledAt`, `publishedAt`, `createdAt`, `updatedAt`, `authorId`, `topics`, `regions`) VALUES
('ins1', 'The Future of AI in Business', 'future-of-ai-in-business', 'Article', 'Artificial Intelligence is transforming how businesses operate. This comprehensive guide explores the latest trends and practical applications of AI in modern enterprises.', 'Discover how AI is reshaping business operations and creating new opportunities for growth.', 1, 1, 0, NULL, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 8, 'published', NULL, NOW(), NOW(), NOW(), 'exp1', 'AI,Technology,Innovation', 'Global,North America'),
('ins2', 'Healthcare Digital Transformation Guide', 'healthcare-digital-transformation', 'Report', 'A complete guide to digital transformation in healthcare, covering telemedicine, AI diagnostics, and patient data management.', 'Learn how healthcare organizations are leveraging technology to improve patient outcomes.', 1, 0, 0, NULL, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', 12, 'published', NULL, NOW(), NOW(), NOW(), 'exp2', 'Healthcare,Digital,Innovation', 'Global,Europe');

-- ========================================
-- 5. Seed JACOM Industries
-- ========================================

INSERT IGNORE INTO `industry` (`id`, `name`, `slug`, `description`, `overview`, `challenges`, `trends`, `featured`, `image`, `createdAt`, `updatedAt`) VALUES
('ind1', 'Management Consulting', 'management-consulting', 'Strategic consulting for digital transformation and business growth in Japan', 'JACOM provides comprehensive management consulting services focusing on digital transformation (DX), ESG initiatives, and PMO services. We support Japanese companies in developing growth strategies and navigating the evolving consulting market with expertise in AI, IoT, and system integration.', '[\"Digital transformation adoption\", \"ESG compliance and reporting\", \"Project management efficiency\", \"Generative AI integration\", \"Global expansion strategies\"]', '[\"AI-driven consulting\", \"Sustainability focus\", \"Remote consulting models\", \"Data-driven decision making\", \"Cross-border collaboration\"]', 1, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', NOW(), NOW()),
('ind2', 'Technology & IoT Solutions', 'technology-iot', 'IoT platform and electromechanical system integration services', 'JACOM specializes in IoT e-commerce platforms and electromechanical system integration. We provide innovative solutions for smart devices, system standardization, and engineering consulting for consumers and manufacturers. Our platform infrastructure enables low-cost system integration with secured IoT software applications.', '[\"System integration complexity\", \"IoT security standards\", \"Device interoperability\", \"Cost optimization\", \"Technology adoption barriers\"]', '[\"Smart device proliferation\", \"Edge computing\", \"5G connectivity\", \"AI-powered automation\", \"Cloud-native architectures\"]', 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', NOW(), NOW()),
('ind3', 'Hospitality & Tourism', 'hospitality-tourism', 'Recruitment and training services for hospitality professionals', 'Through our partnership with Nepal recruitment agencies, JACOM facilitates the deployment of qualified hospitality professionals to Japan. We provide comprehensive training including Japanese language proficiency (JLPT N3/N4), cultural orientation, and industry-specific technical skills for hotel services, culinary arts, and hospitality management.', '[\"Skilled labor shortage\", \"Cultural adaptation\", \"Language barriers\", \"Quality standards maintenance\", \"Visa and immigration processes\"]', '[\"International workforce mobility\", \"Digital hospitality services\", \"Sustainable tourism\", \"Experience-driven services\", \"Health and safety protocols\"]', 1, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', NOW(), NOW()),
('ind4', 'IT Services & Software Development', 'it-services', 'Software development and IT professional recruitment for Japanese market', 'JACOM connects IT professionals with opportunities in Japan, focusing on software engineers, data scientists, and cybersecurity experts. We support J-Find visa holders and provide training in programming (Java, Python, C++), database management, and cloud computing to meet Japan\'s growing demand for digital talent.', '[\"Tech talent shortage\", \"Rapid technology evolution\", \"Cybersecurity threats\", \"Legacy system modernization\", \"Remote work infrastructure\"]', '[\"AI and machine learning\", \"Cloud-first strategies\", \"DevOps automation\", \"Low-code platforms\", \"Quantum computing readiness\"]', 0, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800', NOW(), NOW()),
('ind5', 'Manufacturing & Industry 4.0', 'manufacturing', 'Smart factory solutions and industrial automation consulting', 'JACOM delivers Industry 4.0 transformation through IoT integration, predictive maintenance, and smart factory design. We specialize in production management, quality control systems, and mechanical design with expertise in sensors, actuators, robotics, and embedded systems for manufacturing excellence.', '[\"Supply chain disruptions\", \"Automation investment costs\", \"Skills gap in workforce\", \"Quality control consistency\", \"Sustainability requirements\"]', '[\"Smart factories\", \"Digital twins\", \"Predictive maintenance\", \"Collaborative robots\", \"Sustainable manufacturing\"]', 0, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800', NOW(), NOW()),
('ind6', 'Education & Training', 'education-training', 'Professional development and technical training programs', 'JACOM offers customized training programs including web development bootcamps, technical skills training, and professional certifications. We provide both online live sessions and face-to-face training in HTML, CSS, JavaScript, React, and Node.js, supporting career development for international professionals seeking opportunities in Japan.', '[\"Digital literacy gaps\", \"Curriculum relevance\", \"Student engagement\", \"Certification standards\", \"Access to quality education\"]', '[\"EdTech platforms\", \"Hybrid learning models\", \"Micro-credentials\", \"Personalized learning paths\", \"Industry-aligned curricula\"]', 0, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', NOW(), NOW()),
('ind7', 'Energy & Utilities', 'energy-utilities', 'Renewable energy systems and smart grid solutions', 'JACOM provides renewable energy consulting including solar and wind power generation equipment design, VPP and EMS system innovation, and smart grid infrastructure. We specialize in energy management systems, remote monitoring, and control automation for sustainable energy transition.', '[\"Grid modernization costs\", \"Renewable integration\", \"Energy storage solutions\", \"Regulatory compliance\", \"Asset optimization\"]', '[\"Clean energy transition\", \"Smart grids\", \"Energy storage systems\", \"Carbon neutrality goals\", \"Distributed energy resources\"]', 0, 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800', NOW(), NOW()),
('ind8', 'Real Estate & Infrastructure', 'real-estate-infrastructure', 'Smart building systems and infrastructure development', 'JACOM designs intelligent building systems including access control, security surveillance, electrical equipment, and utility systems. We provide comprehensive infrastructure solutions for hotels, hospitals, and commercial facilities with focus on energy efficiency, safety, and operational excellence.', '[\"Aging infrastructure\", \"Smart building integration\", \"Energy efficiency standards\", \"Security requirements\", \"Maintenance costs\"]', '[\"Smart buildings\", \"Green construction\", \"IoT-enabled facilities\", \"Predictive maintenance\", \"Sustainable design\"]', 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', NOW(), NOW()),
('ind9', 'Financial Services & Investment', 'financial-services', 'Financial advisory and investment consulting', 'JACOM offers financial consulting services including tax management, asset management, risk assessment, and investment policy development. We provide expertise in banking services, portfolio management, and ESG investment strategies to support business growth and financial sustainability.', '[\"Regulatory complexity\", \"Market volatility\", \"Digital disruption\", \"Risk management\", \"ESG compliance\"]', '[\"Fintech innovation\", \"ESG investing\", \"Digital currencies\", \"Robo-advisory\", \"Open banking\"]', 0, 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800', NOW(), NOW());

-- ========================================
-- 6. Seed JACOM Services
-- ========================================

INSERT IGNORE INTO `service` (`id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
('srv1', 'Digital Transformation & DX Consulting', 'digital-transformation', 'Comprehensive DX strategy and implementation for Japanese enterprises', 'JACOM provides end-to-end digital transformation consulting focusing on AI, IoT, and generative AI integration. We help Japanese companies navigate Industry 4.0 and achieve operational excellence through technology adoption.', '[\"Agile transformation\", \"Design thinking\", \"Lean methodology\", \"Change management\"]', '[\"AI/ML platforms\", \"IoT systems\", \"Cloud infrastructure\", \"Data analytics tools\"]', 1, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'published', NOW(), NOW()),
('srv2', 'IoT Platform & System Integration', 'iot-platform', 'IoT e-commerce platform and electromechanical system integration', 'Specialized IoT platform development and system integration services. We standardize smart device communication protocols and provide low-cost integration solutions for manufacturers and consumers.', '[\"System architecture design\", \"API integration\", \"Protocol standardization\", \"Security implementation\"]', '[\"IoT sensors\", \"Edge computing\", \"5G networks\", \"Cloud platforms\"]', 1, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', 'published', NOW(), NOW()),
('srv3', 'Recruitment & Training Services', 'recruitment-training', 'International workforce recruitment and professional training programs', 'Comprehensive recruitment services connecting Nepal and Japan for hospitality and IT professionals. Includes Japanese language training (JLPT N3/N4), cultural orientation, and technical skills development.', '[\"Candidate screening\", \"Skills assessment\", \"Cultural training\", \"Language proficiency\"]', '[\"JLPT preparation\", \"Technical training platforms\", \"Virtual interviews\", \"Onboarding systems\"]', 1, 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 'published', NOW(), NOW()),
('srv4', 'Smart Factory & Industry 4.0', 'smart-factory', 'Industrial automation and smart manufacturing solutions', 'Design and implementation of smart factory systems with IoT integration, predictive maintenance, and production optimization. Expertise in sensors, actuators, robotics, and embedded systems.', '[\"Factory automation\", \"Process optimization\", \"Quality control\", \"Predictive analytics\"]', '[\"Industrial IoT\", \"Robotics\", \"SCADA systems\", \"MES platforms\"]', 0, 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800', 'published', NOW(), NOW()),
('srv5', 'Renewable Energy Systems', 'renewable-energy', 'Solar, wind power generation and smart grid solutions', 'Renewable energy consulting including equipment design, VPP and EMS system innovation, remote monitoring, and control automation for sustainable energy transition.', '[\"Energy assessment\", \"System design\", \"Grid integration\", \"Performance monitoring\"]', '[\"Solar PV systems\", \"Wind turbines\", \"Energy storage\", \"Smart meters\"]', 0, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 'published', NOW(), NOW()),
('srv6', 'Smart Building & Infrastructure', 'smart-building', 'Intelligent building systems and security solutions', 'Design of smart building systems including access control, security surveillance, electrical equipment, and utility systems for hotels, hospitals, and commercial facilities.', '[\"Building automation\", \"Security design\", \"Energy management\", \"Facility optimization\"]', '[\"Access control systems\", \"CCTV\", \"BMS platforms\", \"IoT sensors\"]', 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', 'published', NOW(), NOW()),
('srv7', 'Web Development Training', 'web-development-training', 'Professional web development bootcamps and certifications', 'Comprehensive training programs in HTML, CSS, JavaScript, React, and Node.js. Both online live sessions and face-to-face training for career development in Japan.', '[\"Project-based learning\", \"Hands-on coding\", \"Portfolio development\", \"Job placement support\"]', '[\"VS Code\", \"Git/GitHub\", \"React\", \"Node.js\", \"MongoDB\"]', 0, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', 'published', NOW(), NOW()),
('srv8', 'Financial Advisory & Investment', 'financial-advisory', 'Tax management, asset management, and ESG investment consulting', 'Financial consulting services including tax management, asset management, risk assessment, and ESG investment strategies to support business growth and sustainability.', '[\"Financial planning\", \"Risk assessment\", \"Portfolio management\", \"ESG analysis\"]', '[\"Financial modeling tools\", \"Risk management software\", \"Portfolio trackers\", \"ESG metrics\"]', 0, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'published', NOW(), NOW()),
('srv9', 'Project Management Office (PMO)', 'pmo-services', 'PMO setup and project management consulting', 'Establish and optimize Project Management Offices for Japanese enterprises. Support for project planning, progress tracking, resource allocation, and risk management.', '[\"PMO framework\", \"Agile/Scrum\", \"Risk management\", \"Stakeholder management\"]', '[\"Project management software\", \"Collaboration tools\", \"Reporting dashboards\", \"Resource planning\"]', 0, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'published', NOW(), NOW());

-- ========================================
-- 7. Seed Office data
-- ========================================

INSERT IGNORE INTO `office` (`id`, `name`, `slug`, `region`, `country`, `city`, `address`, `phone`, `email`, `lat`, `lng`, `image`, `createdAt`, `updatedAt`) VALUES
('off1', 'New York Office', 'new-york', 'North America', 'United States', 'New York', '123 Fifth Avenue, New York, NY 10001', '+1 (212) 555-0100', 'newyork@example.com', 40.7484, -73.9857, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', NOW(), NOW()),
('off2', 'London Office', 'london', 'Europe', 'United Kingdom', 'London', '1 Canary Wharf, London E14 5AB', '+44 20 7946 0958', 'london@example.com', 51.5074, -0.1278, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', NOW(), NOW()),
('off3', 'Singapore Office', 'singapore', 'Asia Pacific', 'Singapore', 'Singapore', '1 Marina Boulevard, Singapore 018989', '+65 6123 4567', 'singapore@example.com', 1.2789, 103.8508, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', NOW(), NOW());

-- ========================================
-- 8. Seed Career data
-- ========================================

INSERT IGNORE INTO `career` (`id`, `title`, `slug`, `department`, `location`, `type`, `experience`, `description`, `requirements`, `benefits`, `featured`, `publishedAt`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
('car1', 'Senior Consultant', 'senior-consultant', 'Consulting', 'New York, NY', 'Full-time', '5-7 years', 'Join our team as a Senior Consultant and help leading organizations solve their most complex challenges.', 'MBA or equivalent, 5+ years consulting experience, strong analytical skills', 'Competitive salary, health insurance, 401k, flexible work', 1, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), NOW(), NOW()),
('car2', 'Data Scientist', 'data-scientist', 'Analytics', 'San Francisco, CA', 'Full-time', '3-5 years', 'We are seeking a talented Data Scientist to join our analytics practice.', 'MS in Data Science or related field, Python/R proficiency, ML experience', 'Competitive salary, stock options, health benefits, remote work', 1, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), NOW(), NOW());

-- ========================================
-- 9. Create admin user (password: Jacom123@)
-- ========================================

DELETE FROM `user` WHERE email IN ('admin@example.com', 'admin@jacom.com');

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('usr_admin', 'admin@jacom.com', '$2b$10$OI.VCigQUr2fllJ4QaZCOel9xkrvg3WUM3P.H1a6b2c5Z4ooINkR2', 'JACOM Admin', 'admin', NOW(), NOW());

-- ========================================
-- COMPLETE! Database is ready to use.
-- ========================================
