<?php
require_once __DIR__ . '/../controllers/AdminController.php';

// Admin API Routes
if (strpos($_SERVER['REQUEST_URI'], '/admin') !== false) {
    $controller = new AdminController();
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $segments = explode('/', trim($path, '/'));
    
    // Remove 'backend' from segments if present
    if ($segments[0] === 'backend') {
        array_shift($segments);
    }
    
    // Verify admin authentication for all admin routes
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
    
    // Verify admin role
    if ($session['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden - Admin access required']);
        exit;
    }
    
    $userId = $session['userId'];
    
    // Route handling
    switch ($method) {
        case 'GET':
            // Enrollment routes
            if ($segments[1] === 'enrollments' && !isset($segments[2])) {
                $controller->getAllEnrollments();
            }
            // Payment routes
            elseif ($segments[1] === 'payments') {
                $controller->getAllPayments();
            }
            // Notification routes
            elseif ($segments[1] === 'notifications') {
                $controller->getAllNotifications();
            }
            // Student routes
            elseif ($segments[1] === 'students' && isset($segments[2])) {
                $controller->getStudentDetails($segments[2]);
            }
            // Analytics routes
            elseif ($segments[1] === 'analytics') {
                $controller->getAnalytics();
            }
            break;
            
        case 'POST':
            // Enrollment payment
            if ($segments[1] === 'enrollments' && isset($segments[2]) && $segments[3] === 'payment') {
                $controller->recordPayment($segments[2]);
            }
            // Create notification
            elseif ($segments[1] === 'notifications') {
                $controller->createNotification();
            }
            // Create assignment
            elseif ($segments[1] === 'assignments') {
                $controller->createAssignment();
            }
            // File upload
            elseif ($segments[1] === 'upload') {
                $controller->uploadFile();
            }
            break;
            
        case 'PUT':
            // Update enrollment status
            if ($segments[1] === 'enrollments' && isset($segments[2]) && $segments[3] === 'status') {
                $controller->updateEnrollmentStatus($segments[2]);
            }
            // Update student
            elseif ($segments[1] === 'students' && isset($segments[2])) {
                $controller->updateStudent($segments[2]);
            }
            // Grade assignment
            elseif ($segments[1] === 'assignments' && isset($segments[2]) && $segments[3] === 'grade') {
                $controller->gradeAssignment($segments[2]);
            }
            break;
    }
}
