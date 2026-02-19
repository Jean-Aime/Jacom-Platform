USE jas_consulting;

-- Seed data for all 5 solutions with benefits and implementation steps

-- 1. Digital Transformation
UPDATE Solution SET 
benefits = '[{"icon":"zap","title":"Rapid Implementation","description":"Fast-track deployment with proven methodologies"},{"icon":"target","title":"Tailored Strategy","description":"Customized approach aligned with your business goals"},{"icon":"bar-chart","title":"Data-Driven Insights","description":"Analytics and metrics to measure success"},{"icon":"users","title":"Expert Guidance","description":"Dedicated consultants with industry expertise"}]',
implementationSteps = '[{"number":"01","title":"Discovery & Assessment","description":"Understand your business challenges and define objectives"},{"number":"02","title":"Strategy Design","description":"Develop tailored solution roadmap and implementation plan"},{"number":"03","title":"Implementation","description":"Execute with agile methodology and continuous feedback"},{"number":"04","title":"Optimization","description":"Monitor performance and refine for sustained success"}]'
WHERE slug = 'digital-transformation';

-- 2. Operational Excellence
UPDATE Solution SET 
benefits = '[{"icon":"shield","title":"Risk Mitigation","description":"Identify and address vulnerabilities before they become issues"},{"icon":"trending-up","title":"Performance Boost","description":"Optimize operations for maximum efficiency"},{"icon":"clock","title":"Time Savings","description":"Reduce manual processes and accelerate delivery"},{"icon":"award","title":"Quality Assurance","description":"Ensure excellence through rigorous standards"}]',
implementationSteps = '[{"number":"01","title":"Current State Analysis","description":"Evaluate existing systems and identify improvement areas"},{"number":"02","title":"Solution Architecture","description":"Design comprehensive approach tailored to your needs"},{"number":"03","title":"Phased Rollout","description":"Implement changes incrementally with minimal disruption"},{"number":"04","title":"Continuous Improvement","description":"Track metrics and optimize for ongoing success"}]'
WHERE slug = 'operational-excellence';

-- 3. Business Growth Strategy
UPDATE Solution SET 
benefits = '[{"icon":"globe","title":"Market Expansion","description":"Enter new markets with confidence and strategic planning"},{"icon":"lightbulb","title":"Innovation Focus","description":"Drive competitive advantage through strategic innovation"},{"icon":"dollar-sign","title":"Revenue Growth","description":"Unlock new revenue streams and business opportunities"},{"icon":"briefcase","title":"Strategic Partnerships","description":"Build alliances that accelerate business growth"}]',
implementationSteps = '[{"number":"01","title":"Market Research","description":"Analyze market opportunities and competitive landscape"},{"number":"02","title":"Growth Strategy","description":"Define clear roadmap for sustainable expansion"},{"number":"03","title":"Execution Plan","description":"Deploy resources and initiatives systematically"},{"number":"04","title":"Performance Tracking","description":"Measure results and adjust strategy as needed"}]'
WHERE slug = 'business-growth-strategy';

-- 4. Cloud Migration
UPDATE Solution SET 
benefits = '[{"icon":"zap","title":"Faster Deployment","description":"Accelerate time-to-market with cloud infrastructure"},{"icon":"shield","title":"Enhanced Security","description":"Enterprise-grade security and compliance built-in"},{"icon":"dollar-sign","title":"Cost Optimization","description":"Reduce infrastructure costs with pay-as-you-go model"},{"icon":"trending-up","title":"Scalability","description":"Scale resources up or down based on demand"}]',
implementationSteps = '[{"number":"01","title":"Assessment & Planning","description":"Evaluate current infrastructure and define migration strategy"},{"number":"02","title":"Architecture Design","description":"Design cloud architecture optimized for your workloads"},{"number":"03","title":"Migration Execution","description":"Migrate applications and data with zero downtime"},{"number":"04","title":"Optimization & Support","description":"Fine-tune performance and provide ongoing support"}]'
WHERE slug = 'cloud-migration';

-- 5. Data Analytics
UPDATE Solution SET 
benefits = '[{"icon":"bar-chart","title":"Actionable Insights","description":"Transform raw data into strategic business intelligence"},{"icon":"target","title":"Better Decisions","description":"Make data-driven decisions with confidence"},{"icon":"clock","title":"Real-Time Analytics","description":"Access insights instantly with live dashboards"},{"icon":"lightbulb","title":"Predictive Intelligence","description":"Forecast trends and anticipate market changes"}]',
implementationSteps = '[{"number":"01","title":"Data Discovery","description":"Identify data sources and define analytics objectives"},{"number":"02","title":"Platform Setup","description":"Build analytics infrastructure and data pipelines"},{"number":"03","title":"Dashboard Development","description":"Create interactive visualizations and reports"},{"number":"04","title":"Training & Adoption","description":"Enable teams to leverage analytics effectively"}]'
WHERE slug = 'data-analytics';

-- Verify the updates
SELECT id, name, slug, 
       CASE WHEN benefits IS NOT NULL THEN 'YES' ELSE 'NO' END as has_benefits,
       CASE WHEN implementationSteps IS NOT NULL THEN 'YES' ELSE 'NO' END as has_steps
FROM Solution;
