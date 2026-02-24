<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/middleware/Security.php';

// Get database connection
$db = Database::getInstance()->getConnection();

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
$path = str_replace('/Jacom-Platform/backend', '', $path);
$segments = array_values(array_filter(explode('/', $path)));

try {
    if (count($segments) === 0) {
        echo json_encode(['message' => 'API is running', 'version' => '1.0']);
        exit();
    }
    
    $resource = $segments[0] ?? '';
    
    // Handle test-db endpoint
    if ($resource === 'test-db' || $resource === 'test-db.php') {
        require_once __DIR__ . '/test-db.php';
        exit();
    }
    $id = $segments[1] ?? null;
    
    switch ($resource) {
        case 'auth':
            require_once __DIR__ . '/controllers/AuthController.php';
            $controller = new AuthController();
            $action = $id ?? '';
            
            if ($action === 'login' && $method === 'POST') {
                $controller->login();
            } elseif ($action === 'logout' && $method === 'POST') {
                $controller->logout();
            } elseif ($action === 'check' && $method === 'GET') {
                $controller->check();
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
            } elseif ($method === 'GET' && !$id) {
                $controller->getAll();
            } elseif ($method === 'GET' && $id) {
                $controller->getById($id);
            } elseif ($method === 'PUT' && $id) {
                $controller->update($id);
            } elseif ($method === 'DELETE' && $id) {
                $controller->delete($id);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'content':
            require_once __DIR__ . '/controllers/ContentController.php';
            $controller = new ContentController();
            
            if ($method === 'GET' && !$id) {
                $controller->getAll();
            } elseif ($method === 'GET' && $id) {
                $controller->getByKey($id);
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
            
        case 'experts':
            require_once __DIR__ . '/controllers/ExpertsController.php';
            $controller = new ExpertsController();
            
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
            
        case 'insights':
            require_once __DIR__ . '/controllers/InsightsController.php';
            $controller = new InsightsController();
            
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
            
        case 'offices':
            require_once __DIR__ . '/controllers/OfficesController.php';
            $controller = new OfficesController();
            
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
            
        case 'careers':
            require_once __DIR__ . '/controllers/CareersController.php';
            $controller = new CareersController();
            
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
            
        case 'solutions':
            require_once __DIR__ . '/controllers/SolutionsController.php';
            $controller = new SolutionsController();
            
            if ($method === 'GET' && !$id) {
                echo json_encode($controller->getAll());
            } elseif ($method === 'GET' && $id) {
                echo json_encode($controller->getBySlug($id));
            } elseif ($method === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode($controller->create($data));
            } elseif ($method === 'PUT' && $id) {
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode($controller->update($id, $data));
            } elseif ($method === 'DELETE' && $id) {
                echo json_encode($controller->delete($id));
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'events':
            require_once __DIR__ . '/controllers/EventsController.php';
            $controller = new EventsController();
            
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
            
        case 'community-categories':
            require_once __DIR__ . '/controllers/CommunityCategoriesController.php';
            $controller = new CommunityCategoriesController();
            
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
            
        case 'case-studies':
            require_once __DIR__ . '/controllers/CaseStudiesController.php';
            $controller = new CaseStudiesController();
            
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
            
        case 'subscribers':
            require_once __DIR__ . '/controllers/SubscribersController.php';
            $controller = new SubscribersController($db);
            
            if ($method === 'GET' && !$id) {
                $controller->getAll();
            } elseif ($method === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                $controller->create($data);
            } elseif ($method === 'DELETE' && $id) {
                $controller->delete($id);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'courses':
            require_once __DIR__ . '/controllers/CoursesController.php';
            $controller = new CoursesController();
            $action = $id ?? '';
            
            if ($method === 'GET' && !$id) {
                $controller->getAll();
            } elseif ($method === 'GET' && $action === 'featured') {
                $controller->getFeatured();
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
            
        case 'academy-settings':
            require_once __DIR__ . '/controllers/AcademySettingsController.php';
            $controller = new AcademySettingsController();
            
            if ($method === 'GET') {
                $controller->get();
            } elseif ($method === 'PUT') {
                $controller->update();
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'registrations':
            require_once __DIR__ . '/controllers/RegistrationController.php';
            $controller = new RegistrationController();
            
            if ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'GET') {
                $controller->getAll();
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'course-phases':
            require_once __DIR__ . '/controllers/CoursePhasesController.php';
            $controller = new CoursePhasesController();
            
            if ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'DELETE' && $id) {
                $controller->delete($id);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'course-pricing':
            require_once __DIR__ . '/controllers/CoursePricingController.php';
            $controller = new CoursePricingController();
            
            if ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'DELETE' && $id) {
                $controller->delete($id);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case 'class-schedule':
            require_once __DIR__ . '/controllers/ClassScheduleController.php';
            $controller = new ClassScheduleController();
            
            if ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'DELETE' && $id) {
                $controller->delete($id);
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
    error_log($e->getMessage());
    error_log($e->getTraceAsString());
    http_response_code(500);
    if (DEBUG) {
        echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
    } else {
        echo json_encode(['error' => 'Internal server error']);
    }
}
