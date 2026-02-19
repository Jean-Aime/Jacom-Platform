-- Seed Case Studies Data
USE jas_consulting;

-- Create CaseStudy table if not exists
CREATE TABLE IF NOT EXISTS CaseStudy (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    company VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    quote TEXT,
    author VARCHAR(255),
    authorRole VARCHAR(255),
    image TEXT,
    featured BOOLEAN DEFAULT 0,
    status ENUM('draft', 'published') DEFAULT 'published',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clear existing data
DELETE FROM CaseStudy;

-- Insert Case Studies from MD file
INSERT INTO CaseStudy (id, title, slug, company, industry, challenge, solution, results, quote, author, authorRole, image, featured, status) VALUES
('cs1', 'Smart Factory Implementation', 'smart-factory-implementation', 'Manufacturing Company', 'Manufacturing', 
'Low production efficiency, high defect rates, frequent equipment downtime, and limited real-time visibility were major challenges affecting operational performance.',
'Deployed IoT sensor network, implemented real-time monitoring system, predictive maintenance, quality control automation, and data analytics platform.',
'40% efficiency improvement, 30% reduction in defects, 25% decrease in downtime, $2M annual cost savings. Technologies: Industrial IoT sensors, SCADA systems, Machine learning algorithms, Cloud-based analytics.',
'The IoT implementation transformed our operations. Real-time visibility and predictive maintenance have been game-changers for our production efficiency.',
'Operations Director',
'Manufacturing Company',
'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
1, 'published'),

('cs2', 'Renewable Energy System Design', 'renewable-energy-system', 'Energy Company', 'Energy & Utilities',
'High energy costs, unreliable grid power, carbon emission targets, and limited technical expertise posed significant challenges for sustainable operations.',
'Designed solar power systems, integrated battery storage, implemented energy management system, grid integration, and comprehensive staff training program.',
'500+ installations completed, 50% energy cost reduction, 60% carbon footprint reduction, energy independence achieved. Technologies: Solar PV systems, Li-ion battery storage, Smart inverters, IoT monitoring platform.',
'JACOM helped us achieve energy independence while significantly reducing our carbon footprint. The training program ensured our team could maintain the systems effectively.',
'Sustainability Manager',
'Energy Company',
'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
1, 'published'),

('cs3', 'Nepal-Japan Recruitment Program', 'nepal-japan-recruitment', 'Hospitality Group', 'Hospitality & Tourism',
'Staff shortages, high turnover rates, language barriers, and cultural adaptation issues were impacting service quality and operational efficiency.',
'Established recruitment pipeline from Nepal, provided Japanese language training (JLPT N3/N4), cultural orientation program, cooking training for chefs, and ongoing support services.',
'200+ successful placements, 95% retention rate, enhanced service quality, improved guest satisfaction. Program: 8-day intensive cooking training, 6-month language preparation, Cultural orientation workshops, Visa processing support.',
'The comprehensive training and support from JACOM has been exceptional. Our staff are well-prepared and the retention rate speaks for itself.',
'HR Director',
'Hospitality Group',
'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
1, 'published'),

('cs4', 'Tax Management Empowerment', 'tax-management-empowerment', 'Public Sector Organization', 'Financial Services',
'Complex tax regulations, compliance gaps, limited staff capacity, and manual processes were creating inefficiencies and compliance risks.',
'Implemented tax management framework, staff training program, process automation, compliance monitoring system, and ongoing advisory support.',
'100% compliance achieved, 60% reduction in processing time, enhanced staff capabilities, improved revenue collection.',
'The tax management framework and training transformed our operations. We now have full compliance and significantly improved efficiency.',
'Finance Director',
'Public Sector Organization',
'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
0, 'published'),

('cs5', 'Web Development Training Program', 'web-development-bootcamp', 'Career Transition Candidates', 'Education & Training',
'Career change aspirations, limited technical skills, need for practical experience, and job market competitiveness were barriers to career transformation.',
'Delivered 12-week intensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, Express, portfolio development, and job placement support.',
'85% course completion rate, 90% job placement rate, average salary increase of 150%, career transformation achieved. Program Phases: HTML/CSS/Bootstrap, JavaScript fundamentals, Full-stack development.',
'The bootcamp completely transformed my career. The hands-on approach and job placement support made all the difference.',
'Program Graduate',
'Career Transition Candidate',
'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
0, 'published');

SELECT 'Case Studies seeded successfully!' as status;
SELECT COUNT(*) as total_case_studies FROM CaseStudy;
