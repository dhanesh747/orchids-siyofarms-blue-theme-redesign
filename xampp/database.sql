-- ============================================================
-- Siyo Farms - MySQL Database Schema
-- Import this file in phpMyAdmin:
--   1. Open phpMyAdmin (http://localhost/phpmyadmin)
--   2. Click "New" to create a database named: siyo_farms
--   3. Click "Import" tab → Choose this file → Click "Go"
-- ============================================================

CREATE DATABASE IF NOT EXISTS siyo_farms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE siyo_farms;

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  category_slug VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) DEFAULT NULL,
  unit VARCHAR(50) NOT NULL DEFAULT '500ml',
  description TEXT,
  long_description TEXT,
  badge VARCHAR(50) DEFAULT NULL,
  emoji VARCHAR(10) DEFAULT '🥛',
  in_stock TINYINT(1) DEFAULT 1,
  featured TINYINT(1) DEFAULT 0,
  tags VARCHAR(500) DEFAULT '',
  benefits VARCHAR(1000) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLE: orders
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(30) PRIMARY KEY,
  status ENUM('pending_payment','payment_submitted','payment_verified','processing','delivered','cancelled') DEFAULT 'pending_payment',
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  customer_address TEXT,
  customer_city VARCHAR(100),
  customer_pincode VARCHAR(10),
  payment_method VARCHAR(50) DEFAULT 'upi',
  upi_transaction_id VARCHAR(255) DEFAULT NULL,
  verified_at DATETIME DEFAULT NULL,
  rejected_reason VARCHAR(500) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLE: order_items
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(30) NOT NULL,
  product_id INT,
  product_name VARCHAR(255) NOT NULL,
  product_emoji VARCHAR(10) DEFAULT '🥛',
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLE: settings
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLE: admins
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DEFAULT SETTINGS DATA
-- ============================================================
INSERT INTO settings (setting_key, setting_value) VALUES
('upi_id', 'siyofarms@upi'),
('upi_qr_url', ''),
('payee_name', 'Siyo Farms'),
('business_name', 'Siyo Farms'),
('phone', '+91 98765 43210'),
('email', 'hello@siyofarms.com'),
('delivery_time', '6:00 AM – 8:00 AM'),
('order_cutoff', '10:00 PM'),
('announcement', 'Free delivery on orders above ₹500 | Fresh dairy every morning 🥛')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- ============================================================
-- DEFAULT ADMIN USER (password: siyo2024)
-- To change password: UPDATE admins SET password_hash=MD5('newpass') WHERE username='admin';
-- ============================================================
INSERT INTO admins (username, password_hash) VALUES
('admin', MD5('siyo2024'))
ON DUPLICATE KEY UPDATE username = username;

-- ============================================================
-- SAMPLE PRODUCTS DATA
-- ============================================================
INSERT INTO products (name, slug, category, category_slug, price, original_price, unit, description, long_description, badge, emoji, in_stock, featured, tags, benefits) VALUES
('A2 Gir Cow Milk', 'a2-gir-cow-milk', 'Milk', 'milk', 75.00, NULL, '500ml', 'Pure A2 milk from indigenous Gir cows. Rich in A2 beta-casein protein.', 'Our A2 Gir Cow Milk comes from certified Gir cows raised on natural grass and organic feed. Rich in A2 beta-casein protein, it is easier to digest than regular milk. No hormones, no antibiotics, no preservatives.', 'Best Seller', '🐄', 1, 1, 'a2,gir,cow,pure', 'Easy to digest|Rich in A2 protein|No hormones|Ethically sourced'),
('Buffalo Milk', 'buffalo-milk', 'Milk', 'milk', 65.00, NULL, '500ml', 'Thick, creamy buffalo milk. High fat content, perfect for making sweets.', 'Our fresh buffalo milk is collected daily from healthy buffaloes. With naturally high fat content, it is ideal for making rich kheer, gulab jamun, and other Indian sweets. Delivered fresh every morning.', 'Fresh Daily', '🦬', 1, 1, 'buffalo,creamy,fresh', 'High fat content|Great for sweets|Collected daily|No additives'),
('High Protein Milk', 'high-protein-milk', 'Milk', 'milk', 90.00, 110.00, '500ml', 'Fortified with extra protein. Perfect for fitness enthusiasts and growing children.', 'Siyo Farms High Protein Milk is specially formulated for fitness lovers, athletes, and growing children. Contains 50% more protein than regular milk. No artificial additives – just natural milk fortified the right way.', 'Sale', '💪', 1, 1, 'protein,fitness,fortified', '50% more protein|Great for athletes|Kids-friendly|Natural fortification'),
('Lactose Free Milk', 'lactose-free-milk', 'Milk', 'milk', 85.00, NULL, '500ml', 'All the goodness of milk without lactose. Perfect for lactose-intolerant individuals.', 'Our Lactose Free Milk undergoes a special enzymatic process that breaks down lactose into simpler sugars. You get all the calcium, vitamins, and proteins of regular milk without the discomfort.', 'New', '🥛', 1, 0, 'lactose-free,sensitive,digestive', 'No lactose discomfort|Full nutrition|Easy digest|Same great taste'),
('Toned Milk', 'toned-milk', 'Milk', 'milk', 50.00, NULL, '500ml', 'Low-fat toned milk for everyday use. Light on calories, rich in nutrients.', 'Siyo Farms Toned Milk is perfect for health-conscious families. Reduced fat content while maintaining full nutritional value. Ideal for tea, coffee, cereals and everyday drinking.', NULL, '🍼', 1, 0, 'toned,low-fat,everyday', 'Low fat|Daily use|Rich in calcium|Affordable'),
('Raw Cow Milk', 'raw-cow-milk', 'Milk', 'milk', 60.00, NULL, '500ml', 'Unprocessed raw cow milk with all natural enzymes intact.', 'For those who prefer their milk completely natural, our Raw Cow Milk is collected fresh, cold-processed and delivered within hours. All natural enzymes and beneficial bacteria are intact.', 'Pure', '🌿', 1, 0, 'raw,natural,enzymes', 'All enzymes intact|Unprocessed|Natural bacteria|Traditional taste'),
('A2 Gir Cow Ghee', 'a2-gir-cow-ghee', 'Ghee', 'ghee', 850.00, 950.00, '500g', '100% pure A2 ghee made with traditional bilona method. Golden, aromatic and nutritious.', 'Our A2 Gir Cow Ghee is made using the traditional bilona (hand-churned) method from pure A2 cow milk curd. The slow process preserves all nutrients including Omega-3, vitamins A, D, E and K. Rich golden color and divine aroma.', 'Premium', '🫙', 1, 1, 'ghee,a2,bilona,premium', 'Traditional bilona method|Rich in Omega-3|All vitamins intact|Golden aroma'),
('Buffalo Ghee', 'buffalo-ghee', 'Ghee', 'ghee', 650.00, NULL, '500g', 'Rich, aromatic buffalo ghee. High smoke point, ideal for cooking and tempering.', 'Buffalo Ghee from Siyo Farms is made from fresh buffalo milk cream. Its high smoke point makes it perfect for deep frying, sauteing, and tempering. Dense and richly flavored.', NULL, '✨', 1, 0, 'buffalo,ghee,cooking', 'High smoke point|Dense texture|Great for cooking|Rich flavor'),
('Pure White Butter', 'pure-butter', 'Ghee', 'ghee', 200.00, NULL, '200g', 'Fresh hand-churned white butter (makhan). No salt, no preservatives.', 'Traditional white butter made fresh from whole cow milk cream. Unsalted, preservative-free, and absolutely natural. Best enjoyed on hot rotis, parathas, and toast.', 'Fresh', '🧈', 1, 0, 'butter,makhan,fresh,unsalted', 'Hand-churned|No salt added|No preservatives|Fresh daily'),
('Fresh Paneer', 'fresh-paneer', 'Paneer & Curd', 'paneer-curd', 120.00, NULL, '200g', 'Soft, fresh homestyle paneer. Made from full-fat cow milk. Ready to cook.', 'Siyo Farms Paneer is made daily from fresh full-fat cow milk. Soft texture, mild flavor, and incredibly versatile. Perfect for palak paneer, paneer tikka, or eating raw with a sprinkle of salt.', 'Daily Fresh', '🧀', 1, 1, 'paneer,fresh,cottage cheese', 'Made daily|Full-fat milk|Soft texture|No preservatives'),
('Homestyle Dahi', 'dahi-curd', 'Paneer & Curd', 'paneer-curd', 60.00, NULL, '400g', 'Thick, creamy dahi set in traditional clay pots. Probiotic rich.', 'Our Dahi is set overnight in clay pots using age-old recipes. The result is thick, creamy, slightly tangy curd loaded with natural probiotics. Good for gut health and digestion.', 'Probiotic', '🏺', 1, 1, 'dahi,curd,probiotic,clay pot', 'Probiotic rich|Clay pot set|Thick & creamy|Gut friendly'),
('Kharwas', 'kharwas', 'Paneer & Curd', 'paneer-curd', 80.00, NULL, '200g', 'Traditional Maharashtrian colostrum milk pudding. Nutritious and delicious.', 'Kharwas is a traditional delicacy made from colostrum milk (the first milk after calving). It is naturally rich in antibodies, proteins, and growth factors. Steamed to a pudding-like consistency – sweet and nutritious.', 'Traditional', '🍮', 1, 0, 'kharwas,colostrum,traditional,maharashtrian', 'Colostrum rich|High antibodies|Traditional recipe|Seasonal delicacy'),
('Shrikhand', 'shrikhand', 'Paneer & Curd', 'paneer-curd', 90.00, 110.00, '200g', 'Creamy, sweetened hung curd. Classic Maharashtrian dessert.', 'Our Shrikhand is made from hung dahi, strained overnight, then sweetened with sugar and flavored with saffron and cardamom. A classic Maharashtrian dessert ready to eat.', 'Sale', '🍨', 1, 0, 'shrikhand,dessert,hung curd', 'Made from hung curd|Saffron flavored|No artificial color|Traditional recipe'),
('Daily Milk Pack', 'daily-milk-pack', 'Subscriptions', 'subscriptions', 1800.00, 2250.00, '30 days', '500ml A2 Cow Milk delivered every morning for 30 days. Save 20%.', 'Subscribe to our Daily Milk Pack and get 500ml of fresh A2 Cow Milk delivered every morning. Cancel anytime. Save 20% vs buying daily.', 'Save 20%', '📅', 1, 1, 'subscription,daily,monthly', 'Daily delivery|Save 20%|Cancel anytime|Flexible plans'),
('Family Dairy Pack', 'family-dairy-pack', 'Subscriptions', 'subscriptions', 3500.00, 4200.00, '30 days', '1L milk + 100g butter + 200g dahi every day. Perfect for families.', 'Our Family Dairy Pack includes 1L of fresh A2 Cow Milk, 100g of white butter, and 200g of creamy dahi delivered daily for 30 days. Best value for families.', 'Best Value', '👨‍👩‍👧‍👦', 1, 1, 'family,subscription,combo', '3 products daily|Save 17%|Free delivery|Customizable')
ON DUPLICATE KEY UPDATE name = VALUES(name);
