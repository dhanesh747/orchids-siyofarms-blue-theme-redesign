<?php
require_once 'includes/config.php';
$pageTitle = 'About Us';
include 'includes/header.php';
?>

<div class="page-hero">
  <h1>About Siyo Farms</h1>
  <p>Bringing the purest dairy from our farm to your family's table since 2015.</p>
</div>

<div style="max-width:1100px;margin:0 auto;padding:64px 24px;">
  <!-- Our Story -->
  <div class="about-grid">
    <div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:16px;">Our Story</h2>
      <p style="font-size:15px;color:#4d4d4d;line-height:1.8;margin-bottom:16px;">
        Siyo Farms was founded with a simple mission: to bring pure, unadulterated dairy products directly from healthy, happy cows to families across India.
      </p>
      <p style="font-size:15px;color:#4d4d4d;line-height:1.8;margin-bottom:16px;">
        We believe that real milk comes from cows that are raised with love, fed natural grass and organic feed, and never subjected to hormones or antibiotics. Our Gir cows roam freely on our farm, producing the finest A2 milk.
      </p>
      <p style="font-size:15px;color:#4d4d4d;line-height:1.8;">
        Every product we make — from our bilona ghee to our fresh paneer — carries the same commitment to quality, purity, and tradition.
      </p>
    </div>
    <div class="about-cards">
      <?php foreach([
        ['🐄','Native Gir Cows','Ethically raised on natural grass'],
        ['🌿','No Chemicals','Zero hormones, antibiotics, or preservatives'],
        ['🏡','Family Farm','Run by farmers who care deeply'],
        ['🚚','Daily Delivery','Fresh to your door every morning'],
      ] as $item): ?>
      <div class="about-card">
        <div class="emoji"><?= $item[0] ?></div>
        <h4><?= $item[1] ?></h4>
        <p><?= $item[2] ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Values -->
  <div class="values-banner">
    <h2>Our Values</h2>
    <div class="values-grid">
      <?php foreach([
        ['💯','Purity','We never compromise on quality. Every batch is tested to ensure it meets our high standards.'],
        ['❤️','Care','We care for our animals, our farmers, our customers, and our environment in equal measure.'],
        ['🌱','Sustainability','Our farming practices are designed to protect and nurture the land for future generations.'],
      ] as $v): ?>
      <div class="value-item">
        <div class="emoji"><?= $v[0] ?></div>
        <h3><?= $v[1] ?></h3>
        <p><?= $v[2] ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats-grid">
    <?php foreach([
      ['500+','Happy Families'],['50+','Healthy Gir Cows'],['8+','Years of Excellence'],['100%','Natural Products']
    ] as $s): ?>
    <div class="stat-box">
      <div class="num"><?= $s[0] ?></div>
      <div class="label"><?= $s[1] ?></div>
    </div>
    <?php endforeach; ?>
  </div>

  <!-- CTA -->
  <div style="text-align:center;">
    <h2 style="font-size:28px;font-weight:900;margin-bottom:12px;">Ready to Experience Pure Dairy?</h2>
    <p style="font-size:15px;color:#4d4d4d;margin-bottom:24px;">Join hundreds of families who trust Siyo Farms for their daily dairy needs.</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;">
      <a href="<?= SITE_URL ?>/products.php" style="display:inline-block;background:#003399;color:#fff;padding:14px 32px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Shop Products</a>
      <a href="<?= SITE_URL ?>/contact.php" style="display:inline-block;border:2px solid #003399;color:#003399;padding:12px 32px;border-radius:4px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;transition:all 0.15s;" onmouseover="this.style.background='#003399';this.style.color='#fff';" onmouseout="this.style.background='';this.style.color='#003399';">Contact Us</a>
    </div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>
