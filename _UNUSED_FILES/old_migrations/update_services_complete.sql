-- Update Smart Factory service with complete data
UPDATE `Service` SET
  `tagline` = 'Transform manufacturing operations with IoT, AI, and autonomous systems',
  `capabilities` = '[
    {"icon": "integration", "title": "IoT Integration", "description": "Seamlessly connect devices across your entire production line with robust sensor networks."},
    {"icon": "predictive", "title": "Predictive Maintenance", "description": "AI-driven analytics to identify potential equipment failures before they occur or worsen."},
    {"icon": "robotics", "title": "Autonomous Robotics", "description": "Deploy intelligent robots optimized for high-precision, flexible manufacturing tasks."},
    {"icon": "twins", "title": "Digital Twins", "description": "Create virtual replicas of your system for simulation, testing, and operational optimization."}
  ]',
  `processSteps` = '[
    {"step": "01", "title": "Assessment", "description": "In-depth audit of current infrastructure, identifying pain points, technology gaps and ROI opportunities."},
    {"step": "02", "title": "Implementation", "description": "Seamless integration of IoT sensors, AI models, and advanced hardware with existing systems."},
    {"step": "03", "title": "Optimization", "description": "Continuous monitoring and machine learning refinements to maximize throughput and efficiency."}
  ]',
  `impactMetrics` = '{
    "title": "Performance Metrics",
    "metrics": [
      {"label": "PRODUCTION YIELD", "value": "30", "change": "+30%"},
      {"label": "QUALITY ASSURANCE", "value": "25", "change": "+91%"},
      {"label": "COST REDUCTION", "value": "15", "change": "+25%"}
    ]
  }',
  `caseStudy` = '{
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
  `updatedAt` = NOW()
WHERE `slug` = 'smart-factory';

-- Update Renewable Energy service with complete data
UPDATE `Service` SET
  `tagline` = 'Accelerate your transition to sustainable energy with intelligent solutions',
  `capabilities` = '[
    {"icon": "integration", "title": "Smart Grid Integration", "description": "Connect renewable sources seamlessly with existing infrastructure for optimal energy distribution."},
    {"icon": "predictive", "title": "Energy Forecasting", "description": "AI-powered prediction of energy generation and consumption patterns for better planning."},
    {"icon": "robotics", "title": "Storage Optimization", "description": "Maximize battery efficiency and lifespan through intelligent charge/discharge management."},
    {"icon": "twins", "title": "Grid Digital Twin", "description": "Virtual replica of your energy grid for simulation, testing, and optimization scenarios."}
  ]',
  `processSteps` = '[
    {"step": "01", "title": "Energy Audit", "description": "Comprehensive analysis of current energy usage, sources, and infrastructure capabilities."},
    {"step": "02", "title": "System Design", "description": "Custom renewable energy solution design with smart grid integration and storage systems."},
    {"step": "03", "title": "Continuous Optimization", "description": "Real-time monitoring and AI-driven adjustments to maximize efficiency and cost savings."}
  ]',
  `impactMetrics` = '{
    "title": "Energy Performance",
    "metrics": [
      {"label": "RENEWABLE ADOPTION", "value": "65", "change": "+65%"},
      {"label": "ENERGY COST SAVINGS", "value": "40", "change": "+40%"},
      {"label": "CARBON REDUCTION", "value": "55", "change": "+55%"}
    ]
  }',
  `caseStudy` = '{
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
  `updatedAt` = NOW()
WHERE `slug` = 'renewable-energy';

-- Update Smart Building service with complete data
UPDATE `Service` SET
  `tagline` = 'Create intelligent, efficient buildings that optimize comfort and reduce costs',
  `capabilities` = '[
    {"icon": "integration", "title": "Building Automation", "description": "Integrate HVAC, lighting, security, and access control into unified intelligent systems."},
    {"icon": "predictive", "title": "Energy Analytics", "description": "Real-time monitoring and AI-driven insights to minimize energy waste and costs."},
    {"icon": "robotics", "title": "Occupancy Intelligence", "description": "Smart sensors adjust building systems based on real-time occupancy patterns."},
    {"icon": "twins", "title": "Building Digital Twin", "description": "Virtual building model for testing scenarios and optimizing operations before deployment."}
  ]',
  `processSteps` = '[
    {"step": "01", "title": "Building Assessment", "description": "Detailed evaluation of current systems, energy usage patterns, and optimization opportunities."},
    {"step": "02", "title": "Smart Integration", "description": "Deploy IoT sensors and integrate building systems with centralized AI-driven platform."},
    {"step": "03", "title": "Adaptive Learning", "description": "Continuous system learning and adjustment based on usage patterns and environmental conditions."}
  ]',
  `impactMetrics` = '{
    "title": "Building Performance",
    "metrics": [
      {"label": "ENERGY REDUCTION", "value": "45", "change": "+45%"},
      {"label": "OPERATIONAL COSTS", "value": "35", "change": "-35%"},
      {"label": "OCCUPANT SATISFACTION", "value": "28", "change": "+28%"}
    ]
  }',
  `caseStudy` = '{
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
  `updatedAt` = NOW()
WHERE `slug` = 'smart-building';
