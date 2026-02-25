<?php
require_once 'includes/config.php';
$pageTitle = 'All Products';
$db = getDB();

$category = isset($_GET['category']) ? $db->real_escape_string($_GET['category']) : '';

// Fetch all products
$sql = "SELECT * FROM products ORDER BY featured DESC, category_slug ASC, id ASC";
$result = $db->query($sql);
$allProducts = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch categories
$catResult = $db->query("SELECT DISTINCT category, category_slug FROM products ORDER BY category ASC");
$categories = $catResult ? $catResult->fetch_all(MYSQLI_ASSOC) : [];

$catEmojis = [
  'milk' => '🥛',
  'ghee' => '🫙',
  'paneer-curd' => '🧀',
  'subscriptions' => '📅',
];

include 'includes/header.php';
?>

<!-- Page Hero -->
<div class="page-hero">
  <h1>Our Products</h1>
  <p>Fresh from our farm to your doorstep every morning</p>
  <div style="margin-top:16px;">
    <input type="text" id="productSearch" placeholder="Search products..." class="search-box">
  </div>
</div>

<!-- Category Tabs -->
<div class="category-tabs">
  <div class="category-tabs-inner">
    <button class="tab-btn<?= !$category ? ' active' : '' ?>" data-cat="all" onclick="filterCategory('all')">
      All Products
    </button>
    <?php foreach ($categories as $cat): ?>
    <button class="tab-btn<?= $category === $cat['category_slug'] ? ' active' : '' ?>"
      data-cat="<?= htmlspecialchars($cat['category_slug']) ?>"
      onclick="filterCategory('<?= htmlspecialchars($cat['category_slug']) ?>')">
      <?= ($catEmojis[$cat['category_slug']] ?? '') . ' ' . sanitize($cat['category']) ?>
    </button>
    <?php endforeach; ?>
  </div>
</div>

<!-- Products -->
<div style="max-width:1200px;margin:0 auto;padding:40px 24px;">
  <p id="productCount" style="font-size:13px;color:#4d4d4d;margin-bottom:20px;"><?= count($allProducts) ?> products found</p>

  <?php if (empty($allProducts)): ?>
    <div style="text-align:center;padding:80px 0;">
      <p style="font-size:18px;color:#4d4d4d;">No products found. Import sample data from database.sql.</p>
    </div>
  <?php else: ?>
    <div class="products-grid">
      <?php foreach ($allProducts as $p): ?>
        <?php include '_product_card.php'; ?>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>

<?php
// Set active category via JS if URL param provided
if ($category):
?>
<script>
document.addEventListener('DOMContentLoaded', function() {
  filterCategory('<?= htmlspecialchars($category) ?>');
});
</script>
<?php endif; ?>

<?php include 'includes/footer.php'; ?>
