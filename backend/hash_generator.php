<?php
// Generate and test password hash
$password = 'Jacom123@';
$hash = password_hash($password, PASSWORD_BCRYPT);

echo "<h2>Password Hash Generator</h2>";
echo "<p><strong>Password:</strong> $password</p>";
echo "<p><strong>Generated Hash:</strong></p>";
echo "<textarea style='width:100%;height:100px'>$hash</textarea>";

// Test verification
$verify = password_verify($password, $hash);
echo "<p><strong>Verification Test:</strong> " . ($verify ? "✓ SUCCESS" : "✗ FAILED") . "</p>";

// SQL to run
echo "<h3>Run this SQL in phpMyAdmin:</h3>";
echo "<textarea style='width:100%;height:150px'>";
echo "DELETE FROM `user` WHERE email IN ('admin@example.com', 'admin@jacom.com');\n\n";
echo "INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES\n";
echo "('usr_admin', 'admin@jacom.com', '$hash', 'JACOM Admin', 'admin', NOW(), NOW());";
echo "</textarea>";
?>
