<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class EventsController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        try {
            $stmt = $this->conn->query("SELECT * FROM event ORDER BY date ASC");
            echo json_encode($stmt->fetchAll());
        } catch (Exception $e) {
            error_log($e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function getBySlug($slug) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM event WHERE slug = ?");
            $stmt->execute([$slug]);
            $event = $stmt->fetch();
            
            if (!$event) {
                http_response_code(404);
                echo json_encode(['error' => 'Not found']);
                return;
            }
            
            echo json_encode($event);
        } catch (Exception $e) {
            error_log($e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function create() {
        Security::validateSession();
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!$data) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON data']);
                return;
            }
            
            $data = Security::sanitize($data);
            
            $stmt = $this->conn->prepare("INSERT INTO event (id, title, slug, date, time, type, description, image, registerUrl, featured, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
            
            $id = 'evt' . uniqid() . bin2hex(random_bytes(4));
            $result = $stmt->execute([
                $id,
                $data['title'] ?? '',
                $data['slug'] ?? '',
                $data['date'] ?? date('Y-m-d'),
                $data['time'] ?? '',
                $data['type'] ?? 'webinar',
                $data['description'] ?? null,
                $data['image'] ?? null,
                $data['registerUrl'] ?? null,
                isset($data['featured']) ? (int)$data['featured'] : 0,
                $data['status'] ?? 'published'
            ]);
            
            if ($result) {
                http_response_code(201);
                echo json_encode(['success' => true, 'id' => $id]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create event']);
            }
        } catch (Exception $e) {
            error_log('Event create error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function update($id) {
        Security::validateSession();
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!$data) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON data']);
                return;
            }
            
            $data = Security::sanitize($data);
            
            $stmt = $this->conn->prepare("UPDATE event SET title = ?, slug = ?, date = ?, time = ?, type = ?, description = ?, image = ?, registerUrl = ?, featured = ?, status = ?, updatedAt = NOW() WHERE id = ?");
            
            $result = $stmt->execute([
                $data['title'] ?? '',
                $data['slug'] ?? '',
                $data['date'] ?? date('Y-m-d'),
                $data['time'] ?? '',
                $data['type'] ?? 'webinar',
                $data['description'] ?? null,
                $data['image'] ?? null,
                $data['registerUrl'] ?? null,
                isset($data['featured']) ? (int)$data['featured'] : 0,
                $data['status'] ?? 'published',
                $id
            ]);
            
            if ($result) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update event']);
            }
        } catch (Exception $e) {
            error_log('Event update error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        Security::validateSession();
        try {
            $stmt = $this->conn->prepare("DELETE FROM event WHERE id = ?");
            $result = $stmt->execute([$id]);
            
            if ($result) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete event']);
            }
        } catch (Exception $e) {
            error_log('Event delete error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
