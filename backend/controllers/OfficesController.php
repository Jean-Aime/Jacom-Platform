<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class OfficesController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM Office ORDER BY name ASC");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT * FROM Office WHERE slug = ?");
        $stmt->execute([$slug]);
        $office = $stmt->fetch();
        
        if (!$office) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($office);
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO Office (id, name, slug, region, country, city, address, phone, email, lat, lng, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'o' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id, $data['name'], $data['slug'], $data['region'] ?? '', $data['country'] ?? '',
            $data['city'] ?? '', $data['address'] ?? '', $data['phone'] ?? '', $data['email'] ?? '',
            $data['lat'] ?? null, $data['lng'] ?? null, $data['image'] ?? null
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Office SET name = ?, slug = ?, region = ?, country = ?, city = ?, address = ?, phone = ?, email = ?, lat = ?, lng = ?, image = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['region'] ?? '', $data['country'] ?? '', $data['city'] ?? '',
            $data['address'] ?? '', $data['phone'] ?? '', $data['email'] ?? '', $data['lat'] ?? null, $data['lng'] ?? null,
            $data['image'] ?? null, $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Office WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
