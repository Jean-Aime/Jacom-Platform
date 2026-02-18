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
        $stmt = $this->conn->query("
            SELECT s.*, 
                   GROUP_CONCAT(DISTINCT i.id) as industryIds,
                   GROUP_CONCAT(DISTINCT e.id) as expertIds,
                   GROUP_CONCAT(DISTINCT ins.id) as insightIds
            FROM Service s
            LEFT JOIN _IndustryToService its ON s.id = its.B
            LEFT JOIN Industry i ON its.A = i.id
            LEFT JOIN _ExpertToService ets ON s.id = ets.B
            LEFT JOIN Expert e ON ets.A = e.id
            LEFT JOIN _InsightToService inss ON s.id = inss.B
            LEFT JOIN Insight ins ON inss.A = ins.id
            WHERE s.status = 'published'
            GROUP BY s.id
            ORDER BY s.name ASC
        ");
        $services = $stmt->fetchAll();
        
        $formatted = array_map(function($service) {
            return [
                'id' => $service['id'],
                'name' => $service['name'],
                'slug' => $service['slug'],
                'description' => $service['description'],
                'overview' => $service['overview'],
                'methodologies' => $service['methodologies'],
                'tools' => $service['tools'],
                'featured' => (bool)$service['featured'],
                'image' => $service['image'],
                'status' => $service['status'],
                'createdAt' => $service['createdAt'],
                'updatedAt' => $service['updatedAt'],
                'industries' => $service['industryIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $service['industryIds'])) : [],
                'experts' => $service['expertIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $service['expertIds'])) : [],
                'insights' => $service['insightIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $service['insightIds'])) : []
            ];
        }, $services);
        
        echo json_encode($formatted);
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
        
        // Fetch related data
        $service['serviceCapabilities'] = $this->getServiceCapabilities($service['id']);
        $service['serviceProcessSteps'] = $this->getServiceProcessSteps($service['id']);
        $service['serviceMetrics'] = $this->getServiceMetrics($service['id']);
        $service['subServices'] = [];
        $service['industries'] = $this->getServiceIndustries($service['id']);
        $service['insights'] = $this->getServiceInsights($service['id']);
        $service['experts'] = $this->getServiceExperts($service['id']);
        
        echo json_encode($service);
    }
    
    private function getServiceCapabilities($serviceId) {
        $stmt = $this->conn->prepare("SELECT * FROM ServiceCapability WHERE serviceId = ? ORDER BY `order` ASC");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceProcessSteps($serviceId) {
        $stmt = $this->conn->prepare("SELECT * FROM ServiceProcessStep WHERE serviceId = ? ORDER BY `order` ASC");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceMetrics($serviceId) {
        $stmt = $this->conn->prepare("SELECT * FROM ServiceMetric WHERE serviceId = ? ORDER BY `order` ASC");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceIndustries($serviceId) {
        $stmt = $this->conn->prepare("
            SELECT i.* FROM Industry i
            JOIN _IndustryToService its ON i.id = its.A
            WHERE its.B = ?
        ");
        $stmt->execute([$serviceId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getServiceInsights($serviceId) {
        $stmt = $this->conn->prepare("
            SELECT ins.* FROM Insight ins
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
            SELECT e.* FROM Expert e
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
        
        $stmt = $this->conn->prepare("INSERT INTO Service (id, name, slug, description, overview, methodologies, tools, featured, image, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'c' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id, $data['name'], $data['slug'], $data['description'],
            $data['overview'] ?? '', $data['methodologies'] ?? '', $data['tools'] ?? '',
            $data['featured'] ?? 0, $data['image'] ?? null, $data['status'] ?? 'published'
        ]);
        
        // Handle relations
        if (!empty($data['industryIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToService (A, B) VALUES (?, ?)");
            foreach ($data['industryIds'] as $industryId) {
                $relStmt->execute([$industryId, $id]);
            }
        }
        
        if (!empty($data['expertIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToService (A, B) VALUES (?, ?)");
            foreach ($data['expertIds'] as $expertId) {
                $relStmt->execute([$expertId, $id]);
            }
        }
        
        if (!empty($data['insightIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _InsightToService (A, B) VALUES (?, ?)");
            foreach ($data['insightIds'] as $insightId) {
                $relStmt->execute([$insightId, $id]);
            }
        }
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Service SET name = ?, slug = ?, description = ?, overview = ?, methodologies = ?, tools = ?, featured = ?, image = ?, status = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['description'], $data['overview'] ?? '',
            $data['methodologies'] ?? '', $data['tools'] ?? '', $data['featured'] ?? 0,
            $data['image'] ?? null, $data['status'] ?? 'published', $id
        ]);
        
        // Update relations
        $this->conn->prepare("DELETE FROM _IndustryToService WHERE B = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM _ExpertToService WHERE B = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM _InsightToService WHERE B = ?")->execute([$id]);
        
        if (!empty($data['industryIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToService (A, B) VALUES (?, ?)");
            foreach ($data['industryIds'] as $industryId) {
                $relStmt->execute([$industryId, $id]);
            }
        }
        
        if (!empty($data['expertIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _ExpertToService (A, B) VALUES (?, ?)");
            foreach ($data['expertIds'] as $expertId) {
                $relStmt->execute([$expertId, $id]);
            }
        }
        
        if (!empty($data['insightIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _InsightToService (A, B) VALUES (?, ?)");
            foreach ($data['insightIds'] as $insightId) {
                $relStmt->execute([$insightId, $id]);
            }
        }
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Service WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
