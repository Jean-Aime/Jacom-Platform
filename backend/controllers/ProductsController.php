<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class ProductsController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }

    public function getAll() {
        try {
            $status = $_GET['status'] ?? null;
            $category = $_GET['category'] ?? null;
            $featured = $_GET['featured'] ?? null;
            $q = $_GET['q'] ?? null;
            $take = isset($_GET['take']) ? max(1, min((int)$_GET['take'], 100)) : 60;

            $where = [];
            $params = [];

            if ($status) {
                $where[] = "status = ?";
                $params[] = $status;
            }

            if ($category) {
                $where[] = "category = ?";
                $params[] = $category;
            }

            if ($featured === 'true') {
                $where[] = "featured = 1";
            } elseif ($featured === 'false') {
                $where[] = "featured = 0";
            }

            if ($q && strlen(trim($q)) > 1) {
                $where[] = "(name LIKE ? OR slug LIKE ? OR category LIKE ? OR description LIKE ?)";
                $query = '%' . trim($q) . '%';
                array_push($params, $query, $query, $query, $query);
            }

            $sql = "SELECT id, name, slug, description, category, price, image, featured, inStock, stock, status, sortOrder, createdAt, updatedAt
                    FROM product";

            if (!empty($where)) {
                $sql .= " WHERE " . implode(' AND ', $where);
            }

            $sql .= " ORDER BY featured DESC, sortOrder ASC, createdAt DESC LIMIT " . (int)$take;

            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $products = array_map(function($row) {
                return $this->formatProduct($row);
            }, $rows);

            echo json_encode($products);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch products', 'message' => $e->getMessage()]);
        }
    }

    public function getByIdOrSlug($identifier) {
        try {
            $stmt = $this->conn->prepare("
                SELECT id, name, slug, description, category, price, image, featured, inStock, stock, status, sortOrder, createdAt, updatedAt
                FROM product
                WHERE id = ? OR slug = ?
                LIMIT 1
            ");
            $stmt->execute([$identifier, $identifier]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
                return;
            }

            echo json_encode($this->formatProduct($row));
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch product', 'message' => $e->getMessage()]);
        }
    }

    public function create() {
        Security::validateSession();

        try {
            $data = json_decode(file_get_contents("php://input"), true);
            if (!$data) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON payload']);
                return;
            }

            $name = trim($data['name'] ?? '');
            $category = trim($data['category'] ?? '');
            $price = isset($data['price']) ? (float)$data['price'] : null;
            $status = trim($data['status'] ?? 'published');

            if ($name === '' || $category === '' || $price === null || !is_numeric($data['price'])) {
                http_response_code(400);
                echo json_encode(['error' => 'name, category and valid price are required']);
                return;
            }

            $id = 'prd' . uniqid();
            $baseSlug = $this->slugify($data['slug'] ?? $name);
            $slug = $this->ensureUniqueSlug($baseSlug);

            $stmt = $this->conn->prepare("
                INSERT INTO product (
                    id, name, slug, description, category, price, image, featured, inStock, stock, status, sortOrder, createdAt, updatedAt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            ");

            $stmt->execute([
                $id,
                $name,
                $slug,
                $this->nullableText($data['description'] ?? null),
                $category,
                $price,
                $this->nullableText($data['image'] ?? null),
                $this->toBoolInt($data['featured'] ?? false),
                $this->toBoolInt($data['inStock'] ?? true),
                $this->nullableInt($data['stock'] ?? null),
                $status !== '' ? $status : 'published',
                isset($data['sortOrder']) ? (int)$data['sortOrder'] : 0
            ]);

            $this->getByIdOrSlug($id);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create product', 'message' => $e->getMessage()]);
        }
    }

    public function update($id) {
        Security::validateSession();

        try {
            $data = json_decode(file_get_contents("php://input"), true);
            if (!$data) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON payload']);
                return;
            }

            $existingStmt = $this->conn->prepare("SELECT * FROM product WHERE id = ?");
            $existingStmt->execute([$id]);
            $existing = $existingStmt->fetch(PDO::FETCH_ASSOC);

            if (!$existing) {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
                return;
            }

            $name = trim($data['name'] ?? $existing['name']);
            $category = trim($data['category'] ?? $existing['category']);
            $price = isset($data['price']) ? (float)$data['price'] : (float)$existing['price'];

            if ($name === '' || $category === '' || !is_numeric($price)) {
                http_response_code(400);
                echo json_encode(['error' => 'name, category and valid price are required']);
                return;
            }

            $baseSlug = $this->slugify($data['slug'] ?? $name);
            $slug = $this->ensureUniqueSlug($baseSlug, $id);

            $stmt = $this->conn->prepare("
                UPDATE product
                SET
                    name = ?,
                    slug = ?,
                    description = ?,
                    category = ?,
                    price = ?,
                    image = ?,
                    featured = ?,
                    inStock = ?,
                    stock = ?,
                    status = ?,
                    sortOrder = ?,
                    updatedAt = NOW()
                WHERE id = ?
            ");

            $stmt->execute([
                $name,
                $slug,
                array_key_exists('description', $data) ? $this->nullableText($data['description']) : $existing['description'],
                $category,
                $price,
                array_key_exists('image', $data) ? $this->nullableText($data['image']) : $existing['image'],
                array_key_exists('featured', $data) ? $this->toBoolInt($data['featured']) : (int)$existing['featured'],
                array_key_exists('inStock', $data) ? $this->toBoolInt($data['inStock']) : (int)$existing['inStock'],
                array_key_exists('stock', $data) ? $this->nullableInt($data['stock']) : $existing['stock'],
                trim($data['status'] ?? $existing['status']),
                array_key_exists('sortOrder', $data) ? (int)$data['sortOrder'] : (int)$existing['sortOrder'],
                $id
            ]);

            $this->getByIdOrSlug($id);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update product', 'message' => $e->getMessage()]);
        }
    }

    public function delete($id) {
        Security::validateSession();

        try {
            $stmt = $this->conn->prepare("DELETE FROM product WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete product', 'message' => $e->getMessage()]);
        }
    }

    private function formatProduct($row) {
        return [
            'id' => $row['id'],
            'name' => $row['name'],
            'slug' => $row['slug'],
            'description' => $row['description'],
            'category' => $row['category'],
            'price' => (float)$row['price'],
            'image' => $row['image'],
            'featured' => (bool)$row['featured'],
            'inStock' => (bool)$row['inStock'],
            'stock' => $row['stock'] !== null ? (int)$row['stock'] : null,
            'status' => $row['status'],
            'sortOrder' => isset($row['sortOrder']) ? (int)$row['sortOrder'] : 0,
            'createdAt' => $row['createdAt'] ?? null,
            'updatedAt' => $row['updatedAt'] ?? null
        ];
    }

    private function slugify($value) {
        $value = strtolower(trim((string)$value));
        $value = preg_replace('/[^a-z0-9\s-]/', '', $value);
        $value = preg_replace('/\s+/', '-', $value);
        $value = preg_replace('/-+/', '-', $value);
        return $value !== '' ? $value : ('product-' . time());
    }

    private function ensureUniqueSlug($baseSlug, $excludeId = null) {
        $candidate = $baseSlug;
        $counter = 1;

        while (true) {
            if ($excludeId) {
                $stmt = $this->conn->prepare("SELECT id FROM product WHERE slug = ? AND id <> ? LIMIT 1");
                $stmt->execute([$candidate, $excludeId]);
            } else {
                $stmt = $this->conn->prepare("SELECT id FROM product WHERE slug = ? LIMIT 1");
                $stmt->execute([$candidate]);
            }

            $exists = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$exists) {
                return $candidate;
            }

            $candidate = $baseSlug . '-' . $counter;
            $counter++;
        }
    }

    private function toBoolInt($value) {
        if (is_bool($value)) {
            return $value ? 1 : 0;
        }
        if (is_numeric($value)) {
            return ((int)$value) > 0 ? 1 : 0;
        }
        if (is_string($value)) {
            return in_array(strtolower($value), ['1', 'true', 'yes', 'on'], true) ? 1 : 0;
        }
        return 0;
    }

    private function nullableText($value) {
        if ($value === null) return null;
        $text = trim((string)$value);
        return $text === '' ? null : $text;
    }

    private function nullableInt($value) {
        if ($value === null || $value === '') return null;
        if (!is_numeric($value)) return null;
        return (int)$value;
    }
}
