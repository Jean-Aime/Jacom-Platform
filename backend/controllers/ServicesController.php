<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class ServicesController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM Service WHERE status = 'published' ORDER BY name ASC");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT * FROM Service WHERE slug = ?");
        $stmt->execute([$slug]);
        $service = $stmt->fetch();
        
        if (!$service) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($service);
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO Service (id, name, slug, description, overview, methodologies, tools, featured, image, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'c' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id, $data['name'], $data['slug'], $data['description'],
            $data['overview'], $data['methodologies'], $data['tools'],
            $data['featured'] ?? 0, $data['image'] ?? null, $data['status'] ?? 'published'
        ]);
        
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Service SET name = ?, slug = ?, description = ?, overview = ?, methodologies = ?, tools = ?, featured = ?, image = ?, status = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['description'], $data['overview'],
            $data['methodologies'], $data['tools'], $data['featured'] ?? 0,
            $data['image'] ?? null, $data['status'] ?? 'published', $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Service WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
