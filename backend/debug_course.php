<?php
// Debug script to find the exact error
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain');

echo "=== DEBUGGING COURSE API ===\n\n";

try {
    echo "1. Loading database...\n";
    require_once __DIR__ . '/config/database.php';
    $db = Database::getInstance();
    $conn = $db->getConnection();
    echo "✓ Database connected\n\n";
    
    echo "2. Testing course query...\n";
    $stmt = $conn->prepare("SELECT * FROM courses WHERE slug = ?");
    $stmt->execute(['ai-powered-app-development']);
    $course = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$course) {
        echo "✗ Course not found!\n";
        exit;
    }
    
    echo "✓ Course found: " . $course['name'] . "\n";
    echo "  ID: " . $course['id'] . "\n\n";
    
    echo "3. Testing course_phases query...\n";
    $stmt = $conn->prepare("SELECT * FROM course_phases WHERE courseId = ? ORDER BY phaseNumber ASC");
    $stmt->execute([$course['id']]);
    $phases = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "✓ Found " . count($phases) . " phases\n\n";
    
    if (count($phases) > 0) {
        $phaseId = $phases[0]['id'];
        echo "4. Testing course_weeks query for phase: $phaseId\n";
        
        // Check if table exists
        try {
            $stmt = $conn->query("SHOW TABLES LIKE 'course_weeks'");
            $exists = $stmt->fetch();
            
            if (!$exists) {
                echo "✗ Table 'course_weeks' does NOT exist!\n";
                echo "  This is the problem - curriculum tables not created.\n";
                exit;
            }
            
            echo "✓ Table 'course_weeks' exists\n";
            
            $stmt = $conn->prepare("SELECT * FROM course_weeks WHERE phaseId = ? ORDER BY weekNumber ASC");
            $stmt->execute([$phaseId]);
            $weeks = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo "✓ Found " . count($weeks) . " weeks\n\n";
            
        } catch (Exception $e) {
            echo "✗ Error querying course_weeks: " . $e->getMessage() . "\n";
        }
    }
    
    echo "5. Loading CoursesController...\n";
    require_once __DIR__ . '/controllers/CoursesController.php';
    echo "✓ Controller loaded\n\n";
    
    echo "6. Testing getBySlug method...\n";
    ob_start();
    $controller = new CoursesController();
    $controller->getBySlug('ai-powered-app-development');
    $output = ob_get_clean();
    
    echo "✓ Method executed\n";
    echo "Output:\n";
    echo $output . "\n";
    
} catch (Exception $e) {
    echo "\n✗ ERROR CAUGHT:\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "\nStack trace:\n";
    echo $e->getTraceAsString() . "\n";
}
