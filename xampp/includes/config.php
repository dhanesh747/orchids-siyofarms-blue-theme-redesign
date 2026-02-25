<?php
// ============================================================
// Siyo Farms - Database Configuration
// Edit these values to match your XAMPP setup
// ============================================================

define('DB_HOST', 'localhost');
define('DB_USER', 'root');       // Default XAMPP MySQL username
define('DB_PASS', '');           // Default XAMPP MySQL password (empty)
define('DB_NAME', 'siyo_farms');

define('SITE_NAME', 'Siyo Farms');
define('SITE_URL', 'http://localhost/siyo_farms');
define('ADMIN_URL', SITE_URL . '/admin');

// ============================================================
// Database Connection
// ============================================================
function getDB() {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            die('<div style="font-family:sans-serif;padding:40px;background:#fff0f0;border:1px solid #cc0000;margin:20px;border-radius:8px;">
                <h2 style="color:#cc0000">Database Connection Error</h2>
                <p>Could not connect to MySQL. Please check:</p>
                <ol>
                    <li>XAMPP MySQL service is running (green in XAMPP Control Panel)</li>
                    <li>Database <strong>siyo_farms</strong> exists (import database.sql in phpMyAdmin)</li>
                    <li>DB credentials in <code>includes/config.php</code> are correct</li>
                </ol>
                <p style="color:#888;font-size:12px;">Error: ' . htmlspecialchars($conn->connect_error) . '</p>
            </div>');
        }
        $conn->set_charset('utf8mb4');
    }
    return $conn;
}

// ============================================================
// Helper Functions
// ============================================================
function getSetting($key, $default = '') {
    $db = getDB();
    $key = $db->real_escape_string($key);
    $result = $db->query("SELECT setting_value FROM settings WHERE setting_key = '$key' LIMIT 1");
    if ($result && $row = $result->fetch_assoc()) {
        return $row['setting_value'];
    }
    return $default;
}

function generateOrderId() {
    return 'ORD' . date('ymd') . strtoupper(substr(uniqid(), -5));
}

function formatPrice($price) {
    return '₹' . number_format($price, 0, '.', ',');
}

function sanitize($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

// ============================================================
// Session Start
// ============================================================
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Cart helper
function getCart() {
    return $_SESSION['cart'] ?? [];
}

function getCartTotal() {
    $total = 0;
    foreach (getCart() as $item) {
        $total += $item['price'] * $item['quantity'];
    }
    return $total;
}

function getCartCount() {
    $count = 0;
    foreach (getCart() as $item) {
        $count += $item['quantity'];
    }
    return $count;
}
?>
