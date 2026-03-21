<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Session-Token');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../controllers/StudentProgressController.php';

$controller = new StudentProgressController();
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Routes:
// GET /student-progress/courses/{courseId}/preview - Get course preview (before enrollment)
// GET /student-progress/courses/{courseId}/curriculum - Get full curriculum (after enrollment)
// GET /student-progress/courses/{courseId}/progress - Get student progress
// POST /student-progress/topics/{topicId}/complete - Mark topic as complete
// GET /student-progress/resources/{resourceId} - Get resource (with access check)

try {
    // GET /student-progress/courses/{courseId}/preview
    if ($method === 'GET' && isset($pathParts[2]) && $pathParts[2] === 'courses' && isset($pathParts[3]) && isset($pathParts[4]) && $pathParts[4] === 'preview') {
        $controller->getCoursePreview($pathParts[3]);
    }
    
    // GET /student-progress/courses/{courseId}/curriculum
    elseif ($method === 'GET' && isset($pathParts[2]) && $pathParts[2] === 'courses' && isset($pathParts[3]) && isset($pathParts[4]) && $pathParts[4] === 'curriculum') {
        $controller->getFullCurriculum($pathParts[3]);
    }
    
    // GET /student-progress/courses/{courseId}/progress
    elseif ($method === 'GET' && isset($pathParts[2]) && $pathParts[2] === 'courses' && isset($pathParts[3]) && isset($pathParts[4]) && $pathParts[4] === 'progress') {
        $controller->getStudentProgress($pathParts[3]);
    }
    
    // POST /student-progress/topics/{topicId}/complete
    elseif ($method === 'POST' && isset($pathParts[2]) && $pathParts[2] === 'topics' && isset($pathParts[3]) && isset($pathParts[4]) && $pathParts[4] === 'complete') {
        $controller->markTopicComplete($pathParts[3]);
    }
    
    // GET /student-progress/resources/{resourceId}
    elseif ($method === 'GET' && isset($pathParts[2]) && $pathParts[2] === 'resources' && isset($pathParts[3])) {
        $controller->getResource($pathParts[3]);
    }
    
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'details' => $e->getMessage()]);
}
