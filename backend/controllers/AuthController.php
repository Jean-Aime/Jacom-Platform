<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class AuthController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function signup() {
        $data = json_decode(file_get_contents("php://input"), true);
        $name = Security::sanitize($data['name'] ?? '');
        $email = Security::sanitize($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $role = $data['role'] ?? 'student';
        
        // Enhanced validation
        if (!$name || !$email || !$password) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            return;
        }
        
        if (strlen($name) < 2 || strlen($name) > 100) {
            http_response_code(400);
            echo json_encode(['error' => 'Name must be between 2 and 100 characters']);
            return;
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email format']);
            return;
        }
        
        // Strong password validation
        if (strlen($password) < 8) {
            http_response_code(400);
            echo json_encode(['error' => 'Password must be at least 8 characters long']);
            return;
        }
        
        if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/', $password)) {
            http_response_code(400);
            echo json_encode(['error' => 'Password must contain at least one uppercase letter, one lowercase letter, and one number']);
            return;
        }
        
        // Rate limiting for signup
        $ip = $_SERVER['REMOTE_ADDR'];
        Security::rateLimit($ip . '_signup', 3, 3600); // 3 signups per hour
        
        // Check if user already exists
        $stmt = $this->conn->prepare("SELECT id FROM user WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists']);
            return;
        }
        
        // Hash password with strong settings
        $hashedPassword = password_hash($password, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536,
            'time_cost' => 4,
            'threads' => 3
        ]);
        
        $userId = 'usr_' . bin2hex(random_bytes(16));
        
        try {
            $stmt = $this->conn->prepare("INSERT INTO user (id, email, password, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())");
            $stmt->execute([$userId, $email, $hashedPassword, $name, $role]);
            
            // Log successful signup
            error_log("User signup: {$email} from IP: {$ip}");
            
            echo json_encode(['success' => true, 'message' => 'Account created successfully']);
        } catch (Exception $e) {
            error_log("Signup error: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create account']);
        }
    }
    
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = Security::sanitize($data['email'] ?? '');
        $password = $data['password'] ?? '';
        
        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            return;
        }
        
        // Enhanced rate limiting
        $ip = $_SERVER['REMOTE_ADDR'];
        Security::rateLimit($ip . '_login', 5, 900); // 5 attempts per 15 minutes
        
        // Check for account lockout
        $stmt = $this->conn->prepare("SELECT failed_attempts, locked_until FROM user WHERE email = ?");
        $stmt->execute([$email]);
        $lockInfo = $stmt->fetch();
        
        if ($lockInfo && $lockInfo['locked_until'] && strtotime($lockInfo['locked_until']) > time()) {
            http_response_code(423);
            echo json_encode(['error' => 'Account temporarily locked due to multiple failed attempts']);
            return;
        }
        
        $stmt = $this->conn->prepare("SELECT * FROM user WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($password, $user['password'])) {
            // Update failed attempts
            if ($user) {
                $failedAttempts = ($user['failed_attempts'] ?? 0) + 1;
                $lockedUntil = null;
                
                if ($failedAttempts >= 5) {
                    $lockedUntil = date('Y-m-d H:i:s', time() + 1800); // Lock for 30 minutes
                }
                
                $stmt = $this->conn->prepare("UPDATE user SET failed_attempts = ?, locked_until = ? WHERE email = ?");
                $stmt->execute([$failedAttempts, $lockedUntil, $email]);
            }
            
            // Log failed attempt
            error_log("Failed login attempt for {$email} from IP: {$ip}");
            
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            return;
        }
        
        // Reset failed attempts on successful login
        $stmt = $this->conn->prepare("UPDATE user SET failed_attempts = 0, locked_until = NULL WHERE email = ?");
        $stmt->execute([$email]);
        
        // Generate secure session token
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + 86400);
        
        // Clean up old sessions
        $stmt = $this->conn->prepare("DELETE FROM session WHERE userId = ? OR expiresAt < NOW()");
        $stmt->execute([$user['id']]);
        
        $stmt = $this->conn->prepare("INSERT INTO session (id, token, userId, expiresAt, createdAt, ipAddress, userAgent) VALUES (?, ?, ?, ?, NOW(), ?, ?)");
        $sessionId = $this->generateCuid();
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        $stmt->execute([$sessionId, $token, $user['id'], $expiresAt, $ip, $userAgent]);
        
        // Set secure cookie - ALWAYS use secure flag in production
        setcookie('session-token', $token, [
            'expires' => time() + 86400,
            'path' => '/',
            'httponly' => true,
            'secure' => true, // Always enforce HTTPS
            'samesite' => 'Strict'
        ]);
        
        // Generate CSRF token for this session
        $csrfToken = Security::generateCSRFToken();
        
        // Log successful login (pseudonymize email for privacy)
        $emailHash = hash('sha256', $email);
        error_log("Successful login: user_" . substr($emailHash, 0, 16) . " from IP: {$ip}");
        
        echo json_encode([
            'success' => true, 
            'token' => $token,
            'csrfToken' => $csrfToken,
            'role' => $user['role'],
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
    }
    
    public function logout() {
        $token = $_COOKIE['session-token'] ?? null;
        
        if ($token) {
            $stmt = $this->conn->prepare("DELETE FROM session WHERE token = ?");
            $stmt->execute([$token]);
        }
        
        setcookie('session-token', '', time() - 3600, '/');
        echo json_encode(['success' => true]);
    }
    
    public function check() {
        $token = $_COOKIE['session-token'] ?? $_SERVER['HTTP_X_SESSION_TOKEN'] ?? null;
        
        if (!$token) {
            http_response_code(401);
            echo json_encode(['authenticated' => false]);
            return;
        }
        
        $stmt = $this->conn->prepare("SELECT s.*, u.email, u.name FROM session s JOIN user u ON s.userId = u.id WHERE s.token = ? AND s.expiresAt > NOW()");
        $stmt->execute([$token]);
        $session = $stmt->fetch();
        
        if (!$session) {
            http_response_code(401);
            echo json_encode(['authenticated' => false]);
            return;
        }
        
        echo json_encode([
            'authenticated' => true,
            'user' => [
                'email' => $session['email'],
                'name' => $session['name']
            ]
        ]);
    }
    
    private function generateCuid() {
        return 'c' . uniqid() . bin2hex(random_bytes(8));
    }
}
