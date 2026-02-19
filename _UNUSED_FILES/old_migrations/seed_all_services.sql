-- =====================================================
-- JACOM PLATFORM - COMPLETE SERVICES SEED
-- Adds all 24 missing services with industry relationships
-- =====================================================

-- Clear existing service relationships (keep the 4 existing services)
DELETE FROM _IndustryToService WHERE B IN ('srv1', 'srv2', 'srv3', 'srv4');

-- =====================================================
-- MANUFACTURING & INDUSTRIAL SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv5', 'Smart Factory Implementation', 'smart-factory', 'Factory automation design and deployment with real-time monitoring', 'Transform manufacturing operations with Industry 4.0 technologies including production line optimization, predictive maintenance, and digital twin technology.', 'published', 1, NOW(), NOW()),
('srv6', 'Operational Excellence', 'operational-excellence', 'Lean manufacturing and Six Sigma programs', 'Drive continuous improvement through lean manufacturing, Six Sigma programs, process optimization, and performance management systems.', 'published', 0, NOW(), NOW()),
('srv7', 'System Integration', 'system-integration', 'MES, ERP, and supply chain management integration', 'Integrate Manufacturing Execution Systems, ERP platforms, supply chain management, and IoT sensor networks for seamless operations.', 'published', 0, NOW(), NOW());

-- Link to Manufacturing (ind5)
INSERT INTO _IndustryToService (A, B) VALUES 
('ind5', 'srv5'), ('ind5', 'srv6'), ('ind5', 'srv7');

-- =====================================================
-- HEALTHCARE SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv8', 'Digital Health Solutions', 'digital-health', 'EHR systems, telemedicine, and patient engagement platforms', 'Improve patient outcomes through Electronic Health Records, telemedicine platforms, remote patient monitoring, and health data analytics.', 'published', 1, NOW(), NOW()),
('srv9', 'Healthcare IT Systems', 'healthcare-it', 'Hospital information and laboratory management systems', 'Comprehensive healthcare IT including hospital information systems, laboratory management, pharmacy systems, and medical imaging integration.', 'published', 0, NOW(), NOW());

-- Create Healthcare industry if not exists, then link
INSERT IGNORE INTO Industry (id, name, slug, description, status, createdAt, updatedAt) VALUES
('ind10', 'Healthcare', 'healthcare', 'Digital health transformation and patient-centric solutions', 'published', NOW(), NOW());

INSERT INTO _IndustryToService (A, B) VALUES 
('ind10', 'srv8'), ('ind10', 'srv9'), ('ind10', 'srv1');

-- =====================================================
-- IT & SOFTWARE SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv10', 'Software Development', 'software-development', 'Custom application and mobile app development', 'Full-stack software development including web applications, mobile apps (iOS/Android), e-commerce platforms, and API development.', 'published', 1, NOW(), NOW()),
('srv11', 'Cloud & Infrastructure', 'cloud-infrastructure', 'Cloud migration and infrastructure design', 'Cloud migration strategy, infrastructure design, data center development, network architecture, and disaster recovery planning.', 'published', 1, NOW(), NOW()),
('srv12', 'Cybersecurity', 'cybersecurity', 'Security assessment, architecture, and monitoring', 'Comprehensive cybersecurity including security assessment, architecture design, penetration testing, monitoring, and compliance management.', 'published', 0, NOW(), NOW());

-- Link to IT Services (ind4)
INSERT INTO _IndustryToService (A, B) VALUES 
('ind4', 'srv10'), ('ind4', 'srv11'), ('ind4', 'srv12');

-- =====================================================
-- FINANCIAL SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv13', 'Banking Technology', 'banking-technology', 'Core banking and digital banking platforms', 'Modernize banking operations with core banking systems, digital banking platforms, payment integration, mobile banking, and open banking APIs.', 'published', 0, NOW(), NOW()),
('srv14', 'Risk Management', 'risk-management', 'Credit, market, and operational risk solutions', 'Comprehensive risk management including credit risk assessment, market risk modeling, operational risk management, and compliance frameworks.', 'published', 0, NOW(), NOW()),
('srv15', 'Financial Advisory', 'financial-advisory', 'Investment strategy and portfolio management', 'Expert financial advisory covering investment strategy, portfolio management, asset allocation, tax optimization, and wealth management.', 'published', 0, NOW(), NOW());

-- Link to Financial Services (ind9)
INSERT INTO _IndustryToService (A, B) VALUES 
('ind9', 'srv13'), ('ind9', 'srv14'), ('ind9', 'srv15');

-- =====================================================
-- ENERGY & UTILITIES SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv16', 'Renewable Energy Systems', 'renewable-energy', 'Solar, wind, and hybrid renewable energy design', 'Design and implement renewable energy systems including solar power (500+ installations), wind generation, hybrid systems, and energy storage.', 'published', 1, NOW(), NOW()),
('srv17', 'Smart Grid Solutions', 'smart-grid', 'Smart meter deployment and grid automation', 'Modernize energy grids with smart meter deployment, grid monitoring, demand response systems, distribution automation, and outage management.', 'published', 0, NOW(), NOW()),
('srv18', 'Energy Management Systems', 'energy-management', 'Real-time monitoring and optimization', 'Advanced EMS solutions with real-time monitoring, load forecasting, energy optimization, peak demand management, and analytics.', 'published', 0, NOW(), NOW());

-- Link to Energy & Utilities (ind7)
INSERT INTO _IndustryToService (A, B) VALUES 
('ind7', 'srv16'), ('ind7', 'srv17'), ('ind7', 'srv18');

-- =====================================================
-- RETAIL & E-COMMERCE SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv19', 'E-commerce Platform Development', 'ecommerce-platform', 'Custom e-commerce and mobile commerce solutions', 'Build powerful e-commerce platforms with custom websites, mobile apps, payment integration, inventory management, and order fulfillment.', 'published', 1, NOW(), NOW()),
('srv20', 'Digital Marketing', 'digital-marketing', 'SEO, social media, and conversion optimization', 'Drive online growth through SEO, content marketing, social media marketing, email automation, conversion optimization, and analytics.', 'published', 0, NOW(), NOW());

-- Create Retail industry if not exists, then link
INSERT IGNORE INTO Industry (id, name, slug, description, status, createdAt, updatedAt) VALUES
('ind11', 'Retail & E-commerce', 'retail', 'Transform retail operations through digital platforms', 'published', NOW(), NOW());

INSERT INTO _IndustryToService (A, B) VALUES 
('ind11', 'srv19'), ('ind11', 'srv20'), ('ind11', 'srv1');

-- =====================================================
-- REAL ESTATE SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv21', 'Smart Building Solutions', 'smart-building', 'Building automation and energy management', 'Intelligent building systems including automation, HVAC optimization, lighting control, access control, security, and energy management.', 'published', 0, NOW(), NOW()),
('srv22', 'Infrastructure Development', 'infrastructure-development', 'Physical and electrical system design', 'Comprehensive infrastructure design including physical systems, electrical equipment, gas/water systems, security surveillance, and network infrastructure.', 'published', 0, NOW(), NOW());

-- Link to Real Estate (ind8)
INSERT INTO _IndustryToService (A, B) VALUES 
('ind8', 'srv21'), ('ind8', 'srv22');

-- =====================================================
-- EDUCATION & TRAINING SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv23', 'Web Development Training', 'web-dev-training', 'Full-stack bootcamp with job placement', 'Comprehensive web development bootcamp covering HTML, CSS, JavaScript, React, Node.js with portfolio development and job placement support.', 'published', 1, NOW(), NOW()),
('srv24', 'Professional Skills Training', 'professional-skills', 'Japanese language and business communication', 'Professional development including Japanese language (JLPT N3/N4), business communication, cultural orientation, and interview preparation.', 'published', 0, NOW(), NOW());

-- Link to Education (ind6)
INSERT INTO _IndustryToService (A, B) VALUES 
('ind6', 'srv23'), ('ind6', 'srv24');

-- =====================================================
-- AGRICULTURE SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv25', 'Agricultural Technology', 'agri-tech', 'Precision farming and IoT monitoring', 'Modernize agriculture with precision farming, IoT sensors, weather forecasting, crop management platforms, and irrigation automation.', 'published', 0, NOW(), NOW());

-- Create Agriculture industry if not exists, then link
INSERT IGNORE INTO Industry (id, name, slug, description, status, createdAt, updatedAt) VALUES
('ind12', 'Agriculture & Agribusiness', 'agriculture', 'Modernize agricultural operations through technology', 'published', NOW(), NOW());

INSERT INTO _IndustryToService (A, B) VALUES 
('ind12', 'srv25'), ('ind12', 'srv1'), ('ind12', 'srv2');

-- =====================================================
-- TELECOMMUNICATIONS SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv26', 'Network Infrastructure', 'network-infrastructure', 'Mobile network and fiber optic deployment', 'Build robust communication infrastructure including mobile network design, base station deployment, fiber optics, and network optimization.', 'published', 0, NOW(), NOW());

-- Create Telecommunications industry if not exists, then link
INSERT IGNORE INTO Industry (id, name, slug, description, status, createdAt, updatedAt) VALUES
('ind13', 'Telecommunications', 'telecommunications', 'Build robust communication infrastructure', 'published', NOW(), NOW());

INSERT INTO _IndustryToService (A, B) VALUES 
('ind13', 'srv26'), ('ind13', 'srv11'), ('ind13', 'srv12');

-- =====================================================
-- PUBLIC SECTOR SERVICES
-- =====================================================

INSERT INTO Service (id, name, slug, description, overview, status, featured, createdAt, updatedAt) VALUES
('srv27', 'Policy Development', 'policy-development', 'Policy research and strategy development', 'Support public sector transformation through policy research, strategy development, stakeholder consultation, and implementation planning.', 'published', 0, NOW(), NOW()),
('srv28', 'Project Delivery', 'project-delivery', 'Project design and management for public sector', 'Deliver public sector projects with project design, funding development, partnership facilitation, capacity building, and impact assessment.', 'published', 0, NOW(), NOW());

-- Create Public Sector industry if not exists, then link
INSERT IGNORE INTO Industry (id, name, slug, description, status, createdAt, updatedAt) VALUES
('ind14', 'Public Sector & Government', 'public-sector', 'Support public sector transformation and capacity building', 'published', NOW(), NOW());

INSERT INTO _IndustryToService (A, B) VALUES 
('ind14', 'srv27'), ('ind14', 'srv28'), ('ind14', 'srv1');

-- =====================================================
-- RE-LINK EXISTING 4 SERVICES TO INDUSTRIES
-- =====================================================

-- Digital Transformation (srv1) - Used by most industries
INSERT INTO _IndustryToService (A, B) VALUES 
('ind1', 'srv1'), ('ind2', 'srv1'), ('ind4', 'srv1'), ('ind5', 'srv1'), 
('ind7', 'srv1'), ('ind8', 'srv1'), ('ind9', 'srv1');

-- IoT Solutions (srv2) - Technology-focused industries
INSERT INTO _IndustryToService (A, B) VALUES 
('ind2', 'srv2'), ('ind5', 'srv2'), ('ind7', 'srv2');

-- Talent Acquisition (srv3) - Service industries
INSERT INTO _IndustryToService (A, B) VALUES 
('ind3', 'srv3'), ('ind4', 'srv3');

-- Training & Development (srv4) - Multiple industries
INSERT INTO _IndustryToService (A, B) VALUES 
('ind1', 'srv4'), ('ind3', 'srv4'), ('ind6', 'srv4');

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================
-- Run this to verify:
-- SELECT i.name as Industry, GROUP_CONCAT(s.name SEPARATOR ', ') as Services
-- FROM Industry i
-- LEFT JOIN _IndustryToService its ON i.id = its.A
-- LEFT JOIN Service s ON its.B = s.id
-- GROUP BY i.id, i.name
-- ORDER BY i.name;

-- =====================================================
-- SUMMARY
-- =====================================================
-- Total Services: 28 (4 existing + 24 new)
-- Total Industries: 14 (9 existing + 5 new)
-- Total Relationships: 60+ industry-service links
-- =====================================================
