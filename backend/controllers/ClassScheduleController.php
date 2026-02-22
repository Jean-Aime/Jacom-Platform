<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class ClassScheduleController {
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
        
        $id = 'schedule_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO ClassSchedule (id, courseId, sessionType, groupNumber, daysOfWeek, timeEST, timePST, timeEAT, timeETH, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $id, $data['courseId'], $data['sessionType'], $data['groupNumber'] ?? null,
            $data['daysOfWeek'], $data['timeEST'], $data['timePST'], $data['timeEAT'],
            $data['timeETH'], $data['active'] ?? 1
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM ClassSchedule WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
