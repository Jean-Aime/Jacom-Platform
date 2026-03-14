<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class CurriculumController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    // ============================================================================
    // WEEKS CRUD
    // ============================================================================
    
    public function getAllWeeks() {
        Security::validateSession();
        $stmt = $this->conn->query("SELECT w.*, p.title as phaseTitle, p.phaseNumber, c.name as courseName 
                                     FROM course_weeks w 
                                     JOIN course_phases p ON w.phaseId = p.id 
                                     JOIN courses c ON p.courseId = c.id 
                                     ORDER BY p.phaseNumber, w.weekNumber");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getWeeksByPhase($phaseId) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT * FROM course_weeks WHERE phaseId = ? ORDER BY weekNumber ASC");
        $stmt->execute([$phaseId]);
        echo json_encode($stmt->fetchAll());
    }
    
    public function getWeek($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT w.*, p.title as phaseTitle, p.phaseNumber 
                                       FROM course_weeks w 
                                       JOIN course_phases p ON w.phaseId = p.id 
                                       WHERE w.id = ?");
        $stmt->execute([$id]);
        $week = $stmt->fetch();
        
        if (!$week) {
            http_response_code(404);
            echo json_encode(['error' => 'Week not found']);
            return;
        }
        
        // Get topics for this week
        $stmt = $this->conn->prepare("SELECT * FROM course_topics WHERE weekId = ? ORDER BY orderIndex ASC");
        $stmt->execute([$id]);
        $week['topics'] = $stmt->fetchAll();
        
        echo json_encode($week);
    }
    
    public function createWeek() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'week_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO course_weeks (id, phaseId, weekNumber, title, description, taskList, practicalExercises) 
                                       VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $id,
            $data['phaseId'],
            $data['weekNumber'],
            $data['title'],
            $data['description'] ?? null,
            $data['taskList'] ?? null,
            $data['practicalExercises'] ?? null
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function updateWeek($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE course_weeks 
                                       SET phaseId = ?, weekNumber = ?, title = ?, description = ?, 
                                           taskList = ?, practicalExercises = ?, updatedAt = NOW() 
                                       WHERE id = ?");
        
        $stmt->execute([
            $data['phaseId'],
            $data['weekNumber'],
            $data['title'],
            $data['description'] ?? null,
            $data['taskList'] ?? null,
            $data['practicalExercises'] ?? null,
            $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function deleteWeek($id) {
        Security::validateSession();
        
        // Delete associated topics and resources (cascade)
        $stmt = $this->conn->prepare("SELECT id FROM course_topics WHERE weekId = ?");
        $stmt->execute([$id]);
        $topics = $stmt->fetchAll();
        
        foreach ($topics as $topic) {
            $this->conn->prepare("DELETE FROM course_resources WHERE topicId = ?")->execute([$topic['id']]);
        }
        
        $this->conn->prepare("DELETE FROM course_topics WHERE weekId = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM course_weeks WHERE id = ?")->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
    
    // ============================================================================
    // TOPICS CRUD
    // ============================================================================
    
    public function getAllTopics() {
        Security::validateSession();
        $stmt = $this->conn->query("SELECT t.*, w.title as weekTitle, w.weekNumber 
                                     FROM course_topics t 
                                     JOIN course_weeks w ON t.weekId = w.id 
                                     ORDER BY w.weekNumber, t.orderIndex");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getTopicsByWeek($weekId) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT * FROM course_topics WHERE weekId = ? ORDER BY orderIndex ASC");
        $stmt->execute([$weekId]);
        echo json_encode($stmt->fetchAll());
    }
    
    public function getTopic($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT t.*, w.title as weekTitle, w.weekNumber 
                                       FROM course_topics t 
                                       JOIN course_weeks w ON t.weekId = w.id 
                                       WHERE t.id = ?");
        $stmt->execute([$id]);
        $topic = $stmt->fetch();
        
        if (!$topic) {
            http_response_code(404);
            echo json_encode(['error' => 'Topic not found']);
            return;
        }
        
        // Get resources for this topic
        $stmt = $this->conn->prepare("SELECT * FROM course_resources WHERE topicId = ? ORDER BY orderIndex ASC");
        $stmt->execute([$id]);
        $topic['resources'] = $stmt->fetchAll();
        
        echo json_encode($topic);
    }
    
    public function createTopic() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'topic_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO course_topics (id, weekId, title, orderIndex) 
                                       VALUES (?, ?, ?, ?)");
        
        $stmt->execute([
            $id,
            $data['weekId'],
            $data['title'],
            $data['orderIndex'] ?? 0
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function updateTopic($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE course_topics 
                                       SET weekId = ?, title = ?, orderIndex = ?, updatedAt = NOW() 
                                       WHERE id = ?");
        
        $stmt->execute([
            $data['weekId'],
            $data['title'],
            $data['orderIndex'] ?? 0,
            $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function deleteTopic($id) {
        Security::validateSession();
        
        // Delete associated resources
        $this->conn->prepare("DELETE FROM course_resources WHERE topicId = ?")->execute([$id]);
        $this->conn->prepare("DELETE FROM course_topics WHERE id = ?")->execute([$id]);
        
        echo json_encode(['success' => true]);
    }
    
    // ============================================================================
    // RESOURCES CRUD
    // ============================================================================
    
    public function getAllResources() {
        Security::validateSession();
        $stmt = $this->conn->query("SELECT r.*, t.title as topicTitle 
                                     FROM course_resources r 
                                     JOIN course_topics t ON r.topicId = t.id 
                                     ORDER BY t.orderIndex, r.orderIndex");
        echo json_encode($stmt->fetchAll());
    }
    
    public function getResourcesByTopic($topicId) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT * FROM course_resources WHERE topicId = ? ORDER BY orderIndex ASC");
        $stmt->execute([$topicId]);
        echo json_encode($stmt->fetchAll());
    }
    
    public function getResource($id) {
        Security::validateSession();
        $stmt = $this->conn->prepare("SELECT r.*, t.title as topicTitle 
                                       FROM course_resources r 
                                       JOIN course_topics t ON r.topicId = t.id 
                                       WHERE r.id = ?");
        $stmt->execute([$id]);
        $resource = $stmt->fetch();
        
        if (!$resource) {
            http_response_code(404);
            echo json_encode(['error' => 'Resource not found']);
            return;
        }
        
        echo json_encode($resource);
    }
    
    public function createResource() {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $id = 'resource_' . uniqid();
        $stmt = $this->conn->prepare("INSERT INTO course_resources (id, topicId, type, title, url, content, orderIndex) 
                                       VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $id,
            $data['topicId'],
            $data['type'],
            $data['title'],
            $data['url'] ?? null,
            $data['content'] ?? null,
            $data['orderIndex'] ?? 0
        ]);
        
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }
    
    public function updateResource($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents("php://input"), true);
        $data = Security::sanitize($data);
        
        $stmt = $this->conn->prepare("UPDATE course_resources 
                                       SET topicId = ?, type = ?, title = ?, url = ?, content = ?, 
                                           orderIndex = ?, updatedAt = NOW() 
                                       WHERE id = ?");
        
        $stmt->execute([
            $data['topicId'],
            $data['type'],
            $data['title'],
            $data['url'] ?? null,
            $data['content'] ?? null,
            $data['orderIndex'] ?? 0,
            $id
        ]);
        
        echo json_encode(['success' => true]);
    }
    
    public function deleteResource($id) {
        Security::validateSession();
        $this->conn->prepare("DELETE FROM course_resources WHERE id = ?")->execute([$id]);
        echo json_encode(['success' => true]);
    }
    
    // ============================================================================
    // BULK OPERATIONS
    // ============================================================================
    
    public function getCurriculumByCourse($courseId) {
        Security::validateSession();
        
        // Get all phases for the course
        $stmt = $this->conn->prepare("SELECT * FROM course_phases WHERE courseId = ? ORDER BY phaseNumber ASC");
        $stmt->execute([$courseId]);
        $phases = $stmt->fetchAll();
        
        foreach ($phases as &$phase) {
            // Get weeks for each phase
            $stmt = $this->conn->prepare("SELECT * FROM course_weeks WHERE phaseId = ? ORDER BY weekNumber ASC");
            $stmt->execute([$phase['id']]);
            $phase['weeks'] = $stmt->fetchAll();
            
            foreach ($phase['weeks'] as &$week) {
                // Get topics for each week
                $stmt = $this->conn->prepare("SELECT * FROM course_topics WHERE weekId = ? ORDER BY orderIndex ASC");
                $stmt->execute([$week['id']]);
                $week['topics'] = $stmt->fetchAll();
                
                foreach ($week['topics'] as &$topic) {
                    // Get resources for each topic
                    $stmt = $this->conn->prepare("SELECT * FROM course_resources WHERE topicId = ? ORDER BY orderIndex ASC");
                    $stmt->execute([$topic['id']]);
                    $topic['resources'] = $stmt->fetchAll();
                }
            }
        }
        
        echo json_encode($phases);
    }
}
