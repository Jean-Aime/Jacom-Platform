<?php
require_once __DIR__ . '/../config/database.php';

$db = Database::getInstance();
$conn = $db->getConnection();

echo "=== Checking Expert Table ===\n\n";

// Check if type column exists
try {
    $stmt = $conn->query("SHOW COLUMNS FROM expert LIKE 'type'");
    $result = $stmt->fetch();
    if ($result) {
        echo "✓ Type column exists\n\n";
    } else {
        echo "✗ Type column does NOT exist\n\n";
    }
} catch (Exception $e) {
    echo "✗ Error checking column: " . $e->getMessage() . "\n\n";
}

// Get all experts
try {
    $stmt = $conn->query("SELECT id, name, slug, role, type, status FROM expert ORDER BY name");
    $experts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Total experts in database: " . count($experts) . "\n\n";
    
    if (count($experts) > 0) {
        echo "ID\t\tName\t\t\tSlug\t\t\tType\t\tStatus\n";
        echo str_repeat("-", 100) . "\n";
        foreach ($experts as $expert) {
            printf("%-15s %-25s %-25s %-10s %-10s\n", 
                $expert['id'], 
                $expert['name'], 
                $expert['slug'], 
                $expert['type'] ?? 'NULL',
                $expert['status']
            );
        }
    } else {
        echo "No experts found in database!\n";
    }
} catch (Exception $e) {
    echo "✗ Error fetching experts: " . $e->getMessage() . "\n";
}
