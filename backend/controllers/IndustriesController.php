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
        $stmt = $this->conn->query("
            SELECT i.*, 
                   GROUP_CONCAT(DISTINCT s.id) as serviceIds,
                   GROUP_CONCAT(DISTINCT e.id) as expertIds,
                   GROUP_CONCAT(DISTINCT ins.id) as insightIds
            FROM Industry i
            LEFT JOIN _IndustryToService its ON i.id = its.A
            LEFT JOIN Service s ON its.B = s.id
            LEFT JOIN _ExpertToIndustry eti ON i.id = eti.B
            LEFT JOIN Expert e ON eti.A = e.id
            LEFT JOIN _IndustryToInsight iti ON i.id = iti.A
            LEFT JOIN Insight ins ON iti.B = ins.id
            GROUP BY i.id
            ORDER BY i.name ASC
        ");
        $industries = $stmt->fetchAll();
        
        // Format response to match frontend API structure
        $formatted = array_map(function($industry) {
            return [
                'id' => $industry['id'],
                'name' => $industry['name'],
                'slug' => $industry['slug'],
                'description' => $industry['description'],
                'overview' => $industry['overview'],
                'challenges' => $industry['challenges'],
                'trends' => $industry['trends'],
                'featured' => (bool)$industry['featured'],
                'image' => $industry['image'],
                'createdAt' => $industry['createdAt'],
                'updatedAt' => $industry['updatedAt'],
                'services' => $industry['serviceIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $industry['serviceIds'])) : [],
                'experts' => $industry['expertIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $industry['expertIds'])) : [],
                'insights' => $industry['insightIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $industry['insightIds'])) : []
            ];
        }, $industries);
        
        echo json_encode($formatted);
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
            $data['overview'] ?? '',
            $data['challenges'] ?? '',
            $data['trends'] ?? '',
            $data['featured'] ?? 0,
            $data['image'] ?? null
        ]);
        
        // Handle relations
        if (!empty($data['serviceIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToService (A, B) VALUES (?, ?)");
            foreach ($data['serviceIds'] as $serviceId) {
                $relStmt->execute([$id, $serviceId]);
            }
        }
        
        if (!empty($data['expertIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToIndustry (A, B) VALUES (?, ?)");
            foreach ($data['expertIds'] as $expertId) {
                $relStmt->execute([$expertId, $id]);
            }
        }
        
        if (!empty($data['insightIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToInsight (A, B) VALUES (?, ?)");
            foreach ($data['insightIds'] as $insightId) {
                $relStmt->execute([$id, $insightId]);
            }
        }
        
        http_response_code(201);
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
            $data['overview'] ?? '',
            $data['challenges'] ?? '',
            $data['trends'] ?? '',
            $data['featured'] ?? 0,
            $data['image'] ?? null,
            $id
        ]);
        
        // Update relations - delete existing and re-add
        $this->conn->prepare("DELETE FROM _IndustryToService WHERE A = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM _ExpertToIndustry WHERE B = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM _IndustryToInsight WHERE A = ?")->execute([$id]);
        
        if (!empty($data['serviceIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToService (A, B) VALUES (?, ?)");
            foreach ($data['serviceIds'] as $serviceId) {
                $relStmt->execute([$id, $serviceId]);
            }
        }
        
        if (!empty($data['expertIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToIndustry (A, B) VALUES (?, ?)");
            foreach ($data['expertIds'] as $expertId) {
                $relStmt->execute([$expertId, $id]);
            }
        }
        
        if (!empty($data['insightIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToInsight (A, B) VALUES (?, ?)");
            foreach ($data['insightIds'] as $insightId) {
                $relStmt->execute([$id, $insightId]);
            }
        }
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        
        $stmt = $this->conn->prepare("DELETE FROM Industry WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
}
