<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class LeadsController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function create() {
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email']);
            return;
        }
        
        $stmt = $this->conn->prepare("INSERT INTO Lead (id, name, email, company, phone, message, source, metadata, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        
        $id = 'c' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id,
            $data['name'],
            $data['email'],
            $data['company'] ?? null,
            $data['phone'] ?? null,
            $data['message'] ?? null,
            $data['source'] ?? 'website',
            json_encode($data['metadata'] ?? [])
        ]);
        
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function getAll() {
        Security::validateSession();
        $stmt = $this->conn->query("SELECT * FROM Lead ORDER BY createdAt DESC");
        echo json_encode($stmt->fetchAll());
    }
}
