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
            $id, $data['name'], $data['slug'], $data['region'], $data['country'],
            $data['city'], $data['address'], $data['phone'], $data['email'],
            $data['lat'], $data['lng'], $data['image'] ?? null
        ]);
        
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Office SET name = ?, slug = ?, region = ?, country = ?, city = ?, address = ?, phone = ?, email = ?, lat = ?, lng = ?, image = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['region'], $data['country'], $data['city'],
            $data['address'], $data['phone'], $data['email'], $data['lat'], $data['lng'],
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

class CareersController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM Career WHERE expiresAt > NOW() ORDER BY publishedAt DESC");
        echo json_encode($stmt->fetchAll());
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
        
        $stmt = $this->conn->prepare("INSERT INTO Career (id, title, slug, department, location, type, experience, description, requirements, benefits, featured, publishedAt, expiresAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'c' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id, $data['title'], $data['slug'], $data['department'], $data['location'],
            $data['type'], $data['experience'], $data['description'], $data['requirements'],
            $data['benefits'], $data['featured'] ?? 0, $data['publishedAt'] ?? date('Y-m-d H:i:s'),
            $data['expiresAt']
        ]);
        
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Career SET title = ?, slug = ?, department = ?, location = ?, type = ?, experience = ?, description = ?, requirements = ?, benefits = ?, featured = ?, publishedAt = ?, expiresAt = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['title'], $data['slug'], $data['department'], $data['location'], $data['type'],
            $data['experience'], $data['description'], $data['requirements'], $data['benefits'],
            $data['featured'] ?? 0, $data['publishedAt'] ?? date('Y-m-d H:i:s'),
            $data['expiresAt'], $id
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
