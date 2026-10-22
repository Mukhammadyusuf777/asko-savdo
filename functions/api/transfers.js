// Cloudflare Pages Function: /api/transfers

export async function onRequestGet(context) {
  const { env } = context;
  try {
    if (!env.DB) return new Response(JSON.stringify([]), { headers: { "Content-Type": "application/json" } });
    const { results } = await env.DB.prepare("SELECT * FROM stock_transfers ORDER BY rowid DESC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.DB) return new Response(JSON.stringify({ error: "No DB" }), { status: 500 });
    const t = await request.json();
    await env.DB.prepare(`
      INSERT INTO stock_transfers (id, from_branch, to_branch, product_name, product_code, quantity, driver, date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(t.id, t.fromBranch, t.toBranch, t.productName, t.productCode, t.quantity, t.driver, t.date, t.status || 'Yo\'lda').run();
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
