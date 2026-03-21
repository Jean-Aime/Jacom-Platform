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
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!$data) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid request data']);
                return;
            }
            
            // Handle fullName from frontend - split into firstName and lastName
            $fullName = $data['fullName'] ?? '';
            $nameParts = explode(' ', trim($fullName), 2);
            $firstName = $nameParts[0] ?? '';
            $lastName = $nameParts[1] ?? '';
            
            // Validate required fields
            if (empty($data['email']) || empty($data['phone']) || empty($fullName)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                return;
            }
            
            $id = 'reg_' . uniqid();
            $stmt = $this->conn->prepare("INSERT INTO CourseRegistration (id, courseId, firstName, lastName, email, phone, location, planType, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            
            $stmt->execute([
                $id,
                $data['courseId'] ?? null,
                $firstName,
                $lastName,
                $data['email'],
                $data['phone'],
                $data['location'] ?? null,
                $data['planType'] ?? null,
                $data['message'] ?? null
            ]);
            
            http_response_code(201);
            echo json_encode(['success' => true, 'id' => $id, 'message' => 'Registration submitted successfully!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()]);
        }
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
