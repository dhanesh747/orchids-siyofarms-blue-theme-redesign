<?php
// admin/auth.php — Admin authentication helper
require_once dirname(__DIR__) . '/includes/config.php';

define('ADMIN_SESSION_KEY', 'siyo_admin_logged_in');

function adminIsLoggedIn() {
    return !empty($_SESSION[ADMIN_SESSION_KEY]);
}

function requireAdminLogin() {
    if (!adminIsLoggedIn()) {
        header('Location: ' . ADMIN_URL . '/login.php');
        exit;
    }
}

function adminLogin($username, $password) {
    $db = getDB();
    $u = $db->real_escape_string(trim($username));
    $hash = md5($password); // Simple MD5 as per database setup
    $result = $db->query("SELECT id FROM admins WHERE username='$u' AND password_hash='$hash' LIMIT 1");
    if ($result && $result->num_rows > 0) {
        $_SESSION[ADMIN_SESSION_KEY] = true;
        $_SESSION['admin_username'] = $u;
        return true;
    }
    return false;
}

function adminLogout() {
    unset($_SESSION[ADMIN_SESSION_KEY]);
    unset($_SESSION['admin_username']);
}
?>
