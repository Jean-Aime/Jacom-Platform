-- =====================================================
-- JACOM PLATFORM - COMPLETE SERVICES SEED
-- Adds all 24 missing services with industry relationships
-- =====================================================

DELETE FROM _IndustryToService WHERE B IN ('srv1', 'srv2', 'srv3', 'srv4');

-- MANUFACTURING SERVICES
INSERT INTO Service (id, name, slug, description, overview, featured, createdAt, updatedAt) VALUES
('srv5', 'Smart Factory Implementation', 'smart-factory', 'Factory automation design and deployment with real-time monitoring', 'Transform manufacturing operations with Industry 4.0 technologies including production line optimization, predictive maintenance, and digital twin technology.', 1, NOW(), NOW()),
('srv6', 'Operational Excellence', 'operational-excellence', 'Lean manufacturing and Six Sigma programs', 'Drive continuous improvement through lean manufacturing, Six Sigma programs, process optimization, and performance management systems.', 0, NOW(), NOW()),
('srv7', 'System Integration', 'system-integration', 'MES, ERP, and supply chain management integration', 'Integrate Manufacturing Execution Systems, ERP platforms, supply chain management, and IoT sensor networks for seamless operations.', 0, NOW(), NOW()),
('srv8', 'Digital Health Solutions', 'digital-health', 'EHR systems, telemedicine, and patient engagement platforms', 'Improve patient outcomes through Electronic Health Records, telemedicine platforms, remote patient monitoring, and health data analytics.', 1, NOW(), NOW()),
('srv9', 'Healthcare IT Systems', 'healthcare-it', 'Hospital information and laboratory management systems', 'Comprehensive healthcare IT including hospital information systems, laboratory management, pharmacy systems, and medical imaging integration.', 0, NOW(), NOW()),
('srv10', 'Software Development', 'software-development', 'Custom application and mobile app development', 'Full-stack software development including web applications, mobile apps (iOS/Android), e-commerce platforms, and API development.', 1, NOW(), NOW()),
('srv11', 'Cloud & Infrastructure', 'cloud-infrastructure', 'Cloud migration and infrastructure design', 'Cloud migration strategy, infrastructure design, data center development, network architecture, and disaster recovery planning.', 1, NOW(), NOW()),
('srv12', 'Cybersecurity', 'cybersecurity', 'Security assessment, architecture, and monitoring', 'Comprehensive cybersecurity including security assessment, architecture design, penetration testing, monitoring, and compliance management.', 0, NOW(), NOW()),
('srv13', 'Banking Technology', 'banking-technology', 'Core banking and digital banking platforms', 'Modernize banking operations with core banking systems, digital banking platforms, payment integration, mobile banking, and open banking APIs.', 0, NOW(), NOW()),
('srv14', 'Risk Management', 'risk-management', 'Credit, market, and operational risk solutions', 'Comprehensive risk management including credit risk assessment, market risk modeling, operational risk management, and compliance frameworks.', 0, NOW(), NOW()),
('srv15', 'Financial Advisory', 'financial-advisory', 'Investment strategy and portfolio management', 'Expert financial advisory covering investment strategy, portfolio management, asset allocation, tax optimization, and wealth management.', 0, NOW(), NOW()),
('srv16', 'Renewable Energy Systems', 'renewable-energy', 'Solar, wind, and hybrid renewable energy design', 'Design and implement renewable energy systems including solar power (500+ installations), wind generation, hybrid systems, and energy storage.', 1, NOW(), NOW()),
('srv17', 'Smart Grid Solutions', 'smart-grid', 'Smart meter deployment and grid automation', 'Modernize energy grids with smart meter deployment, grid monitoring, demand response systems, distribution automation, and outage management.', 0, NOW(), NOW()),
('srv18', 'Energy Management Systems', 'energy-management', 'Real-time monitoring and optimization', 'Advanced EMS solutions with real-time monitoring, load forecasting, energy optimization, peak demand management, and analytics.', 0, NOW(), NOW()),
('srv19', 'E-commerce Platform Development', 'ecommerce-platform', 'Custom e-commerce and mobile commerce solutions', 'Build powerful e-commerce platforms with custom websites, mobile apps, payment integration, inventory management, and order fulfillment.', 1, NOW(), NOW()),
('srv20', 'Digital Marketing', 'digital-marketing', 'SEO, social media, and conversion optimization', 'Drive online growth through SEO, content marketing, social media marketing, email automation, conversion optimization, and analytics.', 0, NOW(), NOW()),
('srv21', 'Smart Building Solutions', 'smart-building', 'Building automation and energy management', 'Intelligent building systems including automation, HVAC optimization, lighting control, access control, security, and energy management.', 0, NOW(), NOW()),
('srv22', 'Infrastructure Development', 'infrastructure-development', 'Physical and electrical system design', 'Comprehensive infrastructure design including physical systems, electrical equipment, gas/water systems, security surveillance, and network infrastructure.', 0, NOW(), NOW()),
('srv23', 'Web Development Training', 'web-dev-training', 'Full-stack bootcamp with job placement', 'Comprehensive web development bootcamp covering HTML, CSS, JavaScript, React, Node.js with portfolio development and job placement support.', 1, NOW(), NOW()),
('srv24', 'Professional Skills Training', 'professional-skills', 'Japanese language and business communication', 'Professional development including Japanese language (JLPT N3/N4), business communication, cultural orientation, and interview preparation.', 0, NOW(), NOW()),
('srv25', 'Agricultural Technology', 'agri-tech', 'Precision farming and IoT monitoring', 'Modernize agriculture with precision farming, IoT sensors, weather forecasting, crop management platforms, and irrigation automation.', 0, NOW(), NOW()),
('srv26', 'Network Infrastructure', 'network-infrastructure', 'Mobile network and fiber optic deployment', 'Build robust communication infrastructure including mobile network design, base station deployment, fiber optics, and network optimization.', 0, NOW(), NOW()),
('srv27', 'Policy Development', 'policy-development', 'Policy research and strategy development', 'Support public sector transformation through policy research, strategy development, stakeholder consultation, and implementation planning.', 0, NOW(), NOW()),
('srv28', 'Project Delivery', 'project-delivery', 'Project design and management for public sector', 'Deliver public sector projects with project design, funding development, partnership facilitation, capacity building, and impact assessment.', 0, NOW(), NOW());

-- NEW INDUSTRIES
INSERT IGNORE INTO Industry (id, name, slug, description, createdAt, updatedAt) VALUES
('ind10', 'Healthcare', 'healthcare', 'Digital health transformation and patient-centric solutions', NOW(), NOW()),
('ind11', 'Retail & E-commerce', 'retail', 'Transform retail operations through digital platforms', NOW(), NOW()),
('ind12', 'Agriculture & Agribusiness', 'agriculture', 'Modernize agricultural operations through technology', NOW(), NOW()),
('ind13', 'Telecommunications', 'telecommunications', 'Build robust communication infrastructure', NOW(), NOW()),
('ind14', 'Public Sector & Government', 'public-sector', 'Support public sector transformation and capacity building', NOW(), NOW());

-- LINK SERVICES TO INDUSTRIES
INSERT INTO _IndustryToService (A, B) VALUES 
-- Management Consulting
('ind1', 'srv1'), ('ind1', 'srv4'),
-- Technology & IoT
('ind2', 'srv1'), ('ind2', 'srv2'),
-- Hospitality
('ind3', 'srv3'), ('ind3', 'srv4'),
-- IT Services
('ind4', 'srv1'), ('ind4', 'srv3'), ('ind4', 'srv10'), ('ind4', 'srv11'), ('ind4', 'srv12'),
-- Manufacturing
('ind5', 'srv1'), ('ind5', 'srv2'), ('ind5', 'srv5'), ('ind5', 'srv6'), ('ind5', 'srv7'),
-- Education
('ind6', 'srv4'), ('ind6', 'srv23'), ('ind6', 'srv24'),
-- Energy
('ind7', 'srv1'), ('ind7', 'srv2'), ('ind7', 'srv16'), ('ind7', 'srv17'), ('ind7', 'srv18'),
-- Real Estate
('ind8', 'srv1'), ('ind8', 'srv21'), ('ind8', 'srv22'),
-- Financial Services
('ind9', 'srv1'), ('ind9', 'srv13'), ('ind9', 'srv14'), ('ind9', 'srv15'),
-- Healthcare
('ind10', 'srv1'), ('ind10', 'srv8'), ('ind10', 'srv9'),
-- Retail
('ind11', 'srv1'), ('ind11', 'srv19'), ('ind11', 'srv20'),
-- Agriculture
('ind12', 'srv1'), ('ind12', 'srv2'), ('ind12', 'srv25'),
-- Telecommunications
('ind13', 'srv11'), ('ind13', 'srv12'), ('ind13', 'srv26'),
-- Public Sector
('ind14', 'srv1'), ('ind14', 'srv27'), ('ind14', 'srv28');
