// Cloudflare Pages Function: /api/orders

export async function onRequestGet(context) {
  const { env } = context;
  try {
    if (!env.DB) return new Response(JSON.stringify([]), { headers: { "Content-Type": "application/json" } });
    const { results } = await env.DB.prepare("SELECT * FROM orders ORDER BY rowid DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.DB) return new Response(JSON.stringify({ error: "No DB" }), { status: 500 });
    const o = await request.json();
    await env.DB.prepare(`
      INSERT INTO orders (id, product_name, code, quantity, supplier, expected_date, total_cost, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(o.id, o.productName, o.code, o.quantity, o.supplier, o.expectedDate, o.totalCost, o.status || 'Kutilmoqda').run();
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
