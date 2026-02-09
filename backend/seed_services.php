<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    $conn->exec("DELETE FROM Service");
    
    $services = [
        ['srv1', 'Digital Transformation & DX Consulting', 'digital-transformation', 'Comprehensive DX strategy and implementation for Japanese enterprises', 'JACOM provides end-to-end digital transformation consulting focusing on AI, IoT, and generative AI integration.', '["Agile transformation", "Design thinking", "Lean methodology"]', '["AI/ML platforms", "IoT systems", "Cloud infrastructure"]', 1, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'],
        ['srv2', 'IoT Platform & System Integration', 'iot-platform', 'IoT e-commerce platform and electromechanical system integration', 'Specialized IoT platform development and system integration services.', '["System architecture design", "API integration", "Protocol standardization"]', '["IoT sensors", "Edge computing", "5G networks"]', 1, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'],
        ['srv3', 'Recruitment & Training Services', 'recruitment-training', 'International workforce recruitment and professional training programs', 'Comprehensive recruitment services connecting Nepal and Japan for hospitality and IT professionals.', '["Candidate screening", "Skills assessment", "Cultural training"]', '["JLPT preparation", "Technical training platforms"]', 1, 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'],
        ['srv4', 'Smart Factory & Industry 4.0', 'smart-factory', 'Industrial automation and smart manufacturing solutions', 'Design and implementation of smart factory systems with IoT integration.', '["Factory automation", "Process optimization"]', '["Industrial IoT", "Robotics", "SCADA systems"]', 0, 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800'],
        ['srv5', 'Renewable Energy Systems', 'renewable-energy', 'Solar, wind power generation and smart grid solutions', 'Renewable energy consulting including equipment design and VPP/EMS systems.', '["Energy assessment", "System design"]', '["Solar PV systems", "Wind turbines"]', 0, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800'],
        ['srv6', 'Smart Building & Infrastructure', 'smart-building', 'Intelligent building systems and security solutions', 'Design of smart building systems including access control and security surveillance.', '["Building automation", "Security design"]', '["Access control systems", "CCTV"]', 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
        ['srv7', 'Web Development Training', 'web-development-training', 'Professional web development bootcamps and certifications', 'Comprehensive training programs in HTML, CSS, JavaScript, React, and Node.js.', '["Project-based learning", "Hands-on coding"]', '["VS Code", "React", "Node.js"]', 0, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'],
        ['srv8', 'Financial Advisory & Investment', 'financial-advisory', 'Tax management, asset management, and ESG investment consulting', 'Financial consulting services including tax management and ESG investment strategies.', '["Financial planning", "Risk assessment"]', '["Financial modeling tools"]', 0, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
        ['srv9', 'Project Management Office (PMO)', 'pmo-services', 'PMO setup and project management consulting', 'Establish and optimize Project Management Offices for Japanese enterprises.', '["PMO framework", "Agile/Scrum"]', '["Project management software"]', 0, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800']
    ];
    
    $stmt = $conn->prepare("INSERT INTO Service (id, name, slug, description, overview, methodologies, tools, featured, image, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', NOW(), NOW())");
    
    foreach ($services as $service) {
        $stmt->execute($service);
    }
    
    echo "✅ Successfully inserted " . count($services) . " services!<br><br>";
    echo "<h3>Services added:</h3><ul>";
    foreach ($services as $s) {
        echo "<li>" . $s[1] . "</li>";
    }
    echo "</ul>";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
