<?php
require_once 'includes/config.php';
$pageTitle = 'Cart';
include 'includes/header.php';
?>

<div style="max-width:1200px;margin:0 auto;padding:40px 24px;">
  <h1 style="font-size:28px;font-weight:900;margin-bottom:24px;">Your Cart</h1>

  <!-- Empty State -->
  <div id="cartEmpty" class="orders-empty" style="display:none;">
    <div style="font-size:64px;margin-bottom:16px;">🛒</div>
    <h2>Your cart is empty</h2>
    <p>Add some fresh dairy products to get started!</p>
    <a href="<?= SITE_URL ?>/products.php" style="display:inline-block;background:#003399;color:#fff;padding:12px 32px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-top:16px;">Shop Now</a>
  </div>

  <!-- Cart Content -->
  <div id="cartWrap" class="cart-grid" style="display:grid;">
    <div>
      <div class="data-card" style="padding:0 20px;">
        <div id="cartItems">
          <!-- Rendered by JS -->
          <div style="padding:40px;text-align:center;color:#4d4d4d;">Loading cart...</div>
        </div>
      </div>

      <div style="margin-top:16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <a href="<?= SITE_URL ?>/products.php" style="font-size:13px;color:#003399;font-weight:700;">← Continue Shopping</a>
        <button onclick="if(confirm('Clear all items?')){localStorage.removeItem('siyo_cart');renderCartPage();updateCartCount();}" style="font-size:13px;color:#cc0000;background:none;border:none;cursor:pointer;font-weight:600;">🗑 Clear Cart</button>
      </div>
    </div>

    <!-- Summary -->
    <div>
      <div class="cart-summary-box">
        <h3 style="font-size:16px;font-weight:700;padding-bottom:12px;border-bottom:1px solid #e5e5e5;margin-bottom:16px;">Order Summary</h3>
        <div id="cartSummary"></div>
        <div style="font-size:11px;color:#4d4d4d;margin-top:12px;padding:10px;background:#f9fafb;border-radius:6px;">
          🚚 Free delivery on orders above ₹500
        </div>
        <a href="<?= SITE_URL ?>/checkout.php" id="checkoutBtn">
          <button class="btn-checkout">Proceed to Checkout →</button>
        </a>
        <div style="display:flex;justify-content:center;gap:12px;margin-top:12px;flex-wrap:wrap;">
          <span style="font-size:11px;color:#4d4d4d;">🔒 Secure UPI Payment</span>
          <span style="font-size:11px;color:#4d4d4d;">📅 Fresh Daily Delivery</span>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>
