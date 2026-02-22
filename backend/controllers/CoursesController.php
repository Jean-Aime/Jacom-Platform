<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class CoursesController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM Course WHERE status != 'completed' ORDER BY featured DESC, startDate ASC");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getBySlug($slug) {
        $stmt = $this->conn->prepare("SELECT * FROM Course WHERE slug = ?");
        $stmt->execute([$slug]);
        $course = $stmt->fetch();
        
        if (!$course) {
            http_response_code(404);
            echo json_encode(['error' => 'Course not found']);
            return;
        }
        
        $course['phases'] = $this->getPhases($course['id']);
        $course['pricing'] = $this->getPricing($course['id']);
        $course['schedule'] = $this->getSchedule($course['id']);
        
        echo json_encode($course);
    }
    
    public function getFeatured() {
        $stmt = $this->conn->query("SELECT * FROM Course WHERE featured = 1 LIMIT 1");
        $course = $stmt->fetch();
        
        if ($course) {
            $course['phases'] = $this->getPhases($course['id']);
            $course['pricing'] = $this->getPricing($course['id']);
            $course['schedule'] = $this->getSchedule($course['id']);
        }
        
        echo json_encode($course ?: null);
    }
    
    private function getPhases($courseId) {
        $stmt = $this->conn->prepare("SELECT * FROM CoursePhase WHERE courseId = ? ORDER BY `order` ASC");
        $stmt->execute([$courseId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getPricing($courseId) {
        $stmt = $this->conn->prepare("SELECT * FROM CoursePricing WHERE courseId = ? AND active = 1");
        $stmt->execute([$courseId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getSchedule($courseId) {
        $stmt = $this->conn->prepare("SELECT * FROM ClassSchedule WHERE courseId = ? AND active = 1 ORDER BY sessionType, groupNumber");
        $stmt->execute([$courseId]);
        return $stmt->fetchAll() ?: [];
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'course_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO Course (id, name, slug, category, description, icon, totalPrice, fullPaymentPrice, installmentCount, installmentAmount, startDate, duration, deliveryMode, status, featured, maxStudents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $id, $data['name'], $data['slug'], $data['category'] ?? null, $data['description'] ?? null,
            $data['icon'] ?? null, $data['totalPrice'] ?? 0, $data['fullPaymentPrice'] ?? 0,
            $data['installmentCount'] ?? 0, $data['installmentAmount'] ?? 0, $data['startDate'] ?? null,
            $data['duration'] ?? null, $data['deliveryMode'] ?? 'online', $data['status'] ?? 'upcoming',
            $data['featured'] ?? 0, $data['maxStudents'] ?? 0
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE Course SET name = ?, slug = ?, category = ?, description = ?, icon = ?, totalPrice = ?, fullPaymentPrice = ?, installmentCount = ?, installmentAmount = ?, startDate = ?, duration = ?, deliveryMode = ?, status = ?, featured = ?, maxStudents = ?, updatedAt = NOW() WHERE id = ?");
        
        $stmt->execute([
            $data['name'], $data['slug'], $data['category'] ?? null, $data['description'] ?? null,
            $data['icon'] ?? null, $data['totalPrice'] ?? 0, $data['fullPaymentPrice'] ?? 0,
            $data['installmentCount'] ?? 0, $data['installmentAmount'] ?? 0, $data['startDate'] ?? null,
            $data['duration'] ?? null, $data['deliveryMode'] ?? 'online', $data['status'] ?? 'upcoming',
            $data['featured'] ?? 0, $data['maxStudents'] ?? 0, $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("DELETE FROM Course WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
