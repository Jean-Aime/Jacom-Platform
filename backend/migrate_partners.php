<?php
require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    // Check if table exists
    $check = $conn->query("SHOW TABLES LIKE 'partner_logo'");
    if ($check->rowCount() > 0) {
        echo "✓ Table already exists!\n";
    } else {
        // Create table
        $conn->exec("
            CREATE TABLE partner_logo (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                logo VARCHAR(500) NOT NULL,
                website VARCHAR(500),
                displayOrder INT DEFAULT 0,
                status ENUM('active', 'inactive') DEFAULT 'active',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_partner_logo_order (displayOrder, status)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        echo "✓ Partner logos table created successfully!\n";
    }
    
    // Check if sample data exists
    $checkData = $conn->query("SELECT COUNT(*) as count FROM partner_logo");
    $count = $checkData->fetch()['count'];
    
    if ($count == 0) {
        // Insert sample data
        $stmt = $conn->prepare("
            INSERT INTO partner_logo (id, name, logo, website, displayOrder, status)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        $samplePartners = [
            ['ptr1', 'Partner 1', 'https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+1', 'https://example.com', 1, 'active'],
            ['ptr2', 'Partner 2', 'https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+2', 'https://example.com', 2, 'active'],
            ['ptr3', 'Partner 3', 'https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+3', 'https://example.com', 3, 'active']
        ];
        
        foreach ($samplePartners as $partner) {
            $stmt->execute($partner);
        }
        
        echo "✓ Sample partner data inserted!\n";
    } else {
        echo "✓ Sample data already exists ($count partners)\n";
    }
    
    echo "\nMigration completed successfully!\n";
    
} catch (Exception $e) {
    echo "✗ Migration failed: " . $e->getMessage() . "\n";
}
