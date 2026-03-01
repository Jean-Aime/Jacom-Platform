-- Replace Services with New 6-Category Structure
-- Run this in MySQL/phpMyAdmin

-- Step 1: Clear existing services and relationships
DELETE FROM _servicetosolution;
DELETE FROM _industrytosolution WHERE B LIKE 'srv%';
DELETE FROM service;

-- Step 2: Insert 6 Main Service Categories
INSERT INTO service (id, name, slug, description, overview, featured, status, createdAt, updatedAt) VALUES
('srv1', 'Financial Advisory Services', 'financial-advisory', 'Comprehensive financial planning, risk assessment, and compliance guidance', 
'Expert financial advisory covering planning and analysis, risk assessment & financial restructuring, tax strategy guidance, cash flow management, financial compliance & governance, and funding & grant advisory services.', 
1, 'published', NOW(), NOW()),

('srv2', 'Procurement & Supply Chain Advisory', 'procurement-supply-chain', 'Strategic procurement planning and supply chain optimization', 
'End-to-end procurement advisory including procurement planning & policy development, vendor sourcing & evaluation, contract negotiation support, cost optimization & value analysis, supply chain efficiency improvement, and procurement compliance & transparency systems.', 
1, 'published', NOW(), NOW()),

('srv3', 'Budget Management & Investment Advisory', 'budget-investment', 'Budget planning, cost control, and investment strategy development', 
'Comprehensive budget and investment advisory covering budget planning and control systems, cost management & financial monitoring, investment strategy development, feasibility studies & ROI analysis, portfolio management guidance, and public & private investment structuring.', 
1, 'published', NOW(), NOW()),

('srv4', 'Information Technology Advisory', 'information-technology', 'Digital transformation and IT infrastructure solutions', 
'Strategic IT advisory including digital transformation strategy, IT infrastructure planning & implementation, cybersecurity & data protection guidance, cloud systems & digital workflow solutions, data management & analytics systems, and smart systems & automation integration.', 
1, 'published', NOW(), NOW()),

('srv5', 'Social Innovation Advisory', 'social-innovation', 'Community development and inclusive economic empowerment', 
'Social impact advisory covering community development program design, inclusive economic empowerment models, youth & women entrepreneurship initiatives, public-private partnership (PPP) models, impact measurement & social value assessment, and policy & governance support for social programs.', 
1, 'published', NOW(), NOW()),

('srv6', 'Agro-Innovation & Sustainable Development Advisory', 'agro-innovation', 'Climate-smart agriculture and sustainable production strategies', 
'Agricultural innovation advisory including climate-smart agriculture solutions, agricultural value chain development, agri-tech & smart farming systems, food security & sustainable production strategies, cooperative & agribusiness development, and post-harvest management & market access strategies.', 
1, 'published', NOW(), NOW());

-- Step 3: Add sub-services as JSON in a new column (if needed for detail pages)
-- We'll store sub-services in the 'methodologies' column as JSON for now

UPDATE service SET methodologies = '["Financial planning and analysis","Risk assessment & financial restructuring","Tax strategy guidance","Cash flow management","Financial compliance & governance","Funding & grant advisory"]' WHERE id = 'srv1';

UPDATE service SET methodologies = '["Procurement planning & policy development","Vendor sourcing & evaluation","Contract negotiation support","Cost optimization & value analysis","Supply chain efficiency improvement","Procurement compliance & transparency systems"]' WHERE id = 'srv2';

UPDATE service SET methodologies = '["Budget planning and control systems","Cost management & financial monitoring","Investment strategy development","Feasibility studies & ROI analysis","Portfolio management guidance","Public & private investment structuring"]' WHERE id = 'srv3';

UPDATE service SET methodologies = '["Digital transformation strategy","IT infrastructure planning & implementation","Cybersecurity & data protection guidance","Cloud systems & digital workflow solutions","Data management & analytics systems","Smart systems & automation integration"]' WHERE id = 'srv4';

UPDATE service SET methodologies = '["Community development program design","Inclusive economic empowerment models","Youth & women entrepreneurship initiatives","Public-private partnership (PPP) models","Impact measurement & social value assessment","Policy & governance support for social programs"]' WHERE id = 'srv5';

UPDATE service SET methodologies = '["Climate-smart agriculture solutions","Agricultural value chain development","Agri-tech & smart farming systems","Food security & sustainable production strategies","Cooperative & agribusiness development","Post-harvest management & market access strategies"]' WHERE id = 'srv6';

-- Verification
SELECT id, name, slug, featured, status FROM service ORDER BY id;
