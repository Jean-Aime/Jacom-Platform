<?php
require_once __DIR__ . '/../controllers/StudentController.php';

// Student API Routes
if (strpos($_SERVER['REQUEST_URI'], '/student') !== false) {
    $controller = new StudentController();
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $segments = explode('/', trim($path, '/'));
    
    // Remove 'backend' from segments if present
    if ($segments[0] === 'backend') {
        array_shift($segments);
    }
    
    // Verify authentication for all student routes
    $token = $_SERVER['HTTP_X_SESSION_TOKEN'] ?? '';
    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized - No session token']);
        exit;
    }
    
    require_once __DIR__ . '/../config/database.php';
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    $stmt = $conn->prepare("
        SELECT s.userId, u.role, u.email 
        FROM session s 
        JOIN user u ON s.userId = u.id 
        WHERE s.token = ? AND s.expiresAt > NOW()
    ");
    $stmt->execute([$token]);
    $session = $stmt->fetch();
    
    if (!$session) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired session']);
        exit;
    }
    
    $userId = $session['userId'];
    
    switch ($method) {
        case 'GET':
            if ($segments[1] === 'enrolled-courses') {
                $controller->getEnrolledCourses($userId);
            } elseif ($segments[1] === 'upcoming-classes') {
                $controller->getUpcomingClasses($userId);
            } elseif ($segments[1] === 'assignments') {
                $controller->getAssignments($userId);
            } elseif ($segments[1] === 'course' && isset($segments[2])) {
                $controller->getCourseContent($userId, $segments[2]);
            }
            break;
            
        case 'POST':
            if ($segments[1] === 'lesson' && isset($segments[2]) && $segments[3] === 'complete') {
                $controller->markLessonComplete($userId, $segments[2]);
            } elseif ($segments[1] === 'quiz' && isset($segments[2]) && $segments[3] === 'submit') {
                $controller->submitQuiz($userId, $segments[2]);
            } elseif ($segments[1] === 'course' && isset($segments[2]) && $segments[3] === 'certificate') {
                $controller->generateCertificate($userId, $segments[2]);
            }
            break;
    }
}
