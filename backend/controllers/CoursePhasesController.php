<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class CoursePhasesController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'phase_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO CoursePhase (id, courseId, phaseNumber, title, description, materialPrice, materialDiscountedPrice, classPrice, duration, `order`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $id, $data['courseId'], $data['phaseNumber'], $data['title'], $data['description'],
            $data['materialPrice'], $data['materialDiscountedPrice'], $data['classPrice'],
            $data['duration'], $data['order'] ?? $data['phaseNumber']
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM CoursePhase WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
