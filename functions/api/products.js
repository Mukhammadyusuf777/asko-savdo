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

    return new Response(JSON.stringify(results), {
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
      INSERT OR REPLACE INTO products (id, code, name, category, brand, mera, quantity, cost_price, price, unit, branch, min_stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      item.id,
      item.code,
      item.name,
      item.category || 'Shinalar',
      item.brand || '',
      item.mera || '-',
      item.quantity || 0,
      item.costPrice || item.cost_price || 0,
      item.price || 0,
      item.unit || 'dona',
      item.branch || 'AN2',
      item.minStock || item.min_stock || 6
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
