<?php
require_once __DIR__ . '/../config/database.php';

class SolutionsController {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    // GET /api/solutions - Get all solutions
    public function getAll() {
        $stmt = $this->db->query("
            SELECT s.*, 
                   GROUP_CONCAT(DISTINCT i.id) as industryIds,
                   GROUP_CONCAT(DISTINCT srv.id) as serviceIds,
                   GROUP_CONCAT(DISTINCT e.id) as expertIds
            FROM Solution s
            LEFT JOIN _IndustryToSolution its ON s.id = its.B
            LEFT JOIN Industry i ON its.A = i.id
            LEFT JOIN _ServiceToSolution sts ON s.id = sts.B
            LEFT JOIN Service srv ON sts.A = srv.id
            LEFT JOIN _ExpertToSolution ets ON s.id = ets.B
            LEFT JOIN Expert e ON ets.A = e.id
            WHERE s.status = 'published'
            GROUP BY s.id
            ORDER BY s.featured DESC, s.createdAt DESC
        ");
        
        $solutions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($solutions as &$solution) {
            $solution['industryIds'] = $solution['industryIds'] ? explode(',', $solution['industryIds']) : [];
            $solution['serviceIds'] = $solution['serviceIds'] ? explode(',', $solution['serviceIds']) : [];
            $solution['expertIds'] = $solution['expertIds'] ? explode(',', $solution['expertIds']) : [];
            $solution['featured'] = (bool)$solution['featured'];
        }
        
        return $solutions;
    }

    // GET /api/solutions/:slug - Get solution by slug
    public function getBySlug($slug) {
        $stmt = $this->db->prepare("SELECT * FROM Solution WHERE slug = ? AND status = 'published'");
        $stmt->execute([$slug]);
        $solution = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$solution) {
            http_response_code(404);
            return ['error' => 'Solution not found'];
        }

        // Get related industries
        $stmt = $this->db->prepare("
            SELECT i.* FROM Industry i
            JOIN _IndustryToSolution its ON i.id = its.A
            WHERE its.B = ?
        ");
        $stmt->execute([$solution['id']]);
        $solution['industries'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get related services
        $stmt = $this->db->prepare("
            SELECT s.* FROM Service s
            JOIN _ServiceToSolution sts ON s.id = sts.A
            WHERE sts.B = ?
        ");
        $stmt->execute([$solution['id']]);
        $solution['services'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get related experts
        $stmt = $this->db->prepare("
            SELECT e.* FROM Expert e
            JOIN _ExpertToSolution ets ON e.id = ets.A
            WHERE ets.B = ?
        ");
        $stmt->execute([$solution['id']]);
        $solution['experts'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $solution['featured'] = (bool)$solution['featured'];
        
        return $solution;
    }

    // POST /api/solutions - Create solution
    public function create($data) {
        $id = 'sol' . uniqid();
        
        $stmt = $this->db->prepare("
            INSERT INTO Solution (id, name, slug, tagline, description, challenge, approach, outcomes, image, featured, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $id,
            $data['name'],
            $data['slug'],
            $data['tagline'] ?? null,
            $data['description'],
            $data['challenge'] ?? null,
            $data['approach'] ?? null,
            $data['outcomes'] ?? null,
            $data['image'] ?? null,
            isset($data['featured']) ? (int)$data['featured'] : 0,
            $data['status'] ?? 'published'
        ]);

        // Link industries
        if (!empty($data['industryIds'])) {
            $this->linkIndustries($id, $data['industryIds']);
        }

        // Link services
        if (!empty($data['serviceIds'])) {
            $this->linkServices($id, $data['serviceIds']);
        }

        // Link experts
        if (!empty($data['expertIds'])) {
            $this->linkExperts($id, $data['expertIds']);
        }

        return ['id' => $id, 'message' => 'Solution created successfully'];
    }

    // PUT /api/solutions/:id - Update solution
    public function update($id, $data) {
        $stmt = $this->db->prepare("
            UPDATE Solution 
            SET name = ?, slug = ?, tagline = ?, description = ?, challenge = ?, approach = ?, outcomes = ?, image = ?, featured = ?, status = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['name'],
            $data['slug'],
            $data['tagline'] ?? null,
            $data['description'],
            $data['challenge'] ?? null,
            $data['approach'] ?? null,
            $data['outcomes'] ?? null,
            $data['image'] ?? null,
            isset($data['featured']) ? (int)$data['featured'] : 0,
            $data['status'] ?? 'published',
            $id
        ]);

        // Update industries
        $this->db->prepare("DELETE FROM _IndustryToSolution WHERE B = ?")->execute([$id]);
        if (!empty($data['industryIds'])) {
            $this->linkIndustries($id, $data['industryIds']);
        }

        // Update services
        $this->db->prepare("DELETE FROM _ServiceToSolution WHERE B = ?")->execute([$id]);
        if (!empty($data['serviceIds'])) {
            $this->linkServices($id, $data['serviceIds']);
        }

        // Update experts
        $this->db->prepare("DELETE FROM _ExpertToSolution WHERE B = ?")->execute([$id]);
        if (!empty($data['expertIds'])) {
            $this->linkExperts($id, $data['expertIds']);
        }

        return ['message' => 'Solution updated successfully'];
    }

    // DELETE /api/solutions/:id - Delete solution
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM Solution WHERE id = ?");
        $stmt->execute([$id]);
        return ['message' => 'Solution deleted successfully'];
    }

    // Helper: Link industries
    private function linkIndustries($solutionId, $industryIds) {
        $stmt = $this->db->prepare("INSERT INTO _IndustryToSolution (A, B) VALUES (?, ?)");
        foreach ($industryIds as $industryId) {
            $stmt->execute([$industryId, $solutionId]);
        }
    }

    // Helper: Link services
    private function linkServices($solutionId, $serviceIds) {
        $stmt = $this->db->prepare("INSERT INTO _ServiceToSolution (A, B) VALUES (?, ?)");
        foreach ($serviceIds as $serviceId) {
            $stmt->execute([$serviceId, $solutionId]);
        }
    }

    // Helper: Link experts
    private function linkExperts($solutionId, $expertIds) {
        $stmt = $this->db->prepare("INSERT INTO _ExpertToSolution (A, B) VALUES (?, ?)");
        foreach ($expertIds as $expertId) {
            $stmt->execute([$expertId, $solutionId]);
        }
    }
}
