<?php
require_once __DIR__ . '/config/database.php';

echo "=== Running Security Migration ===\n\n";

$db = Database::getInstance();
$conn = $db->getConnection();

if (!$conn) {
    echo "✗ Database connection failed\n";
    exit(1);
}

try {
    // Add security columns to user table
    echo "1. Adding security columns to user table...\n";
    $conn->exec("ALTER TABLE `user` 
                 ADD COLUMN `failed_attempts` INT DEFAULT 0,
                 ADD COLUMN `locked_until` DATETIME NULL");
    echo "   ✓ Security columns added to user table\n";
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column') !== false) {
        echo "   ℹ Security columns already exist in user table\n";
    } else {
        echo "   ✗ Error adding user columns: " . $e->getMessage() . "\n";
    }
}

try {
    // Add security columns to session table
    echo "2. Adding security columns to session table...\n";
    $conn->exec("ALTER TABLE `session` 
                 ADD COLUMN `ipAddress` VARCHAR(45) NULL,
                 ADD COLUMN `userAgent` TEXT NULL");
    echo "   ✓ Security columns added to session table\n";
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column') !== false) {
        echo "   ℹ Security columns already exist in session table\n";
    } else {
        echo "   ✗ Error adding session columns: " . $e->getMessage() . "\n";
    }
}

echo "\n=== Security Migration Complete ===\n";