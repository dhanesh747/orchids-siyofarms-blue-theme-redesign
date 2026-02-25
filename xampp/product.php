<?php
require_once 'includes/config.php';

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if (!$slug) { header('Location: ' . SITE_URL . '/products.php'); exit; }

$db = getDB();
$slug_esc = $db->real_escape_string($slug);
$result = $db->query("SELECT * FROM products WHERE slug = '$slug_esc' LIMIT 1");
if (!$result || $result->num_rows === 0) { header('Location: ' . SITE_URL . '/products.php'); exit; }
$p = $result->fetch_assoc();

$pageTitle = $p['name'];

// Related products (same category, different product)
$catSlug = $db->real_escape_string($p['category_slug']);
$relResult = $db->query("SELECT * FROM products WHERE category_slug='$catSlug' AND slug != '$slug_esc' AND in_stock=1 LIMIT 4");
$related = $relResult ? $relResult->fetch_all(MYSQLI_ASSOC) : [];

$benefits = array_filter(array_map('trim', explode('|', $p['benefits'] ?? '')));

include 'includes/header.php';
?>

<div style="max-width:1200px;margin:0 auto;padding:48px 24px;">
  <!-- Breadcrumb -->
  <div style="font-size:13px;color:#4d4d4d;margin-bottom:28px;">
    <a href="<?= SITE_URL ?>" style="color:#003399;">Home</a> /
    <a href="<?= SITE_URL ?>/products.php" style="color:#003399;">Products</a> /
    <a href="<?= SITE_URL ?>/products.php?category=<?= urlencode($p['category_slug']) ?>" style="color:#003399;"><?= sanitize($p['category']) ?></a> /
    <span><?= sanitize($p['name']) ?></span>
  </div>

  <div class="product-detail-grid">
    <!-- Product Image -->
    <div>
      <div class="product-detail-img">
        <span><?= $p['emoji'] ?></span>
        <?php if ($p['badge']): ?>
          <div class="product-badge" style="position:absolute;top:16px;left:16px;font-size:12px;padding:6px 12px;">
            <?= sanitize($p['badge']) ?>
          </div>
        <?php endif; ?>
      </div>
      <?php if (!empty($benefits)): ?>
      <div class="benefits-list" style="margin-top:16px;">
        <?php foreach ($benefits as $b): ?>
          <span class="benefit-tag">✓ <?= sanitize($b) ?></span>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>
    </div>

    <!-- Product Info -->
    <div>
      <div style="font-size:12px;font-weight:700;color:#003399;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">
        <?= sanitize($p['category']) ?>
      </div>
      <h1 class="product-detail-title"><?= sanitize($p['name']) ?></h1>
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:20px;">
        <span class="product-detail-price">₹<?= number_format($p['price'], 0) ?></span>
        <?php if ($p['original_price']): ?>
          <span style="font-size:18px;color:#4d4d4d;text-decoration:line-through;">₹<?= number_format($p['original_price'], 0) ?></span>
          <span style="background:#dcfce7;color:#15803d;font-size:12px;font-weight:700;padding:4px 10px;border-radius:4px;">
            SAVE <?= round((1 - $p['price']/$p['original_price'])*100) ?>%
          </span>
        <?php endif; ?>
      </div>
      <div style="font-size:13px;color:#4d4d4d;margin-bottom:20px;">Per <?= sanitize($p['unit']) ?></div>

      <p class="product-detail-desc"><?= sanitize($p['long_description'] ?: $p['description']) ?></p>

      <?php if ($p['in_stock']): ?>
        <!-- Quantity Selector -->
        <div class="quantity-row">
          <span style="font-size:13px;font-weight:700;color:#1a1a1a;">Quantity:</span>
          <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
          <span class="qty-val" id="detailQty">1</span>
          <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
        </div>

        <!-- Add to Cart Button -->
        <button class="btn-add-cart-lg" id="addDetailBtn"
          data-id="<?= $p['id'] ?>"
          data-name="<?= htmlspecialchars(addslashes($p['name'])) ?>"
          data-price="<?= $p['price'] ?>"
          data-emoji="<?= htmlspecialchars($p['emoji']) ?>"
          data-unit="<?= htmlspecialchars($p['unit']) ?>"
          onclick="addDetailToCart()">
          🛒 Add to Cart
        </button>

        <a href="<?= SITE_URL ?>/cart.php" style="display:block;text-align:center;border:2px solid #003399;color:#003399;padding:14px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;transition:all 0.15s;"
          onmouseover="this.style.background='#003399';this.style.color='#fff';"
          onmouseout="this.style.background='';this.style.color='#003399';">
          View Cart →
        </a>

        <div style="display:flex;gap:16px;margin-top:16px;flex-wrap:wrap;">
          <span style="font-size:12px;color:#4d4d4d;">🚚 Free delivery above ₹500</span>
          <span style="font-size:12px;color:#4d4d4d;">⏰ Order before 10 PM</span>
          <span style="font-size:12px;color:#4d4d4d;">🌅 Delivered by 8 AM</span>
        </div>
      <?php else: ?>
        <div style="background:#fee2e2;border:1px solid #fca5a5;color:#cc0000;padding:16px;border-radius:8px;font-size:14px;font-weight:600;margin-top:16px;">
          ❌ Currently out of stock. Check back soon!
        </div>
      <?php endif; ?>
    </div>
  </div>

  <!-- Related Products -->
  <?php if (!empty($related)): ?>
  <div style="margin-top:64px;">
    <h2 style="font-size:24px;font-weight:900;margin-bottom:24px;">You Might Also Like</h2>
    <div class="products-grid">
      <?php foreach ($related as $p): ?>
        <?php include '_product_card.php'; ?>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; ?>
</div>

<script>
// Initialize quantity correctly for this product
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('addDetailBtn');
  if (btn) {
    // Override addDetailToCart to use detailQty correctly
    window.addDetailToCart = function() {
      var id = btn.dataset.id;
      var name = btn.dataset.name;
      var price = btn.dataset.price;
      var emoji = btn.dataset.emoji;
      var unit = btn.dataset.unit;
      var cart = getCart();
      var idx = cart.findIndex(function(c) { return c.id == id; });
      if (idx >= 0) {
        cart[idx].quantity = (cart[idx].quantity || 1) + detailQty;
      } else {
        cart.push({ id: id, name: name, price: parseFloat(price), emoji: emoji, unit: unit, quantity: detailQty });
      }
      saveCart(cart);
      showToast(name + ' × ' + detailQty + ' added to cart!', 'success');
    };
  }
});
</script>

<?php include 'includes/footer.php'; ?>
