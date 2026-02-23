<?php
require_once __DIR__ . '/../config/database.php';

$db = Database::getInstance();
$conn = $db->getConnection();

echo "=== Running Migrations ===\n\n";

// 1. Add type column to expert table
echo "1. Adding type column to expert table...\n";
try {
    $conn->exec("ALTER TABLE expert ADD COLUMN type ENUM('expert', 'team') DEFAULT 'expert' AFTER role");
    echo "   ✓ Type column added successfully\n\n";
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column') !== false) {
        echo "   ℹ Type column already exists\n\n";
    } else {
        echo "   ✗ Error: " . $e->getMessage() . "\n\n";
    }
}

// 2. Insert seed data
echo "2. Inserting seed data...\n";
try {
    // Delete existing seed data by slug
    $slugs = ['sarah-johnson', 'michael-chen', 'emily-rodriguez', 'david-kim', 'priya-sharma', 'dr-james-anderson', 'maria-santos', 'robert-tanaka', 'lisa-wang', 'ahmed-hassan', 'jennifer-lee'];
    $placeholders = implode(',', array_fill(0, count($slugs), '?'));
    $stmt = $conn->prepare("DELETE FROM expert WHERE slug IN ($placeholders)");
    $stmt->execute($slugs);
    echo "   ✓ Cleared existing seed data\n";
    
    // Insert team members
    $teamMembers = [
        ['team001', 'Sarah Johnson', 'sarah-johnson', 'Chief Technology Officer', 'team', 'Leading our technology vision with 15+ years of experience in enterprise software development and digital transformation.', 'Cloud Architecture, AI/ML, Digital Strategy', 'Tokyo, Japan', 'sarah.johnson@jascome.com', 'https://linkedin.com/in/sarahjohnson', 1],
        ['team002', 'Michael Chen', 'michael-chen', 'Head of Operations', 'team', 'Driving operational excellence across our global offices with expertise in process optimization and team leadership.', 'Operations Management, Process Optimization, Team Building', 'Tokyo, Japan', 'michael.chen@jascome.com', 'https://linkedin.com/in/michaelchen', 1],
        ['team003', 'Emily Rodriguez', 'emily-rodriguez', 'Director of Business Development', 'team', 'Building strategic partnerships and expanding our market presence across Asia and Africa.', 'Business Strategy, Partnership Development, Market Expansion', 'Addis Ababa, Ethiopia', 'emily.rodriguez@jascome.com', 'https://linkedin.com/in/emilyrodriguez', 1],
        ['team004', 'David Kim', 'david-kim', 'Lead Software Architect', 'team', 'Architecting scalable solutions and mentoring development teams to deliver world-class software products.', 'Software Architecture, Microservices, DevOps', 'Tokyo, Japan', 'david.kim@jascome.com', 'https://linkedin.com/in/davidkim', 0],
        ['team005', 'Priya Sharma', 'priya-sharma', 'Financial Controller', 'team', 'Managing financial operations and ensuring fiscal responsibility across all business units.', 'Financial Management, Risk Analysis, Compliance', 'Kathmandu, Nepal', 'priya.sharma@jascome.com', 'https://linkedin.com/in/priyasharma', 0]
    ];
    
    $experts = [
        ['expert001', 'Dr. James Anderson', 'dr-james-anderson', 'IoT Solutions Expert', 'expert', 'Pioneering IoT implementations for smart factories and industrial automation with 20+ years of experience.', 'IoT, Industrial Automation, Smart Manufacturing', 'Tokyo, Japan', 'james.anderson@jascome.com', 'https://linkedin.com/in/jamesanderson', 1],
        ['expert002', 'Maria Santos', 'maria-santos', 'Digital Transformation Consultant', 'expert', 'Helping organizations navigate digital transformation journeys with proven methodologies and strategic insights.', 'Digital Strategy, Change Management, Business Process Reengineering', 'Tokyo, Japan', 'maria.santos@jascome.com', 'https://linkedin.com/in/mariasantos', 1],
        ['expert003', 'Robert Tanaka', 'robert-tanaka', 'Cybersecurity Specialist', 'expert', 'Protecting enterprise systems and data with comprehensive security strategies and risk management frameworks.', 'Cybersecurity, Risk Management, Compliance', 'Tokyo, Japan', 'robert.tanaka@jascome.com', 'https://linkedin.com/in/roberttanaka', 1],
        ['expert004', 'Lisa Wang', 'lisa-wang', 'Cloud Solutions Architect', 'expert', 'Designing and implementing scalable cloud infrastructure for enterprise clients across multiple industries.', 'Cloud Computing, AWS, Azure, Infrastructure Design', 'Tokyo, Japan', 'lisa.wang@jascome.com', 'https://linkedin.com/in/lisawang', 0],
        ['expert005', 'Ahmed Hassan', 'ahmed-hassan', 'Renewable Energy Consultant', 'expert', 'Driving sustainable energy solutions and infrastructure development across Africa with focus on solar and wind power.', 'Renewable Energy, Solar Power, Infrastructure Development', 'Addis Ababa, Ethiopia', 'ahmed.hassan@jascome.com', 'https://linkedin.com/in/ahmedhassan', 1],
        ['expert006', 'Jennifer Lee', 'jennifer-lee', 'Financial Technology Advisor', 'expert', 'Advising financial institutions on digital banking, fintech innovation, and regulatory compliance.', 'Fintech, Digital Banking, Regulatory Compliance', 'Tokyo, Japan', 'jennifer.lee@jascome.com', 'https://linkedin.com/in/jenniferlee', 0]
    ];
    
    $stmt = $conn->prepare("INSERT INTO expert (id, name, slug, role, type, bio, expertise, locations, image, email, linkedin, featured, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, 'published', NOW(), NOW())");
    
    foreach ($teamMembers as $member) {
        $stmt->execute($member);
    }
    echo "   ✓ Inserted 5 team members\n";
    
    foreach ($experts as $expert) {
        $stmt->execute($expert);
    }
    echo "   ✓ Inserted 6 experts\n\n";
    
    echo "=== Migration Complete ===\n";
    echo "Total records inserted: 11\n";
    
} catch (PDOException $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n\n";
}
