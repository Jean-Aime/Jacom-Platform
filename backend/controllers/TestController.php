<?php
require_once __DIR__ . '/../config/database.php';

class TestController {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function checkDatabase() {
        $results = [
            'status' => 'testing',
            'timestamp' => date('Y-m-d H:i:s'),
            'tests' => []
        ];
        
        try {
            // Test 1: Connection
            $results['tests']['connection'] = [
                'status' => 'SUCCESS',
                'message' => 'Database connected'
            ];
            
            // Test 2: Tables
            $stmt = $this->conn->query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
            $results['tests']['tables'] = [
                'status' => count($tables) > 0 ? 'SUCCESS' : 'WARNING',
                'count' => count($tables),
                'list' => $tables
            ];
            
            // Test 3: User table
            if (in_array('user', $tables)) {
                $stmt = $this->conn->query('SELECT COUNT(*) as count FROM "user"');
                $userCount = $stmt->fetch()['count'];
                $results['tests']['user_table'] = [
                    'status' => $userCount > 0 ? 'SUCCESS' : 'WARNING',
                    'count' => $userCount,
                    'message' => $userCount > 0 ? 'User table has data' : 'User table is empty'
                ];
            } else {
                $results['tests']['user_table'] = [
                    'status' => 'FAILED',
                    'message' => 'User table does not exist'
                ];
            }
            
            // Test 4: Session table
            $results['tests']['session_table'] = [
                'status' => in_array('session', $tables) ? 'SUCCESS' : 'FAILED',
                'message' => in_array('session', $tables) ? 'Session table exists' : 'Session table missing - LOGIN WILL FAIL'
            ];
            
            // Test 5: Industry table
            if (in_array('industry', $tables)) {
                $stmt = $this->conn->query('SELECT COUNT(*) as count FROM industry');
                $industryCount = $stmt->fetch()['count'];
                $results['tests']['industry_table'] = [
                    'status' => $industryCount > 0 ? 'SUCCESS' : 'WARNING',
                    'count' => $industryCount,
                    'message' => $industryCount > 0 ? 'Industry table has data' : 'Industry table empty - DROPDOWNS EMPTY'
                ];
            } else {
                $results['tests']['industry_table'] = [
                    'status' => 'FAILED',
                    'message' => 'Industry table missing - DROPDOWNS EMPTY'
                ];
            }
            
            // Test 6: Service table
            if (in_array('service', $tables)) {
                $stmt = $this->conn->query('SELECT COUNT(*) as count FROM service');
                $serviceCount = $stmt->fetch()['count'];
                $results['tests']['service_table'] = [
                    'status' => $serviceCount > 0 ? 'SUCCESS' : 'WARNING',
                    'count' => $serviceCount,
                    'message' => $serviceCount > 0 ? 'Service table has data' : 'Service table empty - DROPDOWNS EMPTY'
                ];
            } else {
                $results['tests']['service_table'] = [
                    'status' => 'FAILED',
                    'message' => 'Service table missing - DROPDOWNS EMPTY'
                ];
            }
            
            // Overall
            $failed = array_filter($results['tests'], fn($t) => $t['status'] === 'FAILED');
            $results['overall'] = count($failed) > 0 ? 'FAILED' : 'SUCCESS';
            $results['summary'] = count($failed) > 0 
                ? 'Run postgresql_schema.sql in pgAdmin' 
                : 'Database ready';
            
        } catch (Exception $e) {
            $results['tests']['connection'] = [
                'status' => 'FAILED',
                'error' => $e->getMessage()
            ];
            $results['overall'] = 'FAILED';
            $results['summary'] = 'Cannot connect to database';
        }
        
        echo json_encode($results, JSON_PRETTY_PRINT);
    }
}
