<?php
require_once 'includes/config.php';
$pageTitle = 'Checkout';
$db = getDB();

$upiId = getSetting('upi_id', 'siyofarms@upi');
$upiQrUrl = getSetting('upi_qr_url', '');
$payeeName = getSetting('payee_name', 'Siyo Farms');

$orderPlaced = false;
$orderId = '';
$txnId = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['h_cart'])) {
    // Process order
    $name    = sanitize($_POST['c_name'] ?? '');
    $phone   = sanitize($_POST['c_phone'] ?? '');
    $email   = sanitize($_POST['c_email'] ?? '');
    $address = sanitize($_POST['c_address'] ?? '');
    $city    = sanitize($_POST['c_city'] ?? '');
    $pincode = sanitize($_POST['c_pincode'] ?? '');
    $txnId   = sanitize($_POST['h_txn'] ?? '');
    $subtotal = floatval($_POST['h_subtotal'] ?? 0);
    $delivery = floatval($_POST['h_delivery'] ?? 0);
    $total    = floatval($_POST['h_total'] ?? 0);
    $cartJson = $_POST['h_cart'] ?? '[]';

    // Validate
    $valid = $name && $phone && $email && $address && $city && $pincode && $txnId && $total > 0;

    if ($valid) {
        try {
            $cartData = json_decode($cartJson, true);
            if (!is_array($cartData) || empty($cartData)) throw new Exception("Empty cart");

            $orderId = generateOrderId();

            // Insert order
            $stmt = $db->prepare("INSERT INTO orders (id, status, subtotal, delivery_fee, total, customer_name, customer_phone, customer_email, customer_address, customer_city, customer_pincode, payment_method, upi_transaction_id) VALUES (?, 'payment_submitted', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'upi', ?)");
            $stmt->bind_param('sdddsssssss', $orderId, $subtotal, $delivery, $total, $name, $phone, $email, $address, $city, $pincode, $txnId);
            $stmt->execute();

            // Insert order items
            foreach ($cartData as $item) {
                $itemName  = sanitize($item['name'] ?? '');
                $itemEmoji = $item['emoji'] ?? '🥛';
                $itemPrice = floatval($item['price'] ?? 0);
                $itemQty   = intval($item['quantity'] ?? 1);
                $itemId    = intval($item['id'] ?? 0);
                $stmt2 = $db->prepare("INSERT INTO order_items (order_id, product_id, product_name, product_emoji, price, quantity) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt2->bind_param('sissd i', $orderId, $itemId, $itemName, $itemEmoji, $itemPrice, $itemQty);
                // Use proper types
                $stmt2 = $db->prepare("INSERT INTO order_items (order_id, product_id, product_name, product_emoji, price, quantity) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt2->bind_param('siisdi', $orderId, $itemId, $itemName, $itemEmoji, $itemPrice, $itemQty);
                $stmt2->execute();
            }

            $orderPlaced = true;
        } catch (Exception $e) {
            $error = 'Failed to place order. Please try again.';
        }
    } else {
        $error = 'Please fill all required fields.';
    }
}

include 'includes/header.php';
?>

<?php if ($orderPlaced): ?>
<!-- Order Success -->
<div class="success-page">
  <div class="success-icon">✅</div>
  <h1>Order Placed!</h1>
  <p>Your order <strong style="color:#003399;">#<?= sanitize($orderId) ?></strong> has been received.</p>
  <p>Your payment is being verified. You will receive confirmation once approved.</p>

  <div class="pending-notice">
    <div class="title">⏳ Payment Verification Pending</div>
    <p>Transaction ID submitted: <strong><?= sanitize($txnId) ?></strong></p>
    <p style="margin-top:6px;">Our team will verify your payment within 1–2 hours. You will be notified via SMS/WhatsApp.</p>
  </div>

  <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px;">
    <a href="<?= SITE_URL ?>" style="display:block;background:#003399;color:#fff;padding:14px 32px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Continue Shopping</a>
    <a href="<?= SITE_URL ?>/orders.php" style="color:#003399;font-size:13px;font-weight:700;">View My Orders →</a>
  </div>
</div>
<script>
// Clear cart after order placed
localStorage.removeItem('siyo_cart');
updateCartCount();
</script>

<?php else: ?>

<div style="max-width:1100px;margin:0 auto;padding:40px 24px;">

  <?php if ($error): ?>
  <div class="flash error" data-auto><?= sanitize($error) ?></div>
  <?php endif; ?>

  <!-- Stepper -->
  <div class="stepper">
    <div class="step-pill active" id="pill1">
      <span class="step-num">1</span> Delivery Details
    </div>
    <span style="color:#ccc;margin:0 8px;">›</span>
    <div class="step-pill inactive" id="pill2">
      <span class="step-num">2</span> Payment
    </div>
  </div>

  <form method="POST" id="checkoutForm" action="">
    <!-- Hidden fields -->
    <input type="hidden" name="h_cart" id="h_cart">
    <input type="hidden" name="h_subtotal" id="h_subtotal">
    <input type="hidden" name="h_delivery" id="h_delivery">
    <input type="hidden" name="h_total" id="h_total">
    <input type="hidden" name="h_txn" id="h_txn">

    <div class="checkout-grid">
      <!-- Left: Steps -->
      <div>

        <!-- Step 1: Details -->
        <div id="stepDetails" class="checkout-card">
          <h2 style="font-size:20px;font-weight:800;margin-bottom:20px;">Delivery Details</h2>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name <span style="color:#cc0000;">*</span></label>
              <input type="text" id="c_name" name="c_name" class="form-input" placeholder="Enter your full name" value="<?= htmlspecialchars($_POST['c_name'] ?? '') ?>">
              <div class="form-error" id="c_name_err" style="display:none;"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Mobile Number <span style="color:#cc0000;">*</span></label>
              <input type="tel" id="c_phone" name="c_phone" class="form-input" placeholder="10-digit mobile number" value="<?= htmlspecialchars($_POST['c_phone'] ?? '') ?>">
              <div class="form-error" id="c_phone_err" style="display:none;"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address <span style="color:#cc0000;">*</span></label>
            <input type="email" id="c_email" name="c_email" class="form-input" placeholder="your@email.com" value="<?= htmlspecialchars($_POST['c_email'] ?? '') ?>">
            <div class="form-error" id="c_email_err" style="display:none;"></div>
          </div>
          <div class="form-group">
            <label class="form-label">Delivery Address <span style="color:#cc0000;">*</span></label>
            <input type="text" id="c_address" name="c_address" class="form-input" placeholder="House/Flat no, Street, Area" value="<?= htmlspecialchars($_POST['c_address'] ?? '') ?>">
            <div class="form-error" id="c_address_err" style="display:none;"></div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">City <span style="color:#cc0000;">*</span></label>
              <input type="text" id="c_city" name="c_city" class="form-input" placeholder="Mumbai, Pune, etc." value="<?= htmlspecialchars($_POST['c_city'] ?? '') ?>">
              <div class="form-error" id="c_city_err" style="display:none;"></div>
            </div>
            <div class="form-group">
              <label class="form-label">PIN Code <span style="color:#cc0000;">*</span></label>
              <input type="text" id="c_pincode" name="c_pincode" class="form-input" placeholder="6-digit PIN code" maxlength="6" value="<?= htmlspecialchars($_POST['c_pincode'] ?? '') ?>">
              <div class="form-error" id="c_pincode_err" style="display:none;"></div>
            </div>
          </div>
          <button type="button" class="btn-next" onclick="goToPayment()">Continue to Payment →</button>
        </div>

        <!-- Step 2: Payment -->
        <div id="stepPayment" class="checkout-card" style="display:none;">
          <h2 style="font-size:20px;font-weight:800;margin-bottom:6px;">Pay via UPI</h2>
          <p style="font-size:13px;color:#4d4d4d;margin-bottom:20px;">
            Pay <strong style="color:#003399;font-size:18px;" id="payTotal">₹—</strong> using any UPI app (GPay, PhonePe, Paytm, BHIM, etc.)
          </p>

          <!-- UPI Box -->
          <div class="upi-box">
            <!-- QR Code -->
            <div style="flex-shrink:0;text-align:center;">
              <div class="qr-placeholder">
                <?php if ($upiQrUrl): ?>
                  <img src="<?= htmlspecialchars($upiQrUrl) ?>" alt="UPI QR Code">
                <?php else: ?>
                  <div class="no-qr" style="padding:16px;">
                    <div style="font-size:36px;opacity:0.3;margin-bottom:4px;">⬛</div>
                    <p style="font-size:10px;color:#4d4d4d;">QR Code</p>
                    <p style="font-size:9px;color:#4d4d4d;">(Set by Admin)</p>
                  </div>
                <?php endif; ?>
              </div>
              <p style="font-size:11px;color:#4d4d4d;margin-top:8px;">Scan with any UPI app</p>
            </div>

            <!-- UPI ID & Instructions -->
            <div style="flex:1;">
              <p style="font-size:13px;font-weight:700;margin-bottom:10px;">Or pay to this UPI ID:</p>
              <div class="upi-id-row">
                <span class="upi-id-text" id="upiIdText"><?= htmlspecialchars($upiId) ?></span>
                <button type="button" class="copy-btn" onclick="copyUpiId()">📋 Copy</button>
              </div>
              <div class="pay-steps">
                <div>1. Open GPay / PhonePe / Paytm / BHIM</div>
                <div>2. Scan QR code or enter UPI ID</div>
                <div>3. Enter amount <strong>₹<span id="payAmtInstructions">—</span></strong></div>
                <div>4. Complete payment &amp; copy the <strong>Transaction ID</strong></div>
                <div>5. Paste Transaction ID below and submit</div>
              </div>
            </div>
          </div>

          <!-- Transaction ID Input -->
          <div class="form-group">
            <label class="form-label">Enter UPI Transaction ID <span style="color:#cc0000;">*</span></label>
            <input type="text" id="txn_id" class="form-input txn-input" placeholder="e.g. 413548679234 or T2024XXXXXXXX">
            <div class="form-error" id="txn_err" style="display:none;"></div>
            <p style="font-size:11px;color:#4d4d4d;margin-top:6px;">You can find the Transaction ID in your UPI app payment history.</p>
          </div>

          <div style="display:flex;gap:10px;">
            <button type="button" class="back-btn" onclick="goBackToDetails()">← Back</button>
            <button type="button" class="btn-next" style="flex:2;" id="submitBtn" onclick="submitOrder()">Confirm Order &amp; Submit</button>
          </div>
        </div>

      </div>

      <!-- Order Summary -->
      <div>
        <div class="cart-summary-box" style="position:sticky;top:90px;">
          <h3 style="font-size:16px;font-weight:700;padding-bottom:12px;border-bottom:1px solid #e5e5e5;margin-bottom:16px;">Order Summary</h3>
          <div id="checkoutCartItems" style="margin-bottom:16px;"></div>
          <div id="checkoutSummary"></div>
        </div>
      </div>
    </div>
  </form>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var cart = getCart();
  if (cart.length === 0) {
    window.location.href = '<?= SITE_URL ?>/cart.php';
    return;
  }

  var subtotal = cart.reduce(function(s, i) { return s + i.price * (i.quantity || 1); }, 0);
  var delivery = subtotal >= 500 ? 0 : 30;
  var total = subtotal + delivery;

  // Render cart items in summary
  var itemsDiv = document.getElementById('checkoutCartItems');
  if (itemsDiv) {
    itemsDiv.innerHTML = cart.map(function(item) {
      return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">' +
        '<span style="font-size:24px;">' + (item.emoji || '🥛') + '</span>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font-size:13px;font-weight:600;color:#1a1a1a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escHtml(item.name) + '</div>' +
          '<div style="font-size:11px;color:#4d4d4d;">×' + (item.quantity || 1) + '</div>' +
        '</div>' +
        '<span style="font-size:13px;font-weight:700;">₹' + (item.price * (item.quantity||1)).toFixed(0) + '</span>' +
      '</div>';
    }).join('');
  }

  var summaryDiv = document.getElementById('checkoutSummary');
  if (summaryDiv) {
    summaryDiv.innerHTML =
      '<div class="summary-row"><span>Subtotal</span><span>₹' + subtotal.toFixed(0) + '</span></div>' +
      '<div class="summary-row' + (delivery === 0 ? ' free' : '') + '"><span>Delivery</span><span>' + (delivery === 0 ? 'FREE' : '₹' + delivery) + '</span></div>' +
      '<div class="summary-row total"><span>Total</span><span>₹' + total.toFixed(0) + '</span></div>';
  }

  // Set payment display
  var payTotal = document.getElementById('payTotal');
  if (payTotal) payTotal.textContent = '₹' + total.toFixed(0);
  var payAmt = document.getElementById('payAmtInstructions');
  if (payAmt) payAmt.textContent = total.toFixed(0);

  // Helper to set form hidden fields
  window.setHidden = function(form, name, val) {
    var el = form.querySelector('[name="' + name + '"]');
    if (el) el.value = val;
  };
});
</script>
<?php endif; ?>

<?php include 'includes/footer.php'; ?>
