<?php
require_once __DIR__ . '/../controllers/AssignmentController.php';

// Assignment API Routes
if (strpos($_SERVER['REQUEST_URI'], '/assignment') !== false) {
    $controller = new AssignmentController();
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $segments = explode('/', trim($path, '/'));
    
    // Remove 'backend' from segments if present
    if ($segments[0] === 'backend') {
        array_shift($segments);
    }
    
    // Verify authentication for all assignment routes
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
    $userRole = $session['role'];
    
    switch ($method) {
        case 'GET':
            // Student routes
            if ($segments[1] === 'student' && $segments[2] === 'assignments') {
                $controller->getStudentAssignments($userId);
            } elseif ($segments[1] === 'student' && $segments[2] === 'assignment' && isset($segments[3])) {
                $controller->getAssignment($segments[3], $userId);
            }
            // Admin routes
            elseif ($segments[1] === 'admin' && $segments[2] === 'assignment' && isset($segments[3]) && $segments[4] === 'submissions') {
                if ($userRole !== 'admin') {
                    http_response_code(403);
                    echo json_encode(['error' => 'Admin access required']);
                    exit;
                }
                $controller->getAssignmentSubmissions($segments[3]);
            }
            break;
            
        case 'POST':
            // Student: Submit assignment
            if ($segments[1] === 'student' && $segments[2] === 'assignment' && $segments[3] === 'submit') {
                $controller->submitAssignment($userId);
            }
            // Student: Upload file
            elseif ($segments[1] === 'student' && $segments[2] === 'assignment' && $segments[3] === 'upload') {
                $controller->uploadAssignmentFile();
            }
            // Admin: Grade submission
            elseif ($segments[1] === 'admin' && $segments[2] === 'submission' && isset($segments[3]) && $segments[4] === 'grade') {
                if ($userRole !== 'admin') {
                    http_response_code(403);
                    echo json_encode(['error' => 'Admin access required']);
                    exit;
                }
                $controller->gradeSubmission($segments[3]);
            }
            break;
    }
}
