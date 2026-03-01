<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class OrdersController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function getAll() {
        Security::validateSession();
        
        try {
            $stmt = $this->conn->query("
                SELECT o.*, 
                       (SELECT COUNT(*) FROM order_item WHERE orderId = o.id) as itemCount
                FROM `order` o
                ORDER BY o.createdAt DESC
            ");
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($orders);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function getById($id) {
        Security::validateSession();
        
        try {
            $stmt = $this->conn->prepare("SELECT * FROM `order` WHERE id = ?");
            $stmt->execute([$id]);
            $order = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$order) {
                http_response_code(404);
                echo json_encode(['error' => 'Order not found']);
                return;
            }
            
            $itemsStmt = $this->conn->prepare("SELECT * FROM order_item WHERE orderId = ?");
            $itemsStmt->execute([$id]);
            $order['items'] = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($order);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function create() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            $orderId = 'ord' . uniqid();
            
            $this->conn->beginTransaction();
            
            $stmt = $this->conn->prepare("
                INSERT INTO `order` (id, fullName, email, phone, address, city, country, notes, total, status, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            ");
            
            $stmt->execute([
                $orderId,
                $data['fullName'],
                $data['email'],
                $data['phone'],
                $data['address'],
                $data['city'],
                $data['country'],
                $data['notes'] ?? null,
                $data['total'],
                $data['status'] ?? 'pending'
            ]);
            
            $itemStmt = $this->conn->prepare("
                INSERT INTO order_item (id, orderId, productId, productName, quantity, price, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, NOW())
            ");
            
            foreach ($data['items'] as $item) {
                $productStmt = $this->conn->prepare("SELECT name FROM product WHERE id = ?");
                $productStmt->execute([$item['productId']]);
                $product = $productStmt->fetch(PDO::FETCH_ASSOC);
                
                $itemStmt->execute([
                    'itm' . uniqid(),
                    $orderId,
                    $item['productId'],
                    $product['name'] ?? 'Unknown Product',
                    $item['quantity'],
                    $item['price']
                ]);
            }
            
            $this->conn->commit();
            
            http_response_code(201);
            echo json_encode(['success' => true, 'orderId' => $orderId]);
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function updateStatus($id) {
        Security::validateSession();
        
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            $stmt = $this->conn->prepare("UPDATE `order` SET status = ?, updatedAt = NOW() WHERE id = ?");
            $stmt->execute([$data['status'], $id]);
            
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        Security::validateSession();
        
        try {
            $stmt = $this->conn->prepare("DELETE FROM `order` WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
