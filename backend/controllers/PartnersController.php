<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class PartnersController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        try {
            $stmt = $this->conn->query("
                SELECT id, name, logo, website, displayOrder, status, createdAt, updatedAt
                FROM partner_logo
                WHERE status = 'active'
                ORDER BY displayOrder ASC, createdAt DESC
            ");
            $partners = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($partners);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function getById($id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM partner_logo WHERE id = ?");
            $stmt->execute([$id]);
            $partner = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$partner) {
                http_response_code(404);
                echo json_encode(['error' => 'Partner not found']);
                return;
            }
            
            echo json_encode($partner);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function create() {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        try {
            $stmt = $this->conn->prepare("
                INSERT INTO partner_logo (id, name, logo, website, displayOrder, status, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
            ");
            
            $id = 'ptr' . uniqid();
            $stmt->execute([
                $id,
                $data['name'],
                $data['logo'],
                $data['website'] ?? null,
                $data['displayOrder'] ?? 0,
                $data['status'] ?? 'active'
            ]);
            
            http_response_code(201);
            echo json_encode(['success' => true, 'id' => $id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function update($id) {
        Security::validateSession();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        try {
            $stmt = $this->conn->prepare("
                UPDATE partner_logo
                SET name = ?, logo = ?, website = ?, displayOrder = ?, status = ?, updatedAt = NOW()
                WHERE id = ?
            ");
            
            $stmt->execute([
                $data['name'],
                $data['logo'],
                $data['website'] ?? null,
                $data['displayOrder'] ?? 0,
                $data['status'] ?? 'active',
                $id
            ]);
            
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        Security::validateSession();
        
        try {
            $stmt = $this->conn->prepare("DELETE FROM partner_logo WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
