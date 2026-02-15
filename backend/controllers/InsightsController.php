<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class InsightsController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("
            SELECT ins.*, 
                   e.name as authorName, e.slug as authorSlug,
                   GROUP_CONCAT(DISTINCT i.id) as industryIds,
                   GROUP_CONCAT(DISTINCT s.id) as serviceIds
            FROM Insight ins
            LEFT JOIN Expert e ON ins.authorId = e.id
            LEFT JOIN _IndustryToInsight iti ON ins.id = iti.B
            LEFT JOIN Industry i ON iti.A = i.id
            LEFT JOIN _InsightToService inss ON ins.id = inss.A
            LEFT JOIN Service s ON inss.B = s.id
            WHERE ins.status = 'published' OR (ins.status = 'scheduled' AND ins.scheduledAt <= NOW())
            GROUP BY ins.id
            ORDER BY ins.publishedAt DESC
        ");
        $insights = $stmt->fetchAll();
        
        $formatted = array_map(function($insight) {
            return [
                'id' => $insight['id'],
                'title' => $insight['title'],
                'slug' => $insight['slug'],
                'type' => $insight['type'],
                'content' => $insight['content'],
                'excerpt' => $insight['excerpt'],
                'featured' => (bool)$insight['featured'],
                'trending' => (bool)$insight['trending'],
                'gated' => (bool)$insight['gated'],
                'downloadUrl' => $insight['downloadUrl'],
                'image' => $insight['image'],
                'readTime' => $insight['readTime'],
                'status' => $insight['status'],
                'scheduledAt' => $insight['scheduledAt'],
                'publishedAt' => $insight['publishedAt'],
                'authorId' => $insight['authorId'],
                'topics' => $insight['topics'],
                'regions' => $insight['regions'],
                'createdAt' => $insight['createdAt'],
                'updatedAt' => $insight['updatedAt'],
                'author' => $insight['authorName'] ? ['name' => $insight['authorName'], 'slug' => $insight['authorSlug']] : null,
                'industries' => $insight['industryIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $insight['industryIds'])) : [],
                'services' => $insight['serviceIds'] ? array_map(fn($id) => ['id' => $id], explode(',', $insight['serviceIds'])) : []
            ];
        }, $insights);
        
        echo json_encode($formatted);
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT i.*, e.name as authorName, e.slug as authorSlug FROM Insight i LEFT JOIN Expert e ON i.authorId = e.id WHERE i.slug = ?");
        $stmt->execute([$slug]);
        $insight = $stmt->fetch();
        
        if (!$insight) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($insight);
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO Insight (id, title, slug, type, content, excerpt, featured, trending, gated, downloadUrl, image, readTime, status, scheduledAt, publishedAt, authorId, topics, regions, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'i' . uniqid() . bin2hex(random_bytes(8));
        $stmt->execute([
            $id, $data['title'], $data['slug'], $data['type'], $data['content'],
            $data['excerpt'] ?? '', $data['featured'] ?? 0, $data['trending'] ?? 0,
            $data['gated'] ?? 0, $data['downloadUrl'] ?? null, $data['image'] ?? null,
            $data['readTime'] ?? 0, $data['status'] ?? 'draft', $data['scheduledAt'] ?? null,
            $data['publishedAt'] ?? date('Y-m-d H:i:s'), $data['authorId'] ?? null,
            $data['topics'] ?? '', $data['regions'] ?? ''
        ]);
        
        // Handle relations
        if (!empty($data['industryIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToInsight (A, B) VALUES (?, ?)");
            foreach ($data['industryIds'] as $industryId) {
                $relStmt->execute([$industryId, $id]);
            }
        }
        
        if (!empty($data['serviceIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _InsightToService (A, B) VALUES (?, ?)");
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
        
        $stmt = $this->conn->prepare("UPDATE Insight SET title = ?, slug = ?, type = ?, content = ?, excerpt = ?, featured = ?, trending = ?, gated = ?, downloadUrl = ?, image = ?, readTime = ?, status = ?, scheduledAt = ?, publishedAt = ?, authorId = ?, topics = ?, regions = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['title'], $data['slug'], $data['type'], $data['content'], $data['excerpt'] ?? '',
            $data['featured'] ?? 0, $data['trending'] ?? 0, $data['gated'] ?? 0,
            $data['downloadUrl'] ?? null, $data['image'] ?? null, $data['readTime'] ?? 0,
            $data['status'] ?? 'draft', $data['scheduledAt'] ?? null,
            $data['publishedAt'] ?? date('Y-m-d H:i:s'), $data['authorId'] ?? null,
            $data['topics'] ?? '', $data['regions'] ?? '', $id
        ]);
        
        // Update relations
        $this->conn->prepare("DELETE FROM _IndustryToInsight WHERE B = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM _InsightToService WHERE A = ?")->execute([$id]);
        
        if (!empty($data['industryIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _IndustryToInsight (A, B) VALUES (?, ?)");
            foreach ($data['industryIds'] as $industryId) {
                $relStmt->execute([$industryId, $id]);
            }
        }
        
        if (!empty($data['serviceIds'])) {
            $relStmt = $this->conn->prepare("INSERT INTO _InsightToService (A, B) VALUES (?, ?)");
            foreach ($data['serviceIds'] as $serviceId) {
                $relStmt->execute([$id, $serviceId]);
            }
        }
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Insight WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
