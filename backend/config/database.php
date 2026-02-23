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
                $dbUrl = getenv('DATABASE_URL');
                if ($dbUrl) {
                    $this->conn = new PDO($dbUrl, null, null, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false
                    ]);
                } else {
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
                if (DEBUG) {
                    error_log("Connection error: " . $e->getMessage());
                }
                throw $e;
            }
        }
        return $this->conn;
    }
}
