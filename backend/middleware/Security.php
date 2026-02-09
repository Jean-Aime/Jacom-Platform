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
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
        }
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
    
    public static function validateCSRF() {
        if (in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'DELETE'])) {
            $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
            $host = $_SERVER['HTTP_HOST'] ?? '';
            
            if ($origin && !str_contains($origin, $host)) {
                http_response_code(403);
                echo json_encode(['error' => 'CSRF validation failed']);
                exit();
            }
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
        $token = $_COOKIE['session-token'] ?? null;
        
        if (!$token) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit();
        }
        
        require_once __DIR__ . '/../config/database.php';
        $db = new Database();
        $conn = $db->getConnection();
        
        $stmt = $conn->prepare("SELECT * FROM Session WHERE token = ? AND expiresAt > NOW()");
        $stmt->execute([$token]);
        $session = $stmt->fetch();
        
        if (!$session) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid session']);
            exit();
        }
        
        return $session['userId'];
    }
}
