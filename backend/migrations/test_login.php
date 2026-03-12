<?php
/**
 * Test Login Functionality
 * This script tests if the password verification is working correctly
 */

require_once __DIR__ . '/../config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    if (!$conn) {
        die("Database connection failed\n");
    }
    
    $email = 'sarah.johnson@email.com';
    $password = 'Student123!';
    
    echo "Testing login for: {$email}\n";
    echo "Password: {$password}\n\n";
    
    // Get user from database
    $stmt = $conn->prepare("SELECT id, email, name, password, failed_attempts, locked_until FROM user WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        die("ERROR: User not found in database\n");
    }
    
    echo "User found:\n";
    echo "  ID: {$user['id']}\n";
    echo "  Name: {$user['name']}\n";
    echo "  Email: {$user['email']}\n";
    echo "  Failed Attempts: {$user['failed_attempts']}\n";
    echo "  Locked Until: " . ($user['locked_until'] ?? 'NULL') . "\n";
    echo "  Password Hash: " . substr($user['password'], 0, 50) . "...\n\n";
    
    // Test password verification
    echo "Testing password_verify()...\n";
    $verified = password_verify($password, $user['password']);
    
    if ($verified) {
        echo "✓ SUCCESS! Password verification passed\n";
        echo "✓ Login should work\n\n";
        
        // Test generating a new hash
        echo "Generating new hash for comparison...\n";
        $newHash = password_hash($password, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536,
            'time_cost' => 4,
            'threads' => 3
        ]);
        echo "New hash: " . substr($newHash, 0, 50) . "...\n";
        echo "Stored hash: " . substr($user['password'], 0, 50) . "...\n";
        
    } else {
        echo "✗ FAILED! Password verification failed\n";
        echo "✗ This is why login is not working\n\n";
        
        // Debug information
        echo "Debugging information:\n";
        echo "  Password algorithm: " . password_get_info($user['password'])['algoName'] . "\n";
        echo "  Password needs rehash: " . (password_needs_rehash($user['password'], PASSWORD_ARGON2ID) ? 'YES' : 'NO') . "\n";
        
        // Try to generate a working hash
        echo "\nGenerating a new working hash...\n";
        $newHash = password_hash($password, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536,
            'time_cost' => 4,
            'threads' => 3
        ]);
        
        echo "New hash generated: " . substr($newHash, 0, 50) . "...\n";
        
        // Verify the new hash works
        if (password_verify($password, $newHash)) {
            echo "✓ New hash verification: SUCCESS\n";
            echo "\nUpdating database with working hash...\n";
            
            $updateStmt = $conn->prepare("UPDATE user SET password = ? WHERE email = ?");
            $updateStmt->execute([$newHash, $email]);
            
            echo "✓ Database updated! Try logging in again.\n";
        } else {
            echo "✗ New hash verification: FAILED\n";
            echo "This is a PHP configuration issue\n";
        }
    }
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
