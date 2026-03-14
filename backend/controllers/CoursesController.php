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
        $stmt = $this->conn->query("SELECT * FROM courses WHERE status != 'completed' ORDER BY featured DESC, startDate ASC");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getBySlug($slug) {
        // TODO: Re-enable authentication after testing
        // Security::validateSession();
        
        $stmt = $this->conn->prepare("SELECT * FROM courses WHERE slug = ?");
        $stmt->execute([$slug]);
        $course = $stmt->fetch();
        
        if (!$course) {
            http_response_code(404);
            echo json_encode(['error' => 'Course not found', 'slug' => $slug]);
            return;
        }
        
        // Get all course data including curriculum
        $course['phases'] = $this->getPhasesWithCurriculum($course['id']);
        $course['pricing'] = $this->getPricing($course['id']);
        $course['schedule'] = $this->getSchedule($course['id']);
        
        echo json_encode($course);
    }
    
    public function getFeatured() {
        $stmt = $this->conn->query("SELECT * FROM courses WHERE featured = 1 LIMIT 1");
        $course = $stmt->fetch();
        
        if ($course) {
            $course['phases'] = $this->getPhases($course['id']);
            $course['pricing'] = $this->getPricing($course['id']);
            $course['schedule'] = $this->getSchedule($course['id']);
        }
        
        echo json_encode($course ?: null);
    }
    
    private function getPhases($courseId) {
        $stmt = $this->conn->prepare("SELECT * FROM course_phases WHERE courseId = ? ORDER BY `order` ASC");
        $stmt->execute([$courseId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getPricing($courseId) {
        $stmt = $this->conn->prepare("SELECT * FROM course_pricing WHERE courseId = ?");
        $stmt->execute([$courseId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getSchedule($courseId) {
        $stmt = $this->conn->prepare("SELECT * FROM class_schedules WHERE courseId = ? ORDER BY sessionType, groupNumber");
        $stmt->execute([$courseId]);
        return $stmt->fetchAll() ?: [];
    }
    
    private function getPhasesWithCurriculum($courseId) {
        // Get phases
        $stmt = $this->conn->prepare("SELECT * FROM course_phases WHERE courseId = ? ORDER BY phaseNumber ASC");
        $stmt->execute([$courseId]);
        $phases = $stmt->fetchAll() ?: [];
        
        // For each phase, get weeks
        foreach ($phases as &$phase) {
            $phase['weeks'] = $this->getWeeks($phase['id']);
        }
        
        return $phases;
    }
    
    private function getWeeks($phaseId) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM course_weeks WHERE phaseId = ? ORDER BY weekNumber ASC");
            $stmt->execute([$phaseId]);
            $weeks = $stmt->fetchAll() ?: [];
            
            // For each week, get topics
            foreach ($weeks as &$week) {
                $week['topics'] = $this->getTopics($week['id']);
            }
            
            return $weeks;
        } catch (Exception $e) {
            // Table doesn't exist yet, return empty array
            return [];
        }
    }
    
    private function getTopics($weekId) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM course_topics WHERE weekId = ? ORDER BY orderIndex ASC");
            $stmt->execute([$weekId]);
            $topics = $stmt->fetchAll() ?: [];
            
            // For each topic, get resources
            foreach ($topics as &$topic) {
                $topic['resources'] = $this->getResources($topic['id']);
            }
            
            return $topics;
        } catch (Exception $e) {
            return [];
        }
    }
    
    private function getResources($topicId) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM course_resources WHERE topicId = ? ORDER BY orderIndex ASC");
            $stmt->execute([$topicId]);
            return $stmt->fetchAll() ?: [];
        } catch (Exception $e) {
            return [];
        }
    }
    
    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'course_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO courses (id, name, slug, category, description, icon, totalPrice, fullPaymentPrice, installmentCount, installmentAmount, startDate, duration, deliveryMode, status, featured, maxStudents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
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
        
        $stmt = $this->conn->prepare("UPDATE courses SET name = ?, slug = ?, category = ?, description = ?, icon = ?, totalPrice = ?, fullPaymentPrice = ?, installmentCount = ?, installmentAmount = ?, startDate = ?, duration = ?, deliveryMode = ?, status = ?, featured = ?, maxStudents = ?, updatedAt = NOW() WHERE id = ?");
        
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
        $stmt = $this->conn->prepare("DELETE FROM courses WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    }
}
