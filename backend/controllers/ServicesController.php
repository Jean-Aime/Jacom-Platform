<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class ServicesController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("
            SELECT id, name, slug, description, overview, featured, image, status, methodologies, createdAt, updatedAt
            FROM service
            WHERE status = 'published'
            ORDER BY id ASC
        ");
        $services = $stmt->fetchAll();
        
        $formatted = array_map(function($service) {
            return [
                'id' => $service['id'],
                'name' => $service['name'],
                'slug' => $service['slug'],
                'description' => $service['description'],
                'overview' => $service['overview'],
                'featured' => (bool)$service['featured'],
                'image' => $service['image'],
                'status' => $service['status'],
                'createdAt' => $service['createdAt'],
                'updatedAt' => $service['updatedAt'],
                'subServices' => $service['methodologies'] ? json_decode($service['methodologies'], true) : []
            ];
        }, $services);
        
        echo json_encode($formatted);
    }
    
    public function getBySlug($slug) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM service WHERE slug = ?");
            $stmt->execute([$slug]);
            $service = $stmt->fetch();
            
            if (!$service) {
                http_response_code(404);
                echo json_encode(['error' => 'Service not found']);
                return;
            }
            
            // Parse subServices from methodologies JSON
            $service['subServices'] = $service['methodologies'] ? json_decode($service['methodologies'], true) : [];
            
            // Fetch related data
            $service['serviceCapabilities'] = $this->getServiceCapabilities($service['id']);
            $service['serviceProcessSteps'] = $this->getServiceProcessSteps($service['id']);
            $service['serviceMetrics'] = $this->getServiceMetrics($service['id']);
            $service['industries'] = $this->getServiceIndustries($service['id']);
            $service['insights'] = $this->getServiceInsights($service['id']);
            $service['experts'] = $this->getServiceExperts($service['id']);
            
            echo json_encode($service);
        } catch (PDOException $e) {
            error_log("Service getBySlug error: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    
    private function getServiceCapabilities($serviceId) {
        $stmt = $this->conn->prepare("SELECT * FROM servicecapability WHERE serviceId = ? ORDER BY `order` ASC");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceProcessSteps($serviceId) {
        $stmt = $this->conn->prepare("SELECT * FROM serviceprocessstep WHERE serviceId = ? ORDER BY `order` ASC");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceMetrics($serviceId) {
        $stmt = $this->conn->prepare("SELECT * FROM servicemetric WHERE serviceId = ? ORDER BY `order` ASC");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceIndustries($serviceId) {
        $stmt = $this->conn->prepare("
            SELECT i.* FROM industry i
            JOIN _IndustryToService its ON i.id = its.A
            WHERE its.B = ?
        ");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceInsights($serviceId) {
        $stmt = $this->conn->prepare("
            SELECT ins.* FROM insight ins
            JOIN _InsightToService inss ON ins.id = inss.A
            WHERE inss.B = ?
            ORDER BY ins.publishedAt DESC
            LIMIT 3
        ");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceExperts($serviceId) {
        $stmt = $this->conn->prepare("
            SELECT e.* FROM expert e
            JOIN _ExpertToService ets ON e.id = ets.A
            WHERE ets.B = ?
        ");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO service (id, name, slug, description, overview, methodologies, featured, image, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'srv' . uniqid();
        $subServices = isset($data['subServices']) ? json_encode($data['subServices']) : null;
        
        $stmt->execute([
            $id, $data['name'], $data['slug'], $data['description'],
            $data['overview'] ?? '', $subServices,
            $data['featured'] ?? 0, $data['image'] ?? null, $data['status'] ?? 'published'
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $subServices = isset($data['subServices']) ? json_encode($data['subServices']) : null;
        
        $stmt = $this->conn->prepare("UPDATE service SET name = ?, slug = ?, description = ?, overview = ?, methodologies = ?, featured = ?, image = ?, status = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['description'], $data['overview'] ?? '',
            $subServices, $data['featured'] ?? 0,
            $data['image'] ?? null, $data['status'] ?? 'published', $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM service WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
