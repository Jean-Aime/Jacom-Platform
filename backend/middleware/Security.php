<?php
require_once __DIR__ . '/../config/config.php';

class Security {
    private static $rateLimits = [];
    
    public static function headers() {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('Content-Type: application/json; charset=UTF-8');
    }
    
    public static function cors() {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        
        if (in_array($origin, ALLOWED_ORIGINS)) {
            header("Access-Control-Allow-Origin: $origin");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Session-Token');
        }
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
    
    public static function validateCSRF() {
        if (in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'DELETE'])) {
            $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
            $referer = $_SERVER['HTTP_REFERER'] ?? '';
            
            // Allow requests from allowed origins
            if ($origin && in_array($origin, ALLOWED_ORIGINS)) {
                return;
            }
            
            // Allow requests from same host (referer check)
            if ($referer && strpos($referer, $_SERVER['HTTP_HOST']) !== false) {
                return;
            }
            
            // Allow requests without origin (same-origin or direct API calls)
            if (!$origin && !$referer) {
                return;
            }
            
            http_response_code(403);
            echo json_encode(['error' => 'CSRF validation failed']);
            exit();
        }
    }
    
    public static function rateLimit($ip, $limit = RATE_LIMIT, $window = RATE_WINDOW) {
        $key = $ip . '_' . floor(time() / $window);
        
        if (!isset(self::$rateLimits[$key])) {
            self::$rateLimits[$key] = 0;
        }
        
        self::$rateLimits[$key]++;
        
        if (self::$rateLimits[$key] > $limit) {
            http_response_code(429);
            echo json_encode(['error' => 'Rate limit exceeded']);
            exit();
        }
    }
    
    public static function sanitize($data) {
        if (is_array($data)) {
            return array_map([self::class, 'sanitize'], $data);
        }
        return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
    }
    
    public static function validateSession() {
        $token = $_COOKIE['session-token'] ?? $_SERVER['HTTP_X_SESSION_TOKEN'] ?? null;
        
        if (!$token) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized - No token provided']);
            exit();
        }
        
        require_once __DIR__ . '/../config/database.php';
        $db = Database::getInstance();
        $conn = $db->getConnection();
        
        if (!$conn) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit();
        }
        
        $stmt = $conn->prepare("SELECT * FROM session WHERE token = ? AND expiresAt > NOW()");
        $stmt->execute([$token]);
        $session = $stmt->fetch();
        
        if (!$session) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid or expired session']);
            exit();
        }
        
        return $session['userId'];
    }
}
