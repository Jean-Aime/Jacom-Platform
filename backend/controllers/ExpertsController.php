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
        $stmt = $this->conn->query("
            SELECT e.*, 
                   GROUP_CONCAT(DISTINCT i.id) as industryIds,
                   GROUP_CONCAT(DISTINCT s.id) as serviceIds
            FROM Expert e
            LEFT JOIN _ExpertToIndustry eti ON e.id = eti.A
            LEFT JOIN Industry i ON eti.B = i.id
            LEFT JOIN _ExpertToService ets ON e.id = ets.A
            LEFT JOIN Service s ON ets.B = s.id
            GROUP BY e.id
            ORDER BY e.name ASC
        ");
        $experts = $stmt->fetchAll();
        
        $formatted = array_map(function($expert) {
            return [
                'id' => $expert['id'],
                'name' => $expert['name'],
                'slug' => $expert['slug'],
                'role' => $expert['role'],
                'bio' => $expert['bio'],
                'expertise' => $expert['expertise'],
                'locations' => $expert['locations'],
                'image' => $expert['image'],
                'email' => $expert['email'],
                'linkedin' => $expert['linkedin'],
                'featured' => (bool)$expert['featured'],
                'createdAt' => $expert['createdAt'],
                'updatedAt' => $expert['updatedAt'],
                'industries' => $expert['industryIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $expert['industryIds'])) : [],
                'services' => $expert['serviceIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $expert['serviceIds'])) : []
            ];
        }, $experts);
        
        echo json_encode($formatted);
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
            $id, $data['name'], $data['slug'], $data['role'], $data['bio'] ?? '',
            $data['expertise'] ?? '', $data['locations'] ?? '', $data['image'] ?? null,
            $data['email'] ?? null, $data['linkedin'] ?? null, $data['featured'] ?? 0
        ]);
        
        // Handle relations
        if (!empty($data['industryIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToIndustry (A, B) VALUES (?, ?)");
            foreach ($data['industryIds'] as $industryId) {
                $relStmt->execute([$id, $industryId]);
            }
        }
        
        if (!empty($data['serviceIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToService (A, B) VALUES (?, ?)");
            foreach ($data['serviceIds'] as $serviceId) {
                $relStmt->execute([$id, $serviceId]);
            }
        }
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Expert SET name = ?, slug = ?, role = ?, bio = ?, expertise = ?, locations = ?, image = ?, email = ?, linkedin = ?, featured = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['role'], $data['bio'] ?? '', $data['expertise'] ?? '',
            $data['locations'] ?? '', $data['image'] ?? null, $data['email'] ?? null,
            $data['linkedin'] ?? null, $data['featured'] ?? 0, $id
        ]);
        
        // Update relations
        $this->conn->prepare("DELETE FROM _ExpertToIndustry WHERE A = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM _ExpertToService WHERE A = ?")->execute([$id]);
        
        if (!empty($data['industryIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToIndustry (A, B) VALUES (?, ?)");
            foreach ($data['industryIds'] as $industryId) {
                $relStmt->execute([$id, $industryId]);
            }
        }
        
        if (!empty($data['serviceIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToService (A, B) VALUES (?, ?)");
            foreach ($data['serviceIds'] as $serviceId) {
                $relStmt->execute([$id, $serviceId]);
            }
        }
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Expert WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
