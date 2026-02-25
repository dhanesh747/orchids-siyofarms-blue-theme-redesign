<?php
// includes/header.php - Shared site header
$announcement = getSetting('announcement', 'Free delivery on orders above ₹500 | Fresh dairy every morning');
$cartCount = getCartCount();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= isset($pageTitle) ? sanitize($pageTitle) . ' | ' : '' ?>Siyo Farms - Pure Dairy Delivered Fresh</title>
<meta name="description" content="Siyo Farms - 100% pure dairy products. A2 cow milk, bilona ghee, fresh paneer, dahi and more delivered daily.">
<link rel="stylesheet" href="<?= SITE_URL ?>/assets/css/style.css">
</head>
<body>

<!-- Announcement Bar -->
<div class="announcement-bar">
  <span><?= sanitize($announcement) ?></span>
</div>

<!-- Header -->
<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <a href="<?= SITE_URL ?>" class="logo">
      <span class="logo-icon">🐄</span>
      <div>
        <span class="logo-name">SIYO FARMS</span>
        <span class="logo-tagline">Pure Dairy Daily</span>
      </div>
    </a>

    <nav class="main-nav">
      <a href="<?= SITE_URL ?>">Home</a>
      <a href="<?= SITE_URL ?>/products.php">Products</a>
      <a href="<?= SITE_URL ?>/products.php?category=milk">Milk</a>
      <a href="<?= SITE_URL ?>/products.php?category=ghee">Ghee</a>
      <a href="<?= SITE_URL ?>/products.php?category=paneer-curd">Paneer &amp; Curd</a>
      <a href="<?= SITE_URL ?>/about.php">About</a>
      <a href="<?= SITE_URL ?>/contact.php">Contact</a>
    </nav>

    <div class="header-actions">
      <a href="<?= SITE_URL ?>/orders.php" class="icon-btn" title="My Orders">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      </a>
      <a href="<?= SITE_URL ?>/cart.php" class="cart-btn">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        <?php if ($cartCount > 0): ?>
        <span class="cart-count"><?= $cartCount ?></span>
        <?php endif; ?>
      </a>
      <button class="hamburger" onclick="toggleMobileNav()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Mobile Nav -->
  <div class="mobile-nav" id="mobileNav">
    <a href="<?= SITE_URL ?>">Home</a>
    <a href="<?= SITE_URL ?>/products.php">All Products</a>
    <a href="<?= SITE_URL ?>/products.php?category=milk">🥛 Milk</a>
    <a href="<?= SITE_URL ?>/products.php?category=ghee">🫙 Ghee</a>
    <a href="<?= SITE_URL ?>/products.php?category=paneer-curd">🧀 Paneer &amp; Curd</a>
    <a href="<?= SITE_URL ?>/about.php">About Us</a>
    <a href="<?= SITE_URL ?>/contact.php">Contact</a>
    <a href="<?= SITE_URL ?>/orders.php">My Orders</a>
  </div>
</header>
