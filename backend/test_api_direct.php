<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== TESTING CURRICULUM API ENDPOINTS ===\n\n";

require_once __DIR__ . '/config/database.php';

$db = Database::getInstance();
$conn = $db->getConnection();

// Test 1: Check weeks data
echo "1. Testing course_weeks table:\n";
try {
    $stmt = $conn->query("SELECT COUNT(*) as count FROM course_weeks");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "   ✓ Weeks count: " . $result['count'] . "\n";
    
    $stmt = $conn->query("SELECT * FROM course_weeks LIMIT 3");
    $weeks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($weeks as $week) {
        echo "   - Week {$week['weekNumber']}: {$week['title']}\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n";
}

echo "\n2. Testing course_topics table:\n";
try {
    $stmt = $conn->query("SELECT COUNT(*) as count FROM course_topics");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "   ✓ Topics count: " . $result['count'] . "\n";
    
    $stmt = $conn->query("SELECT * FROM course_topics LIMIT 3");
    $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($topics as $topic) {
        echo "   - {$topic['title']}\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n";
}

echo "\n3. Testing course_resources table:\n";
try {
    $stmt = $conn->query("SELECT COUNT(*) as count FROM course_resources");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "   ✓ Resources count: " . $result['count'] . "\n";
    
    $stmt = $conn->query("SELECT * FROM course_resources LIMIT 3");
    $resources = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($resources as $resource) {
        echo "   - {$resource['type']}: {$resource['title']}\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n";
}

echo "\n4. Testing CurriculumController:\n";
try {
    require_once __DIR__ . '/controllers/CurriculumController.php';
    $controller = new CurriculumController();
    
    echo "   Testing getAllWeeks()...\n";
    ob_start();
    $controller->getAllWeeks();
    $output = ob_get_clean();
    $data = json_decode($output, true);
    echo "   ✓ Returned " . count($data) . " weeks\n";
    
} catch (Exception $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n";
    echo "   File: " . $e->getFile() . "\n";
    echo "   Line: " . $e->getLine() . "\n";
}

echo "\n5. Testing course_phases:\n";
try {
    $stmt = $conn->query("SELECT * FROM course_phases WHERE courseId = 'course_001'");
    $phases = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "   ✓ Found " . count($phases) . " phases for course_001\n";
    foreach ($phases as $phase) {
        echo "   - Phase {$phase['phaseNumber']}: {$phase['title']}\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n";
}

echo "\n=== END OF TESTS ===\n";
