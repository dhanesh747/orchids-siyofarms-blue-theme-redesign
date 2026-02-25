<?php
require_once 'includes/config.php';
$pageTitle = 'My Orders';
$db = getDB();

// Orders are identified by customer phone number
// In PHP/MySQL version, customers look up orders by phone
$phone = '';
$orders = [];
$searched = false;

if (isset($_GET['phone']) && $_GET['phone']) {
    $phone = sanitize($_GET['phone']);
    $phone_esc = $db->real_escape_string($phone);
    $result = $db->query("SELECT o.*, GROUP_CONCAT(oi.product_emoji, '|', oi.product_name, '|', oi.quantity, '|', oi.price ORDER BY oi.id SEPARATOR ';;') as items_str FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id WHERE o.customer_phone LIKE '%$phone_esc%' GROUP BY o.id ORDER BY o.created_at DESC");
    $orders = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
    $searched = true;
}

$statusLabel = [
    'pending_payment' => 'Pending Payment',
    'payment_submitted' => 'Payment Submitted – Awaiting Verification',
    'payment_verified' => 'Payment Verified',
    'processing' => 'Order Processing',
    'delivered' => 'Delivered',
    'cancelled' => 'Cancelled',
];

include 'includes/header.php';
?>

<div style="max-width:900px;margin:0 auto;padding:48px 24px;">
  <h1 style="font-size:28px;font-weight:900;margin-bottom:8px;">My Orders</h1>
  <p style="font-size:14px;color:#4d4d4d;margin-bottom:28px;">Track your orders and check payment status by entering your mobile number.</p>

  <!-- Phone Lookup -->
  <form method="GET" style="display:flex;gap:10px;margin-bottom:32px;flex-wrap:wrap;">
    <input type="tel" name="phone" value="<?= htmlspecialchars($phone) ?>"
      placeholder="Enter your mobile number"
      style="flex:1;min-width:200px;padding:12px 16px;border:1px solid #e5e5e5;border-radius:4px;font-size:14px;outline:none;"
      required maxlength="15">
    <button type="submit" style="background:#003399;color:#fff;padding:12px 24px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;border:none;cursor:pointer;">
      Find Orders
    </button>
  </form>

  <?php if ($searched): ?>
    <?php if (empty($orders)): ?>
      <div class="orders-empty">
        <div style="font-size:64px;margin-bottom:16px;">📦</div>
        <h2>No orders found</h2>
        <p>No orders found for mobile number <strong><?= htmlspecialchars($phone) ?></strong>.<br>
        Please check the number or <a href="<?= SITE_URL ?>/products.php" style="color:#003399;">start shopping</a>.</p>
      </div>
    <?php else: ?>
      <p style="font-size:13px;color:#4d4d4d;margin-bottom:16px;"><?= count($orders) ?> order<?= count($orders) !== 1 ? 's' : '' ?> found</p>

      <?php foreach ($orders as $idx => $order): ?>
        <div class="order-card">
          <div class="order-header" onclick="toggleOrder('<?= $order['id'] ?>')">
            <div>
              <div class="order-id">#<?= sanitize($order['id']) ?></div>
              <div class="order-date"><?= date('j F Y, h:i A', strtotime($order['created_at'])) ?></div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
              <span class="status-pill status-<?= htmlspecialchars($order['status']) ?>">
                <?= htmlspecialchars($statusLabel[$order['status']] ?? $order['status']) ?>
              </span>
              <span style="font-size:18px;font-weight:800;">₹<?= number_format($order['total'], 0) ?></span>
              <span class="order-toggle" id="arrow_<?= $order['id'] ?>">▼</span>
            </div>
          </div>

          <div class="order-detail" id="order_<?= $order['id'] ?>">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
              <!-- Items -->
              <div>
                <h3 style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px;">Items Ordered</h3>
                <div class="order-items-list">
                  <?php
                  $items = [];
                  if (!empty($order['items_str'])) {
                    foreach (explode(';;', $order['items_str']) as $itemStr) {
                      $parts = explode('|', $itemStr);
                      if (count($parts) >= 4) {
                        $items[] = ['emoji' => $parts[0], 'name' => $parts[1], 'quantity' => $parts[2], 'price' => $parts[3]];
                      }
                    }
                  }
                  ?>
                  <?php foreach ($items as $item): ?>
                  <div class="oi">
                    <span class="emoji"><?= $item['emoji'] ?></span>
                    <span class="name"><?= sanitize($item['name']) ?></span>
                    <span>×<?= (int)$item['quantity'] ?></span>
                    <span class="price">₹<?= number_format($item['price'] * $item['quantity'], 0) ?></span>
                  </div>
                  <?php endforeach; ?>
                </div>
                <div style="border-top:1px solid #e5e5e5;padding-top:10px;margin-top:8px;">
                  <div style="display:flex;justify-content:space-between;font-size:13px;color:#4d4d4d;margin-bottom:4px;">
                    <span>Subtotal</span><span>₹<?= number_format($order['subtotal'],0) ?></span>
                  </div>
                  <div style="display:flex;justify-content:space-between;font-size:13px;color:#4d4d4d;margin-bottom:4px;">
                    <span>Delivery</span><span><?= $order['delivery_fee'] == 0 ? 'FREE' : '₹'.$order['delivery_fee'] ?></span>
                  </div>
                  <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:#003399;padding-top:6px;">
                    <span>Total</span><span>₹<?= number_format($order['total'],0) ?></span>
                  </div>
                </div>
              </div>

              <!-- Delivery & Payment -->
              <div>
                <h3 style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px;">Delivery Address</h3>
                <p style="font-size:13px;color:#4d4d4d;line-height:1.8;margin-bottom:16px;">
                  <?= sanitize($order['customer_name']) ?><br>
                  <?= sanitize($order['customer_phone']) ?><br>
                  <?= sanitize($order['customer_address']) ?><br>
                  <?= sanitize($order['customer_city']) ?> – <?= sanitize($order['customer_pincode']) ?>
                </p>
                <h3 style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">Payment</h3>
                <p style="font-size:13px;color:#4d4d4d;">Method: UPI</p>
                <?php if ($order['upi_transaction_id']): ?>
                <p style="font-size:13px;color:#4d4d4d;font-family:monospace;margin-top:4px;">
                  Txn ID: <strong><?= sanitize($order['upi_transaction_id']) ?></strong>
                </p>
                <?php endif; ?>
                <?php if ($order['status'] === 'payment_submitted'): ?>
                <div style="margin-top:12px;padding:12px;background:#fef9c3;border:1px solid #fde047;border-radius:6px;font-size:12px;color:#78350f;">
                  ⏳ Your payment is being verified by our team. Usually takes 1–2 hours.
                </div>
                <?php elseif ($order['status'] === 'payment_verified'): ?>
                <div style="margin-top:12px;padding:12px;background:#dcfce7;border:1px solid #86efac;border-radius:6px;font-size:12px;color:#14532d;">
                  ✅ Payment verified! Your order is being processed.
                </div>
                <?php elseif ($order['status'] === 'cancelled' && $order['rejected_reason']): ?>
                <div style="margin-top:12px;padding:12px;background:#fee2e2;border:1px solid #fca5a5;border-radius:6px;font-size:12px;color:#cc0000;">
                  ❌ Rejected: <?= sanitize($order['rejected_reason']) ?>
                </div>
                <?php endif; ?>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  <?php else: ?>
    <div style="background:#f4f7ff;border:1px solid #d0d9ff;border-radius:10px;padding:24px;font-size:14px;color:#4d4d4d;">
      💡 <strong>Tip:</strong> Enter the same mobile number you used during checkout to see your orders.
    </div>
  <?php endif; ?>
</div>

<?php include 'includes/footer.php'; ?>
