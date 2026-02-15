<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class ContentController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $page = $_GET['page'] ?? null;
        $section = $_GET['section'] ?? null;
        
        $sql = "SELECT * FROM ContentBlock WHERE active = 1";
        $params = [];
        
        if ($page) {
            $sql .= " AND page = ?";
            $params[] = $page;
        }
        
        if ($section) {
            $sql .= " AND section = ?";
            $params[] = $section;
        }
        
        $sql .= " ORDER BY `order` ASC";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($params);
        echo json_encode($stmt->fetchAll());
    }
    
    public function getByKey($key) {
        $stmt = $this->conn->prepare("SELECT * FROM ContentBlock WHERE `key` = ?");
        $stmt->execute([$key]);
        $block = $stmt->fetch();
        
        if (!$block) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }
        
        echo json_encode($block);
    }
    
    public function create() {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("INSERT INTO ContentBlock (id, `key`, page, section, type, content, image, `order`, active, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        
        $id = 'cb' . uniqid() . bin2hex(random_bytes(4));
        $stmt->execute([
            $id,
            $data['key'],
            $data['page'],
            $data['section'],
            $data['type'] ?? 'text',
            $data['content'],
            $data['image'] ?? null,
            $data['order'] ?? 0,
            $data['active'] ?? 1
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($key) {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE ContentBlock SET page = ?, section = ?, type = ?, content = ?, image = ?, `order` = ?, active = ?, updatedAt = NOW() WHERE `key` = ?");
        
        $stmt->execute([
            $data['page'],
            $data['section'],
            $data['type'] ?? 'text',
            $data['content'],
            $data['image'] ?? null,
            $data['order'] ?? 0,
            $data['active'] ?? 1,
            $key
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($key) {
        Security::validateSession();
        
        $stmt = $this->conn->prepare("DELETE FROM ContentBlock WHERE `key` = ?");
        $stmt->execute([$key]);
        
        echo json_encode(['success' => true]);
    }
}
