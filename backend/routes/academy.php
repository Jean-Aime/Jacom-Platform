<?php
require_once __DIR__ . '/../controllers/AcademyController.php';

// Academy API Routes
if (strpos($_SERVER['REQUEST_URI'], '/academy') !== false) {
    $controller = new AcademyController();
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $segments = explode('/', trim($path, '/'));
    
    // Remove 'backend' from segments if present
    if ($segments[0] === 'backend') {
        array_shift($segments);
    }
    
    switch ($method) {
        case 'GET':
            if ($segments[0] === 'academy-settings') {
                $controller->getSettings();
            } elseif ($segments[0] === 'academy' && $segments[1] === 'courses') {
                if (isset($segments[2])) {
                    $controller->getCourse($segments[2]);
                } else {
                    $controller->getCourses();
                }
            } elseif ($segments[0] === 'academy' && $segments[1] === 'enrollments') {
                $controller->getEnrollments();
            } elseif ($segments[0] === 'academy' && $segments[1] === 'analytics') {
                $controller->getAnalytics();
            } elseif ($segments[0] === 'courses') {
                // Legacy support for existing frontend
                $controller->getCourses();
            }
            break;
            
        case 'POST':
            if ($segments[0] === 'academy' && $segments[1] === 'courses') {
                $controller->createCourse();
            } elseif ($segments[0] === 'academy' && $segments[1] === 'enroll') {
                // Authenticated user enrollment - session token provides sufficient validation
                require_once __DIR__ . '/../middleware/Security.php';
                $token = $_SERVER['HTTP_X_SESSION_TOKEN'] ?? '';
                
                // Validate session and get user info
                require_once __DIR__ . '/../config/database.php';
                $db = Database::getInstance();
                $conn = $db->getConnection();
                
                if (!$token) {
                    http_response_code(401);
                    echo json_encode(['error' => 'Unauthorized - No session token']);
                    exit;
                }
                
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
                
                $controller->enrollCourse($session['userId']);
            }
            break;
            
        case 'PUT':
            if ($segments[0] === 'academy-settings') {
                $controller->updateSettings();
            } elseif ($segments[0] === 'academy' && $segments[1] === 'courses' && isset($segments[2])) {
                $controller->updateCourse($segments[2]);
            } elseif ($segments[0] === 'academy' && $segments[1] === 'enrollments' && isset($segments[2])) {
                $controller->updateEnrollmentStatus($segments[2]);
            }
            break;
            
        case 'DELETE':
            if ($segments[0] === 'academy' && $segments[1] === 'courses' && isset($segments[2])) {
                $controller->deleteCourse($segments[2]);
            }
            break;
    }
}