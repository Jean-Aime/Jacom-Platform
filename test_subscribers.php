<!DOCTYPE html>
<html>
<head>
    <title>Subscriber Test</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .success { color: green; }
        .error { color: red; }
        pre { background: #f5f5f5; padding: 10px; }
    </style>
</head>
<body>
    <h1>Subscriber Table Test</h1>
    <?php
    require_once __DIR__ . '/backend/config/database.php';

    try {
        $db = Database::getInstance();
        $conn = $db->getConnection();
        
        // Create table if not exists
        $sql = file_get_contents(__DIR__ . '/backend/migrations/create_subscribers.sql');
        $conn->exec($sql);
        echo "<p class='success'>✓ Table created/verified</p>";
        
        // Check if table has data
        $stmt = $conn->query("SELECT COUNT(*) as count FROM subscriber");
        $count = $stmt->fetch()['count'];
        echo "<p>Current subscribers: <strong>$count</strong></p>";
        
        // Add test data if empty
        if ($count == 0) {
            $testEmails = ['test1@example.com', 'test2@example.com', 'test3@example.com'];
            foreach ($testEmails as $email) {
                $id = 'sub_' . bin2hex(random_bytes(12));
                $stmt = $conn->prepare("INSERT INTO subscriber (id, email, status) VALUES (?, ?, 'active')");
                $stmt->execute([$id, $email]);
            }
            echo "<p class='success'>✓ Added 3 test subscribers</p>";
        }
        
        // Fetch all subscribers
        $stmt = $conn->query("SELECT * FROM subscriber ORDER BY createdAt DESC");
        $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo "<h2>All Subscribers:</h2>";
        echo "<pre>" . json_encode($subscribers, JSON_PRETTY_PRINT) . "</pre>";
        
        echo "<p><a href='http://localhost:3000/admin/subscribers'>Go to Admin Subscribers Page</a></p>";
        
    } catch (Exception $e) {
        echo "<p class='error'>✗ Error: " . htmlspecialchars($e->getMessage()) . "</p>";
        echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
    }
    ?>
</body>
</html>
