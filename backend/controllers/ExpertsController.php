<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class ExpertsController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM Expert ORDER BY name ASC");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT * FROM Expert WHERE slug = ?");
        $stmt->execute([$slug]);
        $expert = $stmt->fetch();
        
        if (!$expert) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($expert);
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO Expert (id, name, slug, role, bio, expertise, locations, image, email, linkedin, featured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'e' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id, $data['name'], $data['slug'], $data['role'], $data['bio'],
            $data['expertise'], $data['locations'], $data['image'] ?? null,
            $data['email'] ?? null, $data['linkedin'] ?? null, $data['featured'] ?? 0
        ]);
        
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Expert SET name = ?, slug = ?, role = ?, bio = ?, expertise = ?, locations = ?, image = ?, email = ?, linkedin = ?, featured = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['role'], $data['bio'], $data['expertise'],
            $data['locations'], $data['image'] ?? null, $data['email'] ?? null,
            $data['linkedin'] ?? null, $data['featured'] ?? 0, $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Expert WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
