<?php
require_once __DIR__ . '/../config/database.php';

class CaseStudiesController {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll() {
        $stmt = $this->db->query("
            SELECT cs.* 
            FROM casestudy cs
            WHERE cs.status = 'published'
            ORDER BY cs.featured DESC, cs.createdAt DESC
        ");
        
        $caseStudies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($caseStudies as &$cs) {
            $cs['featured'] = (bool)$cs['featured'];
        }
        
        echo json_encode($caseStudies);
    }

    public function getBySlug($slug) {
        $stmt = $this->db->prepare("SELECT * FROM casestudy WHERE slug = ? AND status = 'published'");
        $stmt->execute([$slug]);
        $caseStudy = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$caseStudy) {
            http_response_code(404);
            echo json_encode(['error' => 'Case study not found']);
            return;
        }

        $caseStudy['featured'] = (bool)$caseStudy['featured'];
        
        echo json_encode($caseStudy);
    }

    public function create() {
        Security::validateSession();
        $data = json_decode(file_get_contents('php://input'), true);
        
        $id = 'cs' . uniqid();
        
        $stmt = $this->db->prepare("
            INSERT INTO casestudy (id, title, slug, company, industry, challenge, solution, results, quote, author, authorRole, image, featured, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $id,
            $data['title'],
            $data['slug'],
            $data['company'],
            $data['industry'] ?? null,
            $data['challenge'],
            $data['solution'],
            $data['results'],
            $data['quote'] ?? null,
            $data['author'] ?? null,
            $data['authorRole'] ?? null,
            $data['image'] ?? null,
            isset($data['featured']) ? (int)$data['featured'] : 0,
            $data['status'] ?? 'published'
        ]);

        http_response_code(201);
        echo json_encode(['id' => $id, 'message' => 'Case study created successfully']);
    }

    public function update($id) {
        Security::validateSession();
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $this->db->prepare("
            UPDATE casestudy 
            SET title = ?, slug = ?, company = ?, industry = ?, challenge = ?, solution = ?, results = ?, quote = ?, author = ?, authorRole = ?, image = ?, featured = ?, status = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['title'],
            $data['slug'],
            $data['company'],
            $data['industry'] ?? null,
            $data['challenge'],
            $data['solution'],
            $data['results'],
            $data['quote'] ?? null,
            $data['author'] ?? null,
            $data['authorRole'] ?? null,
            $data['image'] ?? null,
            isset($data['featured']) ? (int)$data['featured'] : 0,
            $data['status'] ?? 'published',
            $id
        ]);

        echo json_encode(['message' => 'Case study updated successfully']);
    }

    public function delete($id) {
        Security::validateSession();
        $stmt = $this->db->prepare("DELETE FROM casestudy WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Case study deleted successfully']);
    }
}
