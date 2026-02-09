<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/middleware/Security.php';

// Apply security
Security::headers();
Security::cors();
Security::validateCSRF();

// Rate limiting
$ip = $_SERVER['REMOTE_ADDR'];
Security::rateLimit($ip);

// Parse request
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/webtest-backup/backend', '', $path);
$segments = array_filter(explode('/', $path));

try {
    if (count($segments) === 0) {
        echo json_encode(['message' => 'API is running', 'version' => '1.0']);
        exit();
    }
    
    $resource = $segments[1] ?? '';
    $id = $segments[2] ?? null;
    
    switch ($resource) {
        case 'auth':
            require_once __DIR__ . '/controllers/AuthController.php';
            $controller = new AuthController();
            $action = $id ?? '';
            
            if ($action === 'login' && $method === 'POST') {
                $controller->login();
            } elseif ($action === 'logout' && $method === 'POST') {
                $controller->logout();
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Not found']);
            }
            break;
            
        case 'industries':
            require_once __DIR__ . '/controllers/IndustriesController.php';
            $controller = new IndustriesController();
            
            if ($method === 'GET' && !$id) {
                $controller->getAll();
            } elseif ($method === 'GET' && $id) {
                $controller->getBySlug($id);
            } elseif ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'PUT' && $id) {
                $controller->update($id);
            } elseif ($method === 'DELETE' && $id) {
                $controller->delete($id);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'services':
            require_once __DIR__ . '/controllers/ServicesController.php';
            $controller = new ServicesController();
            
            if ($method === 'GET' && !$id) {
                $controller->getAll();
            } elseif ($method === 'GET' && $id) {
                $controller->getBySlug($id);
            } elseif ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'PUT' && $id) {
                $controller->update($id);
            } elseif ($method === 'DELETE' && $id) {
                $controller->delete($id);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'leads':
            require_once __DIR__ . '/controllers/LeadsController.php';
            $controller = new LeadsController();
            
            if ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'GET') {
                $controller->getAll();
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
    
} catch (Exception $e) {
    if (DEBUG) {
        error_log($e->getMessage());
    }
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
