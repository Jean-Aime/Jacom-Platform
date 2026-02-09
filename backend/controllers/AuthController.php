<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class AuthController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
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
        
        $stmt = $this->conn->prepare("SELECT * FROM User WHERE email = ?");
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
        
        $stmt = $this->conn->prepare("INSERT INTO Session (id, token, userId, expiresAt, createdAt) VALUES (?, ?, ?, ?, NOW())");
        $sessionId = $this->generateCuid();
        $stmt->execute([$sessionId, $token, $user['id'], $expiresAt]);
        
        setcookie('session-token', $token, [
            'expires' => time() + 86400,
            'path' => '/',
            'httponly' => true,
            'secure' => true,
            'samesite' => 'Strict'
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function logout() {
        $token = $_COOKIE['session-token'] ?? null;
        
        if ($token) {
            $stmt = $this->conn->prepare("DELETE FROM Session WHERE token = ?");
            $stmt->execute([$token]);
        }
        
        setcookie('session-token', '', time() - 3600, '/');
        echo json_encode(['success' => true]);
    }
    
    private function generateCuid() {
        return 'c' . uniqid() . bin2hex(random_bytes(8));
    }
}
