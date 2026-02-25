<?php
require_once 'includes/config.php';
$pageTitle = 'Contact Us';

$success = false;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize($_POST['name'] ?? '');
    $contact = sanitize($_POST['contact'] ?? '');
    $subject = sanitize($_POST['subject'] ?? '');
    $message = sanitize($_POST['message'] ?? '');
    if ($name && $contact && $message) {
        // In a real setup, you'd send email here using mail() or PHPMailer
        $success = true;
    } else {
        $error = 'Please fill all required fields.';
    }
}

$phone = getSetting('phone', '+91 98765 43210');
$email = getSetting('email', 'hello@siyofarms.com');
$deliveryTime = getSetting('delivery_time', '6:00 AM – 8:00 AM');

include 'includes/header.php';
?>

<div class="page-hero">
  <h1>Contact Us</h1>
  <p>We are here to help. Reach out to us anytime.</p>
</div>

<div style="max-width:1100px;margin:0 auto;padding:64px 24px;">
  <div class="contact-grid">
    <!-- Contact Info -->
    <div>
      <h2 style="font-size:24px;font-weight:900;margin-bottom:16px;">Get in Touch</h2>
      <p style="font-size:15px;color:#4d4d4d;line-height:1.7;margin-bottom:28px;">
        Have questions about our products, delivery, or subscriptions? Our team is happy to help you.
      </p>

      <?php foreach([
        ['📞','Phone / WhatsApp', $phone, 'tel:'.preg_replace('/\s+/','',$phone)],
        ['✉️','Email', $email, 'mailto:'.$email],
        ['📍','Farm Address', 'Siyo Farms, Village Road, Maharashtra – 411001', null],
        ['⏰','Delivery Hours', $deliveryTime . ' daily', null],
      ] as $item): ?>
      <div class="contact-item">
        <div class="contact-icon"><?= $item[0] ?></div>
        <div>
          <div class="contact-label"><?= $item[1] ?></div>
          <div class="contact-value">
            <?php if ($item[3]): ?>
              <a href="<?= htmlspecialchars($item[3]) ?>"><?= sanitize($item[2]) ?></a>
            <?php else: ?>
              <?= sanitize($item[2]) ?>
            <?php endif; ?>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- Contact Form -->
    <div>
      <h2 style="font-size:24px;font-weight:900;margin-bottom:20px;">Send a Message</h2>

      <?php if ($success): ?>
        <div class="flash success" data-auto>✅ Message sent! We will get back to you within 24 hours.</div>
      <?php endif; ?>
      <?php if ($error): ?>
        <div class="flash error" data-auto><?= sanitize($error) ?></div>
      <?php endif; ?>

      <form method="POST">
        <div class="form-group">
          <label class="form-label">Full Name <span style="color:#cc0000;">*</span></label>
          <input type="text" name="name" class="form-input" placeholder="Your name" required value="<?= htmlspecialchars($_POST['name'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label class="form-label">Phone / Email <span style="color:#cc0000;">*</span></label>
          <input type="text" name="contact" class="form-input" placeholder="Mobile number or email" required value="<?= htmlspecialchars($_POST['contact'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label class="form-label">Subject</label>
          <select name="subject" class="form-input">
            <option>Order Enquiry</option>
            <option>Product Query</option>
            <option>Subscription Help</option>
            <option>Feedback</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Message <span style="color:#cc0000;">*</span></label>
          <textarea name="message" class="form-input" rows="5" placeholder="Type your message here..." required style="resize:none;"><?= htmlspecialchars($_POST['message'] ?? '') ?></textarea>
        </div>
        <button type="submit" class="btn-next">Send Message →</button>
      </form>
    </div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>
