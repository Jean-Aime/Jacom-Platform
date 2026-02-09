-- Seed Expert data
INSERT INTO `expert` (`id`, `name`, `slug`, `role`, `bio`, `expertise`, `locations`, `image`, `email`, `linkedin`, `featured`, `createdAt`, `updatedAt`) VALUES
('exp1', 'John Smith', 'john-smith', 'Senior Partner', 'Leading expert in digital transformation with 20+ years of experience', 'Digital Transformation, AI, Cloud', 'New York, London', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'john.smith@example.com', 'https://linkedin.com/in/johnsmith', 1, NOW(), NOW()),
('exp2', 'Sarah Johnson', 'sarah-johnson', 'Managing Director', 'Specializes in healthcare and life sciences consulting', 'Healthcare, Life Sciences, Strategy', 'Boston, San Francisco', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'sarah.johnson@example.com', 'https://linkedin.com/in/sarahjohnson', 1, NOW(), NOW());

-- Seed Insight data
INSERT INTO `insight` (`id`, `title`, `slug`, `type`, `content`, `excerpt`, `featured`, `trending`, `gated`, `downloadUrl`, `image`, `readTime`, `status`, `scheduledAt`, `publishedAt`, `createdAt`, `updatedAt`, `authorId`, `topics`, `regions`) VALUES
('ins1', 'The Future of AI in Business', 'future-of-ai-in-business', 'Article', 'Artificial Intelligence is transforming how businesses operate. This comprehensive guide explores the latest trends and practical applications of AI in modern enterprises.', 'Discover how AI is reshaping business operations and creating new opportunities for growth.', 1, 1, 0, NULL, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 8, 'published', NULL, NOW(), NOW(), NOW(), 'exp1', 'AI,Technology,Innovation', 'Global,North America'),
('ins2', 'Healthcare Digital Transformation Guide', 'healthcare-digital-transformation', 'Report', 'A complete guide to digital transformation in healthcare, covering telemedicine, AI diagnostics, and patient data management.', 'Learn how healthcare organizations are leveraging technology to improve patient outcomes.', 1, 0, 0, NULL, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', 12, 'published', NULL, NOW(), NOW(), NOW(), 'exp2', 'Healthcare,Digital,Innovation', 'Global,Europe');

-- Seed Industry data
INSERT INTO `industry` (`id`, `name`, `slug`, `description`, `overview`, `challenges`, `trends`, `featured`, `image`, `createdAt`, `updatedAt`) VALUES
('ind1', 'Technology', 'technology', 'Leading technology companies through digital transformation', 'We help technology companies scale, innovate, and stay ahead of market disruption.', 'Rapid innovation cycles, talent acquisition, market competition', 'AI adoption, cloud migration, cybersecurity', 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', NOW(), NOW()),
('ind2', 'Healthcare', 'healthcare', 'Transforming healthcare delivery and patient outcomes', 'Our healthcare practice helps organizations improve patient care while managing costs.', 'Regulatory compliance, cost management, digital adoption', 'Telemedicine, AI diagnostics, value-based care', 1, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', NOW(), NOW()),
('ind3', 'Financial Services', 'financial-services', 'Modernizing financial services for the digital age', 'We partner with financial institutions to drive innovation and operational excellence.', 'Digital disruption, regulatory changes, customer expectations', 'Fintech, blockchain, open banking', 1, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', NOW(), NOW());

-- Seed Service data
INSERT INTO `service` (`id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
('srv1', 'Digital Transformation', 'digital-transformation', 'End-to-end digital transformation services', 'We help organizations reimagine their business models and operations for the digital age.', 'Agile, Design Thinking, Lean', 'Cloud platforms, AI/ML, Analytics', 1, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'published', NOW(), NOW()),
('srv2', 'Strategy Consulting', 'strategy-consulting', 'Strategic planning and execution', 'Our strategy practice helps leaders make bold decisions and achieve sustainable growth.', 'Strategic Planning, Market Analysis, Competitive Intelligence', 'Business Intelligence, Analytics, Forecasting', 1, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'published', NOW(), NOW()),
('srv3', 'Operations Excellence', 'operations-excellence', 'Operational efficiency and optimization', 'We help organizations streamline operations and maximize efficiency.', 'Lean Six Sigma, Process Mining, Automation', 'RPA, Process Analytics, Workflow Tools', 1, 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800', 'published', NOW(), NOW());

-- Seed Office data
INSERT INTO `office` (`id`, `name`, `slug`, `region`, `country`, `city`, `address`, `phone`, `email`, `lat`, `lng`, `image`, `createdAt`, `updatedAt`) VALUES
('off1', 'New York Office', 'new-york', 'North America', 'United States', 'New York', '123 Fifth Avenue, New York, NY 10001', '+1 (212) 555-0100', 'newyork@example.com', 40.7484, -73.9857, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', NOW(), NOW()),
('off2', 'London Office', 'london', 'Europe', 'United Kingdom', 'London', '1 Canary Wharf, London E14 5AB', '+44 20 7946 0958', 'london@example.com', 51.5074, -0.1278, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', NOW(), NOW()),
('off3', 'Singapore Office', 'singapore', 'Asia Pacific', 'Singapore', 'Singapore', '1 Marina Boulevard, Singapore 018989', '+65 6123 4567', 'singapore@example.com', 1.2789, 103.8508, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', NOW(), NOW());

-- Seed Career data
INSERT INTO `career` (`id`, `title`, `slug`, `department`, `location`, `type`, `experience`, `description`, `requirements`, `benefits`, `featured`, `publishedAt`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
('car1', 'Senior Consultant', 'senior-consultant', 'Consulting', 'New York, NY', 'Full-time', '5-7 years', 'Join our team as a Senior Consultant and help leading organizations solve their most complex challenges.', 'MBA or equivalent, 5+ years consulting experience, strong analytical skills', 'Competitive salary, health insurance, 401k, flexible work', 1, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), NOW(), NOW()),
('car2', 'Data Scientist', 'data-scientist', 'Analytics', 'San Francisco, CA', 'Full-time', '3-5 years', 'We are seeking a talented Data Scientist to join our analytics practice.', 'MS in Data Science or related field, Python/R proficiency, ML experience', 'Competitive salary, stock options, health benefits, remote work', 1, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), NOW(), NOW());

-- Create admin user (password: admin123)
INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('usr1', 'admin@example.com', '$2a$10$rKvqLhKJxZjJxJxJxJxJxOqKvqLhKJxZjJxJxJxJxJxOqKvqLhKJx', 'Admin User', 'admin', NOW(), NOW());
