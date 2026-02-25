// ============================================================
// Siyo Farms - Main JavaScript
// Pure vanilla JS for XAMPP/PHP version
// ============================================================

// ============ MOBILE NAV ============
function toggleMobileNav() {
  var nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
  var nav = document.getElementById('mobileNav');
  var hamburger = document.querySelector('.hamburger');
  if (nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ============ STICKY HEADER SHADOW ============
window.addEventListener('scroll', function() {
  var header = document.getElementById('siteHeader');
  if (header) {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
    }
  }
});

// ============ TOAST NOTIFICATION ============
function showToast(msg, type) {
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'show' + (type ? ' ' + type : '');
  setTimeout(function() { toast.className = ''; }, 2800);
}

// ============ CART (localStorage) ============
function getCart() {
  try { return JSON.parse(localStorage.getItem('siyo_cart') || '[]'); }
  catch(e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem('siyo_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  var cart = getCart();
  var count = cart.reduce(function(s, i) { return s + (i.quantity || 1); }, 0);
  var els = document.querySelectorAll('.cart-count');
  els.forEach(function(el) {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function addToCart(id, name, price, emoji, unit) {
  var cart = getCart();
  var idx = cart.findIndex(function(i) { return i.id == id; });
  if (idx >= 0) {
    cart[idx].quantity = (cart[idx].quantity || 1) + 1;
  } else {
    cart.push({ id: id, name: name, price: parseFloat(price), emoji: emoji, unit: unit, quantity: 1 });
  }
  saveCart(cart);
  showToast(name + ' added to cart!', 'success');
  updateCartCount();
}

function removeFromCart(id) {
  var cart = getCart().filter(function(i) { return i.id != id; });
  saveCart(cart);
  renderCartPage();
}

function updateQty(id, delta) {
  var cart = getCart();
  var idx = cart.findIndex(function(i) { return i.id == id; });
  if (idx >= 0) {
    cart[idx].quantity = Math.max(1, (cart[idx].quantity || 1) + delta);
    saveCart(cart);
    renderCartPage();
  }
}

// ============ CART PAGE ============
function renderCartPage() {
  var container = document.getElementById('cartItems');
  var summaryDiv = document.getElementById('cartSummary');
  var emptyDiv = document.getElementById('cartEmpty');
  var cartWrap = document.getElementById('cartWrap');
  if (!container) return;

  var cart = getCart();
  if (cart.length === 0) {
    if (emptyDiv) emptyDiv.style.display = 'block';
    if (cartWrap) cartWrap.style.display = 'none';
    return;
  }
  if (emptyDiv) emptyDiv.style.display = 'none';
  if (cartWrap) cartWrap.style.display = 'grid';

  var subtotal = cart.reduce(function(s, i) { return s + i.price * (i.quantity || 1); }, 0);
  var delivery = subtotal >= 500 ? 0 : 30;
  var total = subtotal + delivery;

  container.innerHTML = cart.map(function(item) {
    return '<div class="cart-item">' +
      '<span class="cart-item-emoji">' + (item.emoji || '🥛') + '</span>' +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + escHtml(item.name) + '</div>' +
        '<div class="cart-item-unit">' + escHtml(item.unit || '') + '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
        '<button class="qty-btn" onclick="updateQty(\'' + item.id + '\', -1)">−</button>' +
        '<span class="qty-val">' + (item.quantity || 1) + '</span>' +
        '<button class="qty-btn" onclick="updateQty(\'' + item.id + '\', 1)">+</button>' +
      '</div>' +
      '<div class="cart-item-price">₹' + (item.price * (item.quantity || 1)).toFixed(0) + '</div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(\'' + item.id + '\')" title="Remove">×</button>' +
    '</div>';
  }).join('');

  if (summaryDiv) {
    summaryDiv.innerHTML =
      '<div class="summary-row"><span>Subtotal</span><span>₹' + subtotal.toFixed(0) + '</span></div>' +
      '<div class="summary-row' + (delivery === 0 ? ' free' : '') + '"><span>Delivery</span><span>' + (delivery === 0 ? 'FREE' : '₹' + delivery) + '</span></div>' +
      '<div class="summary-row total"><span>Total</span><span>₹' + total.toFixed(0) + '</span></div>';
  }

  // update hidden checkout fields
  var ctTotal = document.getElementById('ct_total');
  if (ctTotal) ctTotal.value = total.toFixed(0);
}

// ============ PRODUCT DETAIL QTY ============
var detailQty = 1;
function changeDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  var el = document.getElementById('detailQty');
  if (el) el.textContent = detailQty;
}
function addDetailToCart() {
  var btn = document.getElementById('addDetailBtn');
  if (!btn) return;
  var id = btn.dataset.id;
  var name = btn.dataset.name;
  var price = btn.dataset.price;
  var emoji = btn.dataset.emoji;
  var unit = btn.dataset.unit;
  for (var i = 0; i < detailQty; i++) addToCart(id, name, price, emoji, unit);
  // Deduplicate extra adds - reset qty
  var cart = getCart();
  var idx = cart.findIndex(function(c) { return c.id == id; });
  if (idx >= 0) {
    // Already added multiple, just set quantity correctly
    cart[idx].quantity = (cart[idx].quantity || 1);
  }
  saveCart(cart);
}

// ============ CATEGORY FILTER (products page) ============
function filterCategory(slug) {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.cat === slug);
  });
  document.querySelectorAll('.product-card-wrap').forEach(function(card) {
    var cat = card.dataset.cat;
    var vis = slug === 'all' || cat === slug;
    card.style.display = vis ? 'block' : 'none';
  });
  updateProductCount();
}

function updateProductCount() {
  var visible = document.querySelectorAll('.product-card-wrap[style*="block"], .product-card-wrap:not([style])').length;
  var hidden = document.querySelectorAll('.product-card-wrap[style*="none"]').length;
  var total = document.querySelectorAll('.product-card-wrap').length;
  var el = document.getElementById('productCount');
  if (el) {
    // Count visible: total minus hidden
    var shown = total - hidden;
    el.textContent = shown + ' product' + (shown !== 1 ? 's' : '') + ' found';
  }
}

function searchProducts() {
  var q = (document.getElementById('productSearch').value || '').toLowerCase();
  document.querySelectorAll('.product-card-wrap').forEach(function(card) {
    var name = (card.dataset.name || '').toLowerCase();
    var desc = (card.dataset.desc || '').toLowerCase();
    var cat = card.dataset.cat;
    var activeCat = (document.querySelector('.tab-btn.active') || {}).dataset && document.querySelector('.tab-btn.active').dataset.cat || 'all';
    var catOk = activeCat === 'all' || cat === activeCat;
    var searchOk = !q || name.includes(q) || desc.includes(q);
    card.style.display = (catOk && searchOk) ? 'block' : 'none';
  });
  updateProductCount();
}

// ============ CHECKOUT STEPS ============
var currentStep = 'details';

function goToPayment() {
  // Validate form
  var fields = ['c_name','c_phone','c_email','c_address','c_city','c_pincode'];
  var valid = true;
  fields.forEach(function(f) {
    var el = document.getElementById(f);
    var errEl = document.getElementById(f + '_err');
    if (!el) return;
    var val = el.value.trim();
    var err = '';
    if (f === 'c_name' && !val) err = 'Name is required';
    if (f === 'c_phone' && !/^[6-9]\d{9}$/.test(val)) err = 'Valid 10-digit mobile number required';
    if (f === 'c_email' && !/\S+@\S+\.\S+/.test(val)) err = 'Valid email required';
    if (f === 'c_address' && !val) err = 'Address is required';
    if (f === 'c_city' && !val) err = 'City is required';
    if (f === 'c_pincode' && !/^\d{6}$/.test(val)) err = 'Valid 6-digit PIN code required';
    el.classList.toggle('error', !!err);
    if (errEl) { errEl.textContent = err; errEl.style.display = err ? 'block' : 'none'; }
    if (err) valid = false;
  });
  if (!valid) return;

  // Check cart
  var cart = getCart();
  if (cart.length === 0) { showToast('Your cart is empty', 'error'); return; }

  document.getElementById('stepDetails').style.display = 'none';
  document.getElementById('stepPayment').style.display = 'block';
  document.getElementById('pill1').className = 'step-pill done';
  document.getElementById('pill1').querySelector('.step-num').textContent = '✓';
  document.getElementById('pill2').className = 'step-pill active';
  currentStep = 'payment';
  updatePaymentTotal();
  window.scrollTo(0, 0);
}

function goBackToDetails() {
  document.getElementById('stepPayment').style.display = 'none';
  document.getElementById('stepDetails').style.display = 'block';
  document.getElementById('pill1').className = 'step-pill active';
  document.getElementById('pill1').querySelector('.step-num').textContent = '1';
  document.getElementById('pill2').className = 'step-pill inactive';
  currentStep = 'details';
  window.scrollTo(0, 0);
}

function updatePaymentTotal() {
  var cart = getCart();
  var subtotal = cart.reduce(function(s, i) { return s + i.price * (i.quantity || 1); }, 0);
  var delivery = subtotal >= 500 ? 0 : 30;
  var total = subtotal + delivery;
  var el = document.getElementById('payTotal');
  if (el) el.textContent = '₹' + total.toFixed(0);
  var el2 = document.getElementById('payAmtInstructions');
  if (el2) el2.textContent = total.toFixed(0);
}

function copyUpiId() {
  var upiEl = document.getElementById('upiIdText');
  if (!upiEl) return;
  navigator.clipboard.writeText(upiEl.textContent).then(function() {
    showToast('UPI ID copied!', 'success');
  });
}

function submitOrder() {
  var txnEl = document.getElementById('txn_id');
  var txnErrEl = document.getElementById('txn_err');
  var txn = txnEl ? txnEl.value.trim() : '';
  if (!txn || txn.length < 6) {
    if (txnErrEl) { txnErrEl.textContent = 'Please enter a valid UPI Transaction ID (minimum 6 characters)'; txnErrEl.style.display = 'block'; }
    if (txnEl) txnEl.classList.add('error');
    return;
  }
  if (txnErrEl) txnErrEl.style.display = 'none';
  if (txnEl) txnEl.classList.remove('error');

  var cart = getCart();
  var subtotal = cart.reduce(function(s, i) { return s + i.price * (i.quantity || 1); }, 0);
  var delivery = subtotal >= 500 ? 0 : 30;
  var total = subtotal + delivery;

  var form = document.getElementById('checkoutForm');
  if (!form) return;

  // Set hidden fields
  setHidden(form, 'h_cart', JSON.stringify(cart));
  setHidden(form, 'h_subtotal', subtotal.toFixed(0));
  setHidden(form, 'h_delivery', delivery.toFixed(0));
  setHidden(form, 'h_total', total.toFixed(0));
  setHidden(form, 'h_txn', txn);

  var btn = document.getElementById('submitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Placing Order...'; }

  form.submit();
}

function setHidden(form, name, val) {
  var el = form.querySelector('[name="' + name + '"]');
  if (el) el.value = val;
}

// ============ ORDER ACCORDION ============
function toggleOrder(id) {
  var detail = document.getElementById('order_' + id);
  if (!detail) return;
  var isOpen = detail.classList.contains('open');
  document.querySelectorAll('.order-detail').forEach(function(d) { d.classList.remove('open'); });
  document.querySelectorAll('.order-toggle').forEach(function(a) { a.textContent = '▼'; });
  if (!isOpen) {
    detail.classList.add('open');
    var arrow = document.getElementById('arrow_' + id);
    if (arrow) arrow.textContent = '▲';
  }
}

// ============ ADMIN HELPERS ============
function confirmAction(msg) {
  return confirm(msg || 'Are you sure?');
}

function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

function adminSearch() {
  var q = (document.getElementById('adminSearch') || {}).value;
  if (!q) return;
  q = q.toLowerCase();
  document.querySelectorAll('.searchable-row').forEach(function(row) {
    var text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

function adminFilterStatus() {
  var val = (document.getElementById('statusFilter') || {}).value;
  var q = ((document.getElementById('adminSearch') || {}).value || '').toLowerCase();
  document.querySelectorAll('.searchable-row').forEach(function(row) {
    var text = row.textContent.toLowerCase();
    var status = row.dataset.status || '';
    var statusOk = !val || val === 'all' || status === val;
    var searchOk = !q || text.includes(q);
    row.style.display = (statusOk && searchOk) ? '' : 'none';
  });
}

// ============ QR CODE PREVIEW (admin settings) ============
function previewQr() {
  var url = (document.getElementById('qr_url') || {}).value;
  var prev = document.getElementById('qrPreview');
  if (!prev) return;
  if (url) {
    prev.innerHTML = '<img src="' + escHtml(url) + '" alt="QR Preview" style="width:80px;height:80px;object-fit:contain;border-radius:4px;border:1px solid #e5e5e5;"> <span style="font-size:12px;color:#15803d;font-weight:700;">✅ QR Code preview loaded</span>';
    prev.style.display = 'flex';
  } else {
    prev.style.display = 'none';
  }
}

// ============ ANNOUNCEMENT PREVIEW ============
function previewAnnouncement() {
  var val = (document.getElementById('announcement') || {}).value;
  var el = document.getElementById('announcementPreview');
  if (el) el.textContent = 'Preview: ' + val;
}

// ============ UTILS ============
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();

  // Init cart page
  if (document.getElementById('cartItems')) renderCartPage();

  // Init product search
  var searchEl = document.getElementById('productSearch');
  if (searchEl) searchEl.addEventListener('input', searchProducts);

  // Auto-hide flash messages
  var flashes = document.querySelectorAll('.flash[data-auto]');
  flashes.forEach(function(f) {
    setTimeout(function() { f.style.opacity = '0'; f.style.transition = 'opacity 0.5s'; setTimeout(function() { f.remove(); }, 500); }, 3500);
  });
});
