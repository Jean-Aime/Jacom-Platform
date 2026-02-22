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
    
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = Security::sanitize($data['email'] ?? '');
        $password = $data['password'] ?? '';
        
        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            return;
        }
        
        // Rate limiting
        $ip = $_SERVER['REMOTE_ADDR'];
        Security::rateLimit($ip . '_login', 5, 900);
        
        $stmt = $this->conn->prepare("SELECT * FROM user WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            return;
        }
        
        // Generate session token
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + 86400);
        
        $stmt = $this->conn->prepare("INSERT INTO session (id, token, userId, expiresAt, createdAt) VALUES (?, ?, ?, ?, NOW())");
        $sessionId = $this->generateCuid();
        $stmt->execute([$sessionId, $token, $user['id'], $expiresAt]);
        
        setcookie('session-token', $token, [
            'expires' => time() + 86400,
            'path' => '/',
            'httponly' => false,
            'secure' => false,
            'samesite' => 'Lax',
            'domain' => ''
        ]);
        
        echo json_encode(['success' => true, 'token' => $token]);
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
