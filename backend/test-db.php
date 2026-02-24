<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/config/database.php';

$results = [
    'status' => 'testing',
    'timestamp' => date('Y-m-d H:i:s'),
    'tests' => []
];

try {
    // Test 1: Database connection
    $db = Database::getInstance();
    $conn = $db->getConnection();
    $results['tests']['connection'] = [
        'status' => 'SUCCESS',
        'message' => 'Database connected'
    ];
    
    // Test 2: Check what tables exist
    $stmt = $conn->query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    $results['tests']['tables'] = [
        'status' => count($tables) > 0 ? 'SUCCESS' : 'WARNING',
        'count' => count($tables),
        'list' => $tables
    ];
    
    // Test 3: Check if user table exists and has data
    if (in_array('user', $tables)) {
        $stmt = $conn->query('SELECT COUNT(*) as count FROM "user"');
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
    
    // Test 4: Check if session table exists
    if (in_array('session', $tables)) {
        $results['tests']['session_table'] = [
            'status' => 'SUCCESS',
            'message' => 'Session table exists'
        ];
    } else {
        $results['tests']['session_table'] = [
            'status' => 'FAILED',
            'message' => 'Session table does not exist - LOGIN WILL FAIL'
        ];
    }
    
    // Test 5: Check if industry table exists and has data
    if (in_array('industry', $tables)) {
        $stmt = $conn->query('SELECT COUNT(*) as count FROM industry');
        $industryCount = $stmt->fetch()['count'];
        $results['tests']['industry_table'] = [
            'status' => $industryCount > 0 ? 'SUCCESS' : 'WARNING',
            'count' => $industryCount,
            'message' => $industryCount > 0 ? 'Industry table has data' : 'Industry table is empty - DROPDOWNS WILL BE EMPTY'
        ];
    } else {
        $results['tests']['industry_table'] = [
            'status' => 'FAILED',
            'message' => 'Industry table does not exist - DROPDOWNS WILL BE EMPTY'
        ];
    }
    
    // Test 6: Check if service table exists and has data
    if (in_array('service', $tables)) {
        $stmt = $conn->query('SELECT COUNT(*) as count FROM service');
        $serviceCount = $stmt->fetch()['count'];
        $results['tests']['service_table'] = [
            'status' => $serviceCount > 0 ? 'SUCCESS' : 'WARNING',
            'count' => $serviceCount,
            'message' => $serviceCount > 0 ? 'Service table has data' : 'Service table is empty - DROPDOWNS WILL BE EMPTY'
        ];
    } else {
        $results['tests']['service_table'] = [
            'status' => 'FAILED',
            'message' => 'Service table does not exist - DROPDOWNS WILL BE EMPTY'
        ];
    }
    
    // Overall status
    $failed = array_filter($results['tests'], fn($t) => $t['status'] === 'FAILED');
    $results['overall'] = count($failed) > 0 ? 'FAILED' : 'SUCCESS';
    $results['summary'] = count($failed) > 0 
        ? 'Database needs setup - run postgresql_schema.sql in pgAdmin' 
        : 'Database is ready';
    
} catch (Exception $e) {
    $results['tests']['connection'] = [
        'status' => 'FAILED',
        'error' => $e->getMessage()
    ];
    $results['overall'] = 'FAILED';
    $results['summary'] = 'Cannot connect to database';
}

echo json_encode($results, JSON_PRETTY_PRINT);
