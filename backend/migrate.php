<?php
require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance()->getConnection();
    
    if (!$db) {
        die("Database connection failed\n");
    }
    
    echo "Running migrations...\n";
    
    // Read and execute migration files
    $migrations = [
        'migrations/CRITICAL_FIX_DATABASE_SCHEMA.sql',
        'migrations/create_solutions_table.sql',
        'migrations/create_community_categories.sql',
        'migrations/case_studies.sql',
        'migrations/add_event_table.sql',
        'migrations/create_academy_tables.sql',
        'migrations/create_subscribers.sql'
    ];
    
    foreach ($migrations as $file) {
        if (file_exists(__DIR__ . '/' . $file)) {
            echo "Running $file...\n";
            $sql = file_get_contents(__DIR__ . '/' . $file);
            
            // Convert MySQL syntax to PostgreSQL
            $sql = str_replace('`', '"', $sql);
            $sql = str_replace('AUTO_INCREMENT', '', $sql);
            $sql = str_replace('ENGINE=InnoDB', '', $sql);
            $sql = str_replace('DEFAULT CHARSET=utf8mb4', '', $sql);
            $sql = preg_replace('/INT\(\d+\)/', 'INTEGER', $sql);
            $sql = preg_replace('/VARCHAR\((\d+)\)/', 'VARCHAR($1)', $sql);
            
            try {
                $db->exec($sql);
                echo "✓ $file completed\n";
            } catch (PDOException $e) {
                echo "⚠ $file: " . $e->getMessage() . "\n";
            }
        }
    }
    
    echo "\nMigrations completed!\n";
    
} catch (Exception $e) {
    die("Error: " . $e->getMessage() . "\n");
}
