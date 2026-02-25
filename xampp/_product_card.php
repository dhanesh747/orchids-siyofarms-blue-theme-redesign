<?php
// _product_card.php — shared product card partial
// Expects $p array with product data and SITE_URL constant
?>
<div class="product-card-wrap" data-cat="<?= htmlspecialchars($p['category_slug']) ?>" data-name="<?= htmlspecialchars($p['name']) ?>" data-desc="<?= htmlspecialchars($p['description']) ?>">
  <div class="product-card<?= !$p['in_stock'] ? ' out-of-stock' : '' ?>">
    <div class="product-card-img">
      <span style="font-size:72px;"><?= $p['emoji'] ?></span>
      <?php if ($p['badge']): ?>
        <span class="product-badge <?= strtolower($p['badge']) === 'sale' ? 'sale' : (strtolower($p['badge']) === 'new' ? 'new' : (strtolower($p['badge']) === 'probiotic' ? 'probiotic' : '')) ?>">
          <?= sanitize($p['badge']) ?>
        </span>
      <?php endif; ?>
    </div>
    <div class="product-card-body">
      <a href="<?= SITE_URL ?>/product.php?slug=<?= urlencode($p['slug']) ?>" style="display:block;">
        <div class="product-name"><?= sanitize($p['name']) ?></div>
        <div class="product-unit"><?= sanitize($p['unit']) ?></div>
        <div class="product-desc"><?= sanitize($p['description']) ?></div>
      </a>
      <div class="product-footer">
        <div>
          <span class="product-price">₹<?= number_format($p['price'], 0) ?></span>
          <?php if ($p['original_price']): ?>
            <span class="product-price-orig">₹<?= number_format($p['original_price'], 0) ?></span>
          <?php endif; ?>
        </div>
        <?php if ($p['in_stock']): ?>
          <button class="btn-add-cart"
            onclick="addToCart('<?= $p['id'] ?>','<?= addslashes($p['name']) ?>','<?= $p['price'] ?>','<?= addslashes($p['emoji']) ?>','<?= addslashes($p['unit']) ?>')">
            Add
          </button>
        <?php else: ?>
          <button class="btn-add-cart" disabled>Out of Stock</button>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>
