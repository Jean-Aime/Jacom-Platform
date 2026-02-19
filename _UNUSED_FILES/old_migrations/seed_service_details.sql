-- Seed data for Digital Transformation service
UPDATE `Service` SET
  `tagline` = 'Transform your business with cutting-edge digital solutions',
  `capabilities` = '[
    {"icon": "integration", "title": "IoT Integration", "description": "Seamlessly connect devices across your entire production line with robust sensor networks."},
    {"icon": "predictive", "title": "Predictive Maintenance", "description": "AI-driven analytics to identify potential equipment failures before they occur."},
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
      {"label": "PRODUCTION YIELD", "value": "+30%", "change": "+30%"},
      {"label": "QUALITY ASSURANCE", "value": "+91%", "change": "+91%"},
      {"label": "COST REDUCTION", "value": "+25%", "change": "+25%"}
    ]
  }',
  `caseStudy` = '{
    "label": "FEATURED CASE STUDY",
    "title": "Global Automotive Leader Implements Full-Scale Digital Twin",
    "description": "The implementation of Verizon''s smart factory solution reduced our assembly line errors by 47% in the first quarter alone.",
    "image": "/images/case-studies/automotive-factory.jpg",
    "metrics": [
      {"label": "DEFECTS REDUCTION", "value": "42%"},
      {"label": "ANNUAL COST SAVINGS", "value": "$2.4M"}
    ],
    "ctaText": "Read the Full Report",
    "ctaLink": "/case-studies/automotive-digital-twin"
  }'
WHERE `slug` = 'digital-transformation';

-- Seed data for Strategy Consulting service
UPDATE `Service` SET
  `tagline` = 'Strategic guidance to navigate market shifts and build competitive advantages',
  `capabilities` = '[
    {"icon": "strategy", "title": "Market Analysis", "description": "Deep market research and competitive intelligence to identify opportunities."},
    {"icon": "growth", "title": "Growth Strategy", "description": "Develop sustainable growth plans aligned with your business objectives."},
    {"icon": "transformation", "title": "Business Transformation", "description": "Guide organizational change and digital transformation initiatives."},
    {"icon": "innovation", "title": "Innovation Framework", "description": "Build innovation capabilities and processes for continuous improvement."}
  ]',
  `processSteps` = '[
    {"step": "01", "title": "Discovery", "description": "Comprehensive analysis of your business model, market position, and strategic objectives."},
    {"step": "02", "title": "Strategy Design", "description": "Develop tailored strategies with clear roadmaps and measurable outcomes."},
    {"step": "03", "title": "Execution Support", "description": "Hands-on support to implement strategies and track progress against KPIs."}
  ]',
  `impactMetrics` = '{
    "title": "Business Impact",
    "metrics": [
      {"label": "REVENUE GROWTH", "value": "+45%", "change": "+45%"},
      {"label": "MARKET SHARE", "value": "+28%", "change": "+28%"},
      {"label": "EFFICIENCY GAINS", "value": "+35%", "change": "+35%"}
    ]
  }',
  `caseStudy` = '{
    "label": "SUCCESS STORY",
    "title": "Fortune 500 Company Achieves Market Leadership Through Strategic Transformation",
    "description": "Our strategic consulting partnership helped us identify new market opportunities and achieve 45% revenue growth in 18 months.",
    "image": "/images/case-studies/strategy-boardroom.jpg",
    "metrics": [
      {"label": "REVENUE INCREASE", "value": "45%"},
      {"label": "NEW MARKETS ENTERED", "value": "12"}
    ],
    "ctaText": "View Case Study",
    "ctaLink": "/case-studies/strategic-transformation"
  }'
WHERE `slug` = 'strategy-consulting';

-- Seed data for Operations Excellence service
UPDATE `Service` SET
  `tagline` = 'Optimize value chains and streamline processes for maximum efficiency',
  `capabilities` = '[
    {"icon": "process", "title": "Process Optimization", "description": "Streamline operations and eliminate waste across your value chain."},
    {"icon": "supply", "title": "Supply Chain", "description": "End-to-end supply chain optimization for resilience and efficiency."},
    {"icon": "quality", "title": "Quality Management", "description": "Implement robust quality systems and continuous improvement programs."},
    {"icon": "lean", "title": "Lean Six Sigma", "description": "Apply proven methodologies to reduce variation and improve quality."}
  ]',
  `processSteps` = '[
    {"step": "01", "title": "Analysis", "description": "Map current state processes and identify bottlenecks, inefficiencies, and improvement opportunities."},
    {"step": "02", "title": "Redesign", "description": "Design optimized processes with clear metrics, controls, and accountability."},
    {"step": "03", "title": "Sustain", "description": "Embed continuous improvement culture and monitor performance against targets."}
  ]',
  `impactMetrics` = '{
    "title": "Operational Impact",
    "metrics": [
      {"label": "CYCLE TIME", "value": "-40%", "change": "-40%"},
      {"label": "DEFECT RATE", "value": "-65%", "change": "-65%"},
      {"label": "COST SAVINGS", "value": "+32%", "change": "+32%"}
    ]
  }',
  `caseStudy` = '{
    "label": "TRANSFORMATION STORY",
    "title": "Manufacturing Giant Achieves Operational Excellence Through Process Redesign",
    "description": "The operations excellence program delivered $50M in annual savings and improved our on-time delivery to 99.2%.",
    "image": "/images/case-studies/operations-warehouse.jpg",
    "metrics": [
      {"label": "COST REDUCTION", "value": "$50M"},
      {"label": "ON-TIME DELIVERY", "value": "99.2%"}
    ],
    "ctaText": "Explore the Journey",
    "ctaLink": "/case-studies/operations-excellence"
  }'
WHERE `slug` = 'operations-excellence';
