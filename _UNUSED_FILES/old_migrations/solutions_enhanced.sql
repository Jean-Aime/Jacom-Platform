USE jas_consulting;

-- Add new columns to Solution table for dynamic content
ALTER TABLE Solution 
ADD COLUMN benefits TEXT NULL COMMENT 'JSON array of 4 benefits: [{icon, title, description}]',
ADD COLUMN implementationSteps TEXT NULL COMMENT 'JSON array of 4 steps: [{number, title, description}]';

-- Update existing solutions with sample data
UPDATE Solution SET 
benefits = '[
  {"icon":"zap","title":"Rapid Implementation","description":"Fast-track deployment with proven methodologies"},
  {"icon":"target","title":"Tailored Strategy","description":"Customized approach aligned with your business goals"},
  {"icon":"bar-chart","title":"Data-Driven Insights","description":"Analytics and metrics to measure success"},
  {"icon":"users","title":"Expert Guidance","description":"Dedicated consultants with industry expertise"}
]',
implementationSteps = '[
  {"number":"01","title":"Discovery & Assessment","description":"Understand your business challenges and define objectives"},
  {"number":"02","title":"Strategy Design","description":"Develop tailored solution roadmap and implementation plan"},
  {"number":"03","title":"Implementation","description":"Execute with agile methodology and continuous feedback"},
  {"number":"04","title":"Optimization","description":"Monitor performance and refine for sustained success"}
]'
WHERE slug = 'digital-transformation';

UPDATE Solution SET 
benefits = '[
  {"icon":"shield","title":"Risk Mitigation","description":"Identify and address vulnerabilities before they become issues"},
  {"icon":"trending-up","title":"Performance Boost","description":"Optimize operations for maximum efficiency"},
  {"icon":"clock","title":"Time Savings","description":"Reduce manual processes and accelerate delivery"},
  {"icon":"award","title":"Quality Assurance","description":"Ensure excellence through rigorous standards"}
]',
implementationSteps = '[
  {"number":"01","title":"Current State Analysis","description":"Evaluate existing systems and identify improvement areas"},
  {"number":"02","title":"Solution Architecture","description":"Design comprehensive approach tailored to your needs"},
  {"number":"03","title":"Phased Rollout","description":"Implement changes incrementally with minimal disruption"},
  {"number":"04","title":"Continuous Improvement","description":"Track metrics and optimize for ongoing success"}
]'
WHERE slug = 'operational-excellence';

UPDATE Solution SET 
benefits = '[
  {"icon":"globe","title":"Market Expansion","description":"Enter new markets with confidence and strategic planning"},
  {"icon":"lightbulb","title":"Innovation Focus","description":"Drive competitive advantage through strategic innovation"},
  {"icon":"dollar-sign","title":"Revenue Growth","description":"Unlock new revenue streams and business opportunities"},
  {"icon":"briefcase","title":"Strategic Partnerships","description":"Build alliances that accelerate business growth"}
]',
implementationSteps = '[
  {"number":"01","title":"Market Research","description":"Analyze market opportunities and competitive landscape"},
  {"number":"02","title":"Growth Strategy","description":"Define clear roadmap for sustainable expansion"},
  {"number":"03","title":"Execution Plan","description":"Deploy resources and initiatives systematically"},
  {"number":"04","title":"Performance Tracking","description":"Measure results and adjust strategy as needed"}
]'
WHERE slug = 'business-growth-strategy';

-- Icon reference for admins:
-- Common icons: zap, target, bar-chart, users, shield, trending-up, clock, award, 
-- globe, lightbulb, dollar-sign, briefcase, check-circle, settings, database, lock
