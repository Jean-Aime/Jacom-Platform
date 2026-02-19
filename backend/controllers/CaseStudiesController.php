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
            FROM CaseStudy cs
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
        $stmt = $this->db->prepare("SELECT * FROM CaseStudy WHERE slug = ? AND status = 'published'");
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

    public function getBySolution($solutionId) {
        $stmt = $this->db->prepare("
            SELECT cs.* 
            FROM CaseStudy cs
            JOIN _CaseStudyToSolution cts ON cs.id = cts.A
            WHERE cts.B = ? AND cs.status = 'published'
            ORDER BY cs.featured DESC, cs.createdAt DESC
        ");
        $stmt->execute([$solutionId]);
        $caseStudies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($caseStudies as &$cs) {
            $cs['featured'] = (bool)$cs['featured'];
        }
        
        echo json_encode($caseStudies);
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $id = 'cs' . uniqid();
        
        $stmt = $this->db->prepare("
            INSERT INTO CaseStudy (id, title, slug, company, industry, challenge, solution, results, quote, author, authorRole, image, featured, status)
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

        if (!empty($data['solutionIds'])) {
            $stmt = $this->db->prepare("INSERT INTO _CaseStudyToSolution (A, B) VALUES (?, ?)");
            foreach ($data['solutionIds'] as $solutionId) {
                $stmt->execute([$id, $solutionId]);
            }
        }

        http_response_code(201);
        echo json_encode(['id' => $id, 'message' => 'Case study created successfully']);
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $this->db->prepare("
            UPDATE CaseStudy 
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

        $this->db->prepare("DELETE FROM _CaseStudyToSolution WHERE A = ?")->execute([$id]);
        if (!empty($data['solutionIds'])) {
            $stmt = $this->db->prepare("INSERT INTO _CaseStudyToSolution (A, B) VALUES (?, ?)");
            foreach ($data['solutionIds'] as $solutionId) {
                $stmt->execute([$id, $solutionId]);
            }
        }

        echo json_encode(['message' => 'Case study updated successfully']);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM CaseStudy WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Case study deleted successfully']);
    }
}
