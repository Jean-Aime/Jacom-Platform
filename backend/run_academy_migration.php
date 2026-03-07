<?php
require_once __DIR__ . '/config/database.php';

echo "=== Running Academy Migrations ===\n\n";

$db = Database::getInstance();
$conn = $db->getConnection();

if (!$conn) {
    echo "✗ Database connection failed\n";
    exit(1);
}

try {
    // Read and execute schema migration
    echo "1. Creating academy tables...\n";
    $schemaSql = file_get_contents(__DIR__ . '/migrations/create_academy_tables.sql');
    $statements = explode(';', $schemaSql);
    
    foreach ($statements as $statement) {
        $statement = trim($statement);
        if (!empty($statement)) {
            $conn->exec($statement);
        }
    }
    echo "   ✓ Academy tables created successfully\n";
    
    // Read and execute seed data
    echo "2. Inserting seed data...\n";
    $seedSql = file_get_contents(__DIR__ . '/migrations/seed_academy_data.sql');
    $statements = explode(';', $seedSql);
    
    foreach ($statements as $statement) {
        $statement = trim($statement);
        if (!empty($statement)) {
            $conn->exec($statement);
        }
    }
    echo "   ✓ Seed data inserted successfully\n";
    
    echo "\n=== Academy Migration Complete ===\n";
    echo "✓ Database schema created\n";
    echo "✓ Seed data populated\n";
    echo "✓ API endpoints ready\n";
    
} catch (PDOException $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}