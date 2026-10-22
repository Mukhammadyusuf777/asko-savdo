-- Cloudflare D1 Database Schema for ASKO Savdo Tizimi

-- 1. Mahsulotlar (Ombor qoldiqlari)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT,
  mera TEXT,
  quantity INTEGER NOT NULL DEFAULT 0,
  cost_price INTEGER NOT NULL DEFAULT 0,
  price INTEGER NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'dona',
  branch TEXT DEFAULT 'AN2',
  image TEXT,
  min_stock INTEGER DEFAULT 6,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sotuvlar (Sales)
CREATE TABLE IF NOT EXISTS sales (
  id TEXT PRIMARY KEY,
  client TEXT NOT NULL,
  phone TEXT,
  car_number TEXT,
  car_model TEXT,
  merchant TEXT,
  payment_method TEXT,
  date TEXT NOT NULL,
  time TEXT,
  total_amount INTEGER NOT NULL DEFAULT 0,
  paid_amount INTEGER NOT NULL DEFAULT 0,
  remaining_amount INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'To''landi',
  role TEXT NOT NULL, -- 'sotuvchi', 'administrator', 'vulkanizator'
  staff_name TEXT NOT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Sotuv ichidagi tovarlar/xizmatlar
CREATE TABLE IF NOT EXISTS sale_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sale_id TEXT NOT NULL,
  product_id TEXT,
  code TEXT,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  is_service INTEGER DEFAULT 0,
  FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
);

-- 4. Zaxiralarni ko'chirish
CREATE TABLE IF NOT EXISTS stock_transfers (
  id TEXT PRIMARY KEY,
  from_branch TEXT NOT NULL,
  to_branch TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_code TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  driver TEXT,
  date TEXT NOT NULL,
  status TEXT DEFAULT 'Yo''lda',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tovarga buyurtma
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  product_name TEXT NOT NULL,
  code TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  supplier TEXT NOT NULL,
  expected_date TEXT,
  total_cost INTEGER NOT NULL,
  status TEXT DEFAULT 'Kutilmoqda',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indekslar
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date);
CREATE INDEX IF NOT EXISTS idx_sales_role ON sales(role);
CREATE INDEX IF NOT EXISTS idx_products_code ON products(code);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale_id ON sale_items(sale_id);
