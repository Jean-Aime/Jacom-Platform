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
                   GROUP_CONCAT(DISTINCT srv.id) as serviceIds
            FROM solution s
            LEFT JOIN _IndustryToSolution its ON s.id = its.B
            LEFT JOIN industry i ON its.A = i.id
            LEFT JOIN _ServiceToSolution sts ON s.id = sts.B
            LEFT JOIN service srv ON sts.A = srv.id
            WHERE s.status = 'published'
            GROUP BY s.id
            ORDER BY s.featured DESC, s.createdAt DESC
        ");
        
        $solutions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($solutions as &$solution) {
            $solution['industryIds'] = $solution['industryIds'] ? explode(',', $solution['industryIds']) : [];
            $solution['serviceIds'] = $solution['serviceIds'] ? explode(',', $solution['serviceIds']) : [];
            $solution['expertIds'] = [];
            $solution['featured'] = (bool)$solution['featured'];
            $solution['benefits'] = $solution['benefits'] ? json_decode($solution['benefits'], true) : [];
            $solution['implementationSteps'] = $solution['implementationSteps'] ? json_decode($solution['implementationSteps'], true) : [];
        }
        
        return $solutions;
    }

    // GET /api/solutions/:slug - Get solution by slug
    public function getBySlug($slug) {
        $stmt = $this->db->prepare("SELECT * FROM solution WHERE slug = ? AND status = 'published'");
        $stmt->execute([$slug]);
        $solution = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$solution) {
            http_response_code(404);
            return ['error' => 'Solution not found'];
        }

        // Get related industries
        $stmt = $this->db->prepare("
            SELECT i.* FROM industry i
            JOIN _IndustryToSolution its ON i.id = its.A
            WHERE its.B = ?
        ");
        $stmt->execute([$solution['id']]);
        $solution['industries'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get related services
        $stmt = $this->db->prepare("
            SELECT s.* FROM service s
            JOIN _ServiceToSolution sts ON s.id = sts.A
            WHERE sts.B = ?
        ");
        $stmt->execute([$solution['id']]);
        $solution['services'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get related experts (table not yet created)
        $solution['experts'] = [];

        $solution['featured'] = (bool)$solution['featured'];
        $solution['benefits'] = $solution['benefits'] ? json_decode($solution['benefits'], true) : [];
        $solution['implementationSteps'] = $solution['implementationSteps'] ? json_decode($solution['implementationSteps'], true) : [];
        
        return $solution;
    }

    // POST /api/solutions - Create solution
    public function create($data) {
        Security::validateSession();
        $id = 'sol' . uniqid();
        
        $stmt = $this->db->prepare("
            INSERT INTO solution (id, name, slug, tagline, description, challenge, approach, outcomes, image, featured, status, benefits, implementationSteps)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            $data['status'] ?? 'published',
            isset($data['benefits']) ? json_encode($data['benefits']) : null,
            isset($data['implementationSteps']) ? json_encode($data['implementationSteps']) : null
        ]);

        // Link industries
        if (!empty($data['industryIds'])) {
            $this->linkIndustries($id, $data['industryIds']);
        }

        // Link services
        if (!empty($data['serviceIds'])) {
            $this->linkServices($id, $data['serviceIds']);
        }

        // Link experts (skip for now)
        // if (!empty($data['expertIds'])) {
        //     $this->linkExperts($id, $data['expertIds']);
        // }

        return ['id' => $id, 'message' => 'Solution created successfully'];
    }

    // PUT /api/solutions/:id - Update solution
    public function update($id, $data) {
        Security::validateSession();
        $stmt = $this->db->prepare("
            UPDATE solution 
            SET name = ?, slug = ?, tagline = ?, description = ?, challenge = ?, approach = ?, outcomes = ?, image = ?, featured = ?, status = ?, benefits = ?, implementationSteps = ?
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
            isset($data['benefits']) ? json_encode($data['benefits']) : null,
            isset($data['implementationSteps']) ? json_encode($data['implementationSteps']) : null,
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

        // Update experts (skip for now)
        // $this->db->prepare("DELETE FROM _ExpertToSolution WHERE B = ?")->execute([$id]);
        // if (!empty($data['expertIds'])) {
        //     $this->linkExperts($id, $data['expertIds']);
        // }

        return ['message' => 'Solution updated successfully'];
    }

    // DELETE /api/solutions/:id - Delete solution
    public function delete($id) {
        Security::validateSession();
        $stmt = $this->db->prepare("DELETE FROM solution WHERE id = ?");
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
