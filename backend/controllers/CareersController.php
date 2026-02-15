<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class CareersController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM Career ORDER BY featured DESC, createdAt DESC");
        $careers = $stmt->fetchAll();
        echo json_encode($careers);
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT * FROM Career WHERE slug = ?");
        $stmt->execute([$slug]);
        $career = $stmt->fetch();
        
        if (!$career) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($career);
    }
    
    public function create() {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO Career (id, title, slug, department, location, type, description, requirements, responsibilities, featured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'c' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id,
            $data['title'],
            $data['slug'],
            $data['department'] ?? null,
            $data['location'] ?? null,
            $data['type'] ?? null,
            $data['description'] ?? null,
            $data['requirements'] ?? null,
            $data['responsibilities'] ?? null,
            $data['featured'] ?? 0
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Career SET title = ?, slug = ?, department = ?, location = ?, type = ?, description = ?, requirements = ?, responsibilities = ?, featured = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['title'],
            $data['slug'],
            $data['department'] ?? null,
            $data['location'] ?? null,
            $data['type'] ?? null,
            $data['description'] ?? null,
            $data['requirements'] ?? null,
            $data['responsibilities'] ?? null,
            $data['featured'] ?? 0,
            $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        
        $stmt = $this->conn->prepare("DELETE FROM Career WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
}
