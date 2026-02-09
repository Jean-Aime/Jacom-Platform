<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class IndustriesController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM Industry ORDER BY name ASC");
        $industries = $stmt->fetchAll();
        echo json_encode($industries);
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT * FROM Industry WHERE slug = ?");
        $stmt->execute([$slug]);
        $industry = $stmt->fetch();
        
        if (!$industry) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($industry);
    }
    
    public function create() {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO Industry (id, name, slug, description, overview, challenges, trends, featured, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'c' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id,
            $data['name'],
            $data['slug'],
            $data['description'],
            $data['overview'],
            $data['challenges'],
            $data['trends'],
            $data['featured'] ?? 0,
            $data['image'] ?? null
        ]);
        
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Industry SET name = ?, slug = ?, description = ?, overview = ?, challenges = ?, trends = ?, featured = ?, image = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'],
            $data['slug'],
            $data['description'],
            $data['overview'],
            $data['challenges'],
            $data['trends'],
            $data['featured'] ?? 0,
            $data['image'] ?? null,
            $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        
        $stmt = $this->conn->prepare("DELETE FROM Industry WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
}
