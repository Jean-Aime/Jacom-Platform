<?php
// Generate password hash for Jacom123@
$password = 'Jacom123@';
$hash = password_hash($password, PASSWORD_BCRYPT);
echo "Password: $password\n";
echo "Hash: $hash\n";
