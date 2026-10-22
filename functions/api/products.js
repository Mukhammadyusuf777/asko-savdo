// Cloudflare Pages Function: /api/products

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 ma'lumotlar bazasi ulanmagan" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { results } = await env.DB.prepare("SELECT * FROM products ORDER BY name ASC").all();

    const mapped = results.map(r => ({
      ...r,
      costPrice: r.cost_price,
      minStock: r.min_stock
    }));

    return new Response(JSON.stringify(mapped), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 ma'lumotlar bazasi ulanmagan" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const item = await request.json();

    await env.DB.prepare(`
      INSERT INTO products (id, code, name, category, brand, mera, quantity, cost_price, price, unit, branch, min_stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        code = excluded.code,
        name = excluded.name,
        category = excluded.category,
        brand = excluded.brand,
        mera = excluded.mera,
        quantity = excluded.quantity,
        cost_price = excluded.cost_price,
        price = excluded.price,
        unit = excluded.unit,
        branch = excluded.branch,
        min_stock = excluded.min_stock,
        updated_at = CURRENT_TIMESTAMP
    `).bind(
      item.id,
      item.code,
      item.name,
      item.category || 'Shinalar',
      item.brand || '',
      item.mera || '-',
      item.quantity || 0,
      item.costPrice ?? item.cost_price ?? 0,
      item.price || 0,
      item.unit || 'dona',
      item.branch || 'AN2',
      item.minStock ?? item.min_stock ?? 6
    ).run();

    return new Response(JSON.stringify({ success: true, item }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
