<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class AcademyController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    // Academy Settings Management
    public function getSettings() {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM academy_settings LIMIT 1");
            $stmt->execute();
            $settings = $stmt->fetch();
            
            if (!$settings) {
                echo json_encode([
                    'heroTitle' => 'AI-Powered Application Development Class',
                    'heroSubtitle' => 'Master modern application development with AI-powered tools and industry-leading practices',
                    'classStartDate' => '2026-03-14',
                    'scholarshipAnnouncementDate' => '2026-03-15',
                    'registrationOpen' => true,
                    'contactPhone' => '202-386-2702'
                ]);
                return;
            }
            
            echo json_encode($settings);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch settings']);
        }
    }
    
    public function updateSettings() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        try {
            $stmt = $this->conn->prepare("
                INSERT INTO academy_settings (id, heroTitle, heroSubtitle, classStartDate, scholarshipAnnouncementDate, registrationOpen, contactPhone, updatedAt) 
                VALUES ('academy_001', ?, ?, ?, ?, ?, ?, NOW())
                ON DUPLICATE KEY UPDATE 
                heroTitle = VALUES(heroTitle),
                heroSubtitle = VALUES(heroSubtitle),
                classStartDate = VALUES(classStartDate),
                scholarshipAnnouncementDate = VALUES(scholarshipAnnouncementDate),
                registrationOpen = VALUES(registrationOpen),
                contactPhone = VALUES(contactPhone),
                updatedAt = NOW()
            ");
            
            $stmt->execute([
                $data['heroTitle'] ?? '',
                $data['heroSubtitle'] ?? '',
                $data['classStartDate'] ?? null,
                $data['scholarshipAnnouncementDate'] ?? null,
                $data['registrationOpen'] ?? true,
                $data['contactPhone'] ?? ''
            ]);
            
            echo json_encode(['success' => true, 'message' => 'Settings updated successfully']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update settings']);
        }
    }
    
    // Course Management
    public function getCourses() {
        try {
            $stmt = $this->conn->prepare("
                SELECT c.*, 
                       COUNT(e.id) as enrollmentCount,
                       (SELECT COUNT(*) FROM course_phases WHERE courseId = c.id) as phaseCount
                FROM courses c 
                LEFT JOIN enrollments e ON c.id = e.courseId AND e.status = 'approved'
                GROUP BY c.id 
                ORDER BY c.featured DESC, c.createdAt DESC
            ");
            $stmt->execute();
            $courses = $stmt->fetchAll();
            
            echo json_encode($courses);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch courses']);
        }
    }
    
    public function getCourse($id) {
        try {
            // Get course details
            $stmt = $this->conn->prepare("SELECT * FROM courses WHERE id = ?");
            $stmt->execute([$id]);
            $course = $stmt->fetch();
            
            if (!$course) {
                http_response_code(404);
                echo json_encode(['error' => 'Course not found']);
                return;
            }
            
            // Get phases
            $stmt = $this->conn->prepare("SELECT * FROM course_phases WHERE courseId = ? ORDER BY phaseNumber");
            $stmt->execute([$id]);
            $course['phases'] = $stmt->fetchAll();
            
            // Get pricing
            $stmt = $this->conn->prepare("SELECT * FROM course_pricing WHERE courseId = ?");
            $stmt->execute([$id]);
            $course['pricing'] = $stmt->fetchAll();
            
            // Get schedules
            $stmt = $this->conn->prepare("SELECT * FROM class_schedules WHERE courseId = ?");
            $stmt->execute([$id]);
            $course['schedules'] = $stmt->fetchAll();
            
            echo json_encode($course);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch course']);
        }
    }
    
    public function createCourse() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        try {
            $this->conn->beginTransaction();
            
            $courseId = 'course_' . bin2hex(random_bytes(8));
            $slug = $this->generateSlug($data['name']);
            
            // Insert course
            $stmt = $this->conn->prepare("
                INSERT INTO courses (id, name, slug, category, description, icon, totalPrice, fullPaymentPrice, 
                                   installmentCount, installmentAmount, startDate, duration, deliveryMode, 
                                   status, featured, maxStudents, currentEnrolled) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
            ");
            
            $stmt->execute([
                $courseId,
                $data['name'],
                $slug,
                $data['category'] ?? 'Development',
                $data['description'] ?? '',
                $data['icon'] ?? 'Development',
                $data['totalPrice'] ?? 0,
                $data['fullPaymentPrice'] ?? 0,
                $data['installmentCount'] ?? 1,
                $data['installmentAmount'] ?? 0,
                $data['startDate'] ?? null,
                $data['duration'] ?? '',
                $data['deliveryMode'] ?? 'online',
                $data['status'] ?? 'draft',
                $data['featured'] ?? false,
                $data['maxStudents'] ?? 100
            ]);
            
            // Insert phases if provided
            if (isset($data['phases']) && is_array($data['phases'])) {
                foreach ($data['phases'] as $phase) {
                    $phaseId = 'phase_' . bin2hex(random_bytes(8));
                    $stmt = $this->conn->prepare("
                        INSERT INTO course_phases (id, courseId, phaseNumber, title, description, 
                                                 materialPrice, materialDiscountedPrice, classPrice, duration) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ");
                    $stmt->execute([
                        $phaseId, $courseId, $phase['phaseNumber'], $phase['title'], 
                        $phase['description'] ?? '', $phase['materialPrice'] ?? 0,
                        $phase['materialDiscountedPrice'] ?? 0, $phase['classPrice'] ?? 0,
                        $phase['duration'] ?? ''
                    ]);
                }
            }
            
            $this->conn->commit();
            echo json_encode(['success' => true, 'courseId' => $courseId, 'message' => 'Course created successfully']);
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create course: ' . $e->getMessage()]);
        }
    }
    
    public function updateCourse($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        
        try {
            $this->conn->beginTransaction();
            
            // Update course
            $stmt = $this->conn->prepare("
                UPDATE courses SET 
                name = ?, category = ?, description = ?, icon = ?, totalPrice = ?, 
                fullPaymentPrice = ?, installmentCount = ?, installmentAmount = ?, 
                startDate = ?, duration = ?, deliveryMode = ?, status = ?, 
                featured = ?, maxStudents = ?, updatedAt = NOW()
                WHERE id = ?
            ");
            
            $stmt->execute([
                $data['name'], $data['category'] ?? 'Development', $data['description'] ?? '',
                $data['icon'] ?? 'Development', $data['totalPrice'] ?? 0, $data['fullPaymentPrice'] ?? 0,
                $data['installmentCount'] ?? 1, $data['installmentAmount'] ?? 0, $data['startDate'] ?? null,
                $data['duration'] ?? '', $data['deliveryMode'] ?? 'online', $data['status'] ?? 'draft',
                $data['featured'] ?? false, $data['maxStudents'] ?? 100, $id
            ]);
            
            $this->conn->commit();
            echo json_encode(['success' => true, 'message' => 'Course updated successfully']);
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update course']);
        }
    }
    
    public function deleteCourse($id) {
        try {
            $stmt = $this->conn->prepare("DELETE FROM courses WHERE id = ?");
            $stmt->execute([$id]);
            
            echo json_encode(['success' => true, 'message' => 'Course deleted successfully']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete course']);
        }
    }
    
    // Enrollment Management
    public function getEnrollments() {
        try {
            $stmt = $this->conn->prepare("
                SELECT e.*, u.name as studentName, u.email as studentEmail, 
                       c.name as courseName, c.category as courseCategory
                FROM enrollments e
                JOIN user u ON e.userId = u.id
                JOIN courses c ON e.courseId = c.id
                ORDER BY e.enrolledAt DESC
            ");
            $stmt->execute();
            $enrollments = $stmt->fetchAll();
            
            echo json_encode($enrollments);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch enrollments']);
        }
    }
    
    public function updateEnrollmentStatus($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        
        try {
            $stmt = $this->conn->prepare("
                UPDATE enrollments SET status = ?, updatedAt = NOW() WHERE id = ?
            ");
            $stmt->execute([$data['status'], $id]);
            
            // Update course enrollment count if approved
            if ($data['status'] === 'approved') {
                $stmt = $this->conn->prepare("
                    UPDATE courses SET currentEnrolled = (
                        SELECT COUNT(*) FROM enrollments WHERE courseId = courses.id AND status = 'approved'
                    ) WHERE id = (SELECT courseId FROM enrollments WHERE id = ?)
                ");
                $stmt->execute([$id]);
            }
            
            echo json_encode(['success' => true, 'message' => 'Enrollment status updated']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update enrollment status']);
        }
    }
    
    // Analytics
    public function getAnalytics() {
        try {
            // Total courses
            $stmt = $this->conn->prepare("SELECT COUNT(*) as total FROM courses");
            $stmt->execute();
            $totalCourses = $stmt->fetch()['total'];
            
            // Total enrollments
            $stmt = $this->conn->prepare("SELECT COUNT(*) as total FROM enrollments");
            $stmt->execute();
            $totalEnrollments = $stmt->fetch()['total'];
            
            // Approved enrollments
            $stmt = $this->conn->prepare("SELECT COUNT(*) as total FROM enrollments WHERE status = 'approved'");
            $stmt->execute();
            $approvedEnrollments = $stmt->fetch()['total'];
            
            // Revenue
            $stmt = $this->conn->prepare("SELECT SUM(amountPaid) as total FROM enrollments");
            $stmt->execute();
            $totalRevenue = $stmt->fetch()['total'] ?? 0;
            
            // Recent enrollments
            $stmt = $this->conn->prepare("
                SELECT e.*, u.name as studentName, c.name as courseName
                FROM enrollments e
                JOIN user u ON e.userId = u.id
                JOIN courses c ON e.courseId = c.id
                ORDER BY e.enrolledAt DESC
                LIMIT 10
            ");
            $stmt->execute();
            $recentEnrollments = $stmt->fetchAll();
            
            echo json_encode([
                'totalCourses' => $totalCourses,
                'totalEnrollments' => $totalEnrollments,
                'approvedEnrollments' => $approvedEnrollments,
                'totalRevenue' => $totalRevenue,
                'recentEnrollments' => $recentEnrollments
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch analytics']);
        }
    }
    
    private function generateSlug($name) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
        return $slug;
    }
}