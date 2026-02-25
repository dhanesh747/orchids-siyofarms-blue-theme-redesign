<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once 'auth.php';

if ($_GET['action'] ?? '' === 'logout') {
    adminLogout();
    header('Location: ' . ADMIN_URL . '/login.php');
    exit;
}

requireAdminLogin();

// Admin layout header
function adminHeader($activePage = 'dashboard') {
    $nav = [
        ['index.php', '📊', 'Dashboard', 'dashboard'],
        ['orders.php', '📦', 'Orders', 'orders'],
        ['payments.php', '💳', 'Payments', 'payments'],
        ['products.php', '🥛', 'Products', 'products'],
        ['settings.php', '⚙️', 'Settings', 'settings'],
    ];
    ?>
    <div class="admin-sidebar">
      <div class="admin-logo">
        <div class="brand">🐄 SIYO FARMS</div>
        <div class="role">Admin Panel</div>
      </div>
      <nav class="admin-nav">
        <?php foreach ($nav as $item): ?>
        <a href="<?= ADMIN_URL ?>/<?= $item[0] ?>" class="<?= $activePage === $item[3] ? 'active' : '' ?>">
          <span class="icon"><?= $item[1] ?></span> <?= $item[2] ?>
        </a>
        <?php endforeach; ?>
      </nav>
      <div style="padding:16px 12px;border-top:1px solid #e5e5e5;margin-top:auto;">
        <a href="<?= SITE_URL ?>" style="display:flex;align-items:center;gap:8px;font-size:12px;color:#4d4d4d;font-weight:600;padding:8px 12px;border-radius:6px;transition:all 0.15s;" onmouseover="this.style.background='#f4f7ff';" onmouseout="this.style.background='';">
          🔗 View Store
        </a>
        <a href="<?= ADMIN_URL ?>/layout.php?action=logout" style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cc0000;font-weight:600;padding:8px 12px;border-radius:6px;transition:all 0.15s;" onmouseover="this.style.background='#fee2e2';" onmouseout="this.style.background='';">
          🚪 Logout
        </a>
      </div>
    </div>
    <?php
}
?>
