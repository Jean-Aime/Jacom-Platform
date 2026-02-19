<?php
require_once __DIR__ . '/backend/config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    $sql = file_get_contents(__DIR__ . '/backend/migrations/create_subscribers.sql');
    $conn->exec($sql);
    
    echo "✓ Subscriber table created successfully\n";
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
}
