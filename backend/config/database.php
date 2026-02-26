<?php
require_once __DIR__ . '/config.php';

class Database {
    private static $instance = null;
    private $conn = null;

    private function __construct() {}

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        if ($this->conn === null) {
            try {
                // Try multiple methods to get DATABASE_URL
                $dbUrl = null;
                if (function_exists('apache_getenv')) {
                    $dbUrl = apache_getenv('DATABASE_URL');
                }
                if (!$dbUrl) {
                    $dbUrl = getenv('DATABASE_URL');
                }
                if (!$dbUrl && isset($_SERVER['DATABASE_URL'])) {
                    $dbUrl = $_SERVER['DATABASE_URL'];
                }
                if (!$dbUrl && isset($_ENV['DATABASE_URL'])) {
                    $dbUrl = $_ENV['DATABASE_URL'];
                }
                
                error_log("DATABASE_URL found: " . ($dbUrl ? 'yes' : 'no'));
                
                if ($dbUrl) {
                    // PostgreSQL URL format: postgresql://user:pass@host:port/dbname
                    $this->conn = new PDO($dbUrl, null, null, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                        PDO::ATTR_TIMEOUT => 5
                    ]);
                    error_log("PostgreSQL connected successfully");
                } else {
                    error_log("No DATABASE_URL found, using MySQL fallback");
                    $this->conn = new PDO(
                        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
                        DB_USER,
                        DB_PASS,
                        [
                            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                            PDO::ATTR_EMULATE_PREPARES => false
                        ]
                    );
                }
            } catch(PDOException $e) {
                error_log("Database connection error: " . $e->getMessage());
                error_log("DATABASE_URL exists: " . ($dbUrl ?? 'no'));
                // Return null instead of throwing to allow CORS headers to be sent
                return null;
            }
        }
        return $this->conn;
    }
}
