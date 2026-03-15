<?php
require_once __DIR__ . '/../config/config.php';

class Security {
    private static $rateLimits = [];
    private static $csrfTokens = [];
    
    public static function headers() {
        // Basic security headers
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('Content-Type: application/json; charset=UTF-8');
        
        // HSTS - Force HTTPS for 1 year (critical for production)
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }
        
        // Content Security Policy - Prevent XSS attacks
        // Note: CSP is for the response content, not for validating incoming requests
        $csp = implode('; ', [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://www.googletagmanager.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: http:",
            "connect-src 'self'",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'"
        ]);
        header("Content-Security-Policy: " . $csp);
        
        // Permissions Policy - Restrict browser features
        $permissions = implode(', ', [
            'geolocation=()',
            'microphone=()',
            'camera=()',
            'payment=()',
            'usb=()',
            'magnetometer=()',
            'gyroscope=()',
            'accelerometer=()'
        ]);
        header("Permissions-Policy: " . $permissions);
        
        // Additional security headers
        header('X-Permitted-Cross-Domain-Policies: none');
        header('X-Download-Options: noopen');
    }
    
    public static function cors() {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        
        if (in_array($origin, ALLOWED_ORIGINS)) {
            header("Access-Control-Allow-Origin: $origin");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Session-Token, X-CSRF-Token');
            header('Access-Control-Expose-Headers: X-CSRF-Token');
        }
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
    
    public static function validateCSRF() {
        if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'DELETE'])) {
            return; // Only validate state-changing requests
        }
        
        // Double-submit cookie pattern + token validation
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $referer = $_SERVER['HTTP_REFERER'] ?? '';
        
        // Step 1: Origin/Referer validation (first line of defense)
        $validOrigin = false;
        
        if ($origin && in_array($origin, ALLOWED_ORIGINS)) {
            $validOrigin = true;
        } elseif ($referer) {
            foreach (ALLOWED_ORIGINS as $allowedOrigin) {
                if (strpos($referer, $allowedOrigin) === 0) {
                    $validOrigin = true;
                    break;
                }
            }
        }
        
        // Step 2: Token validation (second line of defense)
        $csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? $_POST['csrf_token'] ?? null;
        $csrfCookie = $_COOKIE['csrf-token'] ?? null;
        
        // For API calls, validate token from session
        $sessionToken = $_COOKIE['session-token'] ?? $_SERVER['HTTP_X_SESSION_TOKEN'] ?? null;
        
        if ($sessionToken) {
            // Authenticated request - validate CSRF token
            if (!$csrfToken || !$csrfCookie || !hash_equals($csrfCookie, $csrfToken)) {
                error_log('CSRF validation failed - Token mismatch. IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
                http_response_code(403);
                echo json_encode(['error' => 'CSRF validation failed']);
                exit();
            }
        } else {
            // Unauthenticated request - only check origin
            if (!$validOrigin) {
                error_log('CSRF validation failed - Invalid origin. IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
                http_response_code(403);
                echo json_encode(['error' => 'CSRF validation failed']);
                exit();
            }
        }
    }
    
    public static function generateCSRFToken() {
        $token = bin2hex(random_bytes(32));
        
        // Set CSRF cookie
        setcookie('csrf-token', $token, [
            'expires' => time() + 3600,
            'path' => '/',
            'httponly' => false, // JavaScript needs to read this
            'secure' => true,
            'samesite' => 'Strict'
        ]);
        
        return $token;
    }
    
    public static function rateLimit($ip, $limit = RATE_LIMIT, $window = RATE_WINDOW, $endpoint = '') {
        require_once __DIR__ . '/../config/database.php';
        $db = Database::getInstance();
        $conn = $db->getConnection();
        
        if (!$conn) {
            // If database is down, allow request but log warning
            error_log('WARNING: Rate limiting disabled - database unavailable');
            return;
        }
        
        // Use endpoint in key for per-endpoint rate limiting
        $endpoint = $endpoint ?: ($_SERVER['REQUEST_URI'] ?? 'unknown');
        $windowStart = date('Y-m-d H:i:s', floor(time() / $window) * $window);
        $key = hash('sha256', $ip . $endpoint . $windowStart);
        
        try {
            // Get or create rate limit entry
            $stmt = $conn->prepare("
                SELECT request_count 
                FROM rate_limit 
                WHERE id = ? AND window_start = ?
            ");
            $stmt->execute([$key, $windowStart]);
            $result = $stmt->fetch();
            
            if ($result) {
                $count = $result['request_count'] + 1;
                
                // Check if limit exceeded
                if ($count > $limit) {
                    error_log("Rate limit exceeded for IP: {$ip}, endpoint: {$endpoint}");
                    http_response_code(429);
                    echo json_encode([
                        'error' => 'Too many requests. Please try again later.',
                        'retryAfter' => $window
                    ]);
                    exit();
                }
                
                // Update count
                $stmt = $conn->prepare("
                    UPDATE rate_limit 
                    SET request_count = ? 
                    WHERE id = ?
                ");
                $stmt->execute([$count, $key]);
            } else {
                // Create new entry
                $stmt = $conn->prepare("
                    INSERT INTO rate_limit (id, ip_address, endpoint, request_count, window_start) 
                    VALUES (?, ?, ?, 1, ?)
                ");
                $stmt->execute([$key, $ip, $endpoint, $windowStart]);
            }
            
            // Cleanup old entries (run occasionally)
            if (rand(1, 100) === 1) {
                $stmt = $conn->prepare("DELETE FROM rate_limit WHERE window_start < DATE_SUB(NOW(), INTERVAL 24 HOUR)");
                $stmt->execute();
            }
        } catch (Exception $e) {
            error_log('Rate limiting error: ' . $e->getMessage());
            // Don't block request on rate limiting errors
        }
    }
    
    public static function sanitize($data) {
        if (is_array($data)) {
            return array_map([self::class, 'sanitize'], $data);
        }
        if (is_string($data)) {
            return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
        }
        return $data;
    }
    
    public static function validateInput($data, $rules) {
        $errors = [];
        
        foreach ($rules as $field => $rule) {
            $value = $data[$field] ?? null;
            
            // Required validation
            if (isset($rule['required']) && $rule['required'] && empty($value)) {
                $errors[$field] = "Field '{$field}' is required";
                continue;
            }
            
            if (empty($value)) continue;
            
            // Type validation
            if (isset($rule['type'])) {
                switch ($rule['type']) {
                    case 'email':
                        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                            $errors[$field] = "Invalid email format";
                        }
                        break;
                    case 'url':
                        if (!filter_var($value, FILTER_VALIDATE_URL)) {
                            $errors[$field] = "Invalid URL format";
                        }
                        break;
                    case 'int':
                        if (!is_numeric($value) || (int)$value != $value) {
                            $errors[$field] = "Must be an integer";
                        }
                        break;
                    case 'float':
                        if (!is_numeric($value)) {
                            $errors[$field] = "Must be a number";
                        }
                        break;
                }
            }
            
            // Length validation
            if (isset($rule['min']) && strlen($value) < $rule['min']) {
                $errors[$field] = "Minimum length is {$rule['min']}";
            }
            if (isset($rule['max']) && strlen($value) > $rule['max']) {
                $errors[$field] = "Maximum length is {$rule['max']}";
            }
            
            // Pattern validation
            if (isset($rule['pattern']) && !preg_match($rule['pattern'], $value)) {
                $errors[$field] = $rule['message'] ?? "Invalid format";
            }
        }
        
        return empty($errors) ? true : $errors;
    }
    
    public static function validateSession($requiredRole = null) {
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
        
        // Join with user table to get role
        $stmt = $conn->prepare("
            SELECT s.*, u.role, u.email 
            FROM session s 
            JOIN user u ON s.userId = u.id 
            WHERE s.token = ? AND s.expiresAt > NOW()
        ");
        $stmt->execute([$token]);
        $session = $stmt->fetch();
        
        if (!$session) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid or expired session']);
            exit();
        }
        
        // Role-based access control
        if ($requiredRole) {
            $allowedRoles = is_array($requiredRole) ? $requiredRole : [$requiredRole];
            
            if (!in_array($session['role'], $allowedRoles)) {
                error_log('Access denied for user ' . $session['email'] . ' (role: ' . $session['role'] . ') to endpoint requiring: ' . implode(', ', $allowedRoles));
                http_response_code(403);
                echo json_encode(['error' => 'Access denied - Insufficient permissions']);
                exit();
            }
        }
        
        return [
            'userId' => $session['userId'],
            'role' => $session['role'],
            'email' => $session['email']
        ];
    }
    
    public static function requireAdmin() {
        return self::validateSession('admin');
    }
    
    public static function requireInstructor() {
        return self::validateSession(['admin', 'instructor']);
    }
}
