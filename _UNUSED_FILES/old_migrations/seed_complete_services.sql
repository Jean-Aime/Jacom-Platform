-- Complete seed data for Smart Factory service
INSERT INTO `Service` (
  `id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, 
  `tagline`, `capabilities`, `processSteps`, `impactMetrics`, `caseStudy`, 
  `createdAt`, `updatedAt`
) VALUES (
  'srv_smart_factory_001',
  'Smart Factory',
  'smart-factory',
  'Transform manufacturing operations with IoT, AI, and automation',
  'Our Smart Factory solutions integrate cutting-edge IoT sensors, artificial intelligence, and autonomous robotics to create fully connected, data-driven manufacturing environments that optimize production, reduce costs, and improve quality.',
  '["Lean Manufacturing", "Six Sigma", "Industry 4.0", "Agile Implementation"]',
  '["IoT Sensors", "AI/ML Platforms", "Digital Twin Software", "SCADA Systems"]',
  1,
  'Transform manufacturing operations with IoT, AI, and autonomous systems',
  '[
    {"icon": "integration", "title": "IoT Integration", "description": "Seamlessly connect devices across your entire production line with robust sensor networks."},
    {"icon": "predictive", "title": "Predictive Maintenance", "description": "AI-driven analytics to identify potential equipment failures before they occur or worsen."},
    {"icon": "robotics", "title": "Autonomous Robotics", "description": "Deploy intelligent robots optimized for high-precision, flexible manufacturing tasks."},
    {"icon": "twins", "title": "Digital Twins", "description": "Create virtual replicas of your system for simulation, testing, and operational optimization."}
  ]',
  '[
    {"step": "01", "title": "Assessment", "description": "In-depth audit of current infrastructure, identifying pain points, technology gaps and ROI opportunities."},
    {"step": "02", "title": "Implementation", "description": "Seamless integration of IoT sensors, AI models, and advanced hardware with existing systems."},
    {"step": "03", "title": "Optimization", "description": "Continuous monitoring and machine learning refinements to maximize throughput and efficiency."}
  ]',
  '{
    "title": "Performance Metrics",
    "metrics": [
      {"label": "PRODUCTION YIELD", "value": "30", "change": "+30%"},
      {"label": "QUALITY ASSURANCE", "value": "25", "change": "+91%"},
      {"label": "COST REDUCTION", "value": "15", "change": "+25%"}
    ]
  }',
  '{
    "label": "FEATURED CASE STUDY",
    "title": "Global Automotive Leader Implements Full-Scale Digital Twin",
    "description": "The implementation of Verizon''s smart factory solution reduced our assembly line errors by 47% in the first quarter alone.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    "metrics": [
      {"label": "DEFECTS REDUCTION", "value": "42%"},
      {"label": "ANNUAL COST SAVINGS", "value": "$2.4M"}
    ],
    "ctaText": "Read the Full Report",
    "ctaLink": "/case-studies/automotive-digital-twin"
  }',
  NOW(),
  NOW()
);

-- Complete seed data for Renewable Energy service
INSERT INTO `Service` (
  `id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, 
  `tagline`, `capabilities`, `processSteps`, `impactMetrics`, `caseStudy`, 
  `createdAt`, `updatedAt`
) VALUES (
  'srv_renewable_energy_001',
  'Renewable Energy',
  'renewable-energy',
  'Accelerate transition to sustainable energy with smart grid solutions',
  'We help energy companies and industrial facilities transition to renewable energy sources through intelligent grid management, energy storage optimization, and predictive analytics for maximum efficiency and sustainability.',
  '["Energy Transition Framework", "Grid Optimization", "Sustainability Assessment"]',
  '["Smart Grid Systems", "Energy Management Software", "Predictive Analytics", "Battery Storage Systems"]',
  1,
  'Accelerate your transition to sustainable energy with intelligent solutions',
  '[
    {"icon": "integration", "title": "Smart Grid Integration", "description": "Connect renewable sources seamlessly with existing infrastructure for optimal energy distribution."},
    {"icon": "predictive", "title": "Energy Forecasting", "description": "AI-powered prediction of energy generation and consumption patterns for better planning."},
    {"icon": "robotics", "title": "Storage Optimization", "description": "Maximize battery efficiency and lifespan through intelligent charge/discharge management."},
    {"icon": "twins", "title": "Grid Digital Twin", "description": "Virtual replica of your energy grid for simulation, testing, and optimization scenarios."}
  ]',
  '[
    {"step": "01", "title": "Energy Audit", "description": "Comprehensive analysis of current energy usage, sources, and infrastructure capabilities."},
    {"step": "02", "title": "System Design", "description": "Custom renewable energy solution design with smart grid integration and storage systems."},
    {"step": "03", "title": "Continuous Optimization", "description": "Real-time monitoring and AI-driven adjustments to maximize efficiency and cost savings."}
  ]',
  '{
    "title": "Energy Performance",
    "metrics": [
      {"label": "RENEWABLE ADOPTION", "value": "65", "change": "+65%"},
      {"label": "ENERGY COST SAVINGS", "value": "40", "change": "+40%"},
      {"label": "CARBON REDUCTION", "value": "55", "change": "+55%"}
    ]
  }',
  '{
    "label": "SUCCESS STORY",
    "title": "Manufacturing Plant Achieves 80% Renewable Energy Mix",
    "description": "Our renewable energy integration helped this facility reduce energy costs by $3.2M annually while achieving sustainability goals 3 years ahead of schedule.",
    "image": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    "metrics": [
      {"label": "RENEWABLE MIX", "value": "80%"},
      {"label": "ANNUAL SAVINGS", "value": "$3.2M"}
    ],
    "ctaText": "View Full Case Study",
    "ctaLink": "/case-studies/renewable-energy-plant"
  }',
  NOW(),
  NOW()
);

-- Complete seed data for Smart Building service
INSERT INTO `Service` (
  `id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, 
  `tagline`, `capabilities`, `processSteps`, `impactMetrics`, `caseStudy`, 
  `createdAt`, `updatedAt`
) VALUES (
  'srv_smart_building_001',
  'Smart Building',
  'smart-building',
  'Optimize building operations with IoT-enabled automation and analytics',
  'Transform commercial and industrial buildings into intelligent, self-optimizing environments that reduce energy consumption, improve occupant comfort, and lower operational costs through advanced IoT sensors and AI-driven automation.',
  '["Building Automation", "Energy Management", "Occupancy Optimization", "Predictive Maintenance"]',
  '["BMS Systems", "IoT Sensors", "HVAC Optimization", "Lighting Control", "Access Management"]',
  1,
  'Create intelligent, efficient buildings that optimize comfort and reduce costs',
  '[
    {"icon": "integration", "title": "Building Automation", "description": "Integrate HVAC, lighting, security, and access control into unified intelligent systems."},
    {"icon": "predictive", "title": "Energy Analytics", "description": "Real-time monitoring and AI-driven insights to minimize energy waste and costs."},
    {"icon": "robotics", "title": "Occupancy Intelligence", "description": "Smart sensors adjust building systems based on real-time occupancy patterns."},
    {"icon": "twins", "title": "Building Digital Twin", "description": "Virtual building model for testing scenarios and optimizing operations before deployment."}
  ]',
  '[
    {"step": "01", "title": "Building Assessment", "description": "Detailed evaluation of current systems, energy usage patterns, and optimization opportunities."},
    {"step": "02", "title": "Smart Integration", "description": "Deploy IoT sensors and integrate building systems with centralized AI-driven platform."},
    {"step": "03", "title": "Adaptive Learning", "description": "Continuous system learning and adjustment based on usage patterns and environmental conditions."}
  ]',
  '{
    "title": "Building Performance",
    "metrics": [
      {"label": "ENERGY REDUCTION", "value": "45", "change": "+45%"},
      {"label": "OPERATIONAL COSTS", "value": "35", "change": "-35%"},
      {"label": "OCCUPANT SATISFACTION", "value": "28", "change": "+28%"}
    ]
  }',
  '{
    "label": "TRANSFORMATION CASE",
    "title": "Corporate Campus Reduces Energy Costs by 45% with Smart Building Tech",
    "description": "Implementation of our smart building solution across a 500,000 sq ft campus delivered $1.8M in annual energy savings while improving employee comfort scores by 28%.",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    "metrics": [
      {"label": "ENERGY SAVINGS", "value": "45%"},
      {"label": "ANNUAL SAVINGS", "value": "$1.8M"}
    ],
    "ctaText": "Explore the Solution",
    "ctaLink": "/case-studies/smart-building-campus"
  }',
  NOW(),
  NOW()
);
