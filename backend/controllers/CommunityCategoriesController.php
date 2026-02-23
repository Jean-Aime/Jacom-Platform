<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class CommunityCategoriesController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $status = $_GET['status'] ?? 'published';
        
        $sql = "SELECT * FROM communitycategory WHERE status = ? ORDER BY `order` ASC, name ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$status]);
        echo json_encode($stmt->fetchAll());
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT * FROM communitycategory WHERE slug = ? AND status = 'published'");
        $stmt->execute([$slug]);
        $category = $stmt->fetch();
        
        if (!$category) {
            http_response_code(404);
            echo json_encode(['error' => 'Category not found']);
            return;
        }
        
        // Decode JSON fields
        if ($category['articles']) {
            $category['articles'] = json_decode($category['articles'], true) ?: [];
        } else {
            $category['articles'] = [];
        }
        
        echo json_encode($category);
    }
    
    public function create() {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'cc' . uniqid() . bin2hex(random_bytes(4));
        
        $stmt = $this->conn->prepare("INSERT INTO communitycategory (id, name, slug, description, icon, image, content, articles, featured, `order`, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $stmt->execute([
            $id,
            $data['name'],
            $data['slug'],
            $data['description'] ?? null,
            $data['icon'] ?? null,
            $data['image'] ?? null,
            $data['content'] ?? null,
            json_encode($data['articles'] ?? []),
            $data['featured'] ?? 0,
            $data['order'] ?? 0,
            $data['status'] ?? 'published'
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE communitycategory SET name = ?, slug = ?, description = ?, icon = ?, image = ?, content = ?, articles = ?, featured = ?, `order` = ?, status = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'],
            $data['slug'],
            $data['description'] ?? null,
            $data['icon'] ?? null,
            $data['image'] ?? null,
            $data['content'] ?? null,
            json_encode($data['articles'] ?? []),
            $data['featured'] ?? 0,
            $data['order'] ?? 0,
            $data['status'] ?? 'published',
            $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        
        $stmt = $this->conn->prepare("DELETE FROM communitycategory WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
}
