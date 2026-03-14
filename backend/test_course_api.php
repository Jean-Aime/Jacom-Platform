<?php
// Quick test script to check if course API is working
require_once __DIR__ . '/config/database.php';

header('Content-Type: application/json');

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    echo "=== TESTING COURSE API ===\n\n";
    
    // Test 1: Check if courses exist
    echo "1. Checking courses table:\n";
    $stmt = $conn->query("SELECT id, name, slug FROM courses LIMIT 5");
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($courses, JSON_PRETTY_PRINT) . "\n\n";
    
    // Test 2: Check if phases exist
    echo "2. Checking course_phases table:\n";
    $stmt = $conn->query("SELECT id, courseId, phaseNumber, title FROM course_phases LIMIT 5");
    $phases = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($phases, JSON_PRETTY_PRINT) . "\n\n";
    
    // Test 3: Check if weeks exist
    echo "3. Checking course_weeks table:\n";
    $stmt = $conn->query("SELECT id, phaseId, weekNumber, title FROM course_weeks LIMIT 5");
    $weeks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($weeks, JSON_PRETTY_PRINT) . "\n\n";
    
    // Test 4: Check specific course by slug
    echo "4. Testing course lookup by slug 'ai-powered-app-development':\n";
    $stmt = $conn->prepare("SELECT * FROM courses WHERE slug = ?");
    $stmt->execute(['ai-powered-app-development']);
    $course = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($course, JSON_PRETTY_PRINT) . "\n\n";
    
    // Test 5: Check if curriculum data exists for phase_001
    echo "5. Checking curriculum for phase_001:\n";
    $stmt = $conn->prepare("SELECT * FROM course_weeks WHERE phaseId = ?");
    $stmt->execute(['phase_001']);
    $weeks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "Weeks found: " . count($weeks) . "\n";
    echo json_encode($weeks, JSON_PRETTY_PRINT) . "\n\n";
    
    echo "=== TEST COMPLETE ===\n";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
