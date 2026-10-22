// One-time D1 Database Initializer: /api/init-db

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "env.DB mavjud emas" }), { status: 500 });
  }

  const STATEMENTS = [
    `CREATE TABLE IF NOT EXISTS products (
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
    )`,

    `CREATE TABLE IF NOT EXISTS sales (
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
      role TEXT NOT NULL,
      staff_name TEXT NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS sale_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sale_id TEXT NOT NULL,
      product_id TEXT,
      code TEXT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      price INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL DEFAULT 0,
      is_service INTEGER DEFAULT 0
    )`,

    `CREATE TABLE IF NOT EXISTS stock_transfers (
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
    )`,

    `CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      product_name TEXT NOT NULL,
      code TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      supplier TEXT NOT NULL,
      expected_date TEXT,
      total_cost INTEGER NOT NULL,
      status TEXT DEFAULT 'Kutilmoqda',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    `INSERT OR REPLACE INTO products (id, code, name, category, brand, mera, quantity, cost_price, price, unit, branch, min_stock) VALUES
    ('p1', 'SHN0613', 'Yallama 195/60/15', 'Shinalar', 'Shina Yallama', '195/60/15', 44, 420000, 510000, 'dona', 'AN2', 8),
    ('p2', 'AF0007', 'CARASCO DIVORNIY SUV 20 KO''K', 'Avtokimyo', 'CAR ASKO', '-', 30, 32000, 45000, 'dona', 'AN2', 10),
    ('p3', 'SHN0955', 'Didar TOURING 771 185/65/14', 'Shinalar', 'DIDAR', '185/65/14', 24, 340000, 410000, 'dona', 'AN2', 8),
    ('p4', 'SHN0798', 'Yallama 185/65/14', 'Shinalar', 'Shina Yallama', '185/65/14', 20, 350000, 420000, 'dona', 'AN2', 8),
    ('p5', 'SHN0206', 'Fortuna ECOPLUS2 4S 205/70/14', 'Shinalar', 'Fortuna', '205/70/14', 20, 430000, 520000, 'dona', 'AN2', 4),
    ('p6', 'SHN1181', 'Altaire CROSSCLIMATE 195/60/15', 'Shinalar', 'Altaire', '195/60/15', 20, 400000, 490000, 'dona', 'AN2', 6),
    ('p7', 'SHN0956', 'Didar TOURING 771 195/60/15', 'Shinalar', 'DIDAR', '195/60/15', 20, 390000, 470000, 'dona', 'AN2', 8),
    ('p8', 'SHN0951', 'Didar TOURING 771 205/65/15', 'Shinalar', 'DIDAR', '205/65/15', 20, 450000, 550000, 'dona', 'AN2', 6),
    ('p9', 'AF0003', 'ANTIFRIZ 1KG ko''k -40', 'Avtokimyo', 'CAR ASKO', 'ko''k -40', 18, 19000, 28000, 'dona', 'AN2', 12),
    ('p10', 'SHN0949', 'Didar TOURING 771 195/65/15', 'Shinalar', 'DIDAR', '195/65/15', 18, 400000, 485000, 'dona', 'AN2', 6)`,

    `INSERT OR REPLACE INTO sales (id, client, phone, car_number, car_model, merchant, payment_method, date, time, total_amount, paid_amount, remaining_amount, status, role, staff_name, notes) VALUES
    ('AN2-237241', 'Shokirov Xurshidbek', '998932141003', '60L387HB', 'Chevrolet Cobalt', 'AKSIYA 0-0-4 (ALIF) - 0%', 'alif', '21.10.2026', '14:32', 2040000, 2040000, 0, 'To''landi', 'sotuvchi', 'Alisher Qodirov (Sotuvchi)', 'Alif 0-0-4'),
    ('AN2-237105', 'Xamidov Nurmuhammad', '998882595700', '60M557LB', 'Chevrolet Lacetti', 'Naqd - 0%', 'naqd', '21.10.2026', '13:15', 2504000, 2504000, 0, 'To''landi', 'vulkanizator', 'Sardor Usta (Vulkanizator)', 'Vulkanizatsiya va montaj'),
    ('AN2-237018', 'Quvonov Tursunboy', '998993120505', '60R504DB', 'Tracker 2', 'Terminal HUMO - 0%', 'humo', '21.10.2026', '12:35', 3104000, 3104000, 0, 'To''landi', 'sotuvchi', 'Alisher Qodirov (Sotuvchi)', 'HUMO terminali'),
    ('AN2-236873', 'Nazirov Eldorbek', '998916091940', '60Q021UA', 'Damas', 'AKSIYA 0-0-4 (UZUM) - 0%', 'uzum', '21.10.2026', '11:45', 2276000, 2276000, 0, 'To''landi', 'administrator', 'Bobur Mirzayev (Administrator)', 'Uzum nasiya')`
  ];

  try {
    for (const sql of STATEMENTS) {
      await env.DB.prepare(sql).run();
    }
    return new Response(JSON.stringify({ 
      success: true, 
      message: "D1 ma'lumotlar bazasi jadvallari va boshlang'ich ma'lumotlar muvaffaqiyatli yuklandi!" 
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
