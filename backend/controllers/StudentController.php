<?php
require_once __DIR__ . '/../config/database.php';

class StudentController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    // Get enrolled courses for student dashboard
    public function getEnrolledCourses($userId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT 
                    c.id, c.name, c.slug, c.category, c.description,
                    e.enrolledAt, e.status as enrollmentStatus,
                    COUNT(DISTINCT cm.id) as totalLessons,
                    COUNT(DISTINCT CASE WHEN sp.status = 'completed' THEN sp.id END) as completedLessons,
                    ROUND(COUNT(DISTINCT CASE WHEN sp.status = 'completed' THEN sp.id END) * 100.0 / NULLIF(COUNT(DISTINCT cm.id), 0), 0) as progress
                FROM enrollments e
                JOIN courses c ON e.courseId = c.id
                LEFT JOIN course_materials cm ON c.id = cm.courseId AND cm.isPublished = 1
                LEFT JOIN student_progress sp ON e.id = sp.enrollmentId AND cm.id = sp.materialId
                WHERE e.userId = ? AND e.status = 'approved'
                GROUP BY c.id, c.name, c.slug, c.category, c.description, e.enrolledAt, e.status
                ORDER BY e.enrolledAt DESC
            ");
            $stmt->execute([$userId]);
            $courses = $stmt->fetchAll();
            
            echo json_encode($courses);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch enrolled courses']);
        }
    }
    
    // Get upcoming classes for student dashboard
    public function getUpcomingClasses($userId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT 
                    cs.id, cs.sessionType, cs.daysOfWeek, cs.timeEST, cs.timeEAT,
                    c.name as courseName, c.slug as courseSlug
                FROM enrollments e
                JOIN courses c ON e.courseId = c.id
                JOIN class_schedules cs ON c.id = cs.courseId
                WHERE e.userId = ? AND e.status = 'approved'
                ORDER BY cs.timeEST
                LIMIT 10
            ");
            $stmt->execute([$userId]);
            $classes = $stmt->fetchAll();
            
            echo json_encode($classes);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch upcoming classes']);
        }
    }
    
    // Get assignments for student dashboard
    public function getAssignments($userId) {
        try {
            // Mock data for now - implement when assignments table is created
            $assignments = [
                [
                    'id' => '1',
                    'title' => 'Build a Landing Page',
                    'courseName' => 'Full Stack Web Development',
                    'dueDate' => date('Y-m-d', strtotime('+7 days')),
                    'status' => 'pending',
                    'grade' => null
                ]
            ];
            
            echo json_encode($assignments);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch assignments']);
        }
    }
    
    // Get course content for course viewer
    public function getCourseContent($userId, $courseSlug) {
        try {
            // Get course details
            $stmt = $this->conn->prepare("
                SELECT c.*, e.id as enrollmentId, e.enrolledAt
                FROM courses c
                JOIN enrollments e ON c.id = e.courseId
                WHERE c.slug = ? AND e.userId = ? AND e.status = 'approved'
            ");
            $stmt->execute([$courseSlug, $userId]);
            $course = $stmt->fetch();
            
            if (!$course) {
                http_response_code(404);
                echo json_encode(['error' => 'Course not found or not enrolled']);
                return;
            }
            
            $enrollmentId = $course['enrollmentId'];
            
            // Get lessons with progress
            $stmt = $this->conn->prepare("
                SELECT 
                    cm.id, cm.title, cm.content as description, cm.fileUrl as videoUrl,
                    cm.orderIndex as `order`, cm.type,
                    COALESCE(sp.status, 'not-started') as progressStatus,
                    CASE WHEN sp.status = 'completed' THEN 1 ELSE 0 END as completed
                FROM course_materials cm
                LEFT JOIN student_progress sp ON cm.id = sp.materialId AND sp.enrollmentId = ?
                WHERE cm.courseId = ? AND cm.isPublished = 1 AND cm.type = 'video'
                ORDER BY cm.orderIndex
            ");
            $stmt->execute([$enrollmentId, $course['id']]);
            $lessons = $stmt->fetchAll();
            
            // Add mock duration and materials for each lesson
            foreach ($lessons as &$lesson) {
                $lesson['duration'] = '30 min';
                $lesson['materials'] = [];
                
                // Get materials for this lesson
                $matStmt = $this->conn->prepare("
                    SELECT id, title, type, fileUrl as url
                    FROM course_materials
                    WHERE courseId = ? AND type IN ('document', 'pdf') AND isPublished = 1
                    LIMIT 3
                ");
                $matStmt->execute([$course['id']]);
                $lesson['materials'] = $matStmt->fetchAll();
            }
            
            // Calculate progress
            $totalLessons = count($lessons);
            $completedLessons = count(array_filter($lessons, fn($l) => $l['completed'] == 1));
            $progress = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;
            
            $course['totalLessons'] = $totalLessons;
            $course['completedLessons'] = $completedLessons;
            $course['progress'] = $progress;
            
            echo json_encode([
                'course' => $course,
                'lessons' => $lessons
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch course content: ' . $e->getMessage()]);
        }
    }
    
    // Mark lesson as complete
    public function markLessonComplete($userId, $lessonId) {
        try {
            // Get enrollment ID
            $stmt = $this->conn->prepare("
                SELECT e.id as enrollmentId, e.courseId
                FROM enrollments e
                JOIN course_materials cm ON e.courseId = cm.courseId
                WHERE e.userId = ? AND cm.id = ?
            ");
            $stmt->execute([$userId, $lessonId]);
            $enrollment = $stmt->fetch();
            
            if (!$enrollment) {
                http_response_code(404);
                echo json_encode(['error' => 'Enrollment not found']);
                return;
            }
            
            // Insert or update progress
            $progressId = 'progress_' . bin2hex(random_bytes(8));
            $stmt = $this->conn->prepare("
                INSERT INTO student_progress (id, enrollmentId, materialId, status, completedAt)
                VALUES (?, ?, ?, 'completed', NOW())
                ON DUPLICATE KEY UPDATE status = 'completed', completedAt = NOW()
            ");
            $stmt->execute([$progressId, $enrollment['enrollmentId'], $lessonId]);
            
            echo json_encode(['success' => true, 'message' => 'Lesson marked as complete']);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to mark lesson complete: ' . $e->getMessage()]);
        }
    }
    
    // Submit quiz
    public function submitQuiz($userId, $quizId) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            // Mock implementation - store quiz results
            echo json_encode([
                'success' => true,
                'score' => $data['score'] ?? 0,
                'passed' => ($data['score'] ?? 0) >= 70
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to submit quiz']);
        }
    }
    
    // Generate certificate
    public function generateCertificate($userId, $courseId) {
        try {
            require_once __DIR__ . '/../services/CertificateService.php';
            $certificateService = new CertificateService();
            
            $result = $certificateService->generateCertificate($userId, $courseId);
            
            echo json_encode($result);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
