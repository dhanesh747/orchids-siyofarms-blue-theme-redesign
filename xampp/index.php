<?php
require_once 'includes/config.php';
$pageTitle = '';
$db = getDB();

// Fetch featured products
$result = $db->query("SELECT * FROM products WHERE featured=1 AND in_stock=1 ORDER BY id ASC LIMIT 8");
$featured = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch all in-stock products for sections
$milkRes = $db->query("SELECT * FROM products WHERE category_slug='milk' AND in_stock=1 ORDER BY featured DESC LIMIT 4");
$milk = $milkRes ? $milkRes->fetch_all(MYSQLI_ASSOC) : [];

$gheeRes = $db->query("SELECT * FROM products WHERE category_slug IN('ghee','paneer-curd') AND in_stock=1 ORDER BY featured DESC LIMIT 4");
$ghee = $gheeRes ? $gheeRes->fetch_all(MYSQLI_ASSOC) : [];

$subRes = $db->query("SELECT * FROM products WHERE category_slug='subscriptions' AND in_stock=1 ORDER BY id ASC LIMIT 2");
$subscriptions = $subRes ? $subRes->fetch_all(MYSQLI_ASSOC) : [];

include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="hero-section">
  <div class="hero-content">
    <div>
      <div class="hero-badge">
        <span>🌿</span> FARM TO DOORSTEP
      </div>
      <h1 class="hero-title">
        Pure Dairy<br><span>Delivered Fresh</span><br>Every Morning
      </h1>
      <p class="hero-desc">
        A2 Gir cow milk, bilona ghee, fresh paneer and more — straight from our farm to your family. No preservatives. No hormones. Just pure goodness.
      </p>
      <div class="hero-btns">
        <a href="<?= SITE_URL ?>/products.php" class="btn-primary">Shop Now →</a>
        <a href="<?= SITE_URL ?>/about.php" class="btn-outline">Our Story</a>
      </div>
    </div>
    <div class="hero-emoji-grid">
      <div class="hero-emoji-card"><span class="emoji">🐄</span><span class="name">A2 Gir Milk</span><span class="price">₹75 / 500ml</span></div>
      <div class="hero-emoji-card"><span class="emoji">🫙</span><span class="name">Bilona Ghee</span><span class="price">₹850 / 500g</span></div>
      <div class="hero-emoji-card"><span class="emoji">🧀</span><span class="name">Fresh Paneer</span><span class="price">₹120 / 200g</span></div>
      <div class="hero-emoji-card"><span class="emoji">🏺</span><span class="name">Homestyle Dahi</span><span class="price">₹60 / 400g</span></div>
      <div class="hero-emoji-card"><span class="emoji">🧈</span><span class="name">White Butter</span><span class="price">₹200 / 200g</span></div>
      <div class="hero-emoji-card"><span class="emoji">📅</span><span class="name">Subscription</span><span class="price">From ₹1800</span></div>
    </div>
  </div>
</section>

<!-- Trust Badges -->
<div style="background:#f9fafb;border-bottom:1px solid #e5e5e5;">
  <div style="max-width:1200px;margin:0 auto;padding:16px 24px;display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:center;">
    <?php foreach([
      ['🥛','100% Natural'],['🌿','No Preservatives'],['🚚','Daily Delivery'],['💯','Quality Tested'],['🐄','A2 Certified']
    ] as $b): ?>
    <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#4d4d4d;">
      <span style="font-size:18px;"><?= $b[0] ?></span><?= $b[1] ?>
    </div>
    <?php endforeach; ?>
  </div>
</div>

<!-- Featured Products -->
<?php if (!empty($featured)): ?>
<section class="section">
  <div class="section-inner">
    <div class="section-header">
      <h2 class="section-title">Our Speciality Products</h2>
      <p class="section-sub">Hand-picked dairy products from our farm — pure, fresh, and nutritious</p>
    </div>
    <div class="products-grid">
      <?php foreach($featured as $p): ?>
        <?php include '_product_card.php'; ?>
      <?php endforeach; ?>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="<?= SITE_URL ?>/products.php" style="display:inline-block;border:2px solid #003399;color:#003399;padding:12px 32px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;transition:all 0.15s;" onmouseover="this.style.background='#003399';this.style.color='#fff';" onmouseout="this.style.background='';this.style.color='#003399';">
        View All Products →
      </a>
    </div>
  </div>
</section>
<?php endif; ?>

<div style="max-width:1200px;margin:0 auto;padding:0 24px;"><div style="border-top:1px solid #e5e5e5;"></div></div>

<!-- Milk Section -->
<?php if (!empty($milk)): ?>
<section class="section">
  <div class="section-inner">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:12px;">
      <div>
        <h2 class="section-title">🥛 Nutrition-Rich Milk</h2>
        <p style="font-size:15px;color:#4d4d4d;">Fresh milk varieties for every need — A2, buffalo, lactose-free and more</p>
      </div>
      <a href="<?= SITE_URL ?>/products.php?category=milk" style="font-size:13px;font-weight:700;color:#003399;">View all milk →</a>
    </div>
    <div class="products-grid">
      <?php foreach($milk as $p): ?>
        <?php include '_product_card.php'; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- Ghee & Dairy Section -->
<?php if (!empty($ghee)): ?>
<section class="section" style="background:#f9fafb;">
  <div class="section-inner">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:12px;">
      <div>
        <h2 class="section-title">🫙 Ghee & Exquisite Dairy</h2>
        <p style="font-size:15px;color:#4d4d4d;">Traditional bilona ghee, fresh paneer, creamy dahi and more</p>
      </div>
      <a href="<?= SITE_URL ?>/products.php?category=ghee" style="font-size:13px;font-weight:700;color:#003399;">View all →</a>
    </div>
    <div class="products-grid">
      <?php foreach($ghee as $p): ?>
        <?php include '_product_card.php'; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- Subscription Section -->
<?php if (!empty($subscriptions)): ?>
<section class="subscription-section">
  <div class="section-inner">
    <div class="section-header">
      <h2 style="font-size:32px;font-weight:900;color:#fff;margin-bottom:8px;">📅 Subscribe & Save</h2>
      <p style="font-size:15px;color:rgba(255,255,255,0.75);">Get fresh dairy delivered to your doorstep every single morning. Cancel anytime.</p>
    </div>
    <div class="sub-cards">
      <?php foreach($subscriptions as $p): ?>
      <div class="sub-card<?= $p['featured'] ? ' featured' : '' ?>">
        <?php if($p['badge']): ?>
        <div class="sub-badge"><?= sanitize($p['badge']) ?></div>
        <?php endif; ?>
        <span class="emoji"><?= $p['emoji'] ?></span>
        <h3><?= sanitize($p['name']) ?></h3>
        <p class="desc"><?= sanitize($p['description']) ?></p>
        <div class="price">₹<?= number_format($p['price'],0) ?><?php if($p['original_price']): ?><span>₹<?= number_format($p['original_price'],0) ?></span><?php endif; ?></div>
        <div class="period"><?= sanitize($p['unit']) ?></div>
        <a href="<?= SITE_URL ?>/product.php?slug=<?= urlencode($p['slug']) ?>" class="btn-sub">Subscribe Now →</a>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- Newsletter / CTA -->
<section class="section">
  <div class="section-inner" style="text-align:center;max-width:700px;margin:0 auto;">
    <h2 class="section-title">Stay in the Loop</h2>
    <p style="font-size:15px;color:#4d4d4d;margin-bottom:28px;">
      Get notified about new products, seasonal specials, and exclusive offers.
    </p>
    <form onsubmit="event.preventDefault();showToast('Thank you! We will be in touch soon.','success');this.reset();" style="display:flex;gap:12px;max-width:480px;margin:0 auto;flex-wrap:wrap;">
      <input type="email" placeholder="Enter your email" required style="flex:1;min-width:200px;padding:14px 20px;border:1px solid #e5e5e5;border-radius:4px;font-size:14px;outline:none;">
      <button type="submit" style="background:#003399;color:#fff;padding:14px 28px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;border:none;cursor:pointer;">Subscribe</button>
    </form>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
