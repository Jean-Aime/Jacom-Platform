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
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function getAll() {
        Security::validateSession();
        $stmt = $this->conn->query("SELECT * FROM Lead ORDER BY createdAt DESC");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getById($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT * FROM Lead WHERE id = ?");
        $stmt->execute([$id]);
        $lead = $stmt->fetch();
        
        if (!$lead) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($lead);
    }
    
    public function update($id) {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        if (isset($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email']);
            return;
        }
        
        $stmt = $this->conn->prepare("UPDATE Lead SET name = ?, email = ?, company = ?, phone = ?, message = ?, source = ?, metadata = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['company'] ?? null,
            $data['phone'] ?? null,
            $data['message'] ?? null,
            $data['source'] ?? 'website',
            json_encode($data['metadata'] ?? []),
            $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        
        $stmt = $this->conn->prepare("DELETE FROM Lead WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
}
