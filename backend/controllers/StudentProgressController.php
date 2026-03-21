<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class StudentProgressController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    // ============================================================================
    // COURSE PREVIEW (Before Enrollment)
    // ============================================================================
    
    public function getCoursePreview($courseId) {
        // No authentication required - public preview
        
        try {
            // Get course basic info
            $stmt = $this->conn->prepare("SELECT id, name, description, category, duration, totalPrice, fullPaymentPrice, startDate FROM courses WHERE id = ?");
            $stmt->execute([$courseId]);
            $course = $stmt->fetch();
            
            if (!$course) {
                http_response_code(404);
                echo json_encode(['error' => 'Course not found']);
                return;
            }
            
            // Get phases with limited info (titles only, no content)
            $stmt = $this->conn->prepare("SELECT id, phaseNumber, title, description FROM course_phases WHERE courseId = ? ORDER BY phaseNumber ASC");
            $stmt->execute([$courseId]);
            $phases = $stmt->fetchAll();
            
            foreach ($phases as &$phase) {
                // Get week titles only (no detailed content)
                $stmt = $this->conn->prepare("SELECT id, weekNumber, title FROM course_weeks WHERE phaseId = ? ORDER BY weekNumber ASC");
                $stmt->execute([$phase['id']]);
                $phase['weeks'] = $stmt->fetchAll();
                
                foreach ($phase['weeks'] as &$week) {
                    // Get topic titles only (no resources or content)
                    $stmt = $this->conn->prepare("SELECT id, title FROM course_topics WHERE weekId = ? ORDER BY orderIndex ASC");
                    $stmt->execute([$week['id']]);
                    $week['topics'] = $stmt->fetchAll();
                }
            }
            
            $course['phases'] = $phases;
            $course['isPreview'] = true;
            $course['message'] = 'Enroll to access full curriculum and materials';
            
            echo json_encode(['success' => true, 'course' => $course]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch course preview', 'details' => $e->getMessage()]);
        }
    }
    
    // ============================================================================
    // FULL CURRICULUM (After Enrollment)
    // ============================================================================
    
    public function getFullCurriculum($courseId) {
        $session = Security::validateSession();
        $studentId = $session['userId'];
        
        try {
            // Check if student is enrolled
            $stmt = $this->conn->prepare("SELECT id, status FROM enrollments WHERE studentId = ? AND courseId = ? AND status = 'approved'");
            $stmt->execute([$studentId, $courseId]);
            $enrollment = $stmt->fetch();
            
            if (!$enrollment) {
                http_response_code(403);
                echo json_encode(['error' => 'You must be enrolled in this course to access the curriculum']);
                return;
            }
            
            // Get full course info
            $stmt = $this->conn->prepare("SELECT * FROM courses WHERE id = ?");
            $stmt->execute([$courseId]);
            $course = $stmt->fetch();
            
            // Get all phases with full details
            $stmt = $this->conn->prepare("SELECT * FROM course_phases WHERE courseId = ? ORDER BY phaseNumber ASC");
            $stmt->execute([$courseId]);
            $phases = $stmt->fetchAll();
            
            foreach ($phases as &$phase) {
                // Get weeks with full details
                $stmt = $this->conn->prepare("SELECT * FROM course_weeks WHERE phaseId = ? ORDER BY weekNumber ASC");
                $stmt->execute([$phase['id']]);
                $phase['weeks'] = $stmt->fetchAll();
                
                foreach ($phase['weeks'] as &$week) {
                    // Get topics with full details
                    $stmt = $this->conn->prepare("SELECT * FROM course_topics WHERE weekId = ? ORDER BY orderIndex ASC");
                    $stmt->execute([$week['id']]);
                    $week['topics'] = $stmt->fetchAll();
                    
                    foreach ($week['topics'] as &$topic) {
                        // Get all resources
                        $stmt = $this->conn->prepare("SELECT * FROM course_resources WHERE topicId = ? ORDER BY orderIndex ASC");
                        $stmt->execute([$topic['id']]);
                        $topic['resources'] = $stmt->fetchAll();
                        
                        // Get student progress for this topic
                        $stmt = $this->conn->prepare("SELECT status, completedAt FROM student_progress WHERE studentId = ? AND topicId = ?");
                        $stmt->execute([$studentId, $topic['id']]);
                        $progress = $stmt->fetch();
                        
                        $topic['progress'] = $progress ?: ['status' => 'locked', 'completedAt' => null];
                        
                        // Check if topic is unlocked
                        $topic['isUnlocked'] = $this->isTopicUnlocked($studentId, $courseId, $topic['id'], $week['id']);
                    }
                }
            }
            
            $course['phases'] = $phases;
            $course['isPreview'] = false;
            
            // Get overall progress
            $course['progress'] = $this->getCourseProgress($studentId, $courseId);
            
            echo json_encode(['success' => true, 'course' => $course]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch curriculum', 'details' => $e->getMessage()]);
        }
    }
    
    // ============================================================================
    // PROGRESS TRACKING
    // ============================================================================
    
    private function isTopicUnlocked($studentId, $courseId, $topicId, $weekId) {
        // Get all topics in this week ordered by index
        $stmt = $this->conn->prepare("SELECT id FROM course_topics WHERE weekId = ? ORDER BY orderIndex ASC");
        $stmt->execute([$weekId]);
        $topics = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Find current topic index
        $currentIndex = array_search($topicId, $topics);
        
        // First topic is always unlocked
        if ($currentIndex === 0) {
            return true;
        }
        
        // Check if previous topic is completed
        $previousTopicId = $topics[$currentIndex - 1];
        $stmt = $this->conn->prepare("SELECT status FROM student_progress WHERE studentId = ? AND topicId = ?");
        $stmt->execute([$studentId, $previousTopicId]);
        $previousProgress = $stmt->fetch();
        
        return $previousProgress && $previousProgress['status'] === 'completed';
    }
    
    public function markTopicComplete($topicId) {
        $session = Security::validateSession();
        $studentId = $session['userId'];
        
        try {
            // Get topic and week info
            $stmt = $this->conn->prepare("SELECT weekId FROM course_topics WHERE id = ?");
            $stmt->execute([$topicId]);
            $topic = $stmt->fetch();
            
            if (!$topic) {
                http_response_code(404);
                echo json_encode(['error' => 'Topic not found']);
                return;
            }
            
            // Get course ID from week
            $stmt = $this->conn->prepare("SELECT w.phaseId, p.courseId FROM course_weeks w JOIN course_phases p ON w.phaseId = p.id WHERE w.id = ?");
            $stmt->execute([$topic['weekId']]);
            $courseInfo = $stmt->fetch();
            
            // Check if topic is unlocked
            if (!$this->isTopicUnlocked($studentId, $courseInfo['courseId'], $topicId, $topic['weekId'])) {
                http_response_code(403);
                echo json_encode(['error' => 'You must complete previous topics first']);
                return;
            }
            
            // Check if already completed
            $stmt = $this->conn->prepare("SELECT id FROM student_progress WHERE studentId = ? AND topicId = ?");
            $stmt->execute([$studentId, $topicId]);
            $existing = $stmt->fetch();
            
            if ($existing) {
                // Update existing progress
                $stmt = $this->conn->prepare("UPDATE student_progress SET status = 'completed', completedAt = NOW() WHERE id = ?");
                $stmt->execute([$existing['id']]);
            } else {
                // Create new progress record
                $id = 'progress_' . uniqid();
                $stmt = $this->conn->prepare("INSERT INTO student_progress (id, studentId, courseId, topicId, status, completedAt) VALUES (?, ?, ?, ?, 'completed', NOW())");
                $stmt->execute([$id, $studentId, $courseInfo['courseId'], $topicId]);
            }
            
            // Get updated progress
            $progress = $this->getCourseProgress($studentId, $courseInfo['courseId']);
            
            echo json_encode(['success' => true, 'message' => 'Topic marked as complete', 'progress' => $progress]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to mark topic complete', 'details' => $e->getMessage()]);
        }
    }
    
    public function getCourseProgress($studentId, $courseId) {
        // Get total topics in course
        $stmt = $this->conn->prepare("
            SELECT COUNT(DISTINCT t.id) as totalTopics
            FROM course_topics t
            JOIN course_weeks w ON t.weekId = w.id
            JOIN course_phases p ON w.phaseId = p.id
            WHERE p.courseId = ?
        ");
        $stmt->execute([$courseId]);
        $total = $stmt->fetch();
        
        // Get completed topics
        $stmt = $this->conn->prepare("
            SELECT COUNT(DISTINCT sp.topicId) as completedTopics
            FROM student_progress sp
            JOIN course_topics t ON sp.topicId = t.id
            JOIN course_weeks w ON t.weekId = w.id
            JOIN course_phases p ON w.phaseId = p.id
            WHERE sp.studentId = ? AND p.courseId = ? AND sp.status = 'completed'
        ");
        $stmt->execute([$studentId, $courseId]);
        $completed = $stmt->fetch();
        
        $totalTopics = $total['totalTopics'] ?? 0;
        $completedTopics = $completed['completedTopics'] ?? 0;
        $percentage = $totalTopics > 0 ? round(($completedTopics / $totalTopics) * 100, 2) : 0;
        
        return [
            'totalTopics' => $totalTopics,
            'completedTopics' => $completedTopics,
            'percentage' => $percentage,
            'isComplete' => $percentage === 100
        ];
    }
    
    public function getStudentProgress($courseId) {
        $session = Security::validateSession();
        $studentId = $session['userId'];
        
        $progress = $this->getCourseProgress($studentId, $courseId);
        echo json_encode(['success' => true, 'progress' => $progress]);
    }
    
    // ============================================================================
    // RESOURCE ACCESS
    // ============================================================================
    
    public function getResource($resourceId) {
        $session = Security::validateSession();
        $studentId = $session['userId'];
        
        try {
            // Get resource and topic info
            $stmt = $this->conn->prepare("
                SELECT r.*, t.id as topicId, t.weekId
                FROM course_resources r
                JOIN course_topics t ON r.topicId = t.id
                WHERE r.id = ?
            ");
            $stmt->execute([$resourceId]);
            $resource = $stmt->fetch();
            
            if (!$resource) {
                http_response_code(404);
                echo json_encode(['error' => 'Resource not found']);
                return;
            }
            
            // Get course ID
            $stmt = $this->conn->prepare("
                SELECT p.courseId
                FROM course_weeks w
                JOIN course_phases p ON w.phaseId = p.id
                WHERE w.id = ?
            ");
            $stmt->execute([$resource['weekId']]);
            $courseInfo = $stmt->fetch();
            
            // Check if student is enrolled
            $stmt = $this->conn->prepare("SELECT id FROM enrollments WHERE studentId = ? AND courseId = ? AND status = 'approved'");
            $stmt->execute([$studentId, $courseInfo['courseId']]);
            $enrollment = $stmt->fetch();
            
            if (!$enrollment) {
                http_response_code(403);
                echo json_encode(['error' => 'You must be enrolled to access this resource']);
                return;
            }
            
            // Check if topic is unlocked
            if (!$this->isTopicUnlocked($studentId, $courseInfo['courseId'], $resource['topicId'], $resource['weekId'])) {
                http_response_code(403);
                echo json_encode(['error' => 'Complete previous topics to unlock this resource']);
                return;
            }
            
            echo json_encode(['success' => true, 'resource' => $resource]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch resource', 'details' => $e->getMessage()]);
        }
    }
}
