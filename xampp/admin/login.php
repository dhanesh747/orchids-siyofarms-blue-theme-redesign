<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once 'auth.php';

if (adminIsLoggedIn()) {
    header('Location: ' . ADMIN_URL . '/index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    if (adminLogin($username, $password)) {
        header('Location: ' . ADMIN_URL . '/index.php');
        exit;
    } else {
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Login | Siyo Farms</title>
<link rel="stylesheet" href="<?= SITE_URL ?>/assets/css/style.css">
</head>
<body>

<div class="login-page">
  <div class="login-card">
    <div class="login-logo">
      <span class="icon">🐄</span>
      <div class="name">SIYO FARMS</div>
      <div class="sub">Admin Panel</div>
    </div>

    <?php if ($error): ?>
    <div class="login-error"><?= sanitize($error) ?></div>
    <?php endif; ?>

    <form method="POST">
      <div class="form-group">
        <label class="form-label">Username</label>
        <input type="text" name="username" class="form-input" placeholder="admin" required autofocus value="<?= htmlspecialchars($_POST['username'] ?? '') ?>">
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" name="password" class="form-input" placeholder="••••••••" required>
      </div>
      <button type="submit" class="login-btn">Login to Admin Panel</button>
    </form>

    <p style="text-align:center;font-size:12px;color:#4d4d4d;margin-top:20px;">
      Default: <strong>admin</strong> / <strong>siyo2024</strong>
    </p>
    <p style="text-align:center;margin-top:8px;">
      <a href="<?= SITE_URL ?>" style="font-size:12px;color:#003399;">← Back to Store</a>
    </p>
  </div>
</div>

<div id="toast"></div>
<script src="<?= SITE_URL ?>/assets/js/main.js"></script>
</body>
</html>
