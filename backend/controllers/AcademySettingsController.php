<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class AcademySettingsController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function get() {
        $stmt = $this->conn->query("SELECT * FROM AcademySettings LIMIT 1");
        $settings = $stmt->fetch();
        
        if ($settings && $settings['featuredCourseId']) {
            $courseStmt = $this->conn->prepare("SELECT * FROM Course WHERE id = ?");
            $courseStmt->execute([$settings['featuredCourseId']]);
            $course = $courseStmt->fetch();
            
            if ($course) {
                $course['phases'] = $this->getPhases($course['id']);
                $course['pricing'] = $this->getPricing($course['id']);
                $course['schedule'] = $this->getSchedule($course['id']);
                $settings['featuredCourse'] = $course;
            }
        }
        
        echo json_encode($settings ?: null);
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
    
    public function update() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("SELECT id FROM AcademySettings LIMIT 1");
        $stmt->execute();
        $existing = $stmt->fetch();
        
        if ($existing) {
            $updateStmt = $this->conn->prepare("UPDATE AcademySettings SET featuredCourseId = ?, heroTitle = ?, heroSubtitle = ?, classStartDate = ?, scholarshipAnnouncementDate = ?, registrationOpen = ?, contactPhone = ?, updatedAt = NOW() WHERE id = ?");
            $updateStmt->execute([
                $data['featuredCourseId'] ?? null, $data['heroTitle'] ?? null, $data['heroSubtitle'] ?? null,
                $data['classStartDate'] ?? null, $data['scholarshipAnnouncementDate'] ?? null,
                $data['registrationOpen'] ?? 1, $data['contactPhone'] ?? null, $existing['id']
            ]);
        } else {
            $id = 'academy_settings_' . uniqid();
            $insertStmt = $this->conn->prepare("INSERT INTO AcademySettings (id, featuredCourseId, heroTitle, heroSubtitle, classStartDate, scholarshipAnnouncementDate, registrationOpen, contactPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $insertStmt->execute([
                $id, $data['featuredCourseId'] ?? null, $data['heroTitle'] ?? null, $data['heroSubtitle'] ?? null,
                $data['classStartDate'] ?? null, $data['scholarshipAnnouncementDate'] ?? null,
                $data['registrationOpen'] ?? 1, $data['contactPhone'] ?? null
            ]);
        }
        
        echo json_encode(['success' => true]);
    }
}
