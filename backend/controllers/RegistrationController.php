<?php
require_once __DIR__ . '/../config/database.php';

class RegistrationController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function create() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        $id = 'reg_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO CourseRegistration (id, courseId, firstName, lastName, email, phone, location, planType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $id,
            $data['courseId'],
            $data['firstName'],
            $data['lastName'],
            $data['email'],
            $data['phone'],
            $data['location'],
            $data['planType']
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id, 'message' => 'Registration submitted successfully!']);
    }
    
    public function getAll() {
        $stmt = $this->conn->query("
            SELECT r.*, c.name as courseName 
            FROM CourseRegistration r
            JOIN Course c ON r.courseId = c.id
            ORDER BY r.createdAt DESC
        ");
        echo json_encode($stmt->fetchAll());
    }
}
