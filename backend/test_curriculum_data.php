<?php
// Test script to verify curriculum data exists in database
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    $result = [
        'status' => 'success',
        'data' => []
    ];
    
    // Check courses
    $stmt = $conn->query("SELECT id, name, slug FROM courses");
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['data']['courses'] = [
        'count' => count($courses),
        'items' => $courses
    ];
    
    // Check phases
    $stmt = $conn->query("SELECT id, courseId, phaseNumber, title FROM course_phases ORDER BY phaseNumber");
    $phases = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['data']['phases'] = [
        'count' => count($phases),
        'items' => $phases
    ];
    
    // Check weeks
    $stmt = $conn->query("SELECT id, phaseId, weekNumber, title FROM course_weeks ORDER BY weekNumber");
    $weeks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['data']['weeks'] = [
        'count' => count($weeks),
        'items' => $weeks
    ];
    
    // Check topics
    $stmt = $conn->query("SELECT id, weekId, title, orderIndex FROM course_topics ORDER BY orderIndex");
    $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['data']['topics'] = [
        'count' => count($topics),
        'items' => $topics
    ];
    
    // Check resources
    $stmt = $conn->query("SELECT id, topicId, type, title FROM course_resources ORDER BY orderIndex");
    $resources = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['data']['resources'] = [
        'count' => count($resources),
        'items' => $resources
    ];
    
    // Summary
    $result['summary'] = [
        'total_courses' => count($courses),
        'total_phases' => count($phases),
        'total_weeks' => count($weeks),
        'total_topics' => count($topics),
        'total_resources' => count($resources),
        'database_ready' => count($weeks) > 0 && count($topics) > 0
    ];
    
    echo json_encode($result, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ], JSON_PRETTY_PRINT);
}
