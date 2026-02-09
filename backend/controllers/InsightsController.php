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
        $stmt = $this->conn->query("SELECT i.*, e.name as authorName, e.slug as authorSlug FROM Insight i LEFT JOIN Expert e ON i.authorId = e.id WHERE i.status = 'published' OR (i.status = 'scheduled' AND i.scheduledAt <= NOW()) ORDER BY i.publishedAt DESC");
        echo json_encode($stmt->fetchAll());
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
            $data['excerpt'], $data['featured'] ?? 0, $data['trending'] ?? 0,
            $data['gated'] ?? 0, $data['downloadUrl'] ?? null, $data['image'] ?? null,
            $data['readTime'], $data['status'] ?? 'draft', $data['scheduledAt'] ?? null,
            $data['publishedAt'] ?? date('Y-m-d H:i:s'), $data['authorId'],
            $data['topics'], $data['regions']
        ]);
        
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Insight SET title = ?, slug = ?, type = ?, content = ?, excerpt = ?, featured = ?, trending = ?, gated = ?, downloadUrl = ?, image = ?, readTime = ?, status = ?, scheduledAt = ?, publishedAt = ?, authorId = ?, topics = ?, regions = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['title'], $data['slug'], $data['type'], $data['content'], $data['excerpt'],
            $data['featured'] ?? 0, $data['trending'] ?? 0, $data['gated'] ?? 0,
            $data['downloadUrl'] ?? null, $data['image'] ?? null, $data['readTime'],
            $data['status'] ?? 'draft', $data['scheduledAt'] ?? null,
            $data['publishedAt'] ?? date('Y-m-d H:i:s'), $data['authorId'],
            $data['topics'], $data['regions'], $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Insight WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
