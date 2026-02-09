<?php
require_once __DIR__ . '/config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    // Clear existing industries
    $conn->exec("DELETE FROM Industry");
    
    // Insert industries
    $industries = [
        [
            'id' => 'ind1',
            'name' => 'Management Consulting',
            'slug' => 'management-consulting',
            'description' => 'Strategic consulting for digital transformation and business growth in Japan',
            'overview' => 'JACOM provides comprehensive management consulting services focusing on digital transformation (DX), ESG initiatives, and PMO services. We support Japanese companies in developing growth strategies and navigating the evolving consulting market with expertise in AI, IoT, and system integration.',
            'challenges' => '["Digital transformation adoption", "ESG compliance and reporting", "Project management efficiency", "Generative AI integration", "Global expansion strategies"]',
            'trends' => '["AI-driven consulting", "Sustainability focus", "Remote consulting models", "Data-driven decision making", "Cross-border collaboration"]',
            'featured' => 1,
            'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'
        ],
        [
            'id' => 'ind2',
            'name' => 'Technology & IoT Solutions',
            'slug' => 'technology-iot',
            'description' => 'IoT platform and electromechanical system integration services',
            'overview' => 'JACOM specializes in IoT e-commerce platforms and electromechanical system integration. We provide innovative solutions for smart devices, system standardization, and engineering consulting for consumers and manufacturers.',
            'challenges' => '["System integration complexity", "IoT security standards", "Device interoperability", "Cost optimization", "Technology adoption barriers"]',
            'trends' => '["Smart device proliferation", "Edge computing", "5G connectivity", "AI-powered automation", "Cloud-native architectures"]',
            'featured' => 1,
            'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
        ],
        [
            'id' => 'ind3',
            'name' => 'Hospitality & Tourism',
            'slug' => 'hospitality-tourism',
            'description' => 'Recruitment and training services for hospitality professionals',
            'overview' => 'Through our partnership with Nepal recruitment agencies, JACOM facilitates the deployment of qualified hospitality professionals to Japan. We provide comprehensive training including Japanese language proficiency (JLPT N3/N4), cultural orientation, and industry-specific technical skills.',
            'challenges' => '["Skilled labor shortage", "Cultural adaptation", "Language barriers", "Quality standards maintenance", "Visa and immigration processes"]',
            'trends' => '["International workforce mobility", "Digital hospitality services", "Sustainable tourism", "Experience-driven services", "Health and safety protocols"]',
            'featured' => 1,
            'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
        ],
        [
            'id' => 'ind4',
            'name' => 'IT Services & Software Development',
            'slug' => 'it-services',
            'description' => 'Software development and IT professional recruitment for Japanese market',
            'overview' => 'JACOM connects IT professionals with opportunities in Japan, focusing on software engineers, data scientists, and cybersecurity experts. We support J-Find visa holders and provide training in programming, database management, and cloud computing.',
            'challenges' => '["Tech talent shortage", "Rapid technology evolution", "Cybersecurity threats", "Legacy system modernization", "Remote work infrastructure"]',
            'trends' => '["AI and machine learning", "Cloud-first strategies", "DevOps automation", "Low-code platforms", "Quantum computing readiness"]',
            'featured' => 0,
            'image' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
        ],
        [
            'id' => 'ind5',
            'name' => 'Manufacturing & Industry 4.0',
            'slug' => 'manufacturing',
            'description' => 'Smart factory solutions and industrial automation consulting',
            'overview' => 'JACOM delivers Industry 4.0 transformation through IoT integration, predictive maintenance, and smart factory design. We specialize in production management, quality control systems, and mechanical design.',
            'challenges' => '["Supply chain disruptions", "Automation investment costs", "Skills gap in workforce", "Quality control consistency", "Sustainability requirements"]',
            'trends' => '["Smart factories", "Digital twins", "Predictive maintenance", "Collaborative robots", "Sustainable manufacturing"]',
            'featured' => 0,
            'image' => 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800'
        ],
        [
            'id' => 'ind6',
            'name' => 'Education & Training',
            'slug' => 'education-training',
            'description' => 'Professional development and technical training programs',
            'overview' => 'JACOM offers customized training programs including web development bootcamps, technical skills training, and professional certifications. We provide both online live sessions and face-to-face training.',
            'challenges' => '["Digital literacy gaps", "Curriculum relevance", "Student engagement", "Certification standards", "Access to quality education"]',
            'trends' => '["EdTech platforms", "Hybrid learning models", "Micro-credentials", "Personalized learning paths", "Industry-aligned curricula"]',
            'featured' => 0,
            'image' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
        ],
        [
            'id' => 'ind7',
            'name' => 'Energy & Utilities',
            'slug' => 'energy-utilities',
            'description' => 'Renewable energy systems and smart grid solutions',
            'overview' => 'JACOM provides renewable energy consulting including solar and wind power generation equipment design, VPP and EMS system innovation, and smart grid infrastructure.',
            'challenges' => '["Grid modernization costs", "Renewable integration", "Energy storage solutions", "Regulatory compliance", "Asset optimization"]',
            'trends' => '["Clean energy transition", "Smart grids", "Energy storage systems", "Carbon neutrality goals", "Distributed energy resources"]',
            'featured' => 0,
            'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800'
        ],
        [
            'id' => 'ind8',
            'name' => 'Real Estate & Infrastructure',
            'slug' => 'real-estate-infrastructure',
            'description' => 'Smart building systems and infrastructure development',
            'overview' => 'JACOM designs intelligent building systems including access control, security surveillance, electrical equipment, and utility systems for hotels, hospitals, and commercial facilities.',
            'challenges' => '["Aging infrastructure", "Smart building integration", "Energy efficiency standards", "Security requirements", "Maintenance costs"]',
            'trends' => '["Smart buildings", "Green construction", "IoT-enabled facilities", "Predictive maintenance", "Sustainable design"]',
            'featured' => 0,
            'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
        ],
        [
            'id' => 'ind9',
            'name' => 'Financial Services & Investment',
            'slug' => 'financial-services',
            'description' => 'Financial advisory and investment consulting',
            'overview' => 'JACOM offers financial consulting services including tax management, asset management, risk assessment, and investment policy development with focus on ESG investment strategies.',
            'challenges' => '["Regulatory complexity", "Market volatility", "Digital disruption", "Risk management", "ESG compliance"]',
            'trends' => '["Fintech innovation", "ESG investing", "Digital currencies", "Robo-advisory", "Open banking"]',
            'featured' => 0,
            'image' => 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800'
        ]
    ];
    
    $stmt = $conn->prepare("INSERT INTO Industry (id, name, slug, description, overview, challenges, trends, featured, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
    
    foreach ($industries as $industry) {
        $stmt->execute([
            $industry['id'],
            $industry['name'],
            $industry['slug'],
            $industry['description'],
            $industry['overview'],
            $industry['challenges'],
            $industry['trends'],
            $industry['featured'],
            $industry['image']
        ]);
    }
    
    echo "✅ Successfully inserted " . count($industries) . " industries!\n";
    echo "Industries added:\n";
    foreach ($industries as $ind) {
        echo "- " . $ind['name'] . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
