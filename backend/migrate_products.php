<?php
require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    // Check if table exists
    $check = $conn->query("SHOW TABLES LIKE 'product'");
    if ($check->rowCount() > 0) {
        echo "✓ Product table already exists!\n";
        
        // Check if has data
        $checkData = $conn->query("SELECT COUNT(*) as count FROM product");
        $count = $checkData->fetch()['count'];
        echo "✓ Found $count products in database\n";
    } else {
        // Read and execute migration
        $sql = file_get_contents(__DIR__ . '/migrations/create_products_table.sql');
        
        // Split by semicolon and execute each statement
        $statements = array_filter(array_map('trim', explode(';', $sql)));
        
        foreach ($statements as $statement) {
            if (!empty($statement)) {
                $conn->exec($statement);
            }
        }
        
        echo "✓ Product table created successfully!\n";
        echo "✓ Sample products inserted!\n";
    }
    
    echo "\nMigration completed successfully!\n";
    
} catch (Exception $e) {
    echo "✗ Migration failed: " . $e->getMessage() . "\n";
}
