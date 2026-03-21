<?php
require_once __DIR__ . '/../config/database.php';

class AssignmentController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    /**
     * Get assignments for a student
     */
    public function getStudentAssignments($userId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT 
                    a.id, a.title, a.description, a.dueDate, a.maxScore,
                    c.name as courseName, c.slug as courseSlug,
                    asub.id as submissionId, asub.submittedAt, asub.grade, asub.feedback,
                    asub.status as submissionStatus
                FROM assignments a
                JOIN courses c ON a.courseId = c.id
                JOIN enrollments e ON c.id = e.courseId
                LEFT JOIN assignment_submissions asub ON a.id = asub.assignmentId AND e.userId = asub.userId
                WHERE e.userId = ? AND e.status = 'approved'
                ORDER BY a.dueDate ASC
            ");
            $stmt->execute([$userId]);
            $assignments = $stmt->fetchAll();
            
            // Add status for each assignment
            foreach ($assignments as &$assignment) {
                if ($assignment['submissionId']) {
                    $assignment['status'] = $assignment['submissionStatus'];
                } else {
                    // Check if overdue
                    $dueDate = strtotime($assignment['dueDate']);
                    $now = time();
                    $assignment['status'] = $dueDate < $now ? 'overdue' : 'pending';
                }
            }
            
            echo json_encode($assignments);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch assignments: ' . $e->getMessage()]);
        }
    }
    
    /**
     * Get single assignment details
     */
    public function getAssignment($assignmentId, $userId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT 
                    a.*, 
                    c.name as courseName,
                    asub.id as submissionId, asub.content, asub.fileUrl,
                    asub.submittedAt, asub.grade, asub.feedback, asub.status as submissionStatus
                FROM assignments a
                JOIN courses c ON a.courseId = c.id
                JOIN enrollments e ON c.id = e.courseId
                LEFT JOIN assignment_submissions asub ON a.id = asub.assignmentId AND e.userId = asub.userId
                WHERE a.id = ? AND e.userId = ? AND e.status = 'approved'
            ");
            $stmt->execute([$assignmentId, $userId]);
            $assignment = $stmt->fetch();
            
            if (!$assignment) {
                http_response_code(404);
                echo json_encode(['error' => 'Assignment not found']);
                return;
            }
            
            echo json_encode($assignment);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch assignment: ' . $e->getMessage()]);
        }
    }
    
    /**
     * Submit assignment
     */
    public function submitAssignment($userId) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $assignmentId = $data['assignmentId'] ?? null;
            $content = $data['content'] ?? '';
            $fileUrl = $data['fileUrl'] ?? null;
            
            if (!$assignmentId) {
                http_response_code(400);
                echo json_encode(['error' => 'Assignment ID is required']);
                return;
            }
            
            // Verify student is enrolled in the course
            $stmt = $this->conn->prepare("
                SELECT a.courseId, a.dueDate
                FROM assignments a
                JOIN enrollments e ON a.courseId = e.courseId
                WHERE a.id = ? AND e.userId = ? AND e.status = 'approved'
            ");
            $stmt->execute([$assignmentId, $userId]);
            $assignment = $stmt->fetch();
            
            if (!$assignment) {
                http_response_code(403);
                echo json_encode(['error' => 'Not enrolled in this course']);
                return;
            }
            
            // Check if already submitted
            $stmt = $this->conn->prepare("
                SELECT id FROM assignment_submissions 
                WHERE assignmentId = ? AND userId = ?
            ");
            $stmt->execute([$assignmentId, $userId]);
            $existing = $stmt->fetch();
            
            $submissionId = $existing ? $existing['id'] : 'asub_' . bin2hex(random_bytes(8));
            $isLate = strtotime($assignment['dueDate']) < time() ? 1 : 0;
            $status = 'submitted';
            
            if ($existing) {
                // Update existing submission
                $stmt = $this->conn->prepare("
                    UPDATE assignment_submissions 
                    SET content = ?, fileUrl = ?, submittedAt = NOW(), isLate = ?, status = ?
                    WHERE id = ?
                ");
                $stmt->execute([$content, $fileUrl, $isLate, $status, $submissionId]);
            } else {
                // Create new submission
                $stmt = $this->conn->prepare("
                    INSERT INTO assignment_submissions (id, assignmentId, userId, content, fileUrl, submittedAt, isLate, status)
                    VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)
                ");
                $stmt->execute([$submissionId, $assignmentId, $userId, $content, $fileUrl, $isLate, $status]);
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Assignment submitted successfully',
                'submissionId' => $submissionId,
                'isLate' => $isLate
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to submit assignment: ' . $e->getMessage()]);
        }
    }
    
    /**
     * Upload assignment file
     */
    public function uploadAssignmentFile() {
        try {
            if (!isset($_FILES['file'])) {
                http_response_code(400);
                echo json_encode(['error' => 'No file uploaded']);
                return;
            }
            
            $file = $_FILES['file'];
            $uploadDir = __DIR__ . '/../../uploads/assignments/';
            
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            
            // Validate file
            $allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'zip', 'jpg', 'jpeg', 'png'];
            $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            
            if (!in_array($fileExt, $allowedTypes)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid file type']);
                return;
            }
            
            // Check file size (max 10MB)
            if ($file['size'] > 10 * 1024 * 1024) {
                http_response_code(400);
                echo json_encode(['error' => 'File too large (max 10MB)']);
                return;
            }
            
            // Generate unique filename
            $filename = 'assignment_' . bin2hex(random_bytes(8)) . '.' . $fileExt;
            $filepath = $uploadDir . $filename;
            
            if (move_uploaded_file($file['tmp_name'], $filepath)) {
                echo json_encode([
                    'success' => true,
                    'fileUrl' => '/uploads/assignments/' . $filename,
                    'filename' => $file['name']
                ]);
            } else {
                throw new Exception('Failed to move uploaded file');
            }
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to upload file: ' . $e->getMessage()]);
        }
    }
    
    /**
     * Admin: Get all submissions for an assignment
     */
    public function getAssignmentSubmissions($assignmentId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT 
                    asub.*, 
                    u.name as studentName, u.email as studentEmail,
                    a.title as assignmentTitle, a.maxScore
                FROM assignment_submissions asub
                JOIN user u ON asub.userId = u.id
                JOIN assignments a ON asub.assignmentId = a.id
                WHERE asub.assignmentId = ?
                ORDER BY asub.submittedAt DESC
            ");
            $stmt->execute([$assignmentId]);
            $submissions = $stmt->fetchAll();
            
            echo json_encode($submissions);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch submissions: ' . $e->getMessage()]);
        }
    }
    
    /**
     * Admin: Grade assignment submission
     */
    public function gradeSubmission($submissionId) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $grade = $data['grade'] ?? null;
            $feedback = $data['feedback'] ?? '';
            
            if ($grade === null) {
                http_response_code(400);
                echo json_encode(['error' => 'Grade is required']);
                return;
            }
            
            $stmt = $this->conn->prepare("
                UPDATE assignment_submissions 
                SET grade = ?, feedback = ?, status = 'graded', gradedAt = NOW()
                WHERE id = ?
            ");
            $stmt->execute([$grade, $feedback, $submissionId]);
            
            echo json_encode([
                'success' => true,
                'message' => 'Assignment graded successfully'
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to grade assignment: ' . $e->getMessage()]);
        }
    }
}
