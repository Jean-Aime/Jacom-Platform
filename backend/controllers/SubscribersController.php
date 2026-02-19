<?php
require_once __DIR__ . '/../middleware/Security.php';

class SubscribersController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        Security::validateSession();
        $stmt = $this->db->query("SELECT * FROM subscriber ORDER BY createdAt DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function create($data) {
        $email = $data['email'] ?? null;

        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Valid email required']);
            return;
        }

        // Check if already exists
        $stmt = $this->db->prepare("SELECT id FROM subscriber WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            http_response_code(400);
            echo json_encode(['error' => 'Email already subscribed']);
            return;
        }

        $id = $this->generateId();
        $stmt = $this->db->prepare("
            INSERT INTO subscriber (id, email, status) 
            VALUES (?, ?, 'active')
        ");
        
        if ($stmt->execute([$id, $email])) {
            echo json_encode(['success' => true, 'message' => 'Subscribed successfully', 'id' => $id]);
            return;
        }

        http_response_code(500);
        echo json_encode(['error' => 'Failed to subscribe']);
    }

    public function delete($id) {
        Security::validateSession();
        $stmt = $this->db->prepare("DELETE FROM subscriber WHERE id = ?");
        if ($stmt->execute([$id])) {
            echo json_encode(['success' => true]);
            return;
        }
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete subscriber']);
    }

    private function generateId() {
        return 'sub_' . bin2hex(random_bytes(12));
    }
}
