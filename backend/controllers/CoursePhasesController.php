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
    
    public function getAll() {
        Security::validateSession();
        $stmt = $this->conn->query("SELECT * FROM course_phases ORDER BY phaseNumber ASC");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getByCourse($courseId) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT * FROM course_phases WHERE courseId = ? ORDER BY phaseNumber ASC");
        $stmt->execute([$courseId]);
        echo json_encode($stmt->fetchAll());
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'phase_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO course_phases (id, courseId, phaseNumber, title, description, materialPrice, materialDiscountedPrice, classPrice, duration, `order`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $id, $data['courseId'], $data['phaseNumber'], $data['title'], $data['description'] ?? '',
            $data['materialPrice'] ?? 0, $data['materialDiscountedPrice'] ?? 0, $data['classPrice'] ?? 0,
            $data['duration'] ?? '', $data['order'] ?? $data['phaseNumber']
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE course_phases SET phaseNumber = ?, title = ?, description = ?, materialPrice = ?, materialDiscountedPrice = ?, classPrice = ?, duration = ?, `order` = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['phaseNumber'], $data['title'], $data['description'] ?? '',
            $data['materialPrice'] ?? 0, $data['materialDiscountedPrice'] ?? 0, $data['classPrice'] ?? 0,
            $data['duration'] ?? '', $data['order'] ?? $data['phaseNumber'], $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        
        // Cascade delete: get all weeks for this phase
        $stmt = $this->conn->prepare("SELECT id FROM course_weeks WHERE phaseId = ?");
        $stmt->execute([$id]);
        $weeks = $stmt->fetchAll();
        
        foreach ($weeks as $week) {
            // Delete topics and resources for each week
            $stmt = $this->conn->prepare("SELECT id FROM course_topics WHERE weekId = ?");
            $stmt->execute([$week['id']]);
            $topics = $stmt->fetchAll();
            
            foreach ($topics as $topic) {
                $this->conn->prepare("DELETE FROM course_resources WHERE topicId = ?")->execute([$topic['id']]);
            }
            
            $this->conn->prepare("DELETE FROM course_topics WHERE weekId = ?")->execute([$week['id']]);
        }
        
        $this->conn->prepare("DELETE FROM course_weeks WHERE phaseId = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM course_phases WHERE id = ?")->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
}
